import {
    g as r,
    b as s
} from "./e572f727.js";
import {
    m as t
} from "./3cfb9cd3.js";
/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(a) {
    var e = r(a);
    return 1 == e.length && e[0][2] ? t(e[0][0], e[0][1]) : function(r) {
        return r === a || s(r, a, e)
    }
}
export {
    baseMatches as b
};

//# sourceMappingURL=2d110264.js.map