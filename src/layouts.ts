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

export const computeLeftShiftLayout = (
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

const _computeCenter1Layout = (
	tree: Tree,
	depth = 0,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	offsets: number[],
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	nexts: number[],
): DeepWriteable<TreeWithLayout> => {
	const children = tree.children?.map((child) => ({
		edgeData: child.edgeData,
		node: _computeCenter1Layout(child.node, depth + 1, offsets, nexts),
	}))

	let place: number
	let x: number

	const numChildren = tree.children?.length ?? 0
	if (numChildren === 0) {
		place = nexts[depth] ?? 0
		x = place
	} else if (numChildren === 1) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		place = children![0]!.node.meta.pos.x
	} else {
		place =
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			(children![0]!.node.meta.pos.x +
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				children![numChildren - 1]!.node.meta.pos.x) *
			0.5
	}

	offsets[depth] = Math.max(offsets[depth] ?? 0, nexts[depth] ?? 0 - place)
	if (numChildren > 0) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		x = place + offsets[depth]!
	}
	nexts[depth] = (nexts[depth] ?? 0) + 1

	return {
		data: tree.data,
		children,
		meta: {
			isRoot: depth === 0,
			isLeaf: tree.children === undefined || tree.children.length === 0,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			pos: { x: x!, y: depth },
			m: offsets[depth],
		},
	} satisfies Readonly<TreeWithLayout> as DeepWriteable<TreeWithLayout>
}

export const computeCenter1Layout = (
	tree: Readonly<Tree>,
): Readonly<WrappedTreeWithLayout> => {
	const nexts: number[] = []
	const t = _computeCenter1Layout(tree, 0, [], nexts)

	console.log('without mods')
	console.log(t)

	const tracer = { maxX: 0 }
	_addMods(t, 0, tracer)

	console.log('with mods')
	console.log(t)

	return {
		tree: t,
		maxY: nexts.length - 1,
		maxX: tracer.maxX,
	}
}
