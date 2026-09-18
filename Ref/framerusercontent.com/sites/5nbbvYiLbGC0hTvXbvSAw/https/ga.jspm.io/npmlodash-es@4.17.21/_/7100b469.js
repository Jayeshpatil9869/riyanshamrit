/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(r, a) {
    var e = -1,
        h = a.length,
        n = r.length;
    while (++e < h) r[n + e] = a[e];
    return r
}
export {
    arrayPush as a
};

//# sourceMappingURL=7100b469.js.map