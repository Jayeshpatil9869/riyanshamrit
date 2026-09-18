import {
    L as a
} from "./2500ebc8.js";
import {
    a as r
} from "./7100b469.js";
import {
    a as e
} from "./cf0de6d8.js";
/**
 * The base implementation of `wrapperValue` which returns the result of
 * performing a sequence of actions on the unwrapped `value`, where each
 * successive action is supplied the return value of the previous.
 *
 * @private
 * @param {*} value The unwrapped value.
 * @param {Array} actions Actions to perform to resolve the unwrapped value.
 * @returns {*} Returns the resolved value.
 */
function baseWrapperValue(p, s) {
    var t = p;
    t instanceof a && (t = t.value());
    return e(s, (function(a, e) {
        return e.func.apply(e.thisArg, r([a], e.args))
    }), t)
}
/**
 * Executes the chain sequence to resolve the unwrapped value.
 *
 * @name value
 * @memberOf _
 * @since 0.1.0
 * @alias toJSON, valueOf
 * @category Seq
 * @returns {*} Returns the resolved unwrapped value.
 * @example
 *
 * _([1, 2, 3]).value();
 * // => [1, 2, 3]
 */
function wrapperValue() {
    return baseWrapperValue(this.__wrapped__, this.__actions__)
}
export {
    baseWrapperValue as b, wrapperValue as w
};

//# sourceMappingURL=34e0f481.js.map