import r from "../isSymbol.js";
/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(n, i) {
    if (n !== i) {
        var o = void 0 !== n,
            e = null === n,
            c = n === n,
            t = r(n);
        var u = void 0 !== i,
            a = null === i,
            f = i === i,
            l = r(i);
        if (!a && !l && !t && n > i || t && u && f && !a && !l || e && u && f || !o && f || !c) return 1;
        if (!e && !t && !l && n < i || l && o && c && !e && !t || a && o && c || !u && c || !f) return -1
    }
    return 0
}
export {
    compareAscending as c
};

//# sourceMappingURL=2ad708e7.js.map