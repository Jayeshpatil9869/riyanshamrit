import r from "../_arrayMap.js";
import {
    g as a
} from "./5cc66d2f.js";
import {
    m as o
} from "./6703045c.js";
/**
 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
 * of key-value pairs for `object` corresponding to the property names of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the key-value pairs.
 */
function baseToPairs(a, o) {
    return r(o, (function(r) {
        return [r, a[r]]
    }))
}
/**
 * Converts `set` to its value-value pairs.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the value-value pairs.
 */
function setToPairs(r) {
    var a = -1,
        o = Array(r.size);
    r.forEach((function(r) {
        o[++a] = [r, r]
    }));
    return o
}
var t = "[object Map]",
    e = "[object Set]";
/**
 * Creates a `_.toPairs` or `_.toPairsIn` function.
 *
 * @private
 * @param {Function} keysFunc The function to get the keys of a given object.
 * @returns {Function} Returns the new pairs function.
 */
function createToPairs(r) {
    return function(n) {
        var s = a(n);
        return s == t ? o(n) : s == e ? setToPairs(n) : baseToPairs(n, r(n))
    }
}
export {
    createToPairs as c
};

//# sourceMappingURL=bb207768.js.map