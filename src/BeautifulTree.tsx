import type { Tree } from './types'
import { computeLeftShiftLayout } from './layouts'
import { postOrderIterator } from './traversal'

export interface BeautifulTreeProps {
	readonly id: string
	readonly svgProps: {
		readonly width: number
		readonly height: number
		readonly sizeUnit?: '%' | 'em' | 'px' | 'rem'
	}
	readonly tree: Tree
}

export function BeautifulTree({
	id,
	svgProps,
	tree,
}: Readonly<BeautifulTreeProps>): JSX.Element {
	const { tree: treeWithLayout, maxX, maxY } = computeLeftShiftLayout(tree)
	const orderedNodes = [...postOrderIterator(treeWithLayout)]

	const { width, height, sizeUnit = 'px' } = svgProps

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
			{orderedNodes.map((node, idx) => {
				const aX = node.meta.abstractPosition.x
				const aY = node.meta.abstractPosition.y
				return (
					<circle
						key={`${id}-node-${idx}`}
						className={'beautiful-tree-node'}
						cx={((aX + 1) * width) / (maxX + 2)}
						cy={((aY + 1) * height) / (maxY + 2)}
						stroke="black"
						fill="white"
						r="5"
					/>
				)
			})}
		</svg>
	)
}
