import {
    b as t
} from "./1d34989e.js";
/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(c, e, r) {
    var a = c.length;
    r = void 0 === r ? a : r;
    return !e && r >= a ? c : t(c, e, r)
}
export {
    castSlice as c
};

//# sourceMappingURL=16393db3.js.map