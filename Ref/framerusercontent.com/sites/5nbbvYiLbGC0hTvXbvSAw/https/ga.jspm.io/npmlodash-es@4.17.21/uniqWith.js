import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./noop.js";
import "./_/b225817a.js";
import "./_/e10cd6f2.js";
import "./_baseIndexOf.js";
import "./_/ef6cf5be.js";
import "./eq.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./_/573cd97d.js";
import "./_/9b3b36d6.js";
import "./_/f01ae9b5.js";
import "./_/3d95c57d.js";
import {
    b as i
} from "./_/2a349283.js";
/**
 * This method is like `_.uniq` except that it accepts `comparator` which
 * is invoked to compare elements of `array`. The order of result values is
 * determined by the order they occur in the array.The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 *
 * _.uniqWith(objects, _.isEqual);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
 */
function uniqWith(t, o) {
    o = "function" == typeof o ? o : void 0;
    return t && t.length ? i(t, void 0, o) : []
}
export default uniqWith;

//# sourceMappingURL=uniqWith.js.map