import { Vector3 } from '../../../three';
import { MM2FOOT } from '../constants';

// 从bimLocation 解析出空间3维坐标, 默认做了Y轴向上的转换处理
/**
 *
 * @param bimLocation 3维空间坐标 例如 '100,-10.5,200'
 * @param upToZ  Z轴向上
 * @returns
 */
export default function getD3PosByBimLocation(
	bimLocation = '',
	upToZ = false
): Vector3 | null {
	if (!bimLocation) return null;
	const location = bimLocation.split(',').map((point) => Number(point));
	if (upToZ) {
		// Z轴向上
		return new Vector3(
			location[0] * MM2FOOT,
			location[1] * MM2FOOT,
			-location[2] * MM2FOOT
		);
	}
	// Y轴向上
	return new Vector3(
		location[0] * MM2FOOT,
		location[2] * MM2FOOT,
		-location[1] * MM2FOOT
	);
}
