import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import r from "./isArray.js";
import t from "./_copyArray.js";
import "./isArguments.js";
import {
    a as o
} from "./_/7100b469.js";
import {
    b as i
} from "./_/4175b908.js";
/**
 * Creates a new array concatenating `array` with any additional arrays
 * and/or values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to concatenate.
 * @param {...*} [values] The values to concatenate.
 * @returns {Array} Returns the new concatenated array.
 * @example
 *
 * var array = [1];
 * var other = _.concat(array, 2, [3], [[4]]);
 *
 * console.log(other);
 * // => [1, 2, 3, [4]]
 *
 * console.log(array);
 * // => [1]
 */
function concat() {
    var s = arguments.length;
    if (!s) return [];
    var a = Array(s - 1),
        m = arguments[0],
        f = s;
    while (f--) a[f - 1] = arguments[f];
    return o(r(m) ? t(m) : [m], i(a, 1))
}
export default concat;

//# sourceMappingURL=concat.js.map