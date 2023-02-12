import { useMemo } from "@wordpress/element";

let id = 0;
const genId = () => ++id;

const useId = (prefix = "mbl") => {
    return useMemo(() => `${prefix}-${genId()}`, [prefix]);
}

export default useId;
