import {useEffect} from 'react';
// 任意函数，只要符合函数的形状
const useMount = (fn: (param?: any) => any) => {
    useEffect(() => {
        fn();
    }, [])
}

export default useMount;