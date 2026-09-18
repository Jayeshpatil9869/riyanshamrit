import e from "../isArrayLike.js";
/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(r, t) {
    return function(a, n) {
        if (null == a) return a;
        if (!e(a)) return r(a, n);
        var i = a.length,
            c = t ? i : -1,
            f = Object(a);
        while (t ? c-- : ++c < i)
            if (false === n(f[c], c, f)) break;
        return a
    }
}
export {
    createBaseEach as c
};

//# sourceMappingURL=c8460b3f.js.map