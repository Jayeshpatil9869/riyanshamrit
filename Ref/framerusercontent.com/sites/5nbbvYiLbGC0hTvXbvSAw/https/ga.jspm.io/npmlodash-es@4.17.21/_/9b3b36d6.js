import {
    M as e
} from "./7c57ec77.js";
var t = "__lodash_hash_undefined__";
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(e) {
    this.__data__.set(e, t);
    return this
}
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(e) {
    return this.__data__.has(e)
}
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(t) {
    var a = -1,
        h = null == t ? 0 : t.length;
    this.__data__ = new e;
    while (++a < h) this.add(t[a])
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(e, t) {
    return e.has(t)
}
export {
    SetCache as S, cacheHas as c
};

//# sourceMappingURL=9b3b36d6.js.map