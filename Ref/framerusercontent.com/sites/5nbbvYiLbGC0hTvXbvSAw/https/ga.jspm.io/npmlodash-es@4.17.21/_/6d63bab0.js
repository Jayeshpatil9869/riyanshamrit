import e from "../memoize.js";
var r = 500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(a) {
    var n = e(a, (function(e) {
        o.size === r && o.clear();
        return e
    }));
    var o = n.cache;
    return n
}
var a = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var n = /\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var o = memoizeCapped((function(e) {
    var r = [];
    46 === e.charCodeAt(0) && r.push("");
    e.replace(a, (function(e, a, o, c) {
        r.push(o ? c.replace(n, "$1") : a || e)
    }));
    return r
}));
export {
    o as s
};

//# sourceMappingURL=6d63bab0.js.map