import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import t from "./toInteger.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/703e5e28.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_/98062778.js";
import "./_overRest.js";
import o from "./_baseRest.js";
import {
    b as r
} from "./_/841bb6c0.js";
/**
 * Creates a function that gets the argument at index `n`. If `n` is negative,
 * the nth argument from the end is returned.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {number} [n=0] The index of the argument to return.
 * @returns {Function} Returns the new pass-thru function.
 * @example
 *
 * var func = _.nthArg(1);
 * func('a', 'b', 'c', 'd');
 * // => 'b'
 *
 * var func = _.nthArg(-2);
 * func('a', 'b', 'c', 'd');
 * // => 'c'
 */
function nthArg(i) {
    i = t(i);
    return o((function(t) {
        return r(t, i)
    }))
}
export default nthArg;

//# sourceMappingURL=nthArg.js.map