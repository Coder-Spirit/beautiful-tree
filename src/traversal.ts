import type { Tree, TreeWithLayout } from './layouts'

export function* postOrderIterator<T extends Tree | TreeWithLayout = Tree>(
	v: Readonly<T>,
): Generator<T['data'], void> {
	for (const child of v.children ?? []) {
		yield* postOrderIterator<T>(child.node as T)
	}
	yield v.data
}
