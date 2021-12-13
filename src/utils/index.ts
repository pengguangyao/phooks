// 截取类型判断字段
const _cutType = (param: unknown) => Object.prototype.toString.call(param).slice(8, -1);

// 判断是否是数组
export const isArray = (param: unknown) => _cutType(param) === 'Array';

// 判断是否是函数
export const isFn = (param: unknown) => _cutType(param) === 'Function';

// 判断是否是数字
export const isNumber = (param: any) => _cutType(param) === 'Number' && !isNaN(param);

// 判断是否是字符串
export const isString = (param: unknown) => _cutType(param) === 'String';

// 判断是否是对象
export const isObject = (param: unknown) => _cutType(param) === 'Object';

// 判断是否是个时间对象
export const isDate = (param: unknown) => _cutType(param) === 'Date';