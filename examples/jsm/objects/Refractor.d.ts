import {
	Mesh,
	BufferGeometry,
	ColorRepresentation,
	TextureEncoding,
	WebGLRenderTarget,
} from '../../../three/three-core/Three';

export interface RefractorOptions {
	color?: ColorRepresentation;
	textureWidth?: number;
	textureHeight?: number;
	clipBias?: number;
	shader?: object;
	encoding?: TextureEncoding;
}

export class Refractor extends Mesh {
	constructor(geometry?: BufferGeometry, options?: RefractorOptions);

	getRenderTarget(): WebGLRenderTarget;
}
