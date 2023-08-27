import type { Tree, TreeChild, TreeWithLayout } from './types'

export interface WrappedTreeWithLayout {
	readonly tree: Readonly<TreeWithLayout>
	readonly maxX: number
	readonly maxY: number
}

const _computeLeftShiftLayout = (
	tree: Tree,
	depth = 0,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	counters: { layers: number[]; maxX: number },
): Readonly<TreeWithLayout> => {
	const layers = counters.layers

	const x = (layers[depth] ?? -1) + 1
	layers[depth] = x
	counters.maxX = Math.max(counters.maxX, x)

	return {
		data: tree.data,
		children: tree.children?.map((child: Readonly<TreeChild>) => ({
			edgeData: child.edgeData,
			node: _computeLeftShiftLayout(child.node, depth + 1, counters),
		})),
		meta: {
			isRoot: depth === 0,
			isLeaf: tree.children === undefined || tree.children.length === 0,
			pos: { x, y: depth },
		},
	} satisfies Readonly<TreeWithLayout>
}

export const computeNaiveLayout = (
	tree: Readonly<Tree>,
): Readonly<WrappedTreeWithLayout> => {
	const counters = { layers: [], maxX: 0 }
	return {
		tree: _computeLeftShiftLayout(tree, 0, counters),
		maxX: counters.maxX,
		maxY: counters.layers.length - 1,
	}
}

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }

const _addMods = (
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	tree: DeepWriteable<TreeWithLayout>,
	modsum = 0,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	tracer: { maxX: number },
): void => {
	tree.meta.pos.x += modsum
	tracer.maxX = Math.max(tracer.maxX, tree.meta.pos.x)
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	modsum += tree.meta.m! // We know it's defined because we control when it's called
	for (const child of tree.children ?? []) {
		_addMods(child.node, modsum, tracer)
	}
}

const _computeCenter2Layout = (
	tree: Tree,
	depth = 0,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	offsets: number[],
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	tracer: { maxX: number },
): DeepWriteable<TreeWithLayout> => {
	const children = tree.children?.map((child) => ({
		edgeData: child.edgeData,
		node: _computeCenter2Layout(child.node, depth + 1, offsets, tracer),
	}))

	let x: number
	let m = 0
	const numChildren = tree.children?.length ?? 0
	if (numChildren === 0) {
		x = offsets[depth] ?? 0
	} else if (numChildren === 1) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		x = children![0]!.node.meta.pos.x
	} else {
		const c = // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(children![0]!.node.meta.pos.x +
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				children![numChildren - 1]!.node.meta.pos.x) *
			0.5
		x = Math.max(offsets[depth] ?? 0, c)
		m = x - c
	}
	tracer.maxX = Math.max(tracer.maxX, x)
	offsets[depth] = 1 + x

	return {
		data: tree.data,
		children,
		meta: {
			isRoot: depth === 0,
			isLeaf: tree.children === undefined || tree.children.length === 0,
			pos: { x, y: depth },
			m,
		},
	} satisfies Readonly<TreeWithLayout> as DeepWriteable<TreeWithLayout>
}

const _inPlaceEvenSpacingUpdate = (
	numChildren: number,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	tree: DeepWriteable<TreeWithLayout>,
	shift: number,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	offsets: number[],
	depth: number,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	tracer: { maxX: number },
): void => {
	if (numChildren === 0) {
		tree.meta.pos.x += shift
	} else if (numChildren === 1) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		tree.meta.pos.x = tree.children![0]!.node.meta.pos.x
	} else {
		const c = // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(tree.children![0]!.node.meta.pos.x +
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				tree.children![numChildren - 1]!.node.meta.pos.x) *
			0.5
		tree.meta.pos.x = Math.max(offsets[depth] ?? 0, c)
	}
	delete tree.meta.m
	tracer.maxX = Math.max(tracer.maxX, tree.meta.pos.x)
	offsets[depth] = 1 + tree.meta.pos.x
}

const _siblingsEvenSpacing = (
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	tree: DeepWriteable<TreeWithLayout>,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	offsets: number[],
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	tracer: { maxX: number },
	depth = 0,
	shift = 0,
	// eslint-disable-next-line sonarjs/cognitive-complexity
): void => {
	const numChildren = tree.children?.length ?? 0
	let lastFixedIdx: number | undefined
	let maxSpacing = 1
	for (const [idx, child] of (tree.children ?? []).entries()) {
		const isFixed = (child.node.children?.length ?? 0) > 0
		if (isFixed) {
			if (lastFixedIdx !== undefined) {
				const spacing =
					(child.node.meta.pos.x -
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						tree.children![lastFixedIdx]!.node.meta.pos.x) /
					(idx - lastFixedIdx)
				maxSpacing = Math.max(maxSpacing, spacing)
			}
			lastFixedIdx = idx
		}
	}

	let accShift = shift
	for (const [idx, child] of (tree.children ?? []).entries()) {
		if (idx === 0) {
			if (numChildren > 1) {
				accShift = Math.max(
					0,
					shift +
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						tree.children![1]!.node.meta.pos.x -
						maxSpacing -
						child.node.meta.pos.x,
				)
			}
		} else {
			accShift =
				shift +
				Math.max(
					0,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					tree.children![idx - 1]!.node.meta.pos.x +
						maxSpacing -
						child.node.meta.pos.x,
				)
		}
		_siblingsEvenSpacing(child.node, offsets, tracer, depth + 1, accShift)
	}

	_inPlaceEvenSpacingUpdate(numChildren, tree, shift, offsets, depth, tracer)
}

const _cousinsEvenSpacing = (
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	tree: DeepWriteable<TreeWithLayout>,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	offsets: number[],
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	tracer: { maxX: number },
	depth = 0,
	shift = 0,
): void => {
	const numChildren = tree.children?.length ?? 0

	const nextOffset = offsets[depth + 1]
	let accShift = shift
	if (
		numChildren >= 2 &&
		nextOffset !== undefined &&
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		(tree.children![0]!.node.children?.length ?? 0) === 0
	) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const mid = tree.children![1]!.node.meta.pos.x - 1
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		accShift = shift + Math.max(0, mid - tree.children![0]!.node.meta.pos.x)
	}

	for (const [idx, child] of (tree.children ?? []).entries()) {
		if (idx === 0) {
			_cousinsEvenSpacing(child.node, offsets, tracer, depth + 1, accShift)
		} else {
			_cousinsEvenSpacing(child.node, offsets, tracer, depth + 1, shift)
		}
	}

	_inPlaceEvenSpacingUpdate(numChildren, tree, shift, offsets, depth, tracer)
}

export const computeSmartLayout = (
	tree: Readonly<Tree>,
): Readonly<WrappedTreeWithLayout> => {
	const offsets: number[] = []
	const tracer = { maxX: 0 }

	const t = _computeCenter2Layout(tree, 0, offsets, tracer)
	_addMods(t, 0, tracer)

	_cousinsEvenSpacing(t, [], tracer)
	_siblingsEvenSpacing(t, [], tracer)

	return {
		tree: t,
		maxY: offsets.length - 1,
		maxX: tracer.maxX,
	}
}
