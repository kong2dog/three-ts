import { DataTexture, DataTexture3D } from '../../../three/three-core/Three';
import { ShaderPass } from './ShaderPass';

export interface LUTPassParameters {
	lut?: DataTexture | DataTexture3D;
	intensity?: number;
}

export class LUTPass extends ShaderPass {
	lut?: DataTexture | DataTexture3D;
	intensity?: number;
	constructor(params: LUTPassParameters);
}
