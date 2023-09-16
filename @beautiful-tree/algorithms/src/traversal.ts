import type { Edge, Tree, TreeWithLayout } from '@beautiful-tree/types'

export function* postOrderIterator<T extends Tree | TreeWithLayout = Tree>(
	tree: Readonly<T>,
): Generator<Omit<Readonly<T>, 'children'>, void> {
	for (const child of tree.children ?? []) {
		yield* postOrderIterator<T>(child.node as T)
	}

	// We'll discard children, but we don't directly access v.data because we
	// might also want to access v.layout in case it exists.

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { children, ...vv } = tree
	yield vv
}

export function* edgesIterator(
	tree: Readonly<TreeWithLayout>,
): Generator<Readonly<Edge>, void> {
	for (const child of tree.children ?? []) {
		yield {
			start: tree.meta.pos,
			end: child.node.meta.pos,
			eData: child.eData,
		}
		yield* edgesIterator(child.node)
	}
}
