import "./_arrayMap.js";
import "./_copyArray.js";
import "./_/b225817a.js";
import "./_/e10cd6f2.js";
import "./_baseIndexOf.js";
import "./_/43b5d56d.js";
import {
    b as r
} from "./_/26b5fbdd.js";
/**
 * This method is like `_.pull` except that it accepts an array of values to remove.
 *
 * **Note:** Unlike `_.difference`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
 *
 * _.pullAll(array, ['a', 'c']);
 * console.log(array);
 * // => ['b', 'b']
 */
function pullAll(t, p) {
    return t && t.length && p && p.length ? r(t, p) : t
}
export default pullAll;

//# sourceMappingURL=pullAll.js.map