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
import {
    r,
    g as t,
    c as o
} from "./_/17748f24.js";
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
import s from "./_baseRest.js";
var i = 1,
    p = 32;
/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and `partials` prepended to the arguments it receives.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // Bound with placeholders.
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
var m = s((function(s, j, e) {
    var a = i;
    if (e.length) {
        var _ = r(e, t(m));
        a |= p
    }
    return o(s, a, j, e, _)
}));
m.placeholder = {};
export default m;

//# sourceMappingURL=bind.js.map