import {
    b as t
} from "./_/1d34989e.js";
/**
 * Gets all but the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.tail([1, 2, 3]);
 * // => [2, 3]
 */
function tail(l) {
    var r = null == l ? 0 : l.length;
    return r ? t(l, 1, r) : []
}
export default tail;

//# sourceMappingURL=tail.js.map