import {
    useState,
    useEffect
} from "react";
export function useIsBrowser() {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        setIsBrowser(true);
    }, []);
    return isBrowser;
}
export const __FramerMetadata__ = {
    "exports": {
        "useIsBrowser": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./IsBrowser.map