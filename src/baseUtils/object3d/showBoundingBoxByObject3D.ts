import { Scene, Object3D, Box3Helper } from '../../../three';
import getBoundingBoxByObject3D from './getBoundingBoxByObject3D';

export default function showBoundingBoxByObject3D(
	object: Object3D,
	scene: Scene
) {
	// 根据 Object3D 获取包围盒对象 Box3 并模拟展示
	const boundingBox = getBoundingBoxByObject3D(object);
	const helper = new Box3Helper(boundingBox, 0xff0000);
	scene.add(helper);
}
