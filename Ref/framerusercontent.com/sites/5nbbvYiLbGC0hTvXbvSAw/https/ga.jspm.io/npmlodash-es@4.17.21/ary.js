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
var i = 128;
/**
 * Creates a function that invokes `func`, with up to `n` arguments,
 * ignoring any additional arguments.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to cap arguments for.
 * @param {number} [n=func.length] The arity cap.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new capped function.
 * @example
 *
 * _.map(['6', '8', '10'], _.ary(parseInt, 1));
 * // => [6, 8, 10]
 */
function ary(r, t, s) {
    t = s ? void 0 : t;
    t = r && null == t ? r.length : t;
    return o(r, i, void 0, void 0, void 0, void 0, t)
}
export default ary;

//# sourceMappingURL=ary.js.map