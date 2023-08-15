import type { Tree, TreeChild, TreeWithLayout } from './types'

const _computeLeftShiftLayout = (
	tree: Tree,
	depth = 0,
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	counters?: number[][],
): TreeWithLayout => {
	counters ??= []

	if (counters[depth] === undefined) {
		counters[depth] = []
	}
	const x = (counters[depth]?.at(-1) ?? -1) + 1
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	counters[depth]!.push(x)

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
	} satisfies TreeWithLayout
}

export const computeLeftShiftLayout: (tree: Tree) => TreeWithLayout =
	_computeLeftShiftLayout
