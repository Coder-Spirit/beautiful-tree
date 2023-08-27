import { edgesIterator, postOrderIterator } from './traversal'
import type { Tree } from './types'
import type { WrappedTreeWithLayout } from './layouts'
export { computeNaiveLayout, computeSmartLayout } from './layouts'

export type CssClassesGetter = (
	data?: Readonly<Record<string, unknown>> | undefined,
) => string[]

export interface BeautifulTreeProps {
	readonly id: string
	readonly svgProps: {
		readonly width: number
		readonly height: number
		readonly sizeUnit?: '%' | 'em' | 'px' | 'rem'
	}
	readonly tree: Tree
	readonly computeLayout: (
		tree: Readonly<Tree>,
	) => Readonly<WrappedTreeWithLayout>
	readonly getNodeClass?: CssClassesGetter | undefined
	readonly getEdgeClass?: CssClassesGetter | undefined
}

function runClassesGetter(
	classesGetter?: CssClassesGetter | undefined,
	data?: Readonly<Record<string, unknown>> | undefined,
): string {
	if (classesGetter === undefined) {
		return ''
	}
	const cssClasses = classesGetter(data)
	if (cssClasses.length === 0) {
		return ''
	}
	return ` ${cssClasses.join(' ')}`
}

export function BeautifulTree({
	id,
	svgProps,
	tree,
	computeLayout,
	getNodeClass: nodeClassesInferrer,
	getEdgeClass: edgeClassesInferrer,
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
			{Array.from(edgesIterator(treeWithLayout), (edge, idx) => {
				return (
					<line
						key={`${id}-edge-${idx}`}
						className={`beautiful-tree-edge${runClassesGetter(
							edgeClassesInferrer,
							edge.edgeData,
						)}`}
						x1={(edge.start.x + 1) * xCoef}
						y1={(edge.start.y + 1) * yCoef}
						x2={(edge.end.x + 1) * xCoef}
						y2={(edge.end.y + 1) * yCoef}
					/>
				)
			})}
			{Array.from(postOrderIterator(treeWithLayout), (node, idx) => {
				const nm = node.meta
				return (
					<circle
						key={`${id}-node-${idx}`}
						className={`beautiful-tree-node${
							nm.isRoot ? ' beautiful-tree-root' : ''
						}${nm.isLeaf ? ' beautiful-tree-leaf' : ''}${runClassesGetter(
							nodeClassesInferrer,
							node.data,
						)}`}
						cx={(nm.pos.x + 1) * xCoef}
						cy={(nm.pos.y + 1) * yCoef}
						r={maxNodeRadius}
					/>
				)
			})}
		</svg>
	)
}
