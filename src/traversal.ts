import type { Tree, TreeWithLayout } from './types'

export function* postOrderIterator<T extends Tree | TreeWithLayout = Tree>(
	v: Readonly<T>,
): Generator<Omit<Readonly<T>, 'children'>, void> {
	for (const child of v.children ?? []) {
		yield* postOrderIterator<T>(child.node as T)
	}

	// We'll discard children, but we don't directly access v.data because we
	// might also want to access v.layout in case it exists.

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { children, ...vv } = v
	yield vv
}
