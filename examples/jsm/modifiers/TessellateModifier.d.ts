import { BufferGeometry } from '../../../three/three-core/Three';

export class TessellateModifier {
	constructor(maxEdgeLength?: number, maxIterations?: number);
	maxEdgeLength: number;
	maxIterations: number;

	modify<TGeometry extends BufferGeometry>(geometry: TGeometry): TGeometry;
}
