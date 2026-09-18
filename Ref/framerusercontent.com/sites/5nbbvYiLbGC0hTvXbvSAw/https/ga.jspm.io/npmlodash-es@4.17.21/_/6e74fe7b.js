import {
    a as o
} from "./703e5e28.js";
import {
    c as r
} from "./0f88f209.js";
import {
    t as s
} from "./b669c81f.js";
import a from "../last.js";
import {
    p as m
} from "./29a9b3d3.js";
/**
 * The base implementation of `_.invoke` without support for individual
 * method arguments.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the method to invoke.
 * @param {Array} args The arguments to invoke the method with.
 * @returns {*} Returns the result of the invoked method.
 */
function baseInvoke(t, f, e) {
    f = r(f, t);
    t = m(t, f);
    var i = null == t ? t : t[s(a(f))];
    return null == i ? void 0 : o(i, t, e)
}
export {
    baseInvoke as b
};

//# sourceMappingURL=6e74fe7b.js.map