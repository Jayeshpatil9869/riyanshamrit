import r from "../isSymbol.js";
var e = 4294967295,
    a = e - 1;
var l = Math.floor,
    n = Math.min;
/**
 * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
 * which invokes `iteratee` for `value` and each element of `array` to compute
 * their sort ranking. The iteratee is invoked with one argument; (value).
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function} iteratee The iteratee invoked per element.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndexBy(e, o, t, i) {
    var v = 0,
        d = null == e ? 0 : e.length;
    if (0 === d) return 0;
    o = t(o);
    var s = o !== o,
        u = null === o,
        f = r(o),
        b = void 0 === o;
    while (v < d) {
        var h = l((v + d) / 2),
            m = t(e[h]),
            x = void 0 !== m,
            y = null === m,
            S = m === m,
            p = r(m);
        if (s) var B = i || S;
        else B = b ? S && (i || x) : u ? S && x && (i || !y) : f ? S && x && !y && (i || !p) : !y && !p && (i ? m <= o : m < o);
        B ? v = h + 1 : d = h
    }
    return n(d, a)
}
export {
    baseSortedIndexBy as b
};

//# sourceMappingURL=1ca5f0b1.js.map