import {useCallback, useReducer} from 'react';
import {useMountRef} from './index';

interface State<T>{
    data: T | null,
    error: Error | null,
    stat: 'idle' | 'loading' | 'error' | 'success',
}

const initState: State<null> = {
    data: null,
    error: null,
    stat: 'idle',
}

const SUC = 'success';
const EOR = 'error';
const LOD = 'loading'

type Action = {
    type: typeof SUC | typeof EOR | typeof LOD,
    payload?: unknown,
}

function asyncReducer<D>(state: State<D>, action: Action): State<D>{
    const {payload, type} = action;
    switch(type){
        case SUC: {
            return {
                data: payload as D,
                error: null,
                stat: SUC,
            }
        }
        case EOR: {
            return {
                data: null,
                error: payload as Error,
                stat: EOR,
            }
        }
        case LOD: {
            return {
                data: null,
                error: null,
                stat: LOD,
            }
        }
        default: 
            return state;
    }
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountRef = useMountRef();
    const safeDispatch = useCallback((...args: T[]) => {
        mountRef.current ? dispatch(...args) : void 0;
    }, [dispatch]);
    return safeDispatch;
}

const useAsync = <D>() => {
    const [state, dispatch] = useReducer(asyncReducer , initState);

    const safeDispatch = useSafeDispatch(dispatch);

    // 数据请求成功
    const setData = useCallback((data: D) => {
        safeDispatch({
            type: SUC,
            payload: data,
        });
    }, [safeDispatch])

    // 数据请求错误
    const setError = useCallback((error: Error) => {
        safeDispatch({
            type: EOR,
            payload: error,
        })
    }, [safeDispatch])

    // 运行函数，返回promise
    const run = useCallback((promise: Promise<any>): Promise<any> => {
        if(!promise || !promise.then){
            throw Error('传入的参数类型不是Promise');
        }
        // 打开请求状态
        safeDispatch({
            type: LOD,
        })

        return Promise.resolve(promise).then((data: D) => {
            setData(data);
            return data;
        }).catch((error: Error) => {
            setError(error);
            return Promise.reject(error);
        })
    }, [safeDispatch])

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