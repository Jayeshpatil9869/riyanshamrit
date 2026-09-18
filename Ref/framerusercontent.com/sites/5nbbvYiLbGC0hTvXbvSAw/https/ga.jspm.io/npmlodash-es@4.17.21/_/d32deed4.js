/**
 * The base implementation of `_.conformsTo` which accepts `props` to check.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 */
function baseConformsTo(r, e, n) {
    var o = n.length;
    if (null == r) return !o;
    r = Object(r);
    while (o--) {
        var t = n[o],
            a = e[t],
            f = r[t];
        if (void 0 === f && !(t in r) || !a(f)) return false
    }
    return true
}
export {
    baseConformsTo as b
};

//# sourceMappingURL=d32deed4.js.map