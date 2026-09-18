import {
    b as o
} from "./865f4d28.js";
import {
    b as p
} from "./da987058.js";
/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(o, p) {
    this.__wrapped__ = o;
    this.__actions__ = [];
    this.__chain__ = !!p;
    this.__index__ = 0;
    this.__values__ = void 0
}
LodashWrapper.prototype = o(p.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;
export {
    LodashWrapper as L
};

//# sourceMappingURL=93f70315.js.map