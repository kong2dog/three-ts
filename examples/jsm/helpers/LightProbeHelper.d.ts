import { LightProbe, Mesh } from '../../../three/three-core/Three';

export class LightProbeHelper extends Mesh {
	constructor(lightProbe: LightProbe, size: number);

	lightProbe: LightProbe;
	size: number;

	dispose(): void;
}
