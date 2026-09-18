/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(r, a) {
    var e = -1,
        t = r.length;
    a || (a = Array(t));
    while (++e < t) a[e] = r[e];
    return a
}
export default copyArray;

//# sourceMappingURL=_copyArray.js.map