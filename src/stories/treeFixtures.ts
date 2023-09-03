import type { Tree } from '../types'

const mirrorTree = (tree: Tree): Tree => {
	const children = tree.children?.map((child) => ({
		eData: child.eData,
		node: mirrorTree(child.node),
	}))
	return {
		data: tree.data,
		children: children?.reverse(),
	}
}

export const getCssFromNodeData = (
	data?: Readonly<Record<string, unknown>>,
): string[] => {
	return typeof data?.['v'] === 'number' && data['v'] % 2 === 0 ? ['even'] : []
}

export const getCssFromEdgeData = (
	data?: Readonly<Record<string, unknown>>,
): string[] => {
	return typeof data?.['e'] === 'number' && data['e'] % 2 === 1 ? ['odd'] : []
}

export const smallTree: Tree = {
	data: { v: 42 },
	children: [
		{
			node: {
				data: { v: 43 },
				children: [
					{
						node: { data: { v: 45 } },
					},
				],
			},
		},
		{
			node: {
				data: { v: 44 },
				children: [
					{
						node: { data: { v: 46 } },
					},
					{
						node: { data: { v: 47 } },
					},
				],
			},
		},
	],
}

export const bigTree: Tree = {
	data: { v: 42 },
	children: [
		{
			node: {
				data: { v: 43 },
				children: [
					{
						node: {
							data: { v: 45 },
							children: [
								{ node: { data: { v: 48 } } },
								{ node: { data: { v: 49 } } },
							],
						},
					},
				],
			},
		},
		{
			node: {
				data: { v: 44 },
				children: [
					{ node: { data: { v: 46 } } },
					{
						node: {
							data: { v: 47 },
							children: [
								{ node: { data: { v: 50 } } },
								{ node: { data: { v: 51 } } },
							],
						},
					},
				],
			},
		},
	],
}

export const wideTree_A: Tree = {
	data: { v: 42 },
	children: [
		{
			node: {
				data: { v: 43 },
				children: [
					{
						node: {
							data: { v: 45 },
							children: [
								{ node: { data: { v: 48 } } },
								{ node: { data: { v: 49 } } },
							],
						},
					},
				],
			},
		},
		{
			node: {
				data: { v: 44 },
				children: [
					{ node: { data: { v: 46 } } },
					{
						node: {
							data: { v: 47 },
							children: [
								{ node: { data: { v: 50 } } },
								{ node: { data: { v: 51 } } },
							],
						},
					},
				],
			},
		},
		{ node: { data: { v: 52 } } },
	],
}

export const wideTree_B: Tree = {
	data: { v: 42 },
	children: [
		{
			node: {
				data: { v: 43 },
				children: [
					{
						node: {
							data: { v: 45 },
							children: [
								{ node: { data: { v: 48 } } },
								{ node: { data: { v: 49 } } },
							],
						},
					},
				],
			},
		},
		{ node: { data: { v: 61 } } },
		{
			node: {
				data: { v: 44 },
				children: [
					{ node: { data: { v: 46 } } },
					{
						node: {
							data: { v: 47 },
							children: [
								{ node: { data: { v: 55 } } },
								{ node: { data: { v: 56 } } },
								{ node: { data: { v: 57 } } },
								{ node: { data: { v: 58 } } },
								{ node: { data: { v: 59 } } },
								{ node: { data: { v: 60 } } },
								{ node: { data: { v: 50 } } },
								{ node: { data: { v: 51 } } },
							],
						},
					},
				],
			},
		},
		{ node: { data: { v: 52 } } },
	],
}

export const wideTree_Bm = mirrorTree(wideTree_B)

export const wideTree_C: Tree = {
	data: { v: 0 },
	children: [
		{
			node: {
				data: { v: -1 },
				children: [
					{
						node: {
							data: { v: -2 },
							children: [
								{ node: { data: { v: -3 } } },
								{ node: { data: { v: -1.5 } } },
							],
						},
					},
					{ node: { data: { v: -0.5 } } },
				],
			},
		},
		{
			node: {
				data: { v: 1 },
				children: [
					{ node: { data: { v: 0.5 } } },
					{
						node: {
							data: { v: 2 },
							children: [
								{ node: { data: { v: 1.5 } } },
								{ node: { data: { v: 3 } } },
							],
						},
					},
				],
			},
		},
	],
}

export const wideTree_D: Tree = {
	data: { v: 0 },
	children: [
		{
			node: {
				data: { v: -1 },
				children: [
					{
						eData: { e: 1 },
						node: {
							data: { v: -2 },
							children: [
								{
									node: {
										data: { v: -3 },
										children: [
											{ node: { data: { v: -4 } } },
											{ eData: { e: 1 }, node: { data: { v: -2.5 } } },
										],
									},
								},
								{ node: { data: { v: -1.5 } } },
							],
						},
					},
					{ node: { data: { v: -0.5 } } },
				],
			},
		},
		{
			node: {
				data: { v: 1 },
				children: [
					{ node: { data: { v: 0.5 } } },
					{
						node: {
							data: { v: 2 },
							children: [
								{ node: { data: { v: 1.5 } } },
								{
									node: {
										data: { v: 3 },
										children: [
											{ node: { data: { v: 2.5 } } },
											{ node: { data: { v: 4 } } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
}

export const wideTree_E: Tree = {
	children: [
		{
			node: {
				children: [
					{ node: {} },
					{
						node: {
							children: [
								{ node: {} },
								{ node: { children: [{ node: {} }, { node: {} }] } },
								{
									node: {
										children: [{ node: {} }, { node: {} }, { node: {} }],
									},
								},
							],
						},
					},
					{ node: {} },
				],
			},
		},
		{ node: { children: [{ node: {} }] } },
		{ node: {} },
	],
}

export const wideTree_M: Tree = {
	children: [
		{
			node: {
				children: [
					{ node: {} },
					{
						node: {
							children: [{ node: { children: [{ node: {} }] } }, { node: {} }],
						},
					},
					{
						node: {
							children: [
								{
									node: {
										children: [{ node: {} }, { node: {} }, { node: {} }],
									},
								},
							],
						},
					},
				],
			},
		},
		{
			node: {
				children: [
					{
						node: {
							children: [
								{
									node: {
										children: [{ node: {} }, { node: {} }, { node: {} }],
									},
								},
							],
						},
					},
				],
			},
		},
		{ node: { children: [{ node: {} }, { node: {} }] } },
	],
}
