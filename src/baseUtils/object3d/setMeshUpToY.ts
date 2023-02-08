import { Matrix4, Vector3, Mesh } from '../../../three';

export default function setMeshUpToY(mesh: Mesh): void {
	mesh.applyMatrix4(
		new Matrix4().makeRotationAxis(new Vector3(1, 0, 0), -Math.PI / 2)
	);
}
