import {
    L as _
} from "./2500ebc8.js";
import {
    L as r
} from "./93f70315.js";
import e from "../_copyArray.js";
/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(n) {
    if (n instanceof _) return n.clone();
    var o = new r(n.__wrapped__, n.__chain__);
    o.__actions__ = e(n.__actions__);
    o.__index__ = n.__index__;
    o.__values__ = n.__values__;
    return o
}
export {
    wrapperClone as w
};

//# sourceMappingURL=b0a4ea9b.js.map