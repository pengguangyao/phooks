import { useCallback, useReducer } from 'react';
import useMountRef from './use-mount-ref';
interface State<T> {
    data: T | null;
    error: Error | null;
    stat: 'idle' | 'loading' | 'error' | 'success';
}

const initState = {
    data: null,
    error: null,
    stat: 'idle',
};

const SUC = 'success';
const EOR = 'error';
const LOD = 'loading';

type Action<D> = {
    type: typeof SUC | typeof EOR | typeof LOD;
    payload?: D | Error | null | undefined;
};

// function asyncReducer<D>(state: State<D>, action: Action<D>): State<D>{
//     const {payload, type} = action;
//     switch(type){
//         case SUC: {
//             return {
//                 data: payload as D,
//                 error: null,
//                 stat: SUC,
//             }
//         }
//         case EOR: {
//             return {
//                 data: null,
//                 error: payload as Error,
//                 stat: EOR,
//             }
//         }
//         case LOD: {
//             return {
//                 data: null,
//                 error: null,
//                 stat: LOD,
//             }
//         }
//         default:
//             return state;
//     }
// }

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountRef = useMountRef();
    const safeDispatch = useCallback(
        (...args: T[]) => {
            mountRef.current ? dispatch(...args) : void 0;
        },
        [dispatch],
    );
    return safeDispatch;
};

const useAsync = <D>() => {
    const [state, dispatch] = useReducer((state: State<D>, action: Action<D>): State<D> => {
        const { payload, type } = action;
        switch (type) {
            case SUC: {
                return {
                    data: payload as D,
                    error: null,
                    stat: SUC,
                };
            }
            case EOR: {
                return {
                    data: null,
                    error: payload as Error,
                    stat: EOR,
                };
            }
            case LOD: {
                return {
                    data: null,
                    error: null,
                    stat: LOD,
                };
            }
            default:
                return state;
        }
    }, initState as State<D>);

    const safeDispatch = useSafeDispatch(dispatch);

    // ??????????????????
    const setData = useCallback(
        (data: D) => {
            safeDispatch({
                type: SUC,
                payload: data,
            });
        },
        [safeDispatch],
    );

    // ??????????????????
    const setError = useCallback(
        (error: Error) => {
            safeDispatch({
                type: EOR,
                payload: error,
            });
        },
        [safeDispatch],
    );

    // ?????????????????????promise
    const run = useCallback(
        (promise: Promise<any>): Promise<any> => {
            if (!promise || !promise.then) {
                throw Error('???????????????????????????Promise');
            }
            // ??????????????????
            safeDispatch({
                type: LOD,
            });

            return Promise.resolve(promise)
                .then((data: D) => {
                    setData(data);
                    return data;
                })
                .catch((error: Error) => {
                    setError(error);
                    return Promise.reject(error);
                });
        },
        [safeDispatch],
    );

    const { data, error, stat } = state;

    return {
        isError: stat === 'error',
        isSuccess: stat === 'success',
        isLoading: stat === 'loading',
        data,
        error,
        run,
        setData,
        setError,
    } as const;
};

export default useAsync;
