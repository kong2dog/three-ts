import {
	Mesh,
	BufferGeometry,
	ColorRepresentation,
	TextureEncoding,
	WebGLRenderTarget,
} from '../../../three/three-core/Three';

export interface ReflectorOptions {
	color?: ColorRepresentation;
	textureWidth?: number;
	textureHeight?: number;
	clipBias?: number;
	shader?: object;
	encoding?: TextureEncoding;
}

export class Reflector extends Mesh {
	constructor(geometry?: BufferGeometry, options?: ReflectorOptions);

	getRenderTarget(): WebGLRenderTarget;
}
