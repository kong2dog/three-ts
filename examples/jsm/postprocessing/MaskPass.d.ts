import { Scene, Camera } from '../../../three/three-core/Three';

import { Pass } from './Pass';

export class MaskPass extends Pass {
	constructor(scene: Scene, camera: Camera);
	scene: Scene;
	camera: Camera;
	inverse: boolean;
}

export class ClearMaskPass extends Pass {
	constructor();
}
