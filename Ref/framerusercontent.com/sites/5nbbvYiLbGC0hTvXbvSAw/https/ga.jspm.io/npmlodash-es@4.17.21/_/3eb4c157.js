import r from "../isArray.js";
import {
    b as a
} from "./a6855e68.js";
import {
    b as t
} from "./4b1fb593.js";
/**
 * A specialized version of `baseAggregator` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function arrayAggregator(r, a, t, e) {
    var g = -1,
        o = null == r ? 0 : r.length;
    while (++g < o) {
        var n = r[g];
        a(e, n, t(n), r)
    }
    return e
}
/**
 * Aggregates elements of `collection` on `accumulator` with keys transformed
 * by `iteratee` and values set by `setter`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function baseAggregator(r, a, e, g) {
    t(r, (function(r, t, o) {
        a(g, r, e(r), o)
    }));
    return g
}
/**
 * Creates a function like `_.groupBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} [initializer] The accumulator object initializer.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(t, e) {
    return function(g, o) {
        var n = r(g) ? arrayAggregator : baseAggregator,
            i = e ? e() : {};
        return n(g, t, a(o, 2), i)
    }
}
export {
    createAggregator as c
};

//# sourceMappingURL=3eb4c157.js.map