import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import s from "./isObjectLike.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import {
    b as r
} from "./_/43b5d56d.js";
import {
    n as o
} from "./_/17fb905d.js";
import "./_/72487e58.js";
import {
    g as t
} from "./_/5cc66d2f.js";
import "./_/573cd97d.js";
var i = "[object Map]";
/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(r) {
    return s(r) && t(r) == i
}
var p = o && o.isMap;
/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var m = p ? r(p) : baseIsMap;
export default m;

//# sourceMappingURL=isMap.js.map