import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import i from "./isObjectLike.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import "./_/72487e58.js";
import {
    g as t
} from "./_/5cc66d2f.js";
import "./_/573cd97d.js";
var o = "[object WeakMap]";
/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
 * @example
 *
 * _.isWeakMap(new WeakMap);
 * // => true
 *
 * _.isWeakMap(new Map);
 * // => false
 */
function isWeakMap(r) {
    return i(r) && t(r) == o
}
export default isWeakMap;

//# sourceMappingURL=isWeakMap.js.map