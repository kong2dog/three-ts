import { Object3D, Box3 } from '../../../three';

// 根据 Object3D 获取包围盒对象 Box3
export default function getBoundingBoxByObject3D(object: Object3D): Box3 {
	return new Box3().setFromObject(object);
}
