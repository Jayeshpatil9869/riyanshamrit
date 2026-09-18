import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import t from "./isObjectLike.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import {
    b as s
} from "./_/43b5d56d.js";
import {
    n as r
} from "./_/17fb905d.js";
import "./_/72487e58.js";
import {
    g as o
} from "./_/5cc66d2f.js";
import "./_/573cd97d.js";
var i = "[object Set]";
/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(s) {
    return t(s) && o(s) == i
}
var e = r && r.isSet;
/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var m = e ? s(e) : baseIsSet;
export default m;

//# sourceMappingURL=isSet.js.map