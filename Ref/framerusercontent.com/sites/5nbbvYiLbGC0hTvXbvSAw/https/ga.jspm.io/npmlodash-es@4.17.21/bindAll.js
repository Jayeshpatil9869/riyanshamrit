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
import t from "./_arrayEach.js";
import "./_/b225817a.js";
import "./_/e10cd6f2.js";
import "./_baseIndexOf.js";
import "./_/ef6cf5be.js";
import "./_/98062778.js";
import {
    b as r
} from "./_/5e6974a5.js";
import "./_overRest.js";
import "./_baseRest.js";
import "./isArguments.js";
import {
    t as o
} from "./_/b669c81f.js";
import "./_/7100b469.js";
import "./_/4175b908.js";
import "./flatten.js";
import {
    f as s
} from "./_/a1bc051a.js";
import i from "./bind.js";
/**
 * Binds methods of an object to the object itself, overwriting the existing
 * method.
 *
 * **Note:** This method doesn't set the "length" property of bound functions.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {Object} object The object to bind and assign the bound methods to.
 * @param {...(string|string[])} methodNames The object method names to bind.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var view = {
 *   'label': 'docs',
 *   'click': function() {
 *     console.log('clicked ' + this.label);
 *   }
 * };
 *
 * _.bindAll(view, ['click']);
 * jQuery(element).on('click', view.click);
 * // => Logs 'clicked docs' when clicked.
 */
var m = s((function(s, m) {
    t(m, (function(t) {
        t = o(t);
        r(s, t, i(s[t], s))
    }));
    return s
}));
export default m;

//# sourceMappingURL=bindAll.js.map