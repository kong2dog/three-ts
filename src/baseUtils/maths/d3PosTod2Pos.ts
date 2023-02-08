import { Vector2, Camera, Vector3 } from '../../../three';
/**
 * 将3维坐标转换为 2维像素坐标
 * @param {Vector3} d3Pos 3d世界中的坐标
 * @param {Camera} camera threejs 相机对象
 * @param {Number} canvasHalfWidth 画布宽度的一半
 * @param {Number} canvasHalfHeight 画布高度的一半
 * @returns {Vector2}
 */
export default function d3PosTod2Pos(
	d3Pos: Vector3,
	camera: Camera,
	canvasHalfWidth: number,
	canvasHalfHeight: number
): Vector2 | null {
	if (d3Pos) {
		const pos = d3Pos.clone();
		pos.project(camera);
		return new Vector2(
			Math.round(pos.x * canvasHalfWidth + canvasHalfWidth),
			Math.round(-pos.y * canvasHalfHeight + canvasHalfHeight)
		);
	}
	return null;
}
