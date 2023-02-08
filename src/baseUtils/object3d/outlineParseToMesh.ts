import { Mesh, ExtrudeBufferGeometry } from '../../../three';
import { outLinePoint } from '../../types';
import outlineToShape from './outlineToShape';

/**
 * 空间outline数据解析为Geometry
 * outline为三维数组，空间，块，边框，洞 [ [ [],[],[] ], [ [],[],[] ] ]
 */
export default function (
	outline: Array<Array<Array<outLinePoint>>>,
	floorHeight: number
): Mesh {
	if (outline === undefined || outline.length <= 0) {
		return new Mesh();
	}
	// 空间分为多个块
	const shapes = outlineToShape(outline);
	const geometry = new ExtrudeBufferGeometry(shapes, {
		steps: 1,
		depth: floorHeight,
		bevelEnabled: false,
	});
	const spaceMesh = new Mesh(geometry);
	return spaceMesh;
}
