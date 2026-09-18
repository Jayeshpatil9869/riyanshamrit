import "./isObject.js";
import "./_/865f4d28.js";
import "./_/da987058.js";
import {
    L as r
} from "./_/2500ebc8.js";
import {
    L as e
} from "./_/93f70315.js";
import s from "./reverse.js";
import t from "./thru.js";
/**
 * This method is the wrapper version of `_.reverse`.
 *
 * **Note:** This method mutates the wrapped array.
 *
 * @name reverse
 * @memberOf _
 * @since 0.1.0
 * @category Seq
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _(array).reverse().value()
 * // => [3, 2, 1]
 *
 * console.log(array);
 * // => [3, 2, 1]
 */
function wrapperReverse() {
    var i = this.__wrapped__;
    if (i instanceof r) {
        var _ = i;
        this.__actions__.length && (_ = new r(this));
        _ = _.reverse();
        _.__actions__.push({
            func: t,
            args: [s],
            thisArg: void 0
        });
        return new e(_, this.__chain__)
    }
    return this.thru(s)
}
export default wrapperReverse;

//# sourceMappingURL=wrapperReverse.js.map