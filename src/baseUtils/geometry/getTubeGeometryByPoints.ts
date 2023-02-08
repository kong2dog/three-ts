import { Vector3, CatmullRomCurve3, TubeGeometry } from '../../../three';
import { MM2FOOT } from '../constants';
import { outLinePoint } from '../../types';

// 将3d 路径 解析成 管道缓冲几何体 TubeGeometry
export default function getTubeGeometryByPoints(
	points: Array<outLinePoint>,
	yHeight = 10
): TubeGeometry {
	const vector3s = [];
	if (points && points.length) {
		for (let j = 0; j < points.length; j++) {
			const item = points[j];
			vector3s.push(new Vector3(item.X * MM2FOOT, yHeight, -item.Y * MM2FOOT));
		}
	}
	const curve = new CatmullRomCurve3(vector3s);
	return new TubeGeometry(curve, 8, 0.35, 3, false);
}
