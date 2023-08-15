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

export const Empty: Story = {
	args: {
		id: 'empty-beautiful-tree',
		svgProps: {
			width: 100,
			height: 100,
		},
		tree: {
			data: {},
			children: [],
		},
	},
}
