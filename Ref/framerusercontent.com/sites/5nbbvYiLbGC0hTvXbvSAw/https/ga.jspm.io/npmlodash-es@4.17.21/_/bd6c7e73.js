import r from "../isArray.js";
import {
    a as t,
    g as e,
    i as a
} from "./80a12b8f.js";
import {
    L as o
} from "./93f70315.js";
import {
    f as n
} from "./a1bc051a.js";
var i = "Expected a function";
var p = 8,
    f = 32,
    l = 128,
    s = 256;
/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(u) {
    return n((function(n) {
        var h = n.length,
            c = h,
            v = o.prototype.thru;
        u && n.reverse();
        while (c--) {
            var w = n[c];
            if ("function" != typeof w) throw new TypeError(i);
            if (v && !m && "wrapper" == t(w)) var m = new o([], true)
        }
        c = m ? c : h;
        while (++c < h) {
            w = n[c];
            var y = t(w),
                g = "wrapper" == y ? e(w) : void 0;
            m = g && a(g[0]) && g[1] == (l | p | f | s) && !g[4].length && 1 == g[9] ? m[t(g[0])].apply(m, g[3]) : 1 == w.length && a(w) ? m[y]() : m.thru(w)
        }
        return function() {
            var t = arguments,
                e = t[0];
            if (m && 1 == t.length && r(e)) return m.plant(e).value();
            var a = 0,
                o = h ? n[a].apply(this, t) : e;
            while (++a < h) o = n[a].call(this, o);
            return o
        }
    }))
}
export {
    createFlow as c
};

//# sourceMappingURL=bd6c7e73.js.map