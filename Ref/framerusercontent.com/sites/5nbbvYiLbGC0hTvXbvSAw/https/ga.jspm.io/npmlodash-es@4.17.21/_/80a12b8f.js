import {
    W as r
} from "./a68c036e.js";
import {
    L as a
} from "./2500ebc8.js";
import e from "../noop.js";
import t from "../wrapperLodash.js";
var n = r && new r;
/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var o = n ? function(r) {
    return n.get(r)
} : e;
var i = {};
var s = Object.prototype;
var u = s.hasOwnProperty;
/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(r) {
    var a = r.name + "",
        e = i[a],
        t = u.call(i, a) ? e.length : 0;
    while (t--) {
        var n = e[t],
            o = n.func;
        if (null == o || o == r) return n.name
    }
    return a
}
/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(r) {
    var e = getFuncName(r),
        n = t[e];
    if ("function" != typeof n || !(e in a.prototype)) return false;
    if (r === n) return true;
    var i = o(n);
    return !!i && r === i[0]
}
export {
    getFuncName as a, o as g, isLaziable as i, n as m, i as r
};

//# sourceMappingURL=80a12b8f.js.map