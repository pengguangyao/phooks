import {useState} from 'react';

interface State<T>{
    data: T | null,
    error: Error | null,
    stat: 'idle' | 'loading' | 'error' | 'success',
}

const initState: State<any> = {
    data: null,
    error: null,
    stat: 'idle',
}

const useAsync = <D>() => {
    const [state, setState] = useState(initState);

    // 数据请求成功
    const setData = (data: D) => {
        setState({
            data: data,
            error: null,
            stat: 'success',
        })
    }

    // 数据请求错误
    const setError = (error: Error) => {
        setState({
            data: null,
            error: error,
            stat: 'error'
        })
    }

    // 运行函数，返回promise
    const run = (promise: Promise<any>) => {
        if(!promise || !promise.then){
            throw Error('传入的参数类型不是Promise');
        }
        // 打开请求状态
        setState({
            data: null,
            error: null,
            stat: 'loading',
        })

        return Promise.resolve(promise).then((data: D) => {
            setData(data);
            return data;
        }).catch((error: Error) => {
            setError(error);
            return Promise.reject(error);
        })
    }

    const {data, error, stat} = state;

    return {
        isError: stat === 'error',
        isSuccess: stat === 'success',
        isLoading: stat === 'loading',
        data,
        error,
        run,
        setData,
        setError,
    }
}

export default useAsync;