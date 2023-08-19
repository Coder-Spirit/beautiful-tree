import { describe, expect, it } from 'vitest'
import { edgesIterator, postOrderIterator } from '../traversal'
import type { TreeWithLayout } from '../types'

describe('postOrderIterator', () => {
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

	it('traverses tree in post-order', () => {
		const result = postOrderIterator(testTree)
		const expandedResult = [...result]

		expect(expandedResult).toEqual([
			{ data: { v: 45 } },
			{ data: { v: 43 } },
			{ data: { v: 46 } },
			{ data: { v: 47 } },
			{ data: { v: 44 } },
			{ data: { v: 42 } },
		])
	})
})

describe('edgesIterator', () => {
	const testTree: TreeWithLayout = {
		data: { v: 42 },
		children: [
			{
				edgeData: { e: 100 },
				node: {
					data: { v: 43 },
					children: [
						{
							edgeData: { e: 102 },
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
				edgeData: { e: 101 },
				node: {
					data: { v: 44 },
					children: [
						{
							edgeData: { e: 103 },
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
							edgeData: { e: 104 },
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
	}

	it('traverses edges in pre-order', () => {
		const result = edgesIterator(testTree)
		const expandedResult = [...result]

		expect(expandedResult).toEqual([
			{ start: { x: 0, y: 0 }, end: { x: 0, y: 1 }, edgeData: { e: 100 } },
			{ start: { x: 0, y: 1 }, end: { x: 0, y: 2 }, edgeData: { e: 102 } },
			{ start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, edgeData: { e: 101 } },
			{ start: { x: 1, y: 1 }, end: { x: 1, y: 2 }, edgeData: { e: 103 } },
			{ start: { x: 1, y: 1 }, end: { x: 2, y: 2 }, edgeData: { e: 104 } },
		])
	})
})
