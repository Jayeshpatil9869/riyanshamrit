/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(e, r, a) {
    var i = -1,
        l = e.length;
    r < 0 && (r = -r > l ? 0 : l + r);
    a = a > l ? l : a;
    a < 0 && (a += l);
    l = r > a ? 0 : a - r >>> 0;
    r >>>= 0;
    var n = Array(l);
    while (++i < l) n[i] = e[i + r];
    return n
}
export {
    baseSlice as b
};

//# sourceMappingURL=1d34989e.js.map