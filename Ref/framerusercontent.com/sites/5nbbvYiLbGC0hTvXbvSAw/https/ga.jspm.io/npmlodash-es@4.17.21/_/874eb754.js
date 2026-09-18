/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(e) {
    return function(r, a, t) {
        var n = -1,
            c = Object(r),
            o = t(r),
            f = o.length;
        while (f--) {
            var i = o[e ? f : ++n];
            if (false === a(c[i], i, c)) break
        }
        return r
    }
}
export {
    createBaseFor as c
};

//# sourceMappingURL=874eb754.js.map