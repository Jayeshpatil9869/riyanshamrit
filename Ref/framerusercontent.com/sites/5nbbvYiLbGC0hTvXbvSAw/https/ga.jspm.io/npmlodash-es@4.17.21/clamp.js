import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import i from "./toNumber.js";
import {
    b as o
} from "./_/b1d05723.js";
/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * _.clamp(-10, -5, 5);
 * // => -5
 *
 * _.clamp(10, -5, 5);
 * // => 5
 */
function clamp(t, m, r) {
    if (void 0 === r) {
        r = m;
        m = void 0
    }
    if (void 0 !== r) {
        r = i(r);
        r = r === r ? r : 0
    }
    if (void 0 !== m) {
        m = i(m);
        m = m === m ? m : 0
    }
    return o(i(t), m, r)
}
export default clamp;

//# sourceMappingURL=clamp.js.map