import type { Tree } from './core'

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
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id={props.id}
			viewBox={`0 0 ${props.svgProps.width} ${props.svgProps.height}`}
			className={'beautiful-tree-react'}
		></svg>
	)
}
