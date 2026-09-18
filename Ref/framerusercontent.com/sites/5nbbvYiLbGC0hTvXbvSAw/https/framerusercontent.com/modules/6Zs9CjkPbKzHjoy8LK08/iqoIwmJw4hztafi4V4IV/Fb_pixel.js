/*
 * Framer Commerce
 * Confidential and Proprietary - All Rights Reserved
 */ // Utility function to clean Shopify GID to just the numeric ID
const cleanShopifyId = gid => gid ? .split("/").pop() || "";
/**
 * Check if marketing consent is granted
 * Uses the global FCConsentManager if available
 */
const checkMarketingConsent = () => {
    if (typeof window !== "undefined" && window.FCConsentManager) {
        const consent = window.FCConsentManager.getConsent(); // Check marketing consent from the consent manager
        return consent.marketing === true;
    } // No FCConsentManager = allow tracking (Framer's approach)
    // Pass the GDPR compliance decision to the project owner
    return true;
}; // Standardized Facebook Pixel AddToCart tracking function
export const trackFacebookPixelAddToCart = data => { // Check consent before tracking
    if (!checkMarketingConsent()) { // Silently skip tracking - no consent
        return;
    }
    if (typeof fbq !== "function") {
        console.warn("Facebook Pixel not available");
        return;
    }
    const {
        variant,
        product,
        quantity = 1,
        currency = "USD"
    } = data;
    if (!variant || !product) {
        console.warn("Missing variant or product data for Facebook Pixel tracking");
        return;
    }
    const item_id = cleanShopifyId(variant.id);
    const item_name = product.title || "";
    const item_variant = variant.title || "";
    const price = parseFloat(variant.price ? .amount || "0");
    const value = price * quantity;
    const finalCurrency = variant.price ? .currencyCode || currency; // Validate required data
    if (!item_id || !item_name || price <= 0) {
        console.warn("❌ Skipping Facebook Pixel AddToCart: missing required data", {
            item_id,
            item_name,
            price,
            value
        });
        return;
    }
    const fbqData = {
        content_type: "product",
        content_ids: [item_id],
        content_name: item_name,
        content_category: product.productType || "",
        content_brand: product.vendor || "",
        value: parseFloat(value.toFixed(2)),
        currency: finalCurrency,
        contents: [{
            id: item_id,
            price: parseFloat(price.toFixed(2)),
            quantity: parseInt(quantity.toString())
        }]
    }; // console.log('[Facebook Pixel] Firing AddToCart', item_id, item_name);
    // console.log('[Facebook Pixel] AddToCart with data:', fbqData);
    // console.log('[Facebook Pixel] AddToCart timestamp:', new Date().toISOString());
    fbq("track", "AddToCart", fbqData, {
        eventID: "addtocart_" + Date.now()
    });
}; // Standardized Facebook Pixel InitiateCheckout tracking function
export const trackFacebookPixelInitiateCheckout = data => { // Check consent before tracking
    if (!checkMarketingConsent()) { // Silently skip tracking - no consent
        return;
    }
    if (typeof fbq !== "function") {
        console.warn("Facebook Pixel not available");
        return;
    }
    const {
        variant,
        product,
        quantity = 1,
        currency = "USD",
        value: providedValue,
        content_ids: providedContentIds,
        content_name: providedContentName,
        num_items: providedNumItems
    } = data;
    let fbqData = {
        content_type: "product",
        currency: currency
    }; // If we have variant and product data, calculate from them
    if (variant && product) {
        const item_id = cleanShopifyId(variant.id);
        const item_name = product.title || "";
        const price = parseFloat(variant.price ? .amount || "0");
        const calculatedValue = price * quantity;
        const finalCurrency = variant.price ? .currencyCode || currency; // Validate required data
        if (!item_id || !item_name || price <= 0) {
            console.warn("❌ Skipping Facebook Pixel InitiateCheckout: missing required data", {
                item_id,
                item_name,
                price,
                calculatedValue
            });
            return;
        }
        fbqData = {
            content_type: "product",
            content_ids: [item_id],
            content_name: item_name,
            content_category: product.productType || "",
            content_brand: product.vendor || "",
            value: parseFloat(calculatedValue.toFixed(2)),
            currency: finalCurrency,
            num_items: parseInt(quantity.toString())
        };
    } else if (providedContentIds && providedValue !== undefined) { // Ensure providedValue is a valid number
        const numericValue = typeof providedValue === "number" ? providedValue : parseFloat(providedValue) || 0;
        fbqData = {
            content_type: "product",
            content_ids: providedContentIds,
            content_name: providedContentName || "Checkout",
            value: parseFloat(numericValue.toFixed(2)),
            currency: currency,
            num_items: parseInt((providedNumItems || 1).toString())
        };
    } else {
        console.warn("❌ Skipping Facebook Pixel InitiateCheckout: insufficient data", data);
        return;
    } // console.log('[Facebook Pixel] Firing InitiateCheckout', fbqData.content_ids?.[0], fbqData.content_name);
    // console.log('[Facebook Pixel] InitiateCheckout with data:', fbqData);
    // console.log('[Facebook Pixel] InitiateCheckout timestamp:', new Date().toISOString());
    // Use sendBeacon if requested, otherwise use regular tracking
    const eventOptions = {
        eventID: "initiatecheckout_" + Date.now()
    };
    if (data.useBeacon) {
        fbq("track", "InitiateCheckout", fbqData, { ...eventOptions,
            transport: "beacon"
        });
    } else {
        fbq("track", "InitiateCheckout", fbqData, eventOptions);
    }
}; // Standardized Facebook Pixel RemoveFromCart tracking function
export const trackFacebookPixelRemoveFromCart = data => { // Check consent before tracking
    if (!checkMarketingConsent()) { // Silently skip tracking - no consent
        return;
    }
    if (typeof fbq !== "function") {
        console.warn("Facebook Pixel not available");
        return;
    }
    const {
        lineItem,
        currency = "USD"
    } = data;
    if (!lineItem) {
        console.warn("Missing lineItem data for Facebook Pixel RemoveFromCart tracking");
        return;
    }
    const item_id = cleanShopifyId(lineItem.merchandise.id);
    const item_name = lineItem.merchandise.product ? .title || "";
    const item_variant = lineItem.merchandise.title || "";
    const price = parseFloat(lineItem.cost.subtotalAmount.amount || "0");
    const quantity = lineItem.quantity || 1;
    const value = price * quantity;
    const finalCurrency = lineItem.cost.subtotalAmount.currencyCode || currency; // Validate required data
    if (!item_id || !item_name || price <= 0) {
        console.warn("❌ Skipping Facebook Pixel RemoveFromCart: missing required data", {
            item_id,
            item_name,
            price,
            value,
            quantity
        });
        return;
    }
    const fbqData = {
        content_type: "product",
        content_ids: [item_id],
        content_name: item_name,
        content_category: lineItem.merchandise.product ? .productType || "",
        content_brand: lineItem.merchandise.product ? .vendor || "",
        value: parseFloat(value.toFixed(2)),
        currency: finalCurrency,
        contents: [{
            id: item_id,
            price: parseFloat(price.toFixed(2)),
            quantity: parseInt(quantity.toString())
        }]
    }; // console.log('[Facebook Pixel] Firing RemoveFromCart with data:', fbqData);
    fbq("track", "RemoveFromCart", fbqData, {
        eventID: "removefromcart_" + Date.now()
    });
}; // Standardized Facebook Pixel ViewContent tracking function
export const trackFacebookPixelViewContent = data => { // Check consent before tracking
    if (!checkMarketingConsent()) { // Silently skip tracking - no consent
        return;
    }
    if (typeof fbq !== "function") {
        console.warn("Facebook Pixel not available");
        return;
    }
    const {
        variant,
        product,
        currency = "USD"
    } = data;
    if (!product) {
        console.warn("Missing product data for Facebook Pixel ViewContent tracking");
        return;
    }
    const item_id = variant ? cleanShopifyId(variant.id) : cleanShopifyId(product.id);
    const item_name = product.title || "";
    const item_variant = variant ? .title || "";
    const price = variant ? parseFloat(variant.price ? .amount || "0") : parseFloat(product.priceRange ? .minVariantPrice ? .amount || "0");
    const finalCurrency = variant ? .price ? .currencyCode || product.priceRange ? .minVariantPrice ? .currencyCode || currency; // Validate required data
    if (!item_id || !item_name || price <= 0) {
        console.warn("❌ Skipping Facebook Pixel ViewContent: missing required data", {
            item_id,
            item_name,
            price
        });
        return;
    }
    const fbqData = {
        content_type: "product",
        content_ids: [item_id],
        content_name: item_name,
        content_category: product.productType || "",
        content_brand: product.vendor || "",
        value: parseFloat(price.toFixed(2)),
        currency: finalCurrency
    }; // console.log('[Facebook Pixel] Firing ViewContent with data:', fbqData);
    fbq("track", "ViewContent", fbqData, {
        eventID: "viewcontent_" + Date.now()
    });
};
export default function initializeFacebookPixel(facebookPixelId) {
    ! function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v; // Add onload and onerror event handlers
        t.onload = () => {
            if (typeof fbq !== "undefined") {
                fbq("init", facebookPixelId);
                fbq("track", "PageView");
            } else { // Handle case where fbq is not defined
            }
        };
        t.onerror = () => { // Handle Facebook Pixel script load failure
        };
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
}
export const __FramerMetadata__ = {
    "exports": {
        "trackFacebookPixelRemoveFromCart": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "trackFacebookPixelAddToCart": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "trackFacebookPixelViewContent": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "default": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "trackFacebookPixelInitiateCheckout": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Fb_pixel.map