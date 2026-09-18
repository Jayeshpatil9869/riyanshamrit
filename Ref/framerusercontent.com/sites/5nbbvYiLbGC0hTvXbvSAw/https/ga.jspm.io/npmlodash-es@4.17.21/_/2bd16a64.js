import r from "../_arrayMap.js";
import e from "../isArray.js";
import t from "../identity.js";
import {
    b as n
} from "./43b5d56d.js";
import {
    b as i
} from "./59d1abe4.js";
import {
    b as a
} from "./a6855e68.js";
import {
    b as o
} from "./12ea3e42.js";
import {
    c as u
} from "./2ad708e7.js";
/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(r, e) {
    var t = r.length;
    r.sort(e);
    while (t--) r[t] = r[t].value;
    return r
}
/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(r, e, t) {
    var n = -1,
        i = r.criteria,
        a = e.criteria,
        o = i.length,
        s = t.length;
    while (++n < o) {
        var f = u(i[n], a[n]);
        if (f) {
            if (n >= s) return f;
            var m = t[n];
            return f * ("desc" == m ? -1 : 1)
        }
    }
    return r.index - e.index
}
/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(u, s, f) {
    s = s.length ? r(s, (function(r) {
        return e(r) ? function(e) {
            return i(e, 1 === r.length ? r[0] : r)
        } : r
    })) : [t];
    var m = -1;
    s = r(s, n(a));
    var c = o(u, (function(e, t, n) {
        var i = r(s, (function(r) {
            return r(e)
        }));
        return {
            criteria: i,
            index: ++m,
            value: e
        }
    }));
    return baseSortBy(c, (function(r, e) {
        return compareMultiple(r, e, f)
    }))
}
export {
    baseOrderBy as b
};

//# sourceMappingURL=2bd16a64.js.map