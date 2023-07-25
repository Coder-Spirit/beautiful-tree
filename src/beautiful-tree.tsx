export type Tree = {
    data: Record<string, unknown>,
    children: {
      edgeData: Record<string, unknown>,
      node: Tree
    }[]
}
  
export interface BeautifulTreeProps {
    tree: Tree    
}

export const BeautifulTree = (props: BeautifulTreeProps) => {
    console.log(props)
}
