/**
 * ts中css module最优雅的写法
 * 使用declare module为非js文件模块创建模块类型索引定义
 */

declare module "*.less" {
  const content: any;
  export default content;
}

declare module "*.css" {
  const content: any;
  export default content;
}