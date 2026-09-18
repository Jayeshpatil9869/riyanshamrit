import {
    g as t
} from "./e9d6e250.js";
import e from "../eq.js";
import {
    M as a
} from "./72487e58.js";
var s = t(Object, "create");

function hashClear() {
    this.__data__ = s ? s(null) : {};
    this.size = 0
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(t) {
    var e = this.has(t) && delete this.__data__[t];
    this.size -= e ? 1 : 0;
    return e
}
var h = "__lodash_hash_undefined__";
var r = Object.prototype;
var i = r.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(t) {
    var e = this.__data__;
    if (s) {
        var a = e[t];
        return a === h ? void 0 : a
    }
    return i.call(e, t) ? e[t] : void 0
}
var n = Object.prototype;
var o = n.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(t) {
    var e = this.__data__;
    return s ? void 0 !== e[t] : o.call(e, t)
}
var c = "__lodash_hash_undefined__";
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(t, e) {
    var a = this.__data__;
    this.size += this.has(t) ? 0 : 1;
    a[t] = s && void 0 === e ? c : e;
    return this
}
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(t) {
    var e = -1,
        a = null == t ? 0 : t.length;
    this.clear();
    while (++e < a) {
        var s = t[e];
        this.set(s[0], s[1])
    }
}
Hash.prototype.clear = hashClear;
Hash.prototype.delete = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

function listCacheClear() {
    this.__data__ = [];
    this.size = 0
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(t, a) {
    var s = t.length;
    while (s--)
        if (e(t[s][0], a)) return s;
    return -1
}
var p = Array.prototype;
var l = p.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(t) {
    var e = this.__data__,
        a = assocIndexOf(e, t);
    if (a < 0) return false;
    var s = e.length - 1;
    a == s ? e.pop() : l.call(e, a, 1);
    --this.size;
    return true
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(t) {
    var e = this.__data__,
        a = assocIndexOf(e, t);
    return a < 0 ? void 0 : e[a][1]
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(t) {
    return assocIndexOf(this.__data__, t) > -1
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(t, e) {
    var a = this.__data__,
        s = assocIndexOf(a, t);
    if (s < 0) {
        ++this.size;
        a.push([t, e])
    } else a[s][1] = e;
    return this
}
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(t) {
    var e = -1,
        a = null == t ? 0 : t.length;
    this.clear();
    while (++e < a) {
        var s = t[e];
        this.set(s[0], s[1])
    }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype.delete = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
        hash: new Hash,
        map: new(a || ListCache),
        string: new Hash
    }
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(t) {
    var e = typeof t;
    return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(t, e) {
    var a = t.__data__;
    return isKeyable(e) ? a["string" == typeof e ? "string" : "hash"] : a.map
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(t) {
    var e = getMapData(this, t).delete(t);
    this.size -= e ? 1 : 0;
    return e
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(t) {
    return getMapData(this, t).get(t)
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(t) {
    return getMapData(this, t).has(t)
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(t, e) {
    var a = getMapData(this, t),
        s = a.size;
    a.set(t, e);
    this.size += a.size == s ? 0 : 1;
    return this
}
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(t) {
    var e = -1,
        a = null == t ? 0 : t.length;
    this.clear();
    while (++e < a) {
        var s = t[e];
        this.set(s[0], s[1])
    }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype.delete = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
export {
    ListCache as L, MapCache as M
};

//# sourceMappingURL=7c57ec77.js.map