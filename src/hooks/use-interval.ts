import {useEffect, useRef} from 'react';

const useInterval = (fn:()=> void, delay:number = 0) => {
    const callRef = useRef(fn);

    useEffect(() => {
        callRef.current = fn;
    })

    useEffect(() => {
        const timer = setInterval(callRef.current, delay);
        return () => clearInterval(timer);
    }, [delay])

}

export default useInterval;