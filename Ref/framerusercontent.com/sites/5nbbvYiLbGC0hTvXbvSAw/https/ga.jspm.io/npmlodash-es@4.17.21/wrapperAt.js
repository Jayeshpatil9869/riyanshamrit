import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/865f4d28.js";
import "./_/703e5e28.js";
import "./_/da987058.js";
import {
    L as t
} from "./_/2500ebc8.js";
import {
    L as r
} from "./_/93f70315.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import {
    i
} from "./_/98062778.js";
import "./eq.js";
import "./_overRest.js";
import "./isArguments.js";
import "./_/0f88f209.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./memoize.js";
import "./_/6d63bab0.js";
import "./toString.js";
import "./_/b669c81f.js";
import "./_/59d1abe4.js";
import "./get.js";
import {
    b as s
} from "./_/b00ceba6.js";
import "./_/7100b469.js";
import "./_/4175b908.js";
import "./flatten.js";
import {
    f as o
} from "./_/a1bc051a.js";
import m from "./thru.js";
/**
 * This method is the wrapper version of `_.at`.
 *
 * @name at
 * @memberOf _
 * @since 1.0.0
 * @category Seq
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 *
 * _(object).at(['a[0].b.c', 'a[1]']).value();
 * // => [3, 4]
 */
var p = o((function(o) {
    var p = o.length,
        j = p ? o[0] : 0,
        _ = this.__wrapped__,
        interceptor = function(t) {
            return s(t, o)
        };
    if (p > 1 || this.__actions__.length || !(_ instanceof t) || !i(j)) return this.thru(interceptor);
    _ = _.slice(j, +j + (p ? 1 : 0));
    _.__actions__.push({
        func: m,
        args: [interceptor],
        thisArg: void 0
    });
    return new r(_, this.__chain__).thru((function(t) {
        p && !t.length && t.push(void 0);
        return t
    }))
}));
export default p;

//# sourceMappingURL=wrapperAt.js.map