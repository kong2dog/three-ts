import InputNode from '../core/InputNode.js';
import { Color } from '../../../../../three/three-core/Three.js';

class ColorNode extends InputNode {
	constructor(value = new Color()) {
		super('color');

		this.value = value;
	}
}

ColorNode.prototype.isColorNode = true;

export default ColorNode;
