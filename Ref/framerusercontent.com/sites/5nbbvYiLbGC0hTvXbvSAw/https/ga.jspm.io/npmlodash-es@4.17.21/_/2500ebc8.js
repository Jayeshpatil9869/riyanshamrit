import {
    b as _
} from "./865f4d28.js";
import {
    b as r
} from "./da987058.js";
var t = 4294967295;
/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper(_) {
    this.__wrapped__ = _;
    this.__actions__ = [];
    this.__dir__ = 1;
    this.__filtered__ = false;
    this.__iteratees__ = [];
    this.__takeCount__ = t;
    this.__views__ = []
}
LazyWrapper.prototype = _(r.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;
export {
    LazyWrapper as L
};

//# sourceMappingURL=2500ebc8.js.map