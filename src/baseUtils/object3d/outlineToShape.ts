import { Shape, Path } from '../../../three';
import { MM2FOOT } from '../constants';
import { outLinePoint } from '../../types';
export default function outlineToShape(
	outline: Array<Array<Array<outLinePoint>>>
): Shape[] | undefined {
	if (outline === undefined || outline.length <= 0) return undefined;
	const shapes: Shape[] = [];
	outline.forEach((block: outLinePoint[][]) => {
		if (block.length > 0) {
			shapes.push(blockParseToShape(block));
		}
	});
	return shapes;
}

function blockParseToShape(block: Array<Array<outLinePoint>>): Shape {
	const shape = new Shape();
	const border = block[0]; // 边框数据
	for (let i = 0; i < border.length; i++) {
		const item = border[i];
		if (i === 0) {
			shape.moveTo(item.X * MM2FOOT, item.Y * MM2FOOT);
		} else {
			shape.lineTo(item.X * MM2FOOT, item.Y * MM2FOOT);
		}
	}
	const holesData = block.filter((da, i) => i > 0); // 挖孔数据
	for (let i = 0; i < holesData.length; i++) {
		const hole = holesData[i];
		const holePath = new Path();
		for (let j = 0; j < hole.length; j++) {
			const item = hole[j];
			if (j === 0) {
				holePath.moveTo(item.X * MM2FOOT, item.Y * MM2FOOT);
			} else {
				holePath.lineTo(item.X * MM2FOOT, item.Y * MM2FOOT);
			}
		}
		shape.holes.push(holePath);
	}

	shape.autoClose = true;

	return shape;
}
