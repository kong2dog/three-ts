import { collisionRect } from '~/index';
/**
 * 防碰撞算法
 * @param {Object} rectA 矩形a
 * @param {Object} rectB 矩形b
 * @returns Boolean
 */
export default function rectCollisionCheck(
	rectA: collisionRect,
	rectB: collisionRect
): boolean {
	return (
		(rectA.maxX - rectB.minX) * (rectB.maxX - rectA.minX) > 0 &&
		(rectA.maxY - rectB.minY) * (rectB.maxY - rectA.minY) > 0
	);
}
