/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-globals */
function hex(c: any) {
	let s = '0123456789abcdef',
		i = parseInt(c);
	if (i == 0 || isNaN(c)) {
		return '00';
	}
	i = Math.round(Math.min(Math.max(0, i), 255));
	// eslint-disable-next-line no-mixed-operators
	return s.charAt((i - (i % 16)) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex(rgb: Array<number>) {
	return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s: string) {
	return s.charAt(0) == '#' ? s.substring(1, 7) : s;
}

/* Convert a hex string to an RGB triplet */
function convertToRGB(hex: string) {
	const color = [];
	color[0] = parseInt(trim(hex).substring(0, 2), 16);
	color[1] = parseInt(trim(hex).substring(2, 4), 16);
	color[2] = parseInt(trim(hex).substring(4, 6), 16);
	return color;
}

export default function generateColor(
	colorStart: string,
	colorEnd: string,
	colorCount: number
): Array<string> {
	// The beginning of your gradient
	let start = convertToRGB(colorStart),
		// The end of your gradient
		end = convertToRGB(colorEnd),
		// The number of colors to compute
		len = colorCount,
		// Alpha blending amount
		alpha = 0.0,
		saida = [];

	for (let i = 0; i < len; i++) {
		const c = [];
		alpha += 1.0 / len;

		c[0] = start[0] * alpha + (1 - alpha) * end[0];
		c[1] = start[1] * alpha + (1 - alpha) * end[1];
		c[2] = start[2] * alpha + (1 - alpha) * end[2];

		saida.push(convertToHex(c));
	}

	return saida;
}
