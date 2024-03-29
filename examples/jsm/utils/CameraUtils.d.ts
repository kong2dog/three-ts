import { PerspectiveCamera, Vector3 } from '../../../three/three-core/Three.js';

export namespace CameraUtils {
	function frameCorners(
		camera: PerspectiveCamera,
		bottomLeftCorner: Vector3,
		bottomRightCorner: Vector3,
		topLeftCorner: Vector3,
		estimateViewFrustum?: boolean
	): void;
}
