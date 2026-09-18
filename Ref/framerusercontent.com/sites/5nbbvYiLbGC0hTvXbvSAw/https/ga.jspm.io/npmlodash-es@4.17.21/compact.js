/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(t) {
    var a = -1,
        c = null == t ? 0 : t.length,
        e = 0,
        l = [];
    while (++a < c) {
        var n = t[a];
        n && (l[e++] = n)
    }
    return l
}
export default compact;

//# sourceMappingURL=compact.js.map