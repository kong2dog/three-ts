## apm-3d utils 迁移说明

### 一，从apm-3d/src/utils.js 迁移过来的方法

| 方法名                              | 迁移状况                                                                          | 功能                                                   | 兼容方案                                       |
| ----------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| getBoundingBoxByObject3D            | 已迁移至:three-base/src/baseUtils/object3d/getBoundingBoxByObject3D.ts            | 获取mesh包围盒                                         | -                                              |
| getCenterByObject3D                 | 已迁移至:three-base/src/baseUtils/object3d/getCenterByObject3D.ts                 | 获取mesh的中心的                                       | -                                              |
| buildFlatSpace                      | 绝交迁移: 业务逻辑                                                                | --                                                     | 迁移至业务代码中                               |
| getAllUrlParams                     | 绝交迁移: 业务逻辑                                                                | --                                                     | 迁移至业务代码                                 |
| toggleObject3DVisible               | 绝交迁移: 没有迁移价值                                                            | --                                                     | 使用Mesh.visible 切换即可,没有必要抽成一个方法 |
| getBoundingSphereByObject3D         | 已迁移至:three-base/src/baseUtils/object3d/getBoundingSphereByObject3D.ts         | 获取mesh的包围球                                       |                                                |
| showBoundingBoxByObject3D           | 已迁移至:three-base/src/baseUtils/object3d/showBoundingBoxByObject3D.ts           | 显示Mesh包围盒                                         |                                                |
| showBoundingSphereOutlineByObject3D | 已迁移至:three-base/src/baseUtils/object3d/showBoundingSphereOutlineByObject3D.ts | 显示包围球线框                                         |                                                |
| showBoundingBoxOutlineByObject3D    | 已迁移至:three-base/src/baseUtils/object3d/showBoundingBoxOutlineByObject3D.ts    | 显示Mesh包围盒线框                                     |                                                |
| moveCameraByObject3D                | 已迁移至:three-base/src/baseUtils/object3d/moveCameraByObject3D.ts                | 移动相机到mesh满屏视角                                 |                                                |
| createLineByVector3                 | 拒绝迁移:业务逻辑                                                                 | 创建飞行线属于业务逻辑                                 | 迁移至业务代码                                 |
| setMehsUpToY                        | 待迁移至:three-base/src/baseUtils/object3d/setMehsUpToY.ts                        | 将模型从Z轴向上改为 Y轴向上                            |                                                |
| d2BoxAntiCheck                      | 已迁移至:three-base/src/baseUtils/collision/moveCameraByObject3D.ts               | 矩形模型防碰撞检测                                     |                                                |
| throttle                            | 拒绝迁移: 多用于上层业务                                                          | 节流器                                                 |                                                |
| getD3PosByBimLocation               | 已迁移至:three-base/src/baseUtils/maths/getD3PosByBimLocation.ts                  | 从bimLocation 解析出空间3维坐标, 其中做了Y轴转换的处理 |                                                |
| getTubeGeometryByPoints             | 已迁移至:three-base/src/baseUtils/geometry/getTubeGeometryByPoints.ts             | 将3d 路径 解析成 管道缓冲几何体 TubeGeometry           |                                                |
| uuid                                | 已迁移至:three-base/src/baseUtils/maths/getUUID.ts                                | 随机生成一个唯一id                                     |                                                |
| d3PosTod2Pos                        | 已迁移至:three-base/src/baseUtils/maths/d3PosTod2Pos.ts待迁                       | 将3维坐标转换为 2维像素坐标                            |                                                |

### 二，从apm-3d/src/loader/loaders/utils.js

| 方法名    | 迁移状况                          | 功能       | 兼容方案                     |
| --------- | --------------------------------- | ---------- | ---------------------------- |
| rad2angle | 拒绝迁移：THREE提供的有相应的方法 | 弧度转角度 | 使用THREE.MathUtils.radToDeg |
| angle2rad | 拒绝迁移：THREE提供的有相应的方法 | 角度转弧度 | 使用THREE.MathUtils.degToRad |
