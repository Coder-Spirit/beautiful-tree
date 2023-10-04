import type { Edge, TreeWithLayout } from '@beautiful-tree/types'
import type { Orientation } from 'BeautifulTree'

export function coordinateCreators(
	orientation: Orientation,
	layoutProps: Readonly<{
		width: number
		height: number
		xCoef: number
		yCoef: number
		widthCenterShift: number
		heightCenterShift: number
	}>,
): {
	lineCoordinateCreator: (edge: Readonly<Edge>) => {
		x1: number
		y1: number
		x2: number
		y2: number
	}
	rectCoordinateCreator: (nm: TreeWithLayout['meta']) => {
		x: number
		y: number
	}
	circleCoordinateCreator: (nm: TreeWithLayout['meta']) => {
		cx: number
		cy: number
	}
} {
	const { width, height, xCoef, yCoef, widthCenterShift, heightCenterShift } =
		layoutProps
	return {
		lineCoordinateCreator: function (edge: Readonly<Edge>): {
			x1: number
			y1: number
			x2: number
			y2: number
		} {
			switch (orientation) {
				case 'D-T': {
					return {
						x1: (edge.start.x + 1) * xCoef,
						y1: height - (edge.start.y + 1) * yCoef,
						x2: (edge.end.x + 1) * xCoef,
						y2: height - (edge.end.y + 1) * yCoef,
					}
				}
				case 'L-R': {
					return {
						x1: (edge.start.y + 1) * yCoef,
						y1: height - (edge.start.x + 1) * xCoef,
						x2: (edge.end.y + 1) * yCoef,
						y2: height - (edge.end.x + 1) * xCoef,
					}
				}
				case 'R-L': {
					return {
						x1: width - (edge.start.y + 1) * yCoef,
						y1: height - (edge.start.x + 1) * xCoef,
						x2: width - (edge.end.y + 1) * yCoef,
						y2: height - (edge.end.x + 1) * xCoef,
					}
				}
				case 'T-D': {
					return {
						x1: (edge.start.x + 1) * xCoef,
						y1: (edge.start.y + 1) * yCoef,
						x2: (edge.end.x + 1) * xCoef,
						y2: (edge.end.y + 1) * yCoef,
					}
				}
			}
		},
		rectCoordinateCreator: function (nm: TreeWithLayout['meta']): {
			x: number
			y: number
		} {
			switch (orientation) {
				case 'D-T': {
					return {
						x: (nm.pos.x + 1) * xCoef - widthCenterShift,
						y: height - (nm.pos.y + 1) * yCoef - heightCenterShift,
					}
				}
				case 'L-R': {
					return {
						x: (nm.pos.y + 1) * yCoef - heightCenterShift,
						y: height - (nm.pos.x + 1) * xCoef - widthCenterShift,
					}
				}
				case 'R-L': {
					return {
						x: width - (nm.pos.y + 1) * yCoef - heightCenterShift,
						y: height - (nm.pos.x + 1) * xCoef - widthCenterShift,
					}
				}
				case 'T-D': {
					return {
						x: (nm.pos.x + 1) * xCoef - widthCenterShift,
						y: (nm.pos.y + 1) * yCoef - heightCenterShift,
					}
				}
			}
		},
		circleCoordinateCreator: function (nm: TreeWithLayout['meta']): {
			cx: number
			cy: number
		} {
			switch (orientation) {
				case 'D-T': {
					return {
						cx: (nm.pos.x + 1) * xCoef,
						cy: height - (nm.pos.y + 1) * yCoef,
					}
				}
				case 'L-R': {
					return {
						cx: (nm.pos.y + 1) * yCoef,
						cy: height - (nm.pos.x + 1) * xCoef,
					}
				}
				case 'R-L': {
					return {
						cx: width - (nm.pos.y + 1) * yCoef,
						cy: height - (nm.pos.x + 1) * xCoef,
					}
				}
				case 'T-D': {
					return {
						cx: (nm.pos.x + 1) * xCoef,
						cy: (nm.pos.y + 1) * yCoef,
					}
				}
			}
		},
	}
}

export function computeAxesCoefAndNodeDimension(
	orientation: Orientation,
	layoutProps: Readonly<{
		width: number
		height: number
		hCoef: number
		mX: number
		mY: number
	}>,
): {
	xCoef: number
	yCoef: number
	maxNodeHeight: number
	maxNodeWidth: number
} {
	const { width, height, hCoef, mX, mY } = layoutProps
	let xCoef: number, yCoef: number, maxNodeHeight: number, maxNodeWidth: number
	if (orientation === 'L-R' || orientation === 'R-L') {
		xCoef = height / (mY + 2)
		yCoef = width / (mX + 2)
		maxNodeWidth = yCoef * 0.5
		maxNodeHeight = Math.min(xCoef * 0.5, maxNodeWidth * hCoef)
	} else {
		xCoef = width / (mX + 2)
		yCoef = height / (mY + 2)
		maxNodeWidth = xCoef * 0.5
		maxNodeHeight = Math.min(yCoef * 0.5, maxNodeWidth * hCoef)
	}
	return {
		xCoef,
		yCoef,
		maxNodeHeight,
		maxNodeWidth,
	}
}
