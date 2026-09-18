import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import r from "./isSymbol.js";
import o from "./_arrayMap.js";
import t from "./isArray.js";
import "./_/c8f2469a.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import i from "./_copyArray.js";
import "./eq.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./memoize.js";
import {
    s as m
} from "./_/6d63bab0.js";
import s from "./toString.js";
import {
    t as p
} from "./_/b669c81f.js";
/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(j) {
    return t(j) ? o(j, p) : r(j) ? [j] : i(m(s(j)))
}
export default toPath;

//# sourceMappingURL=toPath.js.map