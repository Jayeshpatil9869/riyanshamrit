import r from "../keysIn.js";
import {
    a as s
} from "./7100b469.js";
import {
    g as t
} from "./e52eecc0.js";
import e from "../stubArray.js";
import {
    g as o,
    b as a
} from "./7c293c91.js";
var m = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var n = m ? function(r) {
    var e = [];
    while (r) {
        s(e, o(r));
        r = t(r)
    }
    return e
} : e;
/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(s) {
    return a(s, r, n)
}
export {
    n as a, getAllKeysIn as g
};

//# sourceMappingURL=5f9acba5.js.map