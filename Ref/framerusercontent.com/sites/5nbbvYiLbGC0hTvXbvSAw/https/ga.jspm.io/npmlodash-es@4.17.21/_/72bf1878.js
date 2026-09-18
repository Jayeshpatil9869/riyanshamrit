import r from "../isSymbol.js";
/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum(e, m, t) {
    var a = -1,
        i = e.length;
    while (++a < i) {
        var o = e[a],
            l = m(o);
        if (null != l && (void 0 === n ? l === l && !r(l) : t(l, n))) var n = l,
            s = o
    }
    return s
}
export {
    baseExtremum as b
};

//# sourceMappingURL=72bf1878.js.map