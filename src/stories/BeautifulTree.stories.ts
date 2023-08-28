import {
	BeautifulTree,
	computeNaiveLayout,
	computeSmartLayout,
} from '../BeautifulTree'
import type { Meta, StoryObj } from '@storybook/react'
import type { Tree } from '../types'

const meta = {
	title: 'BeautifulTree',
	component: BeautifulTree,
	parameters: {
		// https://storybook.js.org/docs/react/configure/story-layout
		layout: 'centered',
	},
	tags: [
		'autodocs', // https://storybook.js.org/docs/react/writing-docs/autodocs
	],
	argTypes: {}, // https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof BeautifulTree>

export default meta

type Story = StoryObj<typeof meta>

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

const smallTree: Tree = {
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

const bigTree: Tree = {
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

const wideTree_A: Tree = {
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

const wideTree_B: Tree = {
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

const wideTree_Bm = mirrorTree(wideTree_B)

const wideTree_C: Tree = {
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

const wideTree_D: Tree = {
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

const getCssFromNodeData = (
	data?: Readonly<Record<string, unknown>>,
): string[] => {
	return typeof data?.['v'] === 'number' && data['v'] % 2 === 0 ? ['even'] : []
}

const getCssFromEdgeData = (
	data?: Readonly<Record<string, unknown>>,
): string[] => {
	return typeof data?.['e'] === 'number' && data['e'] % 2 === 1 ? ['odd'] : []
}

export const LeftShifted_Tree: Story = {
	args: {
		id: 'leftshifted-small-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: smallTree,
		computeLayout: computeNaiveLayout,
	},
}

export const LeftShifted_Big_Tree: Story = {
	args: {
		id: 'leftshifted-big-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: bigTree,
		computeLayout: computeNaiveLayout,
	},
}

export const Centered3_Tree: Story = {
	args: {
		id: 'centered3-small-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: smallTree,
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}

export const Centered3_Big_Tree: Story = {
	args: {
		id: 'centered3-big-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: bigTree,
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}

export const Centered3_Wide_Tree_A: Story = {
	args: {
		id: 'centered3-wide-tree-a',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: wideTree_A,
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}

export const Centered3_Wide_Tree_B: Story = {
	args: {
		id: 'centered3-wide-tree-b',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: wideTree_B,
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}

export const Centered3_Wide_Tree_Bm: Story = {
	args: {
		id: 'centered3-wide-tree-bm',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: wideTree_Bm,
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}

export const Centered3_Wide_Tree_C: Story = {
	args: {
		id: 'centered3-wide-tree-c',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: wideTree_C,
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}

export const Centered3_Wide_Tree_D: Story = {
	args: {
		id: 'centered3-wide-tree-d',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: wideTree_D,
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}
