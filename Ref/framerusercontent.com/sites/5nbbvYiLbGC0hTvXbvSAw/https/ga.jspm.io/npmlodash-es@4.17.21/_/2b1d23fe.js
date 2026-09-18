/**
 * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @param {Function} assignFunc The function to assign values.
 * @returns {Object} Returns the new object.
 */
function baseZipObject(e, t, a) {
    var b = -1,
        i = e.length,
        n = t.length,
        r = {};
    while (++b < i) {
        var c = b < n ? t[b] : void 0;
        a(r, e[b], c)
    }
    return r
}
export {
    baseZipObject as b
};

//# sourceMappingURL=2b1d23fe.js.map