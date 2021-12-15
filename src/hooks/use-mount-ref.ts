import { useEffect, useRef } from "react"

// 用已解决在组件卸载后继续调用setState的问题
const useMountRef = () => {
    const mountRef = useRef(false);
    useEffect(() => {
        mountRef.current = true;
        return () => {
            mountRef.current = false;
        }
    }, [])
    return mountRef;
}

export default useMountRef;