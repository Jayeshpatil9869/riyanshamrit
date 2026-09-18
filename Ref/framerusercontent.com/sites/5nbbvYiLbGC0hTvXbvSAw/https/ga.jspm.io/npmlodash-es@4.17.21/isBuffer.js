import {
    r as e
} from "./_/f08a6ffe.js";
import o from "./stubFalse.js";
var r = "object" == typeof exports && exports && !exports.nodeType && exports;
var t = r && "object" == typeof module && module && !module.nodeType && module;
var f = t && t.exports === r;
var p = f ? e.Buffer : void 0;
var s = p ? p.isBuffer : void 0;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var a = s || o;
export default a;

//# sourceMappingURL=isBuffer.js.map