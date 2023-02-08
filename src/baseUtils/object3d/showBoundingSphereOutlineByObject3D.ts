import {
	SphereGeometry,
	MeshBasicMaterial,
	Mesh,
	Object3D,
	Scene,
} from '../../../three';
import getBoundingSphereByObject3D from './getBoundingSphereByObject3D';

// 展示实体包围球
export default function showBoundingSphereOutlineByObject3D(
	object: Object3D,
	scene: Scene
): void {
	const boundingSphere = getBoundingSphereByObject3D(object);
	const geometryCenter = boundingSphere.center;
	const geometry = new SphereGeometry(boundingSphere.radius, 32, 16);

	geometry.translate(geometryCenter.x, geometryCenter.y, geometryCenter.z);
	const material = new MeshBasicMaterial({
		color: 0xff0000,
		transparent: true,
		// 设置材质透明度
		opacity: 0.4,
	});

	const sphere = new Mesh(geometry, material);
	scene.add(sphere);
}
