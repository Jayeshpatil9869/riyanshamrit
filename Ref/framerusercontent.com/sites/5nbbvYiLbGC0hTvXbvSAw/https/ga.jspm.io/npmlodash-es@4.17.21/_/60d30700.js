import {
    b as a
} from "./5e6974a5.js";
import r from "../eq.js";
var o = Object.prototype;
var s = o.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(o, e, t) {
    var i = o[e];
    s.call(o, e) && r(i, t) && (void 0 !== t || e in o) || a(o, e, t)
}
export {
    assignValue as a
};

//# sourceMappingURL=60d30700.js.map