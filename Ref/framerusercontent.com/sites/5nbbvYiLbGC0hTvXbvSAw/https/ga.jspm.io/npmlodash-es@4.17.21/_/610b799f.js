import n from "../isFunction.js";
import r from "../_arrayFilter.js";
/**
 * The base implementation of `_.functions` which creates an array of
 * `object` function property names filtered from `props`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The property names to filter.
 * @returns {Array} Returns the function names.
 */
function baseFunctions(t, o) {
    return r(o, (function(r) {
        return n(t[r])
    }))
}
export {
    baseFunctions as b
};

//# sourceMappingURL=610b799f.js.map