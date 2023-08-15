import { describe, expect, it } from 'vitest'
import { postOrderIterator } from '../traversal'

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

		console.log('result:')
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
