import {
    r as t
} from "./f08a6ffe.js";
var r = t.Symbol;
var a = Object.prototype;
var e = a.hasOwnProperty;
var o = a.toString;
var n = r ? r.toStringTag : void 0;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(t) {
    var r = e.call(t, n),
        a = t[n];
    try {
        t[n] = void 0;
        var i = true
    } catch (t) {}
    var v = o.call(t);
    i && (r ? t[n] = a : delete t[n]);
    return v
}
var i = Object.prototype;
var v = i.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(t) {
    return v.call(t)
}
var c = "[object Null]",
    g = "[object Undefined]";
var l = r ? r.toStringTag : void 0;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(t) {
    return null == t ? void 0 === t ? g : c : l && l in Object(t) ? getRawTag(t) : objectToString(t)
}
export {
    r as S, baseGetTag as b
};

//# sourceMappingURL=9bf895a3.js.map