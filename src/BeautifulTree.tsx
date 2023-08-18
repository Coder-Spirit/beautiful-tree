import { edgesIterator, postOrderIterator } from './traversal'
import type { Tree } from './types'
import type { WrappedTreeWithLayout } from './layouts'
import { computeLeftShiftLayout } from './layouts'

export interface BeautifulTreeProps {
	readonly id: string
	readonly svgProps: {
		readonly width: number
		readonly height: number
		readonly sizeUnit?: '%' | 'em' | 'px' | 'rem'
	}
	readonly tree: Tree
	readonly computeLayout?: (
		tree: Readonly<Tree>,
	) => Readonly<WrappedTreeWithLayout>
}

export function BeautifulTree({
	id,
	svgProps,
	tree,
	computeLayout = computeLeftShiftLayout,
}: Readonly<BeautifulTreeProps>): JSX.Element {
	const { tree: treeWithLayout, maxX, maxY } = computeLayout(tree)
	const { width, height, sizeUnit = 'px' } = svgProps

	const xDivisor = maxX + 2
	const yDivisor = maxY + 2

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id={id}
			viewBox={`0 0 ${width} ${height}`}
			style={{
				width: `${width}${sizeUnit}`,
				height: `${height}${sizeUnit}`,
			}}
			className={'beautiful-tree-react'}
		>
			<style>{`
				line { stroke: black; }
				circle { stroke: black; fill: white; }
			`}</style>
			{/* TODO: introduce edge "styles" (straight, cornered, curved..., plus CSS styles) */}
			{[...edgesIterator(treeWithLayout)].map((edge, idx) => {
				return (
					<line
						key={`${id}-edge-${idx}`}
						x1={((edge.start.x + 1) * width) / xDivisor}
						y1={((edge.start.y + 1) * height) / yDivisor}
						x2={((edge.end.x + 1) * width) / xDivisor}
						y2={((edge.end.y + 1) * height) / yDivisor}
					/>
				)
			})}
			{[...postOrderIterator(treeWithLayout)].map((node, idx) => {
				const aX = node.meta.abstractPosition.x
				const aY = node.meta.abstractPosition.y
				return (
					<circle
						key={`${id}-node-${idx}`}
						className={'beautiful-tree-node'}
						cx={((aX + 1) * width) / xDivisor}
						cy={((aY + 1) * height) / yDivisor}
						r="5"
					/>
				)
			})}
		</svg>
	)
}
