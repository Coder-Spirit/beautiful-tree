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
	wideTree_M,
} from './treeFixtures'
import type { Tree } from '@beautiful-tree/types'

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
			width: 400,
			height: 400,
		},
		tree: smallTree,
		computeLayout: computeNaiveLayout,
	},
}

export const LeftShifted_Big_Tree: Story = {
	args: {
		id: 'leftshifted-big-tree',
		svgProps: {
			width: 400,
			height: 400,
		},
		tree: bigTree,
		computeLayout: computeNaiveLayout,
	},
}

export const Centered3_Tree: Story = {
	args: {
		id: 'centered3-small-tree',
		svgProps: {
			width: 400,
			height: 400,
		},
		tree: smallTree,
		computeLayout: computeSmartLayout,
		getNodeContent: (data) => data?.['v']?.toString() ?? '',
	},
}

export const Centered3_Big_Tree: Story = {
	args: {
		id: 'centered3-big-tree',
		svgProps: {
			width: 400,
			height: 400,
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
			width: 400,
			height: 400,
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
			width: 400,
			height: 400,
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
			width: 400,
			height: 400,
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
			width: 400,
			height: 400,
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
			width: 400,
			height: 400,
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

export const Centered3_Wide_Tree_M: Story = {
	args: {
		id: 'centered3-wide-tree-m',
		svgProps: {
			width: 400,
			height: 400,
		},
		tree: wideTree_M,
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

export const Normal_Orientation_Small_Tree: Story = {
	args: {
		id: 'normal_orientation_small_tree',
		svgProps: {
			width: 400,
			height: 400,
		},
		tree: smallTree,
		orientation: 'T-D',
		getNodeContent: (data) => data?.['v']?.toString() ?? '',
	},
}

export const LR_Orientation_Small_Tree: Story = {
	args: {
		id: 'lr_orientation_small_tree',
		svgProps: {
			width: 400,
			height: 400,
		},
		tree: smallTree,
		orientation: 'L-R',
		getNodeContent: (data) => data?.['v']?.toString() ?? '',
	},
}

export const RL_Orientation_Small_Tree: Story = {
	args: {
		id: 'rl_orientation_small_tree',
		svgProps: {
			width: 400,
			height: 400,
		},
		tree: smallTree,
		orientation: 'R-L',
		computeLayout: computeSmartLayout,
		getNodeContent: (data) => data?.['v']?.toString() ?? '',
	},
}

export const DT_Orientation_Small_Tree: Story = {
	args: {
		id: 'dt_orientation_small_tree',
		svgProps: {
			width: 400,
			height: 400,
		},
		tree: smallTree,
		orientation: 'D-T',
		computeLayout: computeSmartLayout,
		getNodeContent: (data) => data?.['v']?.toString() ?? '',
	},
}

export const LR_Orientation_Wide_Tree_A_On_Rectangle: Story = {
	args: {
		id: 'lr_orientation_wide_tree_a_on_rectangle',
		svgProps: {
			width: 250,
			height: 450,
		},
		tree: wideTree_A,
		orientation: 'L-R',
		computeLayout: computeSmartLayout,
		getNodeClass: getCssFromNodeData,
		getEdgeClass: getCssFromEdgeData,
	},
}

export const RL_Orientation_Wide_Tree_Bm_On_Rectangle: Story = {
	args: {
		id: 'rl_orientation_wide_tree_bm_on_rectangle',
		svgProps: {
			width: 250,
			height: 450,
		},
		tree: smallTree,
		orientation: 'R-L',
		computeLayout: computeSmartLayout,
		getNodeContent: (data) => data?.['v']?.toString() ?? '',
	},
}

export const DT_Orientation_Wide_Tree_D_On_Rectangle: Story = {
	args: {
		id: 'dt_orientation_wide_tree_d_on_rectangle',
		svgProps: {
			width: 250,
			height: 450,
		},
		tree: smallTree,
		orientation: 'D-T',
		computeLayout: computeSmartLayout,
		getNodeContent: (data) => data?.['v']?.toString() ?? '',
	},
}
