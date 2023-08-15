import type { Tree } from './types'
import { computeLeftShiftLayout } from './layouts'
import { postOrderIterator } from './traversal'

export interface BeautifulTreeProps {
	readonly id: string
	readonly svgProps: {
		readonly width: number
		readonly height: number
	}
	readonly tree: Tree
}

export function BeautifulTree(
	props: Readonly<BeautifulTreeProps>,
): JSX.Element {
	const treeWithLayout = computeLeftShiftLayout(props.tree)
	const orderedNodes = [...postOrderIterator(treeWithLayout)]

	let maxX = 0
	let maxY = 0
	for (const node of orderedNodes) {
		if (node.meta.abstractPosition.x > maxX) {
			maxX = node.meta.abstractPosition.x
		}
		if (node.meta.abstractPosition.y > maxY) {
			maxY = node.meta.abstractPosition.y
		}
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id={props.id}
			viewBox={`0 0 ${props.svgProps.width} ${props.svgProps.height}`}
			style={{
				width: `${props.svgProps.width}px`,
				height: `${props.svgProps.height}px`,
			}}
			className={'beautiful-tree-react'}
		>
			{orderedNodes.map((node, idx) => {
				const aX = node.meta.abstractPosition.x
				const aY = node.meta.abstractPosition.y
				return (
					<circle
						key={`${props.id}-node-${idx}`}
						cx={((aX + 1) * props.svgProps.width) / (maxX + 2)}
						cy={((aY + 1) * props.svgProps.height) / (maxY + 2)}
						stroke="blue"
						fill="purple"
						r="5"
					/>
				)
			})}
		</svg>
	)
}
