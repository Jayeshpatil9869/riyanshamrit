import {
    b as t
} from "./ccff797b.js";
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(t, e) {
    return null == t ? void 0 : t[e]
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(e, r) {
    var a = getValue(e, r);
    return t(a) ? a : void 0
}
export {
    getNative as g
};

//# sourceMappingURL=e9d6e250.js.map