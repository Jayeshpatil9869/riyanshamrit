import r from "../toString.js";
import {
    c as t
} from "./16393db3.js";
import {
    h as o
} from "./1386403c.js";
import {
    s
} from "./0b311353.js";
/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(a) {
    return function(i) {
        i = r(i);
        var e = o(i) ? s(i) : void 0;
        var c = e ? e[0] : i.charAt(0);
        var m = e ? t(e, 1).join("") : i.slice(1);
        return c[a]() + m
    }
}
export {
    createCaseFirst as c
};

//# sourceMappingURL=5c8f936a.js.map