import type { Meta, StoryObj } from '@storybook/react'
import { BeautifulTree } from '../BeautifulTree'

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

const testTree = {
	data: { v: 42 },
	children: [
		{
			edgeData: {},
			node: {
				data: { v: 43 },
				children: [
					{
						edgeData: {},
						node: { data: { v: 45 } },
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
						node: { data: { v: 47 } },
					},
				],
			},
		},
	],
}

export const SimpleTree: Story = {
	args: {
		id: 'simple-beautiful-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: testTree,
	},
}
