/**
 * 解决 Ts 引入第三方包,报无法找到模块 "xxx" 的声明文件错误
 * https://blog.csdn.net/xiebaochun/article/details/122458063
 */

declare module "js-md5";
declare module "validator/es/lib/isURL";
