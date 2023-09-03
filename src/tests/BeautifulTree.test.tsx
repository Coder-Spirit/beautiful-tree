import {
	BeautifulTree,
	computeNaiveLayout,
	computeSmartLayout,
} from '../BeautifulTree'
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
} from '../stories/treeFixtures'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

describe('BeautifulTree : Naive Layout', () => {
	it('renders left-shifted small tree', () => {
		const rendered = render(
			<BeautifulTree
				id="leftshifted-small-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={smallTree}
				computeLayout={computeNaiveLayout}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})

	it('renders left-shifted big tree', () => {
		const rendered = render(
			<BeautifulTree
				id="leftshifted-big-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={bigTree}
				computeLayout={computeNaiveLayout}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})
})

describe('BeautifulTree : Smart Layout', () => {
	it('renders small tree', () => {
		const rendered = render(
			<BeautifulTree
				id="smart-small-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={smallTree}
				computeLayout={computeSmartLayout}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})

	it('renders big tree', () => {
		const rendered = render(
			<BeautifulTree
				id="smart-big-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={bigTree}
				computeLayout={computeSmartLayout}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})

	it('renders wide tree A, with rect shape, node content display, and dynamic css classes', () => {
		const rendered = render(
			<BeautifulTree
				id="smart-wide-a-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={wideTree_A}
				computeLayout={computeSmartLayout}
				nodeShape="rect"
				getNodeContent={(data): string => data?.['v']?.toString() ?? ''}
				getNodeClass={getCssFromNodeData}
				getEdgeClass={getCssFromEdgeData}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})

	it('renders wide tree B, with rect shape, node content display, and dynamic css classes', () => {
		const rendered = render(
			<BeautifulTree
				id="smart-wide-b-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={wideTree_B}
				computeLayout={computeSmartLayout}
				nodeShape="rect"
				getNodeContent={(data): string => data?.['v']?.toString() ?? ''}
				getNodeClass={getCssFromNodeData}
				getEdgeClass={getCssFromEdgeData}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})

	it('renders wide tree Bm, with rect shape, node content display, and dynamic css classes', () => {
		const rendered = render(
			<BeautifulTree
				id="smart-wide-bm-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={wideTree_Bm}
				computeLayout={computeSmartLayout}
				nodeShape="rect"
				getNodeContent={(data): string => data?.['v']?.toString() ?? ''}
				getNodeClass={getCssFromNodeData}
				getEdgeClass={getCssFromEdgeData}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})

	it('renders wide tree C, with rect shape, node content display, and dynamic css classes', () => {
		const rendered = render(
			<BeautifulTree
				id="smart-wide-c-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={wideTree_C}
				computeLayout={computeSmartLayout}
				nodeShape="rect"
				getNodeContent={(data): string => data?.['v']?.toString() ?? ''}
				getNodeClass={getCssFromNodeData}
				getEdgeClass={getCssFromEdgeData}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})

	it('renders wide tree D, with rect shape, node content display, and dynamic css classes', () => {
		const rendered = render(
			<BeautifulTree
				id="smart-wide-d-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={wideTree_D}
				computeLayout={computeSmartLayout}
				nodeShape="rect"
				getNodeContent={(data): string => data?.['v']?.toString() ?? ''}
				getNodeClass={getCssFromNodeData}
				getEdgeClass={getCssFromEdgeData}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})

	it('renders wide tree E, with rect shape, node content display, and dynamic css classes', () => {
		const rendered = render(
			<BeautifulTree
				id="smart-wide-e-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={wideTree_E}
				computeLayout={computeSmartLayout}
				nodeShape="rect"
				getNodeContent={(data): string => data?.['v']?.toString() ?? ''}
				getNodeClass={getCssFromNodeData}
				getEdgeClass={getCssFromEdgeData}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})

	it('renders wide tree M, with rect shape, node content display, and dynamic css classes', () => {
		const rendered = render(
			<BeautifulTree
				id="smart-wide-m-tree"
				svgProps={{
					width: 400,
					height: 400,
				}}
				tree={wideTree_M}
				computeLayout={computeSmartLayout}
				nodeShape="rect"
				getNodeContent={(data): string => data?.['v']?.toString() ?? ''}
				getNodeClass={getCssFromNodeData}
				getEdgeClass={getCssFromEdgeData}
			/>,
		)

		expect(rendered).toMatchSnapshot()
	})
})
