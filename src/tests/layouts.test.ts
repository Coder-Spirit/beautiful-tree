import { describe, expect, it } from 'vitest'
import { computeLeftShiftLayout } from '../layouts'

describe('computeLeftShiftLayout', () => {
	it('sets x=0,y=0 for a single-node tree, and data is preserved', () => {
		const resultWithoutChildren = computeLeftShiftLayout({
			data: { v: 42 },
		})
		expect(resultWithoutChildren).toEqual({
			data: { v: 42 },
			meta: {
				isRoot: true,
				isLeaf: true,
				abstractPosition: { x: 0, y: 0 },
			},
		})

		const resultWithEmptyChildren = computeLeftShiftLayout({
			data: { v: 42 },
			children: [],
		})
		expect(resultWithEmptyChildren).toEqual({
			data: { v: 42 },
			children: [],
			meta: {
				isRoot: true,
				isLeaf: true,
				abstractPosition: { x: 0, y: 0 },
			},
		})
	})

	it('sets x=0,y=0 & x=0,y=1 for tree with single child', () => {
		const result = computeLeftShiftLayout({
			data: { v: 42 },
			children: [
				{
					edgeData: {},
					node: { data: { v: 43 } },
				},
			],
		})

		expect(result).toEqual({
			data: { v: 42 },
			children: [
				{
					edgeData: {},
					node: {
						data: { v: 43 },
						meta: {
							isRoot: false,
							isLeaf: true,
							abstractPosition: { x: 0, y: 1 },
						},
					},
				},
			],
			meta: {
				isRoot: true,
				isLeaf: false,
				abstractPosition: { x: 0, y: 0 },
			},
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
				},
			],
		})

		expect(result).toEqual({
			data: { v: 42 },
			children: [
				{
					edgeData: {},
					node: {
						data: { v: 43 },
						meta: {
							isRoot: false,
							isLeaf: true,
							abstractPosition: { x: 0, y: 1 },
						},
					},
				},
				{
					edgeData: {},
					node: {
						data: { v: 44 },
						meta: {
							isRoot: false,
							isLeaf: true,
							abstractPosition: { x: 1, y: 1 },
						},
					},
				},
			],
			meta: {
				isRoot: true,
				isLeaf: false,
				abstractPosition: { x: 0, y: 0 },
			},
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
								node: { data: { v: 47 } },
							},
						],
					},
				},
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
									meta: {
										isRoot: false,
										isLeaf: true,
										abstractPosition: { x: 0, y: 2 },
									},
								},
							},
							{
								edgeData: {},
								node: {
									data: { v: 46 },
									meta: {
										isRoot: false,
										isLeaf: true,
										abstractPosition: { x: 1, y: 2 },
									},
								},
							},
						],
						meta: {
							isRoot: false,
							isLeaf: false,
							abstractPosition: { x: 0, y: 1 },
						},
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
									meta: {
										isRoot: false,
										isLeaf: true,
										abstractPosition: { x: 2, y: 2 },
									},
								},
							},
						],
						meta: {
							isRoot: false,
							isLeaf: false,
							abstractPosition: { x: 1, y: 1 },
						},
					},
				},
			],
			meta: {
				isRoot: true,
				isLeaf: false,
				abstractPosition: { x: 0, y: 0 },
			},
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
									meta: {
										isRoot: false,
										isLeaf: true,
										abstractPosition: { x: 0, y: 2 },
									},
								},
							},
						],
						meta: {
							isRoot: false,
							isLeaf: false,
							abstractPosition: { x: 0, y: 1 },
						},
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
									meta: {
										isRoot: false,
										isLeaf: true,
										abstractPosition: { x: 1, y: 2 },
									},
								},
							},
							{
								edgeData: {},
								node: {
									data: { v: 47 },
									meta: {
										isRoot: false,
										isLeaf: true,
										abstractPosition: { x: 2, y: 2 },
									},
								},
							},
						],
						meta: {
							isRoot: false,
							isLeaf: false,
							abstractPosition: { x: 1, y: 1 },
						},
					},
				},
			],
			meta: {
				isRoot: true,
				isLeaf: false,
				abstractPosition: { x: 0, y: 0 },
			},
		})
	})
})
