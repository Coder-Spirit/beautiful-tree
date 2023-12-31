import { computeNaiveLayout, computeSmartLayout } from '../layouts'
import { describe, expect, it } from 'vitest'

describe('computeNaiveLayout', () => {
	it('sets x=0,y=0 for a single-node tree, and data is preserved', () => {
		const resultWithoutChildren = computeNaiveLayout({
			data: { v: 42 },
		})
		expect(resultWithoutChildren).toEqual({
			mX: 0,
			mY: 0,
			tree: {
				data: { v: 42 },
				meta: {
					isRoot: true,
					isLeaf: true,
					pos: { x: 0, y: 0 },
				},
			},
		})

		const resultWithEmptyChildren = computeNaiveLayout({
			data: { v: 42 },
			children: [],
		})
		expect(resultWithEmptyChildren).toEqual({
			mX: 0,
			mY: 0,
			tree: {
				data: { v: 42 },
				children: [],
				meta: {
					isRoot: true,
					isLeaf: true,
					pos: { x: 0, y: 0 },
				},
			},
		})
	})

	it('sets x=0,y=0 & x=0,y=1 for tree with single child', () => {
		const result = computeNaiveLayout({
			data: { v: 42 },
			children: [
				{
					eData: {},
					node: { data: { v: 43 } },
				},
			],
		})

		expect(result).toEqual({
			mX: 0,
			mY: 1,
			tree: {
				data: { v: 42 },
				children: [
					{
						eData: {},
						node: {
							data: { v: 43 },
							meta: {
								isRoot: false,
								isLeaf: true,
								pos: { x: 0, y: 1 },
							},
						},
					},
				],
				meta: {
					isRoot: true,
					isLeaf: false,
					pos: { x: 0, y: 0 },
				},
			},
		})
	})

	it('sets x=0,y=0 & x=0,y=1 & x=1,y=1 for tree with two children', () => {
		const result = computeNaiveLayout({
			data: { v: 42 },
			children: [
				{
					eData: {},
					node: { data: { v: 43 } },
				},
				{
					eData: {},
					node: { data: { v: 44 } },
				},
			],
		})

		expect(result).toEqual({
			mX: 1,
			mY: 1,
			tree: {
				data: { v: 42 },
				children: [
					{
						eData: {},
						node: {
							data: { v: 43 },
							meta: {
								isRoot: false,
								isLeaf: true,
								pos: { x: 0, y: 1 },
							},
						},
					},
					{
						eData: {},
						node: {
							data: { v: 44 },
							meta: {
								isRoot: false,
								isLeaf: true,
								pos: { x: 1, y: 1 },
							},
						},
					},
				],
				meta: {
					isRoot: true,
					isLeaf: false,
					pos: { x: 0, y: 0 },
				},
			},
		})
	})

	it('sets x for ((.,.),(.))', () => {
		const result = computeNaiveLayout({
			data: { v: 42 },
			children: [
				{
					eData: {},
					node: {
						data: { v: 43 },
						children: [
							{
								eData: {},
								node: { data: { v: 45 } },
							},
							{
								eData: {},
								node: { data: { v: 46 } },
							},
						],
					},
				},
				{
					eData: {},
					node: {
						data: { v: 44 },
						children: [
							{
								eData: {},
								node: { data: { v: 47 } },
							},
						],
					},
				},
			],
		})

		expect(result).toEqual({
			mX: 2,
			mY: 2,
			tree: {
				data: { v: 42 },
				children: [
					{
						eData: {},
						node: {
							data: { v: 43 },
							children: [
								{
									eData: {},
									node: {
										data: { v: 45 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 0, y: 2 },
										},
									},
								},
								{
									eData: {},
									node: {
										data: { v: 46 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 1, y: 2 },
										},
									},
								},
							],
							meta: {
								isRoot: false,
								isLeaf: false,
								pos: { x: 0, y: 1 },
							},
						},
					},
					{
						eData: {},
						node: {
							data: { v: 44 },
							children: [
								{
									eData: {},
									node: {
										data: { v: 47 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 2, y: 2 },
										},
									},
								},
							],
							meta: {
								isRoot: false,
								isLeaf: false,
								pos: { x: 1, y: 1 },
							},
						},
					},
				],
				meta: {
					isRoot: true,
					isLeaf: false,
					pos: { x: 0, y: 0 },
				},
			},
		})
	})

	it('sets x for ((.),(.,.))', () => {
		const result = computeNaiveLayout({
			data: { v: 42 },
			children: [
				{
					eData: {},
					node: {
						data: { v: 43 },
						children: [
							{
								eData: {},
								node: { data: { v: 45 } },
							},
						],
					},
				},
				{
					eData: {},
					node: {
						data: { v: 44 },
						children: [
							{
								eData: {},
								node: { data: { v: 46 } },
							},
							{
								eData: {},
								node: { data: { v: 47 } },
							},
						],
					},
				},
			],
		})

		expect(result).toEqual({
			mX: 2,
			mY: 2,
			tree: {
				data: { v: 42 },
				children: [
					{
						eData: {},
						node: {
							data: { v: 43 },
							children: [
								{
									eData: {},
									node: {
										data: { v: 45 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 0, y: 2 },
										},
									},
								},
							],
							meta: {
								isRoot: false,
								isLeaf: false,
								pos: { x: 0, y: 1 },
							},
						},
					},
					{
						eData: {},
						node: {
							data: { v: 44 },
							children: [
								{
									eData: {},
									node: {
										data: { v: 46 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 1, y: 2 },
										},
									},
								},
								{
									eData: {},
									node: {
										data: { v: 47 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 2, y: 2 },
										},
									},
								},
							],
							meta: {
								isRoot: false,
								isLeaf: false,
								pos: { x: 1, y: 1 },
							},
						},
					},
				],
				meta: {
					isRoot: true,
					isLeaf: false,
					pos: { x: 0, y: 0 },
				},
			},
		})
	})
})

describe('computeSmartLayout', () => {
	it('sets x=0,y=0 for a single-node tree, and data is preserved', () => {
		const resultWithoutChildren = computeSmartLayout({
			data: { v: 42 },
		})
		expect(resultWithoutChildren).toEqual({
			mX: 0,
			mY: 0,
			tree: {
				data: { v: 42 },
				meta: {
					isRoot: true,
					isLeaf: true,
					pos: { x: 0, y: 0 },
				},
			},
		})

		const resultWithEmptyChildren = computeSmartLayout({
			data: { v: 42 },
			children: [],
		})
		expect(resultWithEmptyChildren).toEqual({
			mX: 0,
			mY: 0,
			tree: {
				data: { v: 42 },
				children: [],
				meta: {
					isRoot: true,
					isLeaf: true,
					pos: { x: 0, y: 0 },
				},
			},
		})
	})

	it('sets x=0,y=0 & x=0,y=1 for tree with single child', () => {
		const result = computeSmartLayout({
			data: { v: 42 },
			children: [
				{
					eData: {},
					node: { data: { v: 43 } },
				},
			],
		})

		expect(result).toEqual({
			mX: 0,
			mY: 1,
			tree: {
				data: { v: 42 },
				children: [
					{
						eData: {},
						node: {
							data: { v: 43 },
							meta: {
								isRoot: false,
								isLeaf: true,
								pos: { x: 0, y: 1 },
							},
						},
					},
				],
				meta: {
					isRoot: true,
					isLeaf: false,
					pos: { x: 0, y: 0 },
				},
			},
		})
	})

	it('sets x=0.5,y=0 & x=0,y=1 & x=1,y=1 for tree with two children', () => {
		const result = computeSmartLayout({
			data: { v: 42 },
			children: [
				{
					eData: {},
					node: { data: { v: 43 } },
				},
				{
					eData: {},
					node: { data: { v: 44 } },
				},
			],
		})

		expect(result).toEqual({
			mX: 1,
			mY: 1,
			tree: {
				data: { v: 42 },
				children: [
					{
						eData: {},
						node: {
							data: { v: 43 },
							meta: {
								isRoot: false,
								isLeaf: true,
								pos: { x: 0, y: 1 },
							},
						},
					},
					{
						eData: {},
						node: {
							data: { v: 44 },
							meta: {
								isRoot: false,
								isLeaf: true,
								pos: { x: 1, y: 1 },
							},
						},
					},
				],
				meta: {
					isRoot: true,
					isLeaf: false,
					pos: { x: 0.5, y: 0 },
				},
			},
		})
	})

	it('sets x for ((.,.),(.))', () => {
		const result = computeSmartLayout({
			data: { v: 42 },
			children: [
				{
					eData: {},
					node: {
						data: { v: 43 },
						children: [
							{
								eData: {},
								node: { data: { v: 45 } },
							},
							{
								eData: {},
								node: { data: { v: 46 } },
							},
						],
					},
				},
				{
					eData: {},
					node: {
						data: { v: 44 },
						children: [
							{
								eData: {},
								node: { data: { v: 47 } },
							},
						],
					},
				},
			],
		})

		expect(result).toEqual({
			mX: 2,
			mY: 2,
			tree: {
				data: { v: 42 },
				children: [
					{
						eData: {},
						node: {
							data: { v: 43 },
							children: [
								{
									eData: {},
									node: {
										children: undefined,
										data: { v: 45 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 0, y: 2 },
										},
									},
								},
								{
									eData: {},
									node: {
										children: undefined,
										data: { v: 46 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 1, y: 2 },
										},
									},
								},
							],
							meta: {
								isRoot: false,
								isLeaf: false,
								pos: { x: 0.5, y: 1 },
							},
						},
					},
					{
						eData: {},
						node: {
							data: { v: 44 },
							children: [
								{
									eData: {},
									node: {
										children: undefined,
										data: { v: 47 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 2, y: 2 },
										},
									},
								},
							],
							meta: {
								isRoot: false,
								isLeaf: false,
								pos: { x: 2, y: 1 },
							},
						},
					},
				],
				meta: {
					isRoot: true,
					isLeaf: false,
					pos: { x: 1.25, y: 0 },
				},
			},
		})
	})

	it('sets x for ((.),(.,.))', () => {
		const result = computeSmartLayout({
			data: { v: 42 },
			children: [
				{
					eData: {},
					node: {
						data: { v: 43 },
						children: [
							{
								eData: {},
								node: { data: { v: 45 } },
							},
						],
					},
				},
				{
					eData: {},
					node: {
						data: { v: 44 },
						children: [
							{
								eData: {},
								node: { data: { v: 46 } },
							},
							{
								eData: {},
								node: { data: { v: 47 } },
							},
						],
					},
				},
			],
		})

		expect(result).toEqual({
			mX: 2,
			mY: 2,
			tree: {
				data: { v: 42 },
				children: [
					{
						eData: {},
						node: {
							data: { v: 43 },
							children: [
								{
									eData: {},
									node: {
										data: { v: 45 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 0, y: 2 },
										},
									},
								},
							],
							meta: {
								isRoot: false,
								isLeaf: false,
								pos: { x: 0, y: 1 },
							},
						},
					},
					{
						eData: {},
						node: {
							data: { v: 44 },
							children: [
								{
									eData: {},
									node: {
										data: { v: 46 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 1, y: 2 },
										},
									},
								},
								{
									eData: {},
									node: {
										data: { v: 47 },
										meta: {
											isRoot: false,
											isLeaf: true,
											pos: { x: 2, y: 2 },
										},
									},
								},
							],
							meta: {
								isRoot: false,
								isLeaf: false,
								pos: { x: 1.5, y: 1 },
							},
						},
					},
				],
				meta: {
					isRoot: true,
					isLeaf: false,
					pos: { x: 0.75, y: 0 },
				},
			},
		})
	})
})
