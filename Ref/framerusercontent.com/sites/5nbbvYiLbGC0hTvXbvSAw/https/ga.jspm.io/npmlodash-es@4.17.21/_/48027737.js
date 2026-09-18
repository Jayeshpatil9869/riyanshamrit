import {
    i as r
} from "./df9293ee.js";
import {
    o as e
} from "./7953e050.js";
var t = e(Object.keys, Object);
var o = Object.prototype;
var s = o.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(e) {
    if (!r(e)) return t(e);
    var o = [];
    for (var a in Object(e)) s.call(e, a) && "constructor" != a && o.push(a);
    return o
}
export {
    baseKeys as b
};

//# sourceMappingURL=48027737.js.map