import t from "../identity.js";
/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(n) {
    return "function" == typeof n ? n : t
}
export {
    castFunction as c
};

//# sourceMappingURL=cd8e8b5d.js.map