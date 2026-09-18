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
 * This method is like `_.pullAll` except that it accepts `comparator` which
 * is invoked to compare elements of `array` to `values`. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 4.6.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 *
 * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
 * console.log(array);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
 */
function pullAllWith(t, o, p) {
    return t && t.length && o && o.length ? r(t, o, void 0, p) : t
}
export default pullAllWith;

//# sourceMappingURL=pullAllWith.js.map