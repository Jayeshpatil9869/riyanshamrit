import r from "../identity.js";
import t from "../constant.js";
import {
    d as a
} from "./198d994d.js";
var e = 800,
    o = 16;
var n = Date.now;
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(r) {
    var t = 0,
        a = 0;
    return function() {
        var u = n(),
            i = o - (u - a);
        a = u;
        if (i > 0) {
            if (++t >= e) return arguments[0]
        } else t = 0;
        return r.apply(void 0, arguments)
    }
}
/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var u = a ? function(r, e) {
    return a(r, "toString", {
        configurable: true,
        enumerable: false,
        value: t(e),
        writable: true
    })
} : r;
/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var i = shortOut(u);
export {
    i as a, shortOut as s
};

//# sourceMappingURL=ceaffabe.js.map