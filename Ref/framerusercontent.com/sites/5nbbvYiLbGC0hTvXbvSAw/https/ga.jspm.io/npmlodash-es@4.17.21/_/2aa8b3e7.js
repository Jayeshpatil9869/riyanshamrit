import {
    i as r
} from "./0f88f209.js";
import {
    t as o
} from "./b669c81f.js";
import s from "../get.js";
import {
    b as t
} from "./d971f180.js";
import {
    i as m
} from "./7e89d739.js";
import {
    m as f
} from "./3cfb9cd3.js";
import a from "../hasIn.js";
var i = 1,
    e = 2;
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(p, c) {
    return r(p) && m(c) ? f(o(p), c) : function(r) {
        var o = s(r, p);
        return void 0 === o && o === c ? a(r, p) : t(c, o, i | e)
    }
}
export {
    baseMatchesProperty as b
};

//# sourceMappingURL=2aa8b3e7.js.map