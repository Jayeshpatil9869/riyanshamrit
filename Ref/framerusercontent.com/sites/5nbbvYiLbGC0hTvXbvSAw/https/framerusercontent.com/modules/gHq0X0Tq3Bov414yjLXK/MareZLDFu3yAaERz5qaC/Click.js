// DO NOT DELETE THIS FILE! It's integral functionality of the badge.
import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment
} from "react/jsx-runtime";
import {
    useSyncExternalStore,
    forwardRef
} from "react";
import {
    RenderTarget
} from "framer";
/**
 * Override for the "Made in Framer" badge that adds two behaviors:
 * 1. Hides the badge when in an iframe with a framer.com parent domain
 * 2. Adds click handler to open Framer with UTM tracking
 *
 * Badge hiding works by detecting if the current page is running inside an iframe
 * and checking if the parent domain is framer.com or a subdomain. This allows
 * embedding sites (e.g., Components pages) to hide the badge when appropriate.
 *
 * Cross-browser compatibility:
 * - Chrome, Safari, Edge: Uses window.location.ancestorOrigins API
 * - Firefox: Falls back to document.referrer (limited by security restrictions)
 *
 * Note: Also hides the badge in Framer's Preview mode since it runs in a
 * framer.com iframe.
 */
const FRAMER_DOMAIN = "framer.com";

function getIsIframeOnFramerDomain() {
    let isIframe = false; // Check if we're in an iframe
    try {
        isIframe = window.self !== window.top;
    } catch { // If we can't access window.top, we're likely in a cross-origin iframe
        isIframe = true;
    }
    if (!isIframe) {
        return false;
    } // Check if we're running on framer.com
    let parentHost = null;
    let isFramerDomain = false; // Try ancestorOrigins first (Chrome, Safari, Edge)
    if (window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0) {
        const ancestorOrigin = window.location.ancestorOrigins[0];
        try {
            const ancestorUrl = new URL(ancestorOrigin);
            parentHost = ancestorUrl.host;
        } catch (error) { // ignore malformed URL
        }
    } else if (document.referrer) { // Fallback to referrer for browsers without ancestorOrigins (Firefox)
        try {
            const referrerUrl = new URL(document.referrer);
            parentHost = referrerUrl.host;
        } catch (error) { // ignore malformed URL
        }
    }
    if (parentHost) {
        isFramerDomain = parentHost === FRAMER_DOMAIN || parentHost.endsWith(`.${FRAMER_DOMAIN}`);
    }
    return isFramerDomain;
}
const noopSubscribe = () => () => {};
const getSnapshot = () => getIsIframeOnFramerDomain();
const getServerSnapshot = () => false;
export function withFramerBadgeHandling(Component) {
    return /*#__PURE__*/ forwardRef((props, ref) => {
        const shouldHide = useSyncExternalStore(noopSubscribe, getSnapshot, getServerSnapshot);
        const isCanvas = RenderTarget.current() === RenderTarget.canvas;
        if (shouldHide && !isCanvas) {
            return null;
        }
        return /*#__PURE__*/ _jsx(Component, { ...props,
            ref: ref,
            onClick: e => {
                e.preventDefault();
                window.open( // This is the link that will actually open (we prevent the default click handler; the link is important for SEO.)
                    `https://www.framer.com/r/badge/?utm_campaign=freeplanbadge&utm_source=${encodeURIComponent(window?.location?.origin)}`);
            },
            style: { ...props.style,
                pointerEvents: "auto"
            }, // important for SEO:
            title: "Create a free website with Framer, the website builder loved by startups, designers and agencies.",
            className: props.className + " __framer-badge"
        });
    });
} // We use overrides so that the badge doesn't load custom fonts, as the text is visually hidden.
// This is important for SEO:
export function withText(Component) {
    return /*#__PURE__*/ forwardRef((props, ref) => {
        return /*#__PURE__*/ _jsxs(_Fragment, {
            children: [ /*#__PURE__*/ _jsx("p", {
                style: {
                    position: "absolute",
                    transform: "scale(0.001)"
                },
                children: "Create a free website with Framer, the website builder loved by startups, designers and agencies."
            }), /*#__PURE__*/ _jsx(Component, { ...props,
                ref: ref
            })]
        });
    });
}
export const __FramerMetadata__ = {
    "exports": {
        "withFramerBadgeHandling": {
            "type": "reactHoc",
            "name": "withFramerBadgeHandling",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "withText": {
            "type": "reactHoc",
            "name": "withText",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Click.map