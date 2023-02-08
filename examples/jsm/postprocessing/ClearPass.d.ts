import { ColorRepresentation } from '../../../three/three-core/Three';

import { Pass } from './Pass';

export class ClearPass extends Pass {
	constructor(clearColor?: ColorRepresentation, clearAlpha?: number);
	clearColor: ColorRepresentation;
	clearAlpha: number;
}
