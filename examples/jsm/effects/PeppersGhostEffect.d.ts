import { Camera, Scene, WebGLRenderer } from '../../../three/three-core/Three';

export class PeppersGhostEffect {
	constructor(renderer: WebGLRenderer);
	cameraDistance: number;
	reflectFromAbove: boolean;

	render(scene: Scene, camera: Camera): void;
	setSize(width: number, height: number): void;
}
