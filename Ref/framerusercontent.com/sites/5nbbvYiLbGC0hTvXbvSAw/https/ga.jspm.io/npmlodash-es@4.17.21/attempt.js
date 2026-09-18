import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import {
    a as r
} from "./_/703e5e28.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_overRest.js";
import t from "./_baseRest.js";
import "./_/7953e050.js";
import "./_/e52eecc0.js";
import "./isPlainObject.js";
import i from "./isError.js";
/**
 * Attempts to invoke `func`, returning either the result or the caught error
 * object. Any additional arguments are provided to `func` when it's invoked.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Util
 * @param {Function} func The function to attempt.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // Avoid throwing errors for invalid selectors.
 * var elements = _.attempt(function(selector) {
 *   return document.querySelectorAll(selector);
 * }, '>_>');
 *
 * if (_.isError(elements)) {
 *   elements = [];
 * }
 */
var o = t((function(t, o) {
    try {
        return r(t, void 0, o)
    } catch (r) {
        return i(r) ? r : new Error(r)
    }
}));
export default o;

//# sourceMappingURL=attempt.js.map