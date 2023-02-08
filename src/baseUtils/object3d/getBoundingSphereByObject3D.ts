import { Sphere, Object3D } from '../../../three';
import getBoundingBoxByObject3D from './getBoundingBoxByObject3D';

// 根据 Object3D 获取包围球对象 Sphere
export default function getBoundingSphereByObject3D(object: Object3D): Sphere {
	return getBoundingBoxByObject3D(object).getBoundingSphere(new Sphere());
}
