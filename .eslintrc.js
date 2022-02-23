export default {
    // root: true,
    plugins: ['react', 'babel', 'jest', '@typescript-eslint', 'react-hooks', 'prettier'],
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    parser: 'babel-eslint',
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        // 0:允许，1:警告，2:报错
        'semi': 0,
        'indent': [1, 4, { SwitchCase: 1 }], // 缩进使用限制
        'eqeqeq': 1, // 严格比对警告
        'one-var': 0, // 限制变量一起声明
        'init-declarations': 0, // 限制变量何时初始化
        'no-tabs': 0, // 禁止使用tab
        'no-await-in-loop': 2, // 循环语句中不可以使用 await
        'no-inline-comments': 0, // 禁止注释和代码同行
        'curly': [2, 'multi-line'], // 单行可忽略大括号，多行不可忽略
        'no-var': 1, // 警告使用var声明方式
        'no-cond-assign': [2, 'always'], // 禁止在条件语句中出现赋值操作符
        'no-else-return': 1, // if语句包含一个 return 语句， else就多余
        'no-multiple-empty-lines': [1, { max: 1, maxEOF: 2, maxBOF: 2 }], // 空白行限制
        'arrow-parens': 0, // 允许箭头函数不使用圆括号
        'no-constant-condition': 2, // 禁止在条件中使用常量表达式
        'no-duplicate-case': 1, // 警告 重复 case 标签
        'camelcase': 0, // 强制驼峰法命名
        'switch-colon-spacing': 'error', //
        'no-undef': 0, // 禁止未声明的变量的引用
        'no-useless-escape': 0, // 转义字符串，模板文字和正则表达式中的非特殊字符不会产生任何影响
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 开发环境可使用debugger,生产环境不可以
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0, // 不允许 console.log
        'no-empty': process.env.NODE_ENV === 'production' ? 2 : 1, // 警告空块语句
        'no-extra-semi': 1, // 警告不必要的分号
        'no-invalid-regexp': process.env.NODE_ENV === 'production' ? 2 : 1, // 正则中不要出现空匹配
        'no-unused-vars': ['error', { args: 'none' }],
        'prettier/prettier': 'error', //关闭 Prettier
        /** react 规则 **/
        'react/no-string-refs': [1], // 不要使用string类型的ref
        'react/jsx-key': [1], // 遍历使用key
        'react/jsx-no-bind': 0, // JSX中不允许使用箭头函数和bind
        'react/no-set-state': 0, // 防止使用setState
        // "react/no-danger": 0, // 防止使用危险的JSX属性
        'react/prop-types': 0, // 防止在React组件定义中丢失props验证
        'no-unreachable': 1, // 不能有无法执行的代码
        'comma-dangle': 0, //对象字面量项尾不能有逗号
        'no-mixed-spaces-and-tabs': 0, // 禁止混用tab和空格
        'no-irregular-whitespace': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁止在字符串和注释之外不规则的空白
        'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
        'react-hooks/exhaustive-deps': 'warn', // 检查 Hook 的依赖
    },
};
