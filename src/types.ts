export interface TreeChild<T extends Tree = Tree> {
	readonly node: T
	readonly edgeData?: Readonly<Record<string, unknown>> | undefined
}

export interface Node {
	readonly data?: Readonly<Record<string, unknown>> | undefined
}

export type Tree = Node & {
	readonly children?: readonly TreeChild[] | undefined
}

export type TreeWithLayout = Node & {
	readonly children?:
		| Readonly<Required<TreeChild<TreeWithLayout>>[]>
		| undefined
	readonly meta: {
		readonly isRoot: boolean
		readonly isLeaf: boolean
		readonly abstractPosition: {
			readonly x: number
			readonly y: number
		}
	}
}

export interface Edge {
	readonly start: {
		readonly x: number
		readonly y: number
	}
	readonly end: {
		readonly x: number
		readonly y: number
	}
	readonly edgeData?: Readonly<Record<string, unknown>> | undefined
}
