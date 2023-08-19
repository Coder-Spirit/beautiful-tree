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

	const xCoef = width / (maxX + 2)
	const yCoef = height / (maxY + 2)
	const maxNodeWidth = xCoef * 0.25
	const maxNodeHeight = yCoef * 0.25
	const maxNodeRadius = Math.min(maxNodeWidth, maxNodeHeight)

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
						className={'beautiful-tree-edge'}
						x1={(edge.start.x + 1) * xCoef}
						y1={(edge.start.y + 1) * yCoef}
						x2={(edge.end.x + 1) * xCoef}
						y2={(edge.end.y + 1) * yCoef}
					/>
				)
			})}
			{[...postOrderIterator(treeWithLayout)].map((node, idx) => {
				const aX = node.meta.abstractPosition.x
				const aY = node.meta.abstractPosition.y
				return (
					<circle
						key={`${id}-node-${idx}`}
						className={`beautiful-tree-node${
							node.meta.isRoot ? ' beautiful-tree-root' : ''
						}${node.meta.isLeaf ? ' beautiful-tree-leaf' : ''}`}
						cx={(aX + 1) * xCoef}
						cy={(aY + 1) * yCoef}
						r={maxNodeRadius}
					/>
				)
			})}
		</svg>
	)
}
