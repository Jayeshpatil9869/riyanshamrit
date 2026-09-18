import e from "../_baseRest.js";
import {
    i as r
} from "./196bc89c.js";
/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(t) {
    return e((function(e, i) {
        var o = -1,
            n = i.length,
            s = n > 1 ? i[n - 1] : void 0,
            c = n > 2 ? i[2] : void 0;
        s = t.length > 3 && "function" == typeof s ? (n--, s) : void 0;
        if (c && r(i[0], i[1], c)) {
            s = n < 3 ? void 0 : s;
            n = 1
        }
        e = Object(e);
        while (++o < n) {
            var a = i[o];
            a && t(e, a, o, s)
        }
        return e
    }))
}
export {
    createAssigner as c
};

//# sourceMappingURL=218be937.js.map