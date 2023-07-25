export type Tree = {
    data: Record<string, unknown>,
    children: {
      edgeData: Record<string, unknown>,
      node: Tree
    }[]
}
  
export interface BeautifulTreeProps {
    id: string,
    svgProps: {
        width: number,
        height: number,
    },
    tree: Tree,
}

export function BeautifulTree(props: BeautifulTreeProps) {
    return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
            id={props.id}
			viewBox={`0 0 ${props.svgProps.width} ${props.svgProps.height}`}
			className={'beautiful-tree-react'}
		></svg>
    )
}
