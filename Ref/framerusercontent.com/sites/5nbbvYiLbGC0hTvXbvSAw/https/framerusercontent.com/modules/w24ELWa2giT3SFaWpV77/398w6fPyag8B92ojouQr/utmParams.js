// Declare the utmParams property on the global window object
// Cookie utility functions
function setCookie(name, value, days = 30) {
    const date = new Date;
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
    const expires = `expires=${date.toUTCString()}`; // Remove SameSite=Lax and add secure flag if on HTTPS
    const secure = window.location.protocol === "https:" ? ";secure" : "";
    document.cookie = `${name}=${value};${expires};path=/${secure}`;
}

function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}
export function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    utmKeys.forEach(key => {
        const value = urlParams.get(key);
        if (value) {
            utmParams[key] = value;
        }
    }); // Store UTM params in cookies if we have any
    if (Object.keys(utmParams).length > 0) {
        try { // Store each UTM parameter as a separate cookie
            Object.entries(utmParams).forEach(([key, value]) => {
                setCookie(key, value);
            }); // Also store as a single JSON object for Shopify
            setCookie("_shopify_utm", JSON.stringify(utmParams));
            window.utmParams = utmParams;
        } catch (error) {
            console.error("Error storing UTM parameters:", error);
        }
    }
    return utmParams;
}
export function getSCARefParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const scaRefParams = {};
    const scaRefKeys = ["sca_ref", "sca_source", "sca_medium", "sca_campaign", "sca_term", "sca_content"];
    scaRefKeys.forEach(key => {
        const value = urlParams.get(key);
        if (value) {
            scaRefParams[key] = value;
        }
    }); // Store SCA ref params in cookies if we have any
    if (Object.keys(scaRefParams).length > 0) {
        try { // Store each SCA ref parameter as a separate cookie
            Object.entries(scaRefParams).forEach(([key, value]) => {
                setCookie(key, value);
            }); // Also store as a single JSON object for Shopify
            setCookie("_shopify_sca_ref", JSON.stringify(scaRefParams));
            window.scaRefParams = scaRefParams;
        } catch (error) {
            console.error("Error storing SCA ref parameters:", error);
        }
    }
    return scaRefParams;
}
export function getStoredUTMParameters() { // First try to get from window object (for current session)
    if (window.utmParams && Object.keys(window.utmParams).length > 0) {
        return window.utmParams;
    } // Then try to get from cookies
    try { // First try to get from Shopify's format
        const shopifyUtm = getCookie("_shopify_utm");
        if (shopifyUtm) {
            try {
                const parsedParams = JSON.parse(shopifyUtm);
                window.utmParams = parsedParams;
                return parsedParams;
            } catch (e) {
                console.error("Error parsing Shopify UTM params:", e);
            }
        } // Fallback to individual cookies
        const utmParams = {};
        const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
        utmKeys.forEach(key => {
            const value = getCookie(key);
            if (value) {
                utmParams[key] = value;
            }
        });
        if (Object.keys(utmParams).length > 0) { // Also set on window for easy access
            window.utmParams = utmParams;
            return utmParams;
        }
    } catch (error) {
        console.error("Error retrieving stored UTM parameters:", error);
    }
    return {};
}
export function getStoredSCARefParameters() { // First try to get from window object (for current session)
    if (window.scaRefParams && Object.keys(window.scaRefParams).length > 0) {
        return window.scaRefParams;
    } // Then try to get from cookies
    try { // First try to get from Shopify's format
        const shopifyScaRef = getCookie("_shopify_sca_ref");
        if (shopifyScaRef) {
            try {
                const parsedParams = JSON.parse(shopifyScaRef);
                window.scaRefParams = parsedParams;
                return parsedParams;
            } catch (e) {
                console.error("Error parsing Shopify SCA ref params:", e);
            }
        } // Fallback to individual cookies
        const scaRefParams = {};
        const scaRefKeys = ["sca_ref", "sca_source", "sca_medium", "sca_campaign", "sca_term", "sca_content"];
        scaRefKeys.forEach(key => {
            const value = getCookie(key);
            if (value) {
                scaRefParams[key] = value;
            }
        });
        if (Object.keys(scaRefParams).length > 0) { // Also set on window for easy access
            window.scaRefParams = scaRefParams;
            return scaRefParams;
        }
    } catch (error) {
        console.error("Error retrieving stored SCA ref parameters:", error);
    }
    return {};
}
export function appendUTMParamsToUrl(checkoutUrl) {
    if (!checkoutUrl) return checkoutUrl; // Get UTM params from cookies instead of current URL
    const utmParams = getStoredUTMParameters(); // If no stored UTM params, check current URL as fallback
    if (Object.keys(utmParams).length === 0) {
        getUTMParameters() // This will store them if present
        ;
    } // Get the (potentially) updated UTM params
    const finalUtmParams = getStoredUTMParameters();
    if (Object.keys(finalUtmParams).length > 0) {
        try {
            const url = new URL(checkoutUrl); // Add UTM parameters to the URL
            Object.keys(finalUtmParams).forEach(key => { // Only append if the parameter doesn't already exist in the URL
                if (!url.searchParams.has(key)) {
                    url.searchParams.append(key, finalUtmParams[key]);
                }
            });
            const finalUrl = url.toString();
            return finalUrl;
        } catch (error) {
            console.error("Error appending UTM params to URL:", error);
            return checkoutUrl;
        }
    }
    return checkoutUrl;
}
export function appendSCARefParamsToUrl(checkoutUrl) {
    if (!checkoutUrl) return checkoutUrl; // Get SCA ref params from cookies instead of current URL
    const scaRefParams = getStoredSCARefParameters(); // If no stored SCA ref params, check current URL as fallback
    if (Object.keys(scaRefParams).length === 0) {
        getSCARefParameters() // This will store them if present
        ;
    } // Get the (potentially) updated SCA ref params
    const finalScaRefParams = getStoredSCARefParameters();
    if (Object.keys(finalScaRefParams).length > 0) {
        try {
            const url = new URL(checkoutUrl); // Add SCA ref parameters to the URL
            Object.keys(finalScaRefParams).forEach(key => { // Only append if the parameter doesn't already exist in the URL
                if (!url.searchParams.has(key)) {
                    url.searchParams.append(key, finalScaRefParams[key]);
                }
            });
            const finalUrl = url.toString();
            return finalUrl;
        } catch (error) {
            console.error("Error appending SCA ref params to URL:", error);
            return checkoutUrl;
        }
    }
    return checkoutUrl;
}
/**
 * Validate discount code format
 * Allows alphanumeric characters, hyphens, and underscores
 * Maximum length: 50 characters
 */
