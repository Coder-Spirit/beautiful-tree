export type TreeChild<T extends Tree = Tree> = {
	node: T,
	edgeData?: Record<string, unknown> | undefined,
}

export type Node = {
	data?: Record<string, unknown> | undefined,
}

export type Tree = Node & {
	children?: TreeChild[] | undefined,
}

export type TreeWithLayout = Node & {
	children?: Required<TreeChild<TreeWithLayout>>[] | undefined,
	layout: {
		plan: { x: number, y: number },
	}
}

type InternalTreeLayout = number[][]

const _computeLeftShiftLayout = (tree: Tree, depth: number = 0, layout?: InternalTreeLayout): TreeWithLayout => {
	layout ??= []

	if (layout[depth] === undefined) {
		layout[depth] = []
	}
	const x = (layout[depth]?.at(-1) ?? -1) + 1
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	layout[depth]!.push(x)

	const treeWithLayout = {
		data: tree.data,
		children: tree.children?.map(child => ({
			edgeData: child.edgeData,
			node: _computeLeftShiftLayout(child.node, depth + 1, layout),
		})),
		layout: { plan: { x, y: depth } },
	} satisfies TreeWithLayout

	return treeWithLayout
}

export const computeLeftShiftLayout: ((tree: Tree) => TreeWithLayout) = _computeLeftShiftLayout
