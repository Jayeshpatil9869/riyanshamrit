import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./isArray.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import "./toInteger.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import "./_/80a12b8f.js";
import "./_/17748f24.js";
import "./_/865f4d28.js";
import "./_/703e5e28.js";
import "./_/da987058.js";
import "./_/2500ebc8.js";
import "./noop.js";
import "./_/93f70315.js";
import "./_copyArray.js";
import "./_/b0a4ea9b.js";
import "./wrapperLodash.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_arrayEach.js";
import "./_/b225817a.js";
import "./_/e10cd6f2.js";
import "./_baseIndexOf.js";
import "./_/ef6cf5be.js";
import "./_/98062778.js";
import "./_overRest.js";
import "./_baseRest.js";
import {
    c as r
} from "./_/cd8e8b5d.js";
import t from "./partial.js";
/**
 * Creates a function that provides `value` to `wrapper` as its first
 * argument. Any additional arguments provided to the function are appended
 * to those provided to the `wrapper`. The wrapper is invoked with the `this`
 * binding of the created function.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {*} value The value to wrap.
 * @param {Function} [wrapper=identity] The wrapper function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var p = _.wrap(_.escape, function(func, text) {
 *   return '<p>' + func(text) + '</p>';
 * });
 *
 * p('fred, barney, & pebbles');
 * // => '<p>fred, barney, &amp; pebbles</p>'
 */
function wrap(o, i) {
    return t(r(i), o)
}
export default wrap;

//# sourceMappingURL=wrap.js.map