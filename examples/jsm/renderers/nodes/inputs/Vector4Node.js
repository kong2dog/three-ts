import InputNode from '../core/InputNode.js';
import { Vector4 } from '../../../../../three/three-core/Three.js';

class Vector4Node extends InputNode {
	constructor(value = new Vector4()) {
		super('vec4');

		this.value = value;
	}
}

Vector4Node.prototype.isVector4Node = true;

export default Vector4Node;
