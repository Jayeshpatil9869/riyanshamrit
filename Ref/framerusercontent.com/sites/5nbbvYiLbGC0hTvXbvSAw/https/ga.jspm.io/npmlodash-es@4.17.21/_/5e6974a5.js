import {
    d as e
} from "./198d994d.js";
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(a, r, s) {
    "__proto__" == r && e ? e(a, r, {
        configurable: true,
        enumerable: true,
        value: s,
        writable: true
    }) : a[r] = s
}
export {
    baseAssignValue as b
};

//# sourceMappingURL=5e6974a5.js.map