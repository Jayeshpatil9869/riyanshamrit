/*
 * Framer Commerce
 * Confidential and Proprietary - All Rights Reserved
 * Unauthorized use, reproduction, distribution, or disclosure of this
 * source code or any related information is strictly prohibited.
 *
 * This software is the exclusive property of Framer Commerce ("Company").
 * It is considered highly confidential and proprietary information.
 *
 * Any use, copying, modification, distribution, or sharing of this software,
 * in whole or in part, without the express written permission of the Company
 * is strictly prohibited and may result in legal action.
 *
 * DISCLAIMER: This software does not provide any express or
 * implied warranties, including, but not limited to, the implied warranties
 * of merchantability and fitness for a particular purpose. In no event shall
 * Framer Commerce be liable for any direct, indirect, incidental, special,
 * exemplary, or consequential damages (including, but not limited to, procurement
 * of substitute goods or services; loss of use, data, or profits; or business
 * interruption) however caused and on any theory of liability, whether in
 * contract, strict liability, or tort (including negligence or otherwise)
 * arising in any way out of the use of this software, even if advised of
 * the possibility of such damage.
 *
 * Any unauthorized possession, use, copying, distribution, or dissemination
 * of this software will be considered a breach of confidentiality and may
 * result in legal action.
 *
 * For inquiries, contact:
 * Framer Commerce
 * Email: hello@framercommerce.com
 *
 * © 2025 Butter Supply Inc. All Rights Reserved.
 */
import {
    jsx as _jsx
} from "react/jsx-runtime";
import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
    cloneElement
} from "react";
import {
    appendAllTrackingParamsToUrl,
    getUTMParameters,
    getSCARefParameters
} from "https://framerusercontent.com/modules/w24ELWa2giT3SFaWpV77/398w6fPyag8B92ojouQr/utmParams.js";
import {
    throttle
} from "lodash-es";
import {
    addPropertyControls,
    ControlType
} from "framer";
import {
    appendLanguageToUrl
} from "https://framerusercontent.com/modules/vC6fzbfO83MgBPIhn5zl/DUlbmWuOELzEUenVmv3G/locales.js";
import {
    trackFacebookPixelInitiateCheckout
} from "https://framerusercontent.com/modules/6Zs9CjkPbKzHjoy8LK08/iqoIwmJw4hztafi4V4IV/Fb_pixel.js";
/**
 * @framerDisableUnlink
 */
export default function FC_CartCheckoutButton({
    componentInstance
}) {
    const [checkoutUrl, setCheckoutUrl] = useState(null);
    const isFetching = useRef(false); // Capture UTM and SCA ref parameters on component mount
    useEffect(() => { // Get UTM and SCA ref parameters when component mounts
        getUTMParameters();
        getSCARefParameters();
    }, []);
    const waitForCondition = useCallback((conditionFn, checkInterval = 100, timeout = 1e4) => {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const checkCondition = () => {
                if (conditionFn()) {
                    resolve();
                } else if (Date.now() - startTime >= timeout) {
                    reject(new Error("Condition not met within timeout"));
                } else {
                    setTimeout(checkCondition, checkInterval);
                }
            };
            checkCondition();
        });
    }, []);
    const fetchCartAndUpdateCheckoutUrl = useCallback(async cartId => {
        if (isFetching.current) return;
        isFetching.current = true;
        try {
            await waitForCondition(() => window.shopXtools && window.shopXtools.fetchCart);
            const cartData = await window.shopXtools.fetchCart(cartId); //console.log("Cart Data in checkout button", cartData)
            if (cartData) { //console.log("Cart Data in checkout button", cartData)
                // Check for existing attributes
                const storedAttributes = JSON.parse(localStorage.getItem("fc_cart_attributes") || "[]"); // console.log("Cart data received:", {
                //     checkoutUrl: cartData.checkoutUrl,
                //     storedAttributes,
                // })
                window.shopXtools.cart = cartData;
                setCheckoutUrl(cartData.checkoutUrl || null);
            } else {
                console.error("Failed to fetch cart data from Shopify");
                setCheckoutUrl(null);
            }
        } catch (error) {
            console.error("Error fetching cart from Shopify:", error);
            setCheckoutUrl(null);
        } finally {
            isFetching.current = false;
        }
    }, [waitForCondition]);
    const handleCartUpdate = useCallback(throttle(async () => {
        let cartId = window["shopXtools"] ? .cart ? .id || localStorage.getItem("shopX_cart_id");
        if (cartId) {
            await fetchCartAndUpdateCheckoutUrl(cartId);
        } else {
            console.warn("No cart ID found. Cart is empty.");
            setCheckoutUrl(null);
        }
    }, 1e3), [fetchCartAndUpdateCheckoutUrl]);
    useEffect(() => {
        handleCartUpdate();
        window.addEventListener("shopXtools-cart-update", handleCartUpdate);
        return () => {
            window.removeEventListener("shopXtools-cart-update", handleCartUpdate);
        };
    }, [handleCartUpdate]);
    const handleClick = async e => {
        try { // Aggregate all product-specific attributes from sessionStorage
            const allAttributes = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key ? .startsWith("fc_cart_attributes_")) {
                    const productAttributes = JSON.parse(sessionStorage.getItem(key) || "{}");
                    Object.entries(productAttributes).forEach(([attrKey, attrValue]) => {
                        allAttributes.push({
                            key: attrKey,
                            value: String(attrValue)
                        });
                    });
                }
            } // Update cart attributes if we have any
            if (allAttributes.length > 0 && window.shopXtools ? .handleCartMutation) {
                const updateCartMutation = `
                    mutation cartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) {
                        cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
                            cart {
                                id
                                attributes {
                                    key
                                    value
                                }
                            }
                            userErrors {
                                field
                                message
                            }
                        }
                    }
                `;
                try {
                    await window.shopXtools.handleCartMutation(updateCartMutation, {
                        cartId: window.shopXtools.cart.id,
                        attributes: allAttributes
                    });
                } catch (error) {
                    console.error("Failed to update cart attributes:", error);
                }
            } // Analytics
            const cart = window.shopXtools ? .cart;
            if (!cart) {
                console.warn("No cart found.");
                return; // Exit if no cart is available
            } // Check if lines is defined and is an array
            const lines = cart.lines ? .edges || [];
            if (!Array.isArray(lines)) {
                console.error("Lines is not an array:", lines);
                return; // Exit if lines is not an array
            }
            const cartItems = lines.map(line => line.node) // Assuming line.node contains the item details
            ; // const value = parseFloat(cartItems.reduce((total, item) => total + parseFloat(item.cost.totalAmount.amount) * item.quantity, 0).toFixed(2));
            // const currency = cartItems.length > 0 ? cartItems[0].cost.totalAmount.currencyCode : 'USD';
            const value = cart ? .cost.subtotalAmount.amount;
            const currency = cart ? .cost.subtotalAmount.currencyCode;
            const items = cartItems.map(item => {
                const unitAmount = parseFloat(item.cost ? .amountPerQuantity ? .amount ? ? (item.cost ? .subtotalAmount ? .amount && item.quantity ? (parseFloat(item.cost.subtotalAmount.amount) / item.quantity).toFixed(2) : "0"));
                return {
                    item_id: item.merchandise.id ? .split("/").pop() || "",
                    item_name: item.merchandise.product ? .title || item.merchandise.title || "",
                    item_variant: item.merchandise.title || "",
                    price: unitAmount,
                    quantity: item.quantity,
                    item_brand: item.merchandise.product ? .vendor || null,
                    item_category: item.merchandise.product ? .productType || null, // TagHound compatibility
                    SKU: item.merchandise.id ? .split("/").pop() || "",
                    "Item Name": item.merchandise.product ? .title || item.merchandise.title || ""
                };
            }); // Google Analytics tracking
            if (typeof window.fcTrackGAEvent === "function") { // console.log("Tracking Begin Checkout - google:", {
                //     currency,
                //     value,
                //     items,
                // })
                const gaPayload = {
                    currency,
                    value,
                    items
                };
                window.fcTrackGAEvent("begin_checkout", gaPayload);
            } // Meta Pixel tracking
            try {
                trackFacebookPixelInitiateCheckout({
                    content_ids: items.map(item => item.item_id),
                    value: value,
                    currency: currency,
                    num_items: items.reduce((total, item) => total + item.quantity, 0),
                    content_name: "Checkout",
                    useBeacon: true
                });
            } catch (error) {
                console.warn("Facebook Pixel tracking failed, continuing with checkout:", error);
            }
            let finalCheckoutUrl = window.fcEnhancedCheckoutUrl || checkoutUrl; // Only proceed with tracking params and language if we have a valid checkout URL
            if (finalCheckoutUrl) {
                finalCheckoutUrl = appendAllTrackingParamsToUrl(finalCheckoutUrl);
                finalCheckoutUrl = appendLanguageToUrl(finalCheckoutUrl); // Clear all product-specific attributes after successful checkout redirect
                for (let i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i);
                    if (key ? .startsWith("shopX_cart_attributes_")) {
                        sessionStorage.removeItem(key);
                    }
                } // Delay navigation slightly to observe analytics firing
                window.location.assign(finalCheckoutUrl);
            } else {
                console.error("No checkout URL available");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };
    const content = Array.isArray(componentInstance) ? componentInstance[0] : componentInstance;
    if (!content || ! /*#__PURE__*/ React.isValidElement(content)) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
                fontSize: "14px"
            },
            children: "Connect Instance"
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        style: {
            height: "100%",
            width: "100%"
        },
        children: /*#__PURE__*/ cloneElement(content, {
            style: { ...content.props ? .style || {},
                width : "100%",
                height: "100%"
            },
            onClick: e => {
                handleClick(e);
                if (content.props ? .onClick) {
                    content.props.onClick(e);
                }
            }
        })
    });
}
addPropertyControls(FC_CartCheckoutButton, {
    componentInstance: {
        type: ControlType.ComponentInstance,
        title: "Instance",
        description: "Connect to your checkout button component off-page (required)."
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CartCheckoutButton",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1",
                "framerDisableUnlink": ""
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}