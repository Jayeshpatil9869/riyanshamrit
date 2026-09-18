import {
    r
} from "./f08a6ffe.js";
import t from "../isObject.js";
import e from "../isFunction.js";
var o = r["__core-js_shared__"];
var a = function() {
    var r = /[^.]+$/.exec(o && o.keys && o.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : ""
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(r) {
    return !!a && a in r
}
var n = Function.prototype;
var c = n.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(r) {
    if (null != r) {
        try {
            return c.call(r)
        } catch (r) {}
        try {
            return r + ""
        } catch (r) {}
    }
    return ""
}
var s = /[\\^$.*+?()[\]{}|]/g;
var i = /^\[object .+?Constructor\]$/;
var u = Function.prototype,
    f = Object.prototype;
var p = u.toString;
var v = f.hasOwnProperty;
var l = RegExp("^" + p.call(v).replace(s, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(r) {
    if (!t(r) || isMasked(r)) return false;
    var o = e(r) ? l : i;
    return o.test(toSource(r))
}
export {
    baseIsNative as b, o as c, toSource as t
};

//# sourceMappingURL=ccff797b.js.map