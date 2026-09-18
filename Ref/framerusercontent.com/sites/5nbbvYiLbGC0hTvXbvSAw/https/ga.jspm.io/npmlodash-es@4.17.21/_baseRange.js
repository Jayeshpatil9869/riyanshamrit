var a = Math.ceil,
    e = Math.max;
/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(r, t, n, h) {
    var i = -1,
        l = e(a((t - r) / (n || 1)), 0),
        u = Array(l);
    while (l--) {
        u[h ? l : ++i] = r;
        r += n
    }
    return u
}
export default baseRange;

//# sourceMappingURL=_baseRange.js.map