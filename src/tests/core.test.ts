import { describe, it, expect } from 'vitest'
import { computeLeftShiftLayout } from '../core'

describe('computeLeftShiftLayout', () => {
	it('sets x=0,y=0 for a single-node tree, and data is preserved', () => {
		const resultWithoutChildren = computeLeftShiftLayout({
			data: { v: 42 },
		})
		expect(resultWithoutChildren).toEqual({
			data: { v: 42 },
			layout: { plan: { x: 0, y: 0 } },
		})

		const resultWithEmptyChildren = computeLeftShiftLayout({
			data: { v: 42 },
			children: [],
		})
		expect(resultWithEmptyChildren).toEqual({
			data: { v: 42 },
			children: [],
			layout: { plan: { x: 0, y: 0 } },
		})
	})

	it('sets x=0,y=0 & x=0,y=1 for tree with single child', () => {
		const result = computeLeftShiftLayout({
			data: { v: 42 },
			children: [
				{
					edgeData: {},
					node: { data: { v: 43 } },
				}
			],
		})

		expect(result).toEqual({
			data: { v: 42 },
			children: [
				{
					edgeData: {},
					node: {
						data: { v: 43 },
						layout: { plan: { x: 0, y: 1 } },
					},
				}
			],
			layout: { plan: { x: 0, y: 0 } },
		})
	})

	it('sets x=0,y=0 & x=0,y=1 & x=1,y=1 for tree with two children', () => {
		const result = computeLeftShiftLayout({
			data: { v: 42 },
			children: [
				{
					edgeData: {},
					node: { data: { v: 43 } },
				},
				{
					edgeData: {},
					node: { data: { v: 44 } },
				}
			],
		})

		expect(result).toEqual({
			data: { v: 42 },
			children: [
				{
					edgeData: {},
					node: {
						data: { v: 43 },
						layout: { plan: { x: 0, y: 1 } },
					},
				},
				{
					edgeData: {},
					node: {
						data: { v: 44 },
						layout: { plan: { x: 1, y: 1 } },
					},
				}
			],
			layout: { plan: { x: 0, y: 0 } },
		})
	})

	it('sets x for ((.,.),(.))', () => {
		const result = computeLeftShiftLayout({
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
							{
								edgeData: {},
								node: { data: { v: 46 } },
							},
						]
					},
				},
				{
					edgeData: {},
					node: {
						data: { v: 44 },
						children: [
							{
								edgeData: {},
								node: { data: { v: 47 } },
							},
						]
					},
				}
			],
		})

		expect(result).toEqual({
			data: { v: 42 },
			children: [
				{
					edgeData: {},
					node: {
						data: { v: 43 },
						children: [
							{
								edgeData: {},
								node: {
									data: { v: 45 },
									layout: { plan: { x: 0, y: 2 } },
								},
							},
							{
								edgeData: {},
								node: {
									data: { v: 46 },
									layout: { plan: { x: 1, y: 2 } },
								},
							},
						],
						layout: { plan: { x: 0, y: 1 } },
					},
				},
				{
					edgeData: {},
					node: {
						data: { v: 44 },
						children: [
							{
								edgeData: {},
								node: {
									data: { v: 47 },
									layout: { plan: { x: 2, y: 2 } },
								},
							},
						],
						layout: { plan: { x: 1, y: 1 } },
					},
				}
			],
			layout: { plan: { x: 0, y: 0 } },
		})
	})

	it('sets x for ((.),(.,.))', () => {
		const result = computeLeftShiftLayout({
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
							}
						]
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
						]
					},
				}
			],
		})

		expect(result).toEqual({
			data: { v: 42 },
			children: [
				{
					edgeData: {},
					node: {
						data: { v: 43 },
						children: [
							{
								edgeData: {},
								node: {
									data: { v: 45 },
									layout: { plan: { x: 0, y: 2 } },
								},
							},
						],
						layout: { plan: { x: 0, y: 1 } },
					},
				},
				{
					edgeData: {},
					node: {
						data: { v: 44 },
						children: [
							{
								edgeData: {},
								node: {
									data: { v: 46 },
									layout: { plan: { x: 1, y: 2 } },
								},
							},
							{
								edgeData: {},
								node: {
									data: { v: 47 },
									layout: { plan: { x: 2, y: 2 } },
								},
							},
						],
						layout: { plan: { x: 1, y: 1 } },
					},
				}
			],
			layout: { plan: { x: 0, y: 0 } },
		})
	})
})
