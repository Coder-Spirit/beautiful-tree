import {
	BeautifulTree,
	computeNaiveLayout,
	computeSmartLayout,
} from '../BeautifulTree'
import type { Meta, StoryObj } from '@storybook/react'
import {
	bigTree,
	getCssFromEdgeData,
	getCssFromNodeData,
	smallTree,
	wideTree_A,
	wideTree_B,
	wideTree_Bm,
	wideTree_C,
	wideTree_D,
	wideTree_E,
} from './treeFixtures'
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
		getNodeContent: (data) => data?.['v']?.toString() ?? '',
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

export const Centered3_Wide_Tree_E: Story = {
	args: {
		id: 'centered3-wide-tree-e',
		svgProps: {
			width: 400,
			height: 400,
		},
		tree: wideTree_E,
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}

const buildRandomTree = (maxDepth = 4): Readonly<Tree> => {
	const numChildren = maxDepth > 0 ? Math.floor(Math.random() * 4) : 0
	const tree: Tree = {
		// eslint-disable-next-line prefer-spread
		children: Array.apply(undefined, { length: numChildren } as unknown[]).map(
			() => ({ node: buildRandomTree(maxDepth - 1) }),
		),
	}

	return tree
}

export const Centered3_Wide_Tree_Random: Story = {
	args: {
		id: 'centered3-wide-tree-random',
		svgProps: {
			width: 400,
			height: 400,
		},
		tree: buildRandomTree(),
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}
