# 主要是工作中一些常用的自定义 hooks, 以及一些常见的工具函数（陆续开发中）

```jsx
import phooks from 'phooks';
const { isArray, useAsync } = phooks;
```

### 注意：所有的自定义 hook 均是采用 typescript 开发

| 函数名称       | 参数说明                    | 返回值说明                                        | 函数说明                                 | 备注                                                                                      |
| -------------- | --------------------------- | ------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------- |
| isArray        | (param: any)                | boolean                                           | 判断是否是数组                           | -                                                                                         |
| isFn           | (param: any)                | boolean                                           | 判断是否是函数                           | -                                                                                         |
| isNumber       | (param: any)                | boolean                                           | 判断是否是数字                           | -                                                                                         |
| isString       | (param: any)                | boolean                                           | 判断是否是字符串                         | -                                                                                         |
| isObject       | (param: any)                | boolean                                           | 判断是否是对象                           | -                                                                                         |
| isDate         | (param: any)                | boolean                                           | 判断是否是时间对象                       | -                                                                                         |
| useAsync       | -                           | {isError, isSuccess, isLoading, data, error, run} | run 函数接收一个 promise                 | const {isLoading, run, data} = useAsync<number[]>(); ,其中 number[]定义的是 data 的类型写 |
| useMount       | function                    | -                                                 | 组件挂载的 hook                          | useMount(fn)                                                                              |
| useUnmount     | function                    | -                                                 | 组件卸载的 hook                          | useUnmount(fn)                                                                            |
| useDebounceVal | (prama: T)                  | T                                                 | 对值的防抖                               | const debounceValue = useDebounceVal(value)                                               |
| useMountRef    | -                           | ref 对象                                          | 解决在组件卸载后继续调用 setState 的问题 | const mountRef = useMountRef(); mountRef.current 为 false 表示组件已卸载(value)           |
| useInterval    | (function, delay: number=0) | -                                                 | 解决 hook 中定时器的问题                 |                                                                                           |
