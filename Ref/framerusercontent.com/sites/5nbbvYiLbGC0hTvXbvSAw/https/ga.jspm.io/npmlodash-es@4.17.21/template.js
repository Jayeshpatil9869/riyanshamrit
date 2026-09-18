import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/703e5e28.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_/98062778.js";
import "./_/5e6974a5.js";
import r from "./eq.js";
import "./_/60d30700.js";
import "./_/8dfaf20e.js";
import "./_overRest.js";
import "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import {
    i as t
} from "./_/196bc89c.js";
import "./_/218be937.js";
import "./_/df9293ee.js";
import "./_/e524acca.js";
import "./isArguments.js";
import "./stubFalse.js";
import "./isBuffer.js";
import "./isTypedArray.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import "./_/d155b8cd.js";
import "./_/7953e050.js";
import "./_/48027737.js";
import s from "./keys.js";
import "./keysIn.js";
import e from "./assignInWith.js";
import o from "./toString.js";
import "./_/e52eecc0.js";
import "./isPlainObject.js";
import i from "./isError.js";
import p from "./attempt.js";
import "./_/8fb9d566.js";
import "./escape.js";
import {
    b as a
} from "./_/f92f157a.js";
import {
    t as n,
    r as m
} from "./_/5cc6a528.js";
var _ = Object.prototype;
var j = _.hasOwnProperty;
/**
 * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
 * of source objects to the destination object for all destination properties
 * that resolve to `undefined`.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsAssignIn(t, s, e, o) {
    return void 0 === t || r(t, _[e]) && !j.call(o, e) ? s : t
}
var c = {
    "\\": "\\",
    "'": "'",
    "\n": "n",
    "\r": "r",
    "\u2028": "u2028",
    "\u2029": "u2029"
};
/**
 * Used by `_.template` to escape characters for inclusion in compiled string literals.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeStringChar(r) {
    return "\\" + c[r]
}
var u = "Invalid `variable` option passed into `_.template`";
var f = /\b__p \+= '';/g,
    l = /\b(__p \+=) '' \+/g,
    b = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
var v = /[()=,{}\[\]\/\s]/;
var d = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
var g = /($^)/;
var y = /['\n\r\u2028\u2029\\]/g;
var h = Object.prototype;
var A = h.hasOwnProperty;
/**
 * Creates a compiled template function that can interpolate data properties
 * in "interpolate" delimiters, HTML-escape interpolated data properties in
 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
 * properties may be accessed as free variables in the template. If a setting
 * object is given, it takes precedence over `_.templateSettings` values.
 *
 * **Note:** In the development build `_.template` utilizes
 * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
 * for easier debugging.
 *
 * For more information on precompiling templates see
 * [lodash's custom builds documentation](https://lodash.com/custom-builds).
 *
 * For more information on Chrome extension sandboxes see
 * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The template string.
 * @param {Object} [options={}] The options object.
 * @param {RegExp} [options.escape=_.templateSettings.escape]
 *  The HTML "escape" delimiter.
 * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
 *  The "evaluate" delimiter.
 * @param {Object} [options.imports=_.templateSettings.imports]
 *  An object to import into the template as free variables.
 * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
 *  The "interpolate" delimiter.
 * @param {string} [options.sourceURL='templateSources[n]']
 *  The sourceURL of the compiled template.
 * @param {string} [options.variable='obj']
 *  The data object variable name.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the compiled template function.
 * @example
 *
 * // Use the "interpolate" delimiter to create a compiled template.
 * var compiled = _.template('hello <%= user %>!');
 * compiled({ 'user': 'fred' });
 * // => 'hello fred!'
 *
 * // Use the HTML "escape" delimiter to escape data property values.
 * var compiled = _.template('<b><%- value %></b>');
 * compiled({ 'value': '<script>' });
 * // => '<b>&lt;script&gt;</b>'
 *
 * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
 * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
 * compiled({ 'users': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // Use the internal `print` function in "evaluate" delimiters.
 * var compiled = _.template('<% print("hello " + user); %>!');
 * compiled({ 'user': 'barney' });
 * // => 'hello barney!'
 *
 * // Use the ES template literal delimiter as an "interpolate" delimiter.
 * // Disable support by replacing the "interpolate" delimiter.
 * var compiled = _.template('hello ${ user }!');
 * compiled({ 'user': 'pebbles' });
 * // => 'hello pebbles!'
 *
 * // Use backslashes to treat delimiters as plain text.
 * var compiled = _.template('<%= "\\<%- value %\\>" %>');
 * compiled({ 'value': 'ignored' });
 * // => '<%- value %>'
 *
 * // Use the `imports` option to import `jQuery` as `jq`.
 * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
 * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
 * compiled({ 'users': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // Use the `sourceURL` option to specify a custom sourceURL for the template.
 * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
 * compiled(data);
 * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
 *
 * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
 * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
 * compiled.source;
 * // => function(data) {
 * //   var __t, __p = '';
 * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
 * //   return __p;
 * // }
 *
 * // Use custom template delimiters.
 * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
 * var compiled = _.template('hello {{ user }}!');
 * compiled({ 'user': 'mustache' });
 * // => 'hello mustache!'
 *
 * // Use the `source` property to inline compiled templates for meaningful
 * // line numbers in error messages and stack traces.
 * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
 *   var JST = {\
 *     "main": ' + _.template(mainText).source + '\
 *   };\
 * ');
 */
function template(r, _, j) {
    var c = n.imports._.templateSettings || n;
    j && t(r, _, j) && (_ = void 0);
    r = o(r);
    _ = e({}, _, c, customDefaultsAssignIn);
    var h = e({}, _.imports, c.imports, customDefaultsAssignIn),
        O = s(h),
        w = a(h, O);
    var I, L, R = 0,
        S = _.interpolate || g,
        $ = "__p += '";
    var k = RegExp((_.escape || g).source + "|" + S.source + "|" + (S === m ? d : g).source + "|" + (_.evaluate || g).source + "|$", "g");
    var D = A.call(_, "sourceURL") ? "//# sourceURL=" + (_.sourceURL + "").replace(/\s/g, " ") + "\n" : "";
    r.replace(k, (function(t, s, e, o, i, p) {
        e || (e = o);
        $ += r.slice(R, p).replace(y, escapeStringChar);
        if (s) {
            I = true;
            $ += "' +\n__e(" + s + ") +\n'"
        }
        if (i) {
            L = true;
            $ += "';\n" + i + ";\n__p += '"
        }
        e && ($ += "' +\n((__t = (" + e + ")) == null ? '' : __t) +\n'");
        R = p + t.length;
        return t
    }));
    $ += "';\n";
    var E = A.call(_, "variable") && _.variable;
    if (E) {
        if (v.test(E)) throw new Error(u)
    } else $ = "with (obj) {\n" + $ + "\n}\n";
    $ = (L ? $.replace(f, "") : $).replace(l, "$1").replace(b, "$1;");
    $ = "function(" + (E || "obj") + ") {\n" + (E ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (I ? ", __e = _.escape" : "") + (L ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + $ + "return __p\n}";
    var F = p((function() {
        return Function(O, D + "return " + $).apply(void 0, w)
    }));
    F.source = $;
    if (i(F)) throw F;
    return F
}
export default template;

//# sourceMappingURL=template.js.map