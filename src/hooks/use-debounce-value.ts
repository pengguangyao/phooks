import {useState, useEffect} from 'react';

// 针对值进行防抖
const useDebounceVal = <T>(val: T, delay:number=300) => {
    const [debounceVal, setDebounceVal] = useState(val);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceVal(val);
        }, delay)
        return () => clearTimeout(timer);
    }, [val, delay])
    
    return debounceVal;
}

export default useDebounceVal;