import r from "../isSymbol.js";
var t = 1 / 0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(o) {
    if ("string" == typeof o || r(o)) return o;
    var e = o + "";
    return "0" == e && 1 / o == -t ? "-0" : e
}
export {
    toKey as t
};

//# sourceMappingURL=b669c81f.js.map