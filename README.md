# Beautiful-Tree

<p align="center">
<svg xmlns="http://www.w3.org/2000/svg" id="centered3-small-tree" viewBox="0 0 400 400" class="beautiful-tree-react" style="width: 300px; height: 300px;"><style>line{stroke:green;}
					circle,rect{stroke:green;fill:white;}
					div.beautiful-tree-node-content{margin:0;height:100%;width:100%;text-align:center;line-height:50px;font-size:25px;}</style><line class="beautiful-tree-edge" x1="175" y1="100" x2="100" y2="200"></line><line class="beautiful-tree-edge" x1="100" y1="200" x2="100" y2="300"></line><line class="beautiful-tree-edge" x1="175" y1="100" x2="250" y2="200"></line><line class="beautiful-tree-edge" x1="250" y1="200" x2="200" y2="300"></line><line class="beautiful-tree-edge" x1="250" y1="200" x2="300" y2="300"></line><circle class="beautiful-tree-node beautiful-tree-leaf" cx="100" cy="300" r="25"></circle><foreignObject x="75" y="275" width="50" height="50"><div class="beautiful-tree-node-content beautiful-tree-leaf">C</div></foreignObject><circle class="beautiful-tree-node" cx="100" cy="200" r="25"></circle><foreignObject x="75" y="175" width="50" height="50"><div class="beautiful-tree-node-content">B</div></foreignObject><circle class="beautiful-tree-node beautiful-tree-leaf" cx="200" cy="300" r="25"></circle><foreignObject x="175" y="275" width="50" height="50"><div class="beautiful-tree-node-content beautiful-tree-leaf">E</div></foreignObject><circle class="beautiful-tree-node beautiful-tree-leaf" cx="300" cy="300" r="25"></circle><foreignObject x="275" y="275" width="50" height="50"><div class="beautiful-tree-node-content beautiful-tree-leaf">F</div></foreignObject><circle class="beautiful-tree-node" cx="250" cy="200" r="25"></circle><foreignObject x="225" y="175" width="50" height="50"><div class="beautiful-tree-node-content">D</div></foreignObject><circle class="beautiful-tree-node beautiful-tree-root" cx="175" cy="100" r="25"></circle><foreignObject x="150" y="75" width="50" height="50"><div class="beautiful-tree-node-content beautiful-tree-root">A</div></foreignObject></svg>
</p>

Beautiful-Tree is a lightweight & flexible library to draw trees as SVG images.

Some of its hightlights:
- It is compatible with ESM, CJS, UMD and IIFE
- Very lightweight (3.9Kb in its minimised ESM form, and 4.2Kb in its UMD form)
- The generated trees can be styled with CSS

## Install

```bash
# With NPM
npm install @beautiful-tree/react

# With Yarn
yarn add @beautiful-tree/react

# With PNPM
pnpm add @beautiful-tree/react
```

## Basic Usage

```jsx
import { BeautifulTree } from '@beautiful-tree/react'

const tree = {
	data: { v: 'A' },
	children: [
		{
			node: {
				/* node data can contain any kews we want */
				data: { v: 'B' },
				children: [
					{
						/* we can annotate edges with arbitrary metadata */
						eData: { e: 0.5 },
						node: { data: { v: 'C' } }
					},
				],
			},
		},
		{
			node: {
				data: { v: 'D' },
				children: [
					{ node: { data: { v: 'E' } } },
					{ node: { data: { v: 'F' } } },
				],
			},
		},
	],
}

// The 3 main properties that we must always set are:
// - `id`: the id for the tree component
// - `tree:`` the tree data structure that will be rendered
// - `svgProps``: the proportions of the SVG "canvas".
render(
	<BeautifulTree
			id={'my-tree'}
			tree={tree}
			svgProps={{
					width: 400,
					height: 400,
					// sizeUnit?: '%' | 'em' | 'px' | 'rem'
			}}
	/>
)
```

## Exposed CSS classes

- `beautiful-tree-react`: applies to the rendered SVG element.
- `beautiful-tree-edge`: applies to all the rendered edges inside the SVG
  element.
- `beautiful-tree-node`: applies to all the rendered nodes inside the SVG
  element.
- `beautiful-tree-root`: applies only to the rendered _root_ node.
- `beautiful-tree-leaf`: applies to all the rendered _leaf_ nodes inside the SVG
  element.
- `beautiful-tree-node-content`: applies to all the `<div>` elements rendered
  inside nodes when using the [`getNodeContent`](#getnodecontent) prop.

## Other component props

We won't go into very deep details because TypeScript's autocomplete is enough
to discover the aspects not mentioned here.

### `nodeShape`

Accepted values are `'circle'` and `'rect'`. It specifies which shape is used
to render the tree nodes.

### `getNodeShape`

In case we want the shape of each node to depend on their associated metadata,
we can pass a function that returns the desired shape for each individual node.

### `getNodeContent`

We can pass a function to read what's inside the `data` property of each node
and return either a `string` value or a `JSX.Element` object that will be
rendered inside the corresponding node.

### `computeLayout`

It specifies the function that is used to compute the tree layout.
- By default it uses `computeSmartLayout`.
- But we can also import a simpler layout `computeNaiveLayout`.

### `getNodeClass`

We can pass a function that takes each node object and returns a list of CSS
classes that will be applied to it. This is useful if we want to make node
styles depend on their associated data.

### `getEdgeClass`

We can pass a function that takes edge metadata as input and returns a list of
CSS classes that will be applied to it. This is useful if we want to make edge
styles depend on their associated data.

### `hCoef`

This parameter, mostly useful for the case when node's shape is `'rect'`, allows
us to control the ratio aspect between height and width of a node. It must be
between `0` and `1`, ideally above `0.5`.

## Future Plans

- Introduce a layout algorithm for dendrograms (with leafs all at the bottom
  level, instead of being at the level inmediately below their parents).
- Introduce rotated versions of the tree layout (left-to-right, right-to-left,
  bottom-up)
- Allow to use different edge "styles" between nodes (now it's just straight
  lines): splines, segmented lines with corners...
- Release versions of this same library for other components systems, such as
  Vue, Svelte, Solidjs, and native Web Components.
