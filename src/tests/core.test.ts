import { describe, it, expect } from 'vitest'
import { computeLeftShiftLayout } from '../core'

describe('computeLeftShiftLayout', () => {
	it('sets x=0,y=0 for a single-node tree, and data is preserved', () => {
		const resultWithoutChildren = computeLeftShiftLayout({
			data: { v: 42 },
		})
		expect(resultWithoutChildren).toMatchObject({
			data: { v: 42 },
			layout: { plan: { x: 0, y: 0 } },
		})

		const resultWithEmptyChildren = computeLeftShiftLayout({
			data: { v: 42 },
			children: [],
		})
		expect(resultWithEmptyChildren).toMatchObject({
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

		expect(result).toMatchObject({
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
})
