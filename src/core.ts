export interface TreeChild<T extends Tree = Tree> {
	readonly node: T,
	readonly edgeData?: Readonly<Record<string, unknown>> | undefined,
}

export interface Node {
	readonly data?: Readonly<Record<string, unknown>> | undefined,
}

export type Tree = Node & {
	readonly children?: readonly TreeChild[] | undefined,
}

export type TreeWithLayout = Node & {
	readonly children?: Required<TreeChild<TreeWithLayout>>[] | undefined,
	readonly layout: {
		readonly plan: {
			readonly x: number,
			readonly y: number
		},
	}
}

type InternalTreeLayout = number[][]

const _computeLeftShiftLayout = (
		tree: Tree,
		depth = 0,
		// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
		layout?: InternalTreeLayout
	): TreeWithLayout => {
	layout ??= []

	if (layout[depth] === undefined) {
		layout[depth] = []
	}
	const x = (layout[depth]?.at(-1) ?? -1) + 1
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	layout[depth]!.push(x)

	return {
		data: tree.data,
		children: tree.children?.map((child: Readonly<TreeChild>) => ({
			edgeData: child.edgeData,
			node: _computeLeftShiftLayout(child.node, depth + 1, layout),
		})),
		layout: { plan: { x, y: depth } },
	} satisfies TreeWithLayout
}

export const computeLeftShiftLayout: ((tree: Tree) => TreeWithLayout) = _computeLeftShiftLayout
