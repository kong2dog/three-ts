import {
	Scene,
	Camera,
	ColorRepresentation,
} from '../../../three/three-core/Three';

import { SSAARenderPass } from './SSAARenderPass';

export class TAARenderPass extends SSAARenderPass {
	constructor(
		scene: Scene,
		camera: Camera,
		clearColor: ColorRepresentation,
		clearAlpha: number
	);
	accumulate: boolean;
}
