import * as canvas from "./utils/canvas";

function calcOffsets(canvasEl, rootNode, scale) {
	const radius = canvas.calcCircleRadiusByTextLength(canvasEl.getContext("2d"), rootNode.data);
	const scaledX = rootNode.meta.pos.x*scale;
	const scaledY = rootNode.meta.pos.y*scale;
	return {
		x: canvasEl.width/2 - scaledX - radius,
		y: 2 * radius
	};
}

function treeRenderer(ctx, layoutNode, scale, offsets = { x: 0, y: 0 }) {
	if (!layoutNode) return;
	const node = layoutNode?.meta ? layoutNode : layoutNode.node;
	const x = node.meta.pos.x * scale + offsets.x;
	const y = node.meta.pos.y * scale + offsets.y;
	const radius = canvas.calcCircleRadiusByTextLength(ctx, node.data);
	canvas.drawCircle(ctx, x, y, radius, node.data);

	const hasChildren = node?.children?.length;
	if (hasChildren) {
		const childrens = node.children;
		for (const child of childrens) {
			canvas.drawLine(
				ctx,
				x,
				y + radius,
				child.node.meta.pos.x * scale + offsets.x,
				child.node.meta.pos.y * scale +
					offsets.y -
					canvas.calcCircleRadiusByTextLength(ctx, child.node.data),
			);
			treeRenderer(ctx, child, scale, offsets);
		}
	}
}

export class BeautifulTree {
	config = {
		canvasEl: null,
		ctx: null,
		scale: {
			canvas: 1, // for whole canvas
			layout: 1, // for tree layout
		},
		offsets: {
			x: 0, // with respect to canvas element origin
			y: 0, // with respect to canvas element origin
		},
		theme: null,
	};
	layout = null; // computed tree layout

	constructor(canvasEl, computedTreeLayout) {
		this.config.canvasEl = canvasEl;
		this.config.ctx = canvasEl.getContext("2d");
		this.layout = computedTreeLayout;
	}

	render() {
		// set tree offset
		this.config.offsets = calcOffsets(this.config.canvasEl, this.layout, this.config.scale.layout);

		this.clear();
		treeRenderer(
			this.config.ctx,
			this.layout,
			this.config.scale.layout,
			this.config.offsets,
		);
	}

	clear() {
		this.config.ctx.clearRect(
			0,
			0,
			this.config.canvasEl.width,
			this.config.canvasEl.height,
		);

		this.applyTheme();
	}

	applyTheme() {
		const el = this.config.canvasEl;
		const ctx = this.config.ctx;

		ctx.fillStyle = this.config.theme.canvasBgColor;
		ctx.fillRect(0, 0, el.width, el.height);
	}

	set theme(themeConfig) {
		this.config.theme = themeConfig;
		this.applyTheme();
	}

	set layoutScale(scale) {
		this.config.scale.layout = scale;
	}
}
