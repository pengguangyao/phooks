import {useEffect, useRef} from 'react';
const useUnmount = (fn: (param?: any) => any) => {
    const fnRef = useRef(fn);
    useEffect(
        () => () => {
            if (typeof fnRef.current === 'function') {
                fnRef.current();
            }
        },
    []);
};

export default useUnmount;