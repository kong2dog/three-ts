import { Object3D, Vector3 } from '../../../three';
import getBoundingBoxByObject3D from './getBoundingBoxByObject3D';

// 获取 Object3D 对象的中心点
export default function getCenterByObject3D(object: Object3D): Vector3 {
	const v = new Vector3();
	getBoundingBoxByObject3D(object).getCenter(v);
	return v;
}
