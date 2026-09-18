import "./isObject.js";
import "./_/865f4d28.js";
import {
    b as _
} from "./_/da987058.js";
import "./_/2500ebc8.js";
import "./_/93f70315.js";
import "./_copyArray.js";
import {
    w as r
} from "./_/b0a4ea9b.js";
/**
 * Creates a clone of the chain sequence planting `value` as the wrapped value.
 *
 * @name plant
 * @memberOf _
 * @since 3.2.0
 * @category Seq
 * @param {*} value The value to plant.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2]).map(square);
 * var other = wrapped.plant([3, 4]);
 *
 * other.value();
 * // => [9, 16]
 *
 * wrapped.value();
 * // => [1, 4]
 */
function wrapperPlant(a) {
    var p, t = this;
    while (t instanceof _) {
        var e = r(t);
        e.__index__ = 0;
        e.__values__ = void 0;
        p ? i.__wrapped__ = e : p = e;
        var i = e;
        t = t.__wrapped__
    }
    i.__wrapped__ = a;
    return p
}
export default wrapperPlant;

//# sourceMappingURL=plant.js.map