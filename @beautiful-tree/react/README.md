# Beautiful-Tree

<p align="center">
<img
  src="https://raw.githubusercontent.com/Coder-Spirit/beautiful-tree/main/docs/example1.svg"
	style="height:300px;width:300px;"
	alt="Tree rendered with BeautifulTree"
/>
</p>

Beautiful-Tree is a lightweight & flexible library to draw trees as SVG images.

Some of its hightlights:
- It is compatible with ESM, CJS, UMD and IIFE
- Very lightweight (3.9Kb in its minimised ESM form, and 4.2Kb in its UMD form)
- The generated trees can be styled with CSS


[![NPM version (beautiful-tree)](https://img.shields.io/npm/v/@beautiful-tree/react.svg?style=flat)](https://www.npmjs.com/package/@beautiful-tree/react)
[![TypeScript (beautiful-tree)](https://badgen.net/npm/types/@beautiful-tree/react)](http://www.typescriptlang.org/)
[![License (beautiful-tree)](https://badgen.net/npm/license/@beautiful-tree/react)](https://opensource.org/licenses/MIT)
[![npm downloads (beautiful-tree)](https://img.shields.io/npm/dm/@beautiful-tree/react.svg?style=flat)](https://www.npmjs.com/package/@beautiful-tree/react)
[![Known Vulnerabilities (beautiful-tree)](https://snyk.io//test/github/Coder-Spirit/nominal/badge.svg?targetFile=package.json)](https://snyk.io//test/github/Coder-Spirit/nominal?targetFile=package.json)
[![Security Score (beautiful-tree)](https://snyk-widget.herokuapp.com/badge/npm/@beautiful-tree%2Freact/badge.svg)](https://snyk.io/advisor/npm-package/@beautiful-tree/react)
## Other members of the family

This is the "React variant" of the BeautifulTree library. If you are looking
for integration with other technologies such as Vue, check the
[main README.md](https://github.com/Coder-Spirit/beautiful-tree?tab=readme-ov-file#beautiful-tree)
file of the project's repository.

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
import { createRoot } from 'react-dom/client'
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

const domNode = document.getElementById('root');

// See https://react.dev/reference/react-dom/client/createRoot
const root = createRoot(domNode);

// The 3 main properties that we must always set are:
// - `id`: the id for the tree component
// - `tree:`` the tree data structure that will be rendered
// - `svgProps``: the proportions of the SVG "canvas".
root.render(
  <BeautifulTree
      id={'my-tree'}
      tree={tree}
      svgProps={{
          width: 400,
          height: 400,
          // sizeUnit?: '%' | 'em' | 'px' | 'rem'
      }}

      // Optional:
      // In case we want to show anything inside the tree nodes, we need to
      // pass a lambda.
      getNodeContent={(data) => data?.['v']?.toString() ?? ''}
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
