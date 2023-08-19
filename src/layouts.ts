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
			abstractPosition: { x, y: depth },
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
