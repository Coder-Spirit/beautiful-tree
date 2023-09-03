import { edgesIterator, postOrderIterator } from './traversal'
import { Fragment } from 'react'
import type { Tree } from './types'
import type { WrappedTreeWithLayout } from './layouts'
import { computeSmartLayout } from './layouts'
export { computeNaiveLayout, computeSmartLayout } from './layouts'

export type CssClassesGetter = (
	data?: Readonly<Record<string, unknown>> | undefined,
) => string[]

export type NodeShapeGetter = (
	data?: Readonly<Record<string, unknown>> | undefined,
) => { type: 'circle' | 'rect' }

export type NodeContentGetter = (
	data?: Readonly<Record<string, unknown>> | undefined,
) => JSX.Element | string

export interface BeautifulTreeProps {
	readonly id: string
	readonly svgProps: {
		readonly width: number
		readonly height: number
		readonly sizeUnit?: '%' | 'em' | 'px' | 'rem'
	}
	readonly nodeShape?: 'circle' | 'rect'
	readonly hCoef?: number
	readonly tree: Tree
	readonly computeLayout: (
		tree: Readonly<Tree>,
	) => Readonly<WrappedTreeWithLayout>
	readonly getNodeClass?: CssClassesGetter | undefined
	readonly getNodeShape?: NodeShapeGetter | undefined
	readonly getNodeContent?: NodeContentGetter | undefined
	readonly getEdgeClass?: CssClassesGetter | undefined
}

function runClassesGetter(
	classesGetter?: CssClassesGetter | undefined,
	data?: Readonly<Record<string, unknown>> | undefined,
): string {
	const cssClasses = classesGetter?.(data) ?? []
	return cssClasses.length === 0 ? '' : ` ${cssClasses.join(' ')}`
}

export function BeautifulTree({
	id,
	svgProps,
	nodeShape,
	hCoef = 1,
	tree,
	computeLayout = computeSmartLayout,
	getNodeClass,
	getNodeShape,
	getNodeContent,
	getEdgeClass,
}: Readonly<BeautifulTreeProps>): JSX.Element {
	const { tree: treeWithLayout, mX, mY } = computeLayout(tree)
	const { width, height, sizeUnit = 'px' } = svgProps

	const xCoef = width / (mX + 2)
	const yCoef = height / (mY + 2)
	const maxNodeWidth = xCoef * 0.5
	const maxNodeHeight = Math.min(yCoef * 0.5, maxNodeWidth * hCoef)
	const widthCenterShift = maxNodeWidth * 0.5
	const heightCenterShift = maxNodeHeight * 0.5
	const maxNodeRadius = maxNodeHeight * 0.5

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
			<style>
				{`line{stroke:black;}
					circle,rect{stroke:black;fill:white;}
					div.beautiful-tree-node-content{margin:0;height:100%;width:100%;text-align:center;line-height:${maxNodeHeight}${sizeUnit};font-size:${
						maxNodeHeight * 0.5
					}${sizeUnit};}`}
			</style>
			{Array.from(edgesIterator(treeWithLayout), (edge, idx) => {
				return (
					<line
						key={`${id}-edge-${idx}`}
						className={`beautiful-tree-edge${runClassesGetter(
							getEdgeClass,
							edge.eData,
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

				const _nodeShape = getNodeShape?.(node.data) ?? nodeShape ?? 'circle'
				const _nodeClass = `${nm.isRoot ? ' beautiful-tree-root' : ''}${
					nm.isLeaf ? ' beautiful-tree-leaf' : ''
				}${runClassesGetter(getNodeClass, node.data)}`

				return (
					<Fragment key={`${id}-node-w-${idx}`}>
						{_nodeShape === 'rect' ? (
							<rect
								key={`${id}-node-r-${idx}`}
								className={`beautiful-tree-node${
									nm.isRoot ? ' beautiful-tree-root' : ''
								}${nm.isLeaf ? ' beautiful-tree-leaf' : ''}${runClassesGetter(
									getNodeClass,
									node.data,
								)}`}
								x={(nm.pos.x + 1) * xCoef - widthCenterShift}
								y={(nm.pos.y + 1) * yCoef - heightCenterShift}
								width={maxNodeWidth}
								height={maxNodeHeight}
							/>
						) : (
							<circle
								key={`${id}-node-c-${idx}`}
								className={`beautiful-tree-node${_nodeClass}`}
								cx={(nm.pos.x + 1) * xCoef}
								cy={(nm.pos.y + 1) * yCoef}
								r={maxNodeRadius}
							/>
						)}
						{getNodeContent ? (
							<foreignObject
								key={`${id}-node-fo-${idx}`}
								x={(nm.pos.x + 1) * xCoef - widthCenterShift}
								y={(nm.pos.y + 1) * yCoef - heightCenterShift}
								width={maxNodeWidth}
								height={maxNodeHeight}
							>
								<div
									key={`${id}-node-div-${idx}`}
									className={`beautiful-tree-node-content${_nodeClass}`}
								>
									{getNodeContent(node.data)}
								</div>
							</foreignObject>
						) : undefined}
					</Fragment>
				)
			})}
		</svg>
	)
}
