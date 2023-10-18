export function calcCircleRadiusByTextLength(ctx, text) {
	let padding = 2;
	const textWidth = ctx.measureText(text).width;
	if (textWidth < 10) padding += 8;
	return textWidth + padding;
}

export function drawLine(
	ctx,
	x1,
	y1,
	x2,
	y2,
	styles = { strokeStyle: "black", lineWidth: 1 },
) {
	// set styles
	ctx.strokeStyle = styles.strokeStyle;
	ctx.lineWidth = styles.lineWidth;

	// draw
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
}

export function drawCircle(
	ctx,
	x,
	y,
	radius,
	textContent = null,
	styles = {
		strokeStyle: "black",
		lineWidth: "1",
		font: "16px sans-serif",
		textAlign: "center",
		textBaseline: "middle",
	},
) {
	// set styles
	ctx.strokeStyle = styles.strokeStyle;
	ctx.lineWidth = styles.lineWidth;

	// draw
	ctx.moveTo(x, y);
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();

	if (textContent) {
		// set styles
		ctx.font = styles.font;
		ctx.textAlign = styles.textAlign;
		ctx.textBaseline = styles.textBaseline;
		// fill text
		ctx.strokeText(textContent, x, y);
	}
}
