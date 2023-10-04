import {
	computeSmartLayout,
	edgesIterator,
	postOrderIterator,
} from '@beautiful-tree/algorithms'
// eslint-disable-next-line sort-imports
import { computeAxesCoefAndNodeDimension, coordinateCreators } from './helper'
import { Fragment } from 'react'
import type { Tree } from '@beautiful-tree/types'
import type { WrappedTreeWithLayout } from '@beautiful-tree/algorithms'
export {
	computeNaiveLayout,
	computeSmartLayout,
} from '@beautiful-tree/algorithms'

export type CssClassesGetter = (
	data?: Readonly<Record<string, unknown>> | undefined,
) => string[]

export type NodeShapeGetter = (
	data?: Readonly<Record<string, unknown>> | undefined,
) => { type: 'circle' | 'rect' }

export type NodeContentGetter = (
	data?: Readonly<Record<string, unknown>> | undefined,
) => JSX.Element | string

export type Orientation = 'D-T' | 'L-R' | 'R-L' | 'T-D'

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
	readonly orientation?: Orientation
	readonly computeLayout?:
		| ((tree: Readonly<Tree>) => Readonly<WrappedTreeWithLayout>)
		| undefined
	readonly getNodeClass?: CssClassesGetter | undefined
	readonly getNodeShape?: NodeShapeGetter | undefined
	readonly getNodeContent?: NodeContentGetter | undefined
	readonly getEdgeClass?: CssClassesGetter | undefined
}

declare module 'react' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLAttributes<T> {
		xmlns?: string
	}
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
	orientation = 'T-D',
	computeLayout,
	getNodeClass,
	getNodeShape,
	getNodeContent,
	getEdgeClass,
}: Readonly<BeautifulTreeProps>): JSX.Element {
	computeLayout ??= computeSmartLayout

	const { tree: treeWithLayout, mX, mY } = computeLayout(tree)
	const { width, height, sizeUnit = 'px' } = svgProps

	const { xCoef, yCoef, maxNodeHeight, maxNodeWidth } =
		computeAxesCoefAndNodeDimension(orientation, {
			width,
			height,
			hCoef,
			mX,
			mY,
		})

	const widthCenterShift = maxNodeWidth * 0.5
	const heightCenterShift = maxNodeHeight * 0.5
	const maxNodeRadius = maxNodeHeight * 0.5

	const {
		circleCoordinateCreator,
		lineCoordinateCreator,
		rectCoordinateCreator,
	} = coordinateCreators(orientation, {
		width,
		height,
		xCoef,
		yCoef,
		heightCenterShift,
		widthCenterShift,
	})

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
						{...lineCoordinateCreator(edge)}
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
								{...rectCoordinateCreator(nm)}
								width={maxNodeWidth}
								height={maxNodeHeight}
							/>
						) : (
							<circle
								key={`${id}-node-c-${idx}`}
								className={`beautiful-tree-node${_nodeClass}`}
								{...circleCoordinateCreator(nm)}
								r={maxNodeRadius}
							/>
						)}
						{getNodeContent ? (
							<foreignObject
								key={`${id}-node-fo-${idx}`}
								{...rectCoordinateCreator(nm)}
								width={maxNodeWidth}
								height={maxNodeHeight}
							>
								<div
									key={`${id}-node-div-${idx}`}
									className={`beautiful-tree-node-content${_nodeClass}`}
									xmlns="http://www.w3.org/1999/xhtml"
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
