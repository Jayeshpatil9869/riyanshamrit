import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import i from "./isObject.js";
import e from "./toNumber.js";
import n from "./now.js";
var r = "Expected a function";
var t = Math.max,
    o = Math.min;
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(u, a, d) {
    var f, c, m, s, l, v, p = 0,
        g = false,
        E = false,
        b = true;
    if ("function" != typeof u) throw new TypeError(r);
    a = e(a) || 0;
    if (i(d)) {
        g = !!d.leading;
        E = "maxWait" in d;
        m = E ? t(e(d.maxWait) || 0, a) : m;
        b = "trailing" in d ? !!d.trailing : b
    }

    function invokeFunc(i) {
        var e = f,
            n = c;
        f = c = void 0;
        p = i;
        s = u.apply(n, e);
        return s
    }

    function leadingEdge(i) {
        p = i;
        l = setTimeout(timerExpired, a);
        return g ? invokeFunc(i) : s
    }

    function remainingWait(i) {
        var e = i - v,
            n = i - p,
            r = a - e;
        return E ? o(r, m - n) : r
    }

    function shouldInvoke(i) {
        var e = i - v,
            n = i - p;
        return void 0 === v || e >= a || e < 0 || E && n >= m
    }

    function timerExpired() {
        var i = n();
        if (shouldInvoke(i)) return trailingEdge(i);
        l = setTimeout(timerExpired, remainingWait(i))
    }

    function trailingEdge(i) {
        l = void 0;
        if (b && f) return invokeFunc(i);
        f = c = void 0;
        return s
    }

    function cancel() {
        void 0 !== l && clearTimeout(l);
        p = 0;
        f = v = c = l = void 0
    }

    function flush() {
        return void 0 === l ? s : trailingEdge(n())
    }

    function debounced() {
        var i = n(),
            e = shouldInvoke(i);
        f = arguments;
        c = this;
        v = i;
        if (e) {
            if (void 0 === l) return leadingEdge(v);
            if (E) {
                clearTimeout(l);
                l = setTimeout(timerExpired, a);
                return invokeFunc(v)
            }
        }
        void 0 === l && (l = setTimeout(timerExpired, a));
        return s
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced
}
export default debounce;

//# sourceMappingURL=debounce.js.map