import {
	BeautifulTree,
	computeCenter1Layout,
	computeLeftShiftLayout,
} from '../BeautifulTree'
import type { Meta, StoryObj } from '@storybook/react'

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

const smallTree = {
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

const bigTree = {
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
			edgeData: {},
			node: {
				data: { v: 44 },
				children: [
					{
						edgeData: {},
						node: { data: { v: 46 } },
					},
					{
						edgeData: {},
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

export const LeftShifted_Tree: Story = {
	args: {
		id: 'leftshifted-beautiful-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: smallTree,
		computeLayout: computeLeftShiftLayout,
	},
}

export const LeftShifted_Big_Tree: Story = {
	args: {
		id: 'leftshifted-beautiful-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: bigTree,
		computeLayout: computeLeftShiftLayout,
	},
}

export const Centered1_Tree: Story = {
	args: {
		id: 'centered1-beautiful-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: smallTree,
		computeLayout: computeCenter1Layout,
	},
}

export const Centered1_Big_Tree: Story = {
	args: {
		id: 'centered1-beautiful-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: bigTree,
		computeLayout: computeCenter1Layout,
	},
}
