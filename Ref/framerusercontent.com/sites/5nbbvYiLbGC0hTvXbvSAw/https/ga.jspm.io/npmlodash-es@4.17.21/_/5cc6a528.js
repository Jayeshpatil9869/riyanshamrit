import a from "../escape.js";
var e = /<%=([\s\S]+?)%>/g;
var r = /<%-([\s\S]+?)%>/g;
var s = /<%([\s\S]+?)%>/g;
/**
 * By default, the template delimiters used by lodash are like those in
 * embedded Ruby (ERB) as well as ES2015 template strings. Change the
 * following template settings to use alternative delimiters.
 *
 * @static
 * @memberOf _
 * @type {Object}
 */
var p = {
    /**
     * Used to detect `data` property values to be HTML-escaped.
     *
     * @memberOf _.templateSettings
     * @type {RegExp}
     */
    escape: r,
    /**
     * Used to detect code to be evaluated.
     *
     * @memberOf _.templateSettings
     * @type {RegExp}
     */
    evaluate: s,
    /**
     * Used to detect `data` property values to inject.
     *
     * @memberOf _.templateSettings
     * @type {RegExp}
     */
    interpolate: e,
    /**
     * Used to reference the data object in the template text.
     *
     * @memberOf _.templateSettings
     * @type {string}
     */
    variable: "",
    /**
     * Used to import variables into the compiled template.
     *
     * @memberOf _.templateSettings
     * @type {Object}
     */
    imports: {
        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        _: {
            escape: a
        }
    }
};
export {
    e as r, p as t
};

//# sourceMappingURL=5cc6a528.js.map