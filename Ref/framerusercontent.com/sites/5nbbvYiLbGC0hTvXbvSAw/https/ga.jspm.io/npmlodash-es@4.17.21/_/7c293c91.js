import r from "../isArray.js";
import e from "../keys.js";
import {
    a as t
} from "./7100b469.js";
import s from "../_arrayFilter.js";
import a from "../stubArray.js";
var o = Object.prototype;
var l = o.propertyIsEnumerable;
var n = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var y = n ? function(r) {
    if (null == r) return [];
    r = Object(r);
    return s(n(r), (function(e) {
        return l.call(r, e)
    }))
} : a;
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(e, s, a) {
    var o = s(e);
    return r(e) ? o : t(o, a(e))
}
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(r) {
    return baseGetAllKeys(r, e, y)
}
export {
    getAllKeys as a, baseGetAllKeys as b, y as g
};

//# sourceMappingURL=7c293c91.js.map