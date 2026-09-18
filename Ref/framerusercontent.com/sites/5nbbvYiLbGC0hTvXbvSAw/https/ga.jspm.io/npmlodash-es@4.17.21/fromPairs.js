/**
 * The inverse of `_.toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.fromPairs([['a', 1], ['b', 2]]);
 * // => { 'a': 1, 'b': 2 }
 */
function fromPairs(r) {
    var a = -1,
        e = null == r ? 0 : r.length,
        l = {};
    while (++a < e) {
        var n = r[a];
        l[n[0]] = n[1]
    }
    return l
}
export default fromPairs;

//# sourceMappingURL=fromPairs.js.map