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

const _computeCenter2Layout = (
	tree: Tree,
	depth = 0,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	offsets: number[],
): DeepWriteable<TreeWithLayout> => {
	const children = tree.children?.map((child) => ({
		edgeData: child.edgeData,
		node: _computeCenter2Layout(child.node, depth + 1, offsets),
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

export const computeCenter2Layout = (
	tree: Readonly<Tree>,
): Readonly<WrappedTreeWithLayout> => {
	const offsets: number[] = []
	const t = _computeCenter2Layout(tree, 0, offsets)

	const tracer = { maxX: 0 }
	_addMods(t, 0, tracer)

	return {
		tree: t,
		maxY: offsets.length - 1,
		maxX: tracer.maxX,
	}
}
