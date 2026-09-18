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
    b as t
} from "./_/2a349283.js";
/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(i) {
    return i && i.length ? t(i) : []
}
export default uniq;

//# sourceMappingURL=uniq.js.map