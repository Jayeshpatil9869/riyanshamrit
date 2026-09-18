import {
    r
} from "./f08a6ffe.js";
import t from "../toNumber.js";
import e from "../toInteger.js";
import o from "../toString.js";
var i = r.isFinite,
    n = Math.min;
/**
 * Creates a function like `_.round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
function createRound(r) {
    var a = Math[r];
    return function(r, f) {
        r = t(r);
        f = null == f ? 0 : n(e(f), 292);
        if (f && i(r)) {
            var m = (o(r) + "e").split("e"),
                s = a(m[0] + "e" + (+m[1] + f));
            m = (o(s) + "e").split("e");
            return +(m[0] + "e" + (+m[1] - f))
        }
        return a(r)
    }
}
export {
    createRound as c
};

//# sourceMappingURL=47fb9a8e.js.map