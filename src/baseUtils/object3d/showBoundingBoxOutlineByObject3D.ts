import {
	Object3D,
	Scene,
	Vector3,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
} from '../../../three';
import getBoundingBoxByObject3D from './getBoundingBoxByObject3D';

// 展示实体包围盒

export default function showBoundingBoxOutlineByObject3D(
	object: Object3D,
	scene: Scene
): void {
	const boundingBox: THREE.Box3 = getBoundingBoxByObject3D(object);
	const geometrySize = new Vector3(),
		geometryCenter = new Vector3();
	boundingBox.getSize(geometrySize);
	boundingBox.getCenter(geometrySize);
	const geometry = new BoxGeometry(
		geometrySize.x,
		geometrySize.y,
		geometrySize.z
	);

	geometry.translate(geometryCenter.x, geometryCenter.y, geometryCenter.z);
	const material = new MeshBasicMaterial({
		color: 0xff0000,
		transparent: true,
		// 设置材质透明度
		opacity: 0.4,
	});

	const cube = new Mesh(geometry, material);
	scene.add(cube);
}