function validateDiscountCode(code) {
    if (!code || typeof code !== "string") return false; // Check length (max 50 characters)
    if (code.length > 50) return false; // Check character set: alphanumeric, hyphens, underscores
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    return validPattern.test(code);
}
/**
 * Get discount code from URL and store in session storage
 */
export function getDiscountCode() {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
        return null;
    }
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const discountCode = urlParams.get("discount");
        if (discountCode) { // Validate the discount code
            if (validateDiscountCode(discountCode)) { // Store in session storage
                sessionStorage.setItem("fc_discount_code", discountCode);
                return discountCode;
            } else {
                console.warn("Invalid discount code format. Only alphanumeric characters, hyphens, and underscores are allowed. Max length: 50 characters.");
                return null;
            }
        }
        return null;
    } catch (error) {
        console.error("Error parsing discount code from URL:", error);
        return null;
    }
}
/**
 * Get stored discount code from session storage
 */
export function getStoredDiscountCode() {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
        return null;
    }
    try {
        const storedCode = sessionStorage.getItem("fc_discount_code"); // Validate stored code before returning
        if (storedCode && validateDiscountCode(storedCode)) {
            return storedCode;
        } // If invalid, remove it
        if (storedCode) {
            sessionStorage.removeItem("fc_discount_code");
        }
        return null;
    } catch (error) {
        console.error("Error retrieving stored discount code:", error);
        return null;
    }
}
/**
 * Append discount code to checkout URL
 */
export function appendDiscountCodeToUrl(checkoutUrl) {
    if (!checkoutUrl) return checkoutUrl;
    const discountCode = getStoredDiscountCode();
    if (discountCode) {
        try {
            const url = new URL(checkoutUrl); // Only append if the discount parameter doesn't already exist in the URL
            if (!url.searchParams.has("discount")) {
                url.searchParams.append("discount", discountCode);
            }
            const finalUrl = url.toString();
            return finalUrl;
        } catch (error) {
            console.error("Error appending discount code to URL:", error);
            return checkoutUrl;
        }
    }
    return checkoutUrl;
}
export function appendAllTrackingParamsToUrl(checkoutUrl) {
    if (!checkoutUrl) return checkoutUrl;
    let finalUrl = checkoutUrl; // Append UTM parameters
    finalUrl = appendUTMParamsToUrl(finalUrl); // Append SCA ref parameters
    finalUrl = appendSCARefParamsToUrl(finalUrl); // Append discount code
    finalUrl = appendDiscountCodeToUrl(finalUrl);
    return finalUrl;
} // Initialize UTM and SCA ref parameters tracking when this module loads
if (typeof window !== "undefined") { // Add a listener for when the DOM is fully loaded
    if (document.readyState === "complete") {
        getUTMParameters() // Document already loaded, capture UTMs now
        ;
        getSCARefParameters() // Document already loaded, capture SCA refs now
        ;
        getDiscountCode() // Document already loaded, capture discount code now
        ;
    } else {
        window.addEventListener("load", () => {
            getUTMParameters();
            getSCARefParameters();
            getDiscountCode();
        });
    }
}
export const __FramerMetadata__ = {
    "exports": {
        "getSCARefParameters": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getDiscountCode": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "appendDiscountCodeToUrl": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getStoredUTMParameters": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "appendSCARefParamsToUrl": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getUTMParameters": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getStoredSCARefParameters": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "appendUTMParamsToUrl": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "appendAllTrackingParamsToUrl": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getStoredDiscountCode": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./utmParams.map