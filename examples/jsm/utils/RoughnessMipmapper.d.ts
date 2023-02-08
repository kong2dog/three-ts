import {
	WebGLRenderer,
	MeshStandardMaterial,
} from '../../../three/three-core/Three';

export class RoughnessMipmapper {
	constructor(renderer: WebGLRenderer);
	generateMipmaps(material: MeshStandardMaterial): void;
	dispose(): void;
}
