import {
    c as t
} from "./0f88f209.js";
import {
    t as e
} from "./b669c81f.js";
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(r, o) {
    o = t(o, r);
    var s = 0,
        a = o.length;
    while (null != r && s < a) r = r[e(o[s++])];
    return s && s == a ? r : void 0
}
export {
    baseGet as b
};

//# sourceMappingURL=59d1abe4.js.map