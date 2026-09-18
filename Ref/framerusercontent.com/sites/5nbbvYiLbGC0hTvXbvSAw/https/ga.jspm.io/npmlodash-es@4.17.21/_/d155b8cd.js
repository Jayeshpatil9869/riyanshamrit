import r from "../isArray.js";
import {
    i as t
} from "./98062778.js";
import {
    b as e
} from "./e524acca.js";
import s from "../isArguments.js";
import a from "../isBuffer.js";
import o from "../isTypedArray.js";
var f = Object.prototype;
var i = f.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(f, m) {
    var p = r(f),
        n = !p && s(f),
        y = !p && !n && a(f),
        j = !p && !n && !y && o(f),
        g = p || n || y || j,
        h = g ? e(f.length, String) : [],
        u = h.length;
    for (var b in f) !m && !i.call(f, b) || g && ("length" == b || y && ("offset" == b || "parent" == b) || j && ("buffer" == b || "byteLength" == b || "byteOffset" == b) || t(b, u)) || h.push(b);
    return h
}
export {
    arrayLikeKeys as a
};

//# sourceMappingURL=d155b8cd.js.map