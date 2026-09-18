import {
    r as e
} from "./f08a6ffe.js";
import {
    b as r
} from "./865f4d28.js";
import {
    i as o
} from "./df9293ee.js";
import {
    g as t
} from "./e52eecc0.js";
import {
    U as n
} from "./0b247f18.js";
var f = "object" == typeof exports && exports && !exports.nodeType && exports;
var c = f && "object" == typeof module && module && !module.nodeType && module;
var s = c && c.exports === f;
var u = s ? e.Buffer : void 0,
    a = u ? u.allocUnsafe : void 0;
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(e, r) {
    if (r) return e.slice();
    var o = e.length,
        t = a ? a(o) : new e.constructor(o);
    e.copy(t);
    return t
}
/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(e) {
    var r = new e.constructor(e.byteLength);
    new n(r).set(new n(e));
    return r
}
/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(e, r) {
    var o = r ? cloneArrayBuffer(e.buffer) : e.buffer;
    return new e.constructor(o, e.byteOffset, e.length)
}
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(e) {
    return "function" != typeof e.constructor || o(e) ? {} : r(t(e))
}
export {
    cloneTypedArray as a, cloneBuffer as b, cloneArrayBuffer as c, initCloneObject as i
};

//# sourceMappingURL=78e9d69b.js.map