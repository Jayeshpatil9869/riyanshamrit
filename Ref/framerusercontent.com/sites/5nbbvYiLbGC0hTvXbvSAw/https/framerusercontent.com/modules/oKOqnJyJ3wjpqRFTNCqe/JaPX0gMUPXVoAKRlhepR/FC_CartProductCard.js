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
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment
} from "react/jsx-runtime";
import React, {
    useCallback,
    useRef,
    useEffect,
    useState
} from "react";
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    get,
    throttle
} from "lodash-es";
import {
    removeLineMutation,
    updatelineMutation,
    updatelineMutationNoPlans,
    removeLineMutationNoPlans,
    getProductMetafields
} from "https://framerusercontent.com/modules/yiRfl1JCGhIBUL31WVDk/wupS2XmBAHu1kBQNv9pi/mutations_v2.js";
import {
    knownCurrenciesWithCodeAsSymbol
} from "https://framerusercontent.com/modules/k9s4cejdkBGDjmzudhzM/18cq93eooqM4YmdbL7E2/currencyMaps.js";
import {
    useIsBrowser
} from "https://framerusercontent.com/modules/ncBs5KPMI9I5GEta13fn/zGXDjuZapa1SGy6D8P5e/IsBrowser.js";
import {
    getLocaleFromCountry
} from "https://framerusercontent.com/modules/vC6fzbfO83MgBPIhn5zl/DUlbmWuOELzEUenVmv3G/locales.js";
import {
    trackFacebookPixelRemoveFromCart
} from "https://framerusercontent.com/modules/6Zs9CjkPbKzHjoy8LK08/iqoIwmJw4hztafi4V4IV/Fb_pixel.js"; // Helper function to check if a currency's symbol is the same as its code
const isCurrencySymbolSameAsCode = currencyCode => { // For some currencies like CHF, the browser might use the code as the symbol
    if (!currencyCode) return false;
    if (knownCurrenciesWithCodeAsSymbol.includes(currencyCode)) {
        return true;
    }
    try {
        const formatted = new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currencyCode,
            currencyDisplay: "narrowSymbol"
        }).format(0); // Remove digits, decimal points, and common formatting characters
        const cleanFormatted = formatted.replace(/[0-9.,\s]/g, ""); // Check if what remains is the currency code
        return cleanFormatted === currencyCode;
    } catch (e) {
        return false;
    }
};
/**
 * @framerDisableUnlink
 */
export default function FC_CartProductCard(props) {
    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const isFetching = useRef(false);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(""); // const [subscriptionPrice, setSubscriptionPrice] = useState(null)
    // const [subscriptionPlan, setSubscriptionPlan] = useState(null)
    const isBrowser = useIsBrowser(); // Helper function to calculate current product quantity across all variants
    const getCurrentProductQuantity = useCallback(productHandle => {
        if (!cartItems || !productHandle) return 0;
        return cartItems.reduce((total, {
            node
        }) => {
            const lineProductHandle = node ? .merchandise ? .product ? .handle;
            if (lineProductHandle === productHandle) {
                return total + (node.quantity || 0);
            }
            return total;
        }, 0);
    }, [cartItems]); // Initialize currency from localStorage on page load
    useEffect(() => {
        if (!isBrowser) return;
        const storedCurrency = localStorage.getItem("selectedCurrency");
        const storedCountryCode = localStorage.getItem("selectedCountryCode");
        const storedCountry = localStorage.getItem("selectedCountry");
        setSelectedCurrency(storedCurrency || "USD");
        setSelectedCountryCode(storedCountryCode || "US");
        setSelectedCountry(storedCountry || "United States"); //console.log("[FC_CartProductCard] setting selectedCountryCode and currency", storedCountryCode, storedCurrency)
    }, [isBrowser]); // Listen for currency changes
    useEffect(() => {
        if (!isBrowser) return;
        const handleCurrencyChange = event => {
            const {
                currency,
                countryCode,
                country
            } = event.detail;
            setSelectedCurrency(currency);
            setSelectedCountryCode(countryCode);
            setSelectedCountry(country); //console.log("[FC_CartProductCard] currency changed to", selectedCountryCode, selectedCurrency)
        };
        window.addEventListener("currency_changed", handleCurrencyChange);
        return () => {
            window.removeEventListener("currency_changed", handleCurrencyChange);
        };
    }, [isBrowser, selectedCurrency, selectedCountryCode]); // Add currency config state
    const [currencyConfig, setCurrencyConfig] = useState(() => { // Initialize with window values if available
        if (typeof window !== "undefined") {
            const position = window ? .__FcCurrencyConfigs ? .currencyPosition || "Before";
            const initialConfig = {
                position: position,
                showCode: position !== "Hide",
                symbol: window ? .__FcCurrencyConfigs ? .currencySymbol || "$"
            }; // console.log(
            //     "Initial currency config state:",
            //     initialConfig,
            //     window?.__FcCurrencyConfigs
            // )
            return initialConfig;
        }
        return {
            position: "Before",
            showCode: false,
            symbol: "$"
        };
    }); // Add currency settings listener
    useEffect(() => {
        if (typeof window === "undefined") return;

        function updateCurrencyConfig(position, symbol) { //("Updating currency config with:", { position, symbol })
            const newConfig = {
                position: position || "Before",
                showCode: position !== "Hide",
                symbol: symbol || "$"
            }; //console.log("New currency config:", newConfig)
            setCurrencyConfig(newConfig);
        } // Handle currency settings updates
        const handleCurrencySettingsUpdate = e => { //console.log("Currency update event received:", e.detail)
            if (!e.detail ? .current) { //console.log("Invalid currency update event:", e)
                return;
            }
            updateCurrencyConfig(e.detail.current.currencyPosition, e.detail.current.currencySymbol);
        }; // Initial setup
        const currentPosition = window.__FcCurrencyConfigs ? .currencyPosition;
        const currentSymbol = window.__FcCurrencyConfigs ? .currencySymbol; // console.log("Initial currency values:", {
        //     currentPosition,
        //     currentSymbol,
        // })
        updateCurrencyConfig(currentPosition, currentSymbol); // Add event listener
        document.addEventListener("currency__settings-updated", handleCurrencySettingsUpdate);
        return () => {
            document.removeEventListener("currency__settings-updated", handleCurrencySettingsUpdate);
        };
    }, []);
    const _showCurrencyCode = props.priceConfigs ? .showCurrencyCode;
    const _showCurrencySymbol = props.priceConfigs ? .showSymbol; // // Add subscription price listener
    // useEffect(() => {
    //     if (!isBrowser) return
    //     const handleSubscriptionPriceUpdate = (e) => {
    //         if (e.detail?.price) {
    //             setSubscriptionPrice(e.detail.price)
    //             setSubscriptionPlan(e.detail.plan.id)
    //         } else {
    //             setSubscriptionPrice(null)
    //             setSubscriptionPlan(null)
    //         }
    //     }
    //     document.addEventListener(
    //         "subscription__price-update",
    //         handleSubscriptionPriceUpdate
    //     )
    //     return () => {
    //         document.removeEventListener(
    //             "subscription__price-update",
    //             handleSubscriptionPriceUpdate
    //         )
    //     }
    // }, [isBrowser])
    const [locale, setLocale] = useState(undefined);
    useEffect(() => { //console.log("[FC_CartProductCard] selectedCountryCode", selectedCountryCode)
        const updatedLocale = getLocaleFromCountry(selectedCountryCode); //console.log("[FC_CartProductCard] Locale updated:", updatedLocale);
        setLocale(updatedLocale);
    }, [selectedCountryCode]);
    const formatCartPrice = useCallback((amount, currencyCode) => { // Clean and format amount
        if (typeof amount === "string") {
            amount = amount.replace(/[^0-9.]/g, "");
            const parts = amount.split(".");
            if (parts.length > 2) {
                amount = parts[0] + "." + parts.slice(1).join("");
            }
        }
        if (typeof amount !== "number") {
            amount = parseFloat(amount);
        }
        if (isNaN(amount)) {
            amount = 0;
        } // For canvas view, use canvasPrice with USD
        if (RenderTarget.current() === RenderTarget.canvas) {
            const format = props.priceConfigs ? .format || {};
            return formatPriceWithOptions(amount, format.currencyCode || "USD");
        } // For browser view, use the current currency
        const format = props.priceConfigs ? .format || {};
        return formatPriceWithOptions(amount, currencyCode || "USD");
    }, [props.priceConfigs, locale]); // Common function to format price based on options
    const formatPriceWithOptions = useCallback((numericPrice, currCode) => {
        if (!currCode) currCode = "USD"; //console.log("[FC_CartProductCard] currCode", currCode)
        const format = props.priceConfigs ? .format || {}; // For backward compatibility
        const showSymbol = format.showSymbol !== undefined ? format.showSymbol : props.priceConfigs ? .showSymbol !== undefined ? props.priceConfigs.showSymbol : true;
        const showCurrency = format.showCurrency !== undefined ? format.showCurrency : props.priceConfigs ? .showCurrencyCode !== undefined ? props.priceConfigs.showCurrencyCode : false;
        const showDecimals = format.showDecimals || "Always show";
        const symbolSameAsCode = isCurrencySymbolSameAsCode(currCode); //console.log("[FC_CartProductCard] receving locale from getLocaleFromCountry", locale)
        // console.log("[FC_CartProductCard] Format debug:", {
        //     userAgent: navigator.userAgent,
        //     isCurrencySymbolSameAsCode: symbolSameAsCode,
        //     currencyCode: currCode,
        //     selectedCountryCode,
        //     locale,
        // })
        // Determine if we should show decimals based on the setting
        const shouldShowDecimals = () => {
            if (showDecimals === "Always show") return true;
            if (showDecimals === "Never show") return false;
            if (showDecimals === "Hide when .00") { // Check if the decimal part is zero
                return numericPrice % 1 !== 0;
            }
            return true // Default fallback
            ;
        };
        const decimalDigits = shouldShowDecimals() ? 2 : 0; // If showing neither symbol nor code, just format the number
        if (!showSymbol && !showCurrency) {
            const formattedNumber = new Intl.NumberFormat(locale, {
                style: "decimal",
                minimumFractionDigits: decimalDigits,
                maximumFractionDigits: decimalDigits
            }).format(numericPrice);
            return formattedNumber;
        } // Special case for USD to prevent "US$" display in Safari iOS
        if (currCode === "USD" && showSymbol) { // Check if running on iOS device
            const isIOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; // Format USD manually to avoid the iOS "US$" prefix
            if (isIOS) {
                const number = new Intl.NumberFormat(locale, {
                    style: "decimal",
                    minimumFractionDigits: decimalDigits,
                    maximumFractionDigits: decimalDigits
                }).format(numericPrice);
                if (!showCurrency) {
                    return `$${number}` // Just "$50" format
                    ;
                } else {
                    return `$${number} USD` // "$50 USD" format
                    ;
                }
            } else { // For non-iOS devices, continue with normal formatting but use
                // a more controlled approach to ensure consistency
                if (!showCurrency) {
                    return new Intl.NumberFormat(locale, {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: decimalDigits,
                        maximumFractionDigits: decimalDigits,
                        currencyDisplay: "narrowSymbol"
                    }).format(numericPrice);
                } else {
                    const withSymbol = new Intl.NumberFormat(locale, {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: decimalDigits,
                        maximumFractionDigits: decimalDigits,
                        currencyDisplay: "narrowSymbol"
                    }).format(numericPrice);
                    return `${withSymbol} USD`;
                }
            }
        } // For currencies where symbol is same as code (like CHF)
        if (symbolSameAsCode) { // If showing currency code, always use code-first format and ignore symbol
            if (showCurrency && !showSymbol) {
                const number = new Intl.NumberFormat(locale, {
                    style: "decimal",
                    minimumFractionDigits: decimalDigits,
                    maximumFractionDigits: decimalDigits
                }).format(numericPrice);
                const output = `${currCode} ${number}`;
                return output;
            }
            if (showSymbol && !showCurrency) {
                const number = new Intl.NumberFormat(locale, {
                    style: "decimal",
                    minimumFractionDigits: decimalDigits,
                    maximumFractionDigits: decimalDigits
                }).format(numericPrice);
                const output = `${currCode} ${number}`;
                return output;
            }
            if (showCurrency && showSymbol) {
                const number = new Intl.NumberFormat(locale, {
                    style: "decimal",
                    minimumFractionDigits: decimalDigits,
                    maximumFractionDigits: decimalDigits
                }).format(numericPrice);
                return `${currCode} ${number}`;
            }
        } // For currencies with distinct symbols (like USD with $)
        // If showing only the code (no symbol)
        if (!showSymbol && showCurrency) {
            const number = new Intl.NumberFormat(locale, {
                style: "decimal",
                minimumFractionDigits: decimalDigits,
                maximumFractionDigits: decimalDigits
            }).format(numericPrice); // For normal currencies, show code after the number
            return `${number} ${currCode}`;
        } // If showing only the symbol (no code)
        if (showSymbol && !showCurrency) {
            return new Intl.NumberFormat(locale, {
                style: "currency",
                currency: currCode,
                minimumFractionDigits: decimalDigits,
                maximumFractionDigits: decimalDigits,
                currencyDisplay: "narrowSymbol"
            }).format(numericPrice);
        } // If showing both symbol and code
        const withSymbol = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currCode,
            minimumFractionDigits: decimalDigits,
            maximumFractionDigits: decimalDigits,
            currencyDisplay: "narrowSymbol"
        }).format(numericPrice);
        return `${withSymbol} ${currCode}`;
    }, [props.priceConfigs, locale]);
    const fetchCartFromShopify = useCallback(async cartId => {
        if (isFetching.current) {
            return;
        }
        isFetching.current = true;
        try { // Wait until window.shopXtools.fetchCart is available
            await waitForCondition(() => window.shopXtools && window.shopXtools.fetchCart);
            const cartData = await window.shopXtools.fetchCart(cartId); //console.log("[FETCH] Cart data received from Shopify:", cartData);
            if (cartData) {
                setCart(cartData); //console.log("[FETCH] Cart Data after setting state: :", cartData)
                setCartItems(cartData.lines ? .edges || []); //console.log("[FETCH] Cart items after setting state:", cartData.lines?.edges);
                // Update the global cart data
                window.shopXtools.cart = cartData; // Dispatch cart update event
                window.dispatchEvent(new Event("shopXtools-cart-update"));
            } else {
                setCart({});
                setCartItems([]);
            }
        } catch (error) {
            setCart({});
            setCartItems([]);
        } finally {
            isFetching.current = false;
        }
    }, []); // useEffect(() => {
    //     console.log("[STATE] Updated cart:", cart);
    // }, [cart]);
    // useEffect(() => {
    //     console.log("[STATE] Updated cartItems:", cartItems);
    // }, [cartItems]);
    // Helper function to wait until a condition is true
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
    const handleCartUpdate = useCallback(throttle(async () => {
        let cartId = window["shopXtools"] ? .cart ? .id; // console.log("[UPDATE] Checking for cartId:", cartId);
        // console.log("[UPDATE] Checking for cart:", window["shopXtools"]?.cart);
        if (!cartId) {
            try {
                cartId = localStorage.getItem("shopX_cart_id");
            } catch (error) {
                console.error("Error loading cart ID from local storage:", error);
            }
        }
        if (cartId) {
            await fetchCartFromShopify(cartId); //console.log("[UPDATE] Fetching cart from Shopify with cartId:", cartId);
        } else { //console.log("[UPDATE] No cartId found, resetting cart state.");
            setCart({});
            setCartItems([]);
        }
    }, 500), [fetchCartFromShopify]); //console.log("Cart Data in CartProductCard:", cart)
    useEffect(() => { //console.log("[EVENT] shopXtools-cart-update event triggered");
        // Fetch cart data on component mount
        handleCartUpdate();
        window.addEventListener("shopXtools-cart-update", handleCartUpdate);
        return () => {
            window.removeEventListener("shopXtools-cart-update", handleCartUpdate);
        };
    }, [handleCartUpdate]); //console.log("Cart Data in CartProductCard:", cart)
    const handleRemoveLine = useCallback(async (cartId, lineId, providedLineItem = null) => {
        if (!cartId || !lineId) {
            console.error("Missing cartId or lineId for remove operation");
            return;
        } // Find the line item to get analytics data before removing
        const lineItem = providedLineItem || cartItems.find(({
            node
        }) => node.id === lineId) ? .node;
        if (lineItem) { // Analytics - remove_from_cart event
            const currency = lineItem.cost.subtotalAmount.currencyCode || "USD";
            const unitPrice = parseFloat(lineItem.cost ? .amountPerQuantity ? .amount || "0");
            const value = unitPrice * (lineItem.quantity || 1);
            const item_id = lineItem.merchandise.id ? .split("/").pop() || "";
            const item_name = lineItem.merchandise.product ? .title || "";
            const item_variant = lineItem.merchandise.title || "";
            const price = unitPrice;
            const quantity = lineItem.quantity || 1; // Google Analytics tracking (remove_from_cart)
            if (typeof window.fcTrackGAEvent === "function" && item_id && item_name && price > 0) {
                const payload = {
                    currency,
                    value,
                    items: [{
                        item_id,
                        item_name,
                        item_variant,
                        price,
                        item_brand: lineItem.merchandise.product ? .vendor || null,
                        item_category: lineItem.merchandise.product ? .productType || null,
                        quantity, // TagHound compatibility
                        SKU: item_id,
                        "Item Name": item_name
                    }]
                };
                window.fcTrackGAEvent("remove_from_cart", payload);
            } else { // Skipping remove_from_cart due to missing item data
            } // Meta Pixel tracking
            trackFacebookPixelRemoveFromCart({
                lineItem: lineItem,
                currency: currency
            });
        }
        try {
            const data = await window.shopXtools ? .handleCartMutation(removeLineMutation, {
                cartId,
                lineIds: [lineId]
            }); //console.log("[REMOVE] Mutation response:", data);
            if (data ? .cartLinesRemove ? .cart) { //console.log("[REMOVE] Cart updated, refetching...");
                await fetchCartFromShopify(cartId); // Check quantity limits if product has them
                const productHandle = lineItem ? .merchandise ? .product ? .handle;
                const product = window.shopXtools ? .products.find(p => p.node.handle === productHandle); // console.log("product", product)
                if (productHandle) {
                    const metafields = await window.shopXtools ? .handleCartMutation(getProductMetafields, {
                        handle: productHandle
                    });
                    const orderMax = parseInt(metafields ? .product ? .metafield_order_max ? .value, 10);
                    if (!isNaN(orderMax) && orderMax > 0) {
                        const currentLineQuantity = lineItem ? .quantity || 0; // console.log("currentLineQuantity", currentLineQuantity)
                        // const quantityChange = quantity - currentLineQuantity
                        const newTotalQuantity = orderMax - currentLineQuantity;
                        if (newTotalQuantity < orderMax) { // console.log("quantity is less than orderMax", newTotalQuantity)
                            const quantityChanged = new CustomEvent("cart_item_quantity_changed", {
                                detail: {
                                    orderMax,
                                    newTotalQuantity,
                                    productId: product ? .node.id
                                }
                            });
                            window.dispatchEvent(quantityChanged); // console.log("quantityChanged", quantityChanged.detail)
                        }
                    }
                }
                return;
            } // Try backup mutation if primary fails
            const backupData = await window.shopXtools ? .handleCartMutation(removeLineMutationNoPlans, {
                cartId,
                lineIds: [lineId]
            });
            if (backupData ? .cartLinesRemove ? .cart) {
                await fetchCartFromShopify(cartId);
            } else {
                console.error("Both primary and backup remove line mutations failed");
            }
        } catch (error) {
            console.error("Error removing line item:", error);
        }
    }, [fetchCartFromShopify, cartItems]);
    const handleUpdateLine = useCallback(async (cartId, lineId, quantity, updateLineItem) => {
        if (!cartId || !lineId || typeof quantity !== "number") {
            console.error("Missing required parameters for update operation");
            return;
        } //console.log("[UPDATE] Updating line:", { cartId, lineId, quantity, lineItem });
        try { // If quantity is 0 or less, remove the item instead
            if (quantity <= 0) { // Call the remove function (Facebook Pixel tracking is handled there)
                await handleRemoveLine(cartId, lineId, updateLineItem);
                return;
            } // Check quantity limits if product has them
            const productHandle = updateLineItem ? .merchandise ? .product ? .handle;
            const product = window.shopXtools ? .products.find(p => p.node.handle === productHandle); // console.log("product", product)
            if (productHandle) {
                const metafields = await window.shopXtools ? .handleCartMutation(getProductMetafields, {
                    handle: productHandle
                });
                const orderMax = parseInt(metafields ? .product ? .metafield_order_max ? .value, 10); // Calculate current quantity of this product across all variants
                const currentProductQuantity = getCurrentProductQuantity(productHandle); // console.log("currentProductQuantity", currentProductQuantity)
                // Calculate the quantity that would be added by this update
                const currentLineQuantity = updateLineItem ? .quantity || 0; // console.log("currentLineQuantity", currentLineQuantity)
                const quantityChange = quantity - currentLineQuantity;
                const newTotalQuantity = currentProductQuantity + quantityChange; // console.log("newTotalQuantity", newTotalQuantity)
                if (!isNaN(orderMax) && orderMax > 0) {
                    if (newTotalQuantity > orderMax) {
                        const remainingAllowed = orderMax - currentProductQuantity; // console.log("remainingAllowed", remainingAllowed)
                        if (remainingAllowed <= 0) {
                            const message = `Maximum quantity of ${orderMax} already in cart`;
                            setErrorMessage(message);
                            return;
                        }
                    }
                } // else if (!isNaN(orderMax) && orderMax === 0 || !orderMax) {
                //     const variant = product?.node.variants?.edges.find(({node}) => node.id === updateLineItem?.merchandise?.id)
                //     console.log("matching variant", variant)
                //     const totalQuantity = variant.node.quantityAvailable
                //     console.log("totalQuantity", totalQuantity)
                //     // Calculate remaining allowed based on variant's quantityAvailable
                //     // const remainingAllowed = totalQuantity - currentLineQuantity;
                //     // console.log("remainingAllowed:", remainingAllowed);
                //     if (newTotalQuantity > totalQuantity) {
                //         console.log("remainingAllowed is less than 0", newTotalQuantity)
                //         const message = `Maximum quantity of ${currentProductQuantity} already in cart`
                //         setErrorMessage(message)
                //         return
                //     }
                // }
            } // Update cart line
            const data = await window.shopXtools ? .handleCartMutation(updatelineMutation, {
                cartId,
                lines: [{
                    id: lineId,
                    quantity
                }]
            }); //console.log("[UPDATE] Mutation response:", data);
            if (data ? .cartLinesUpdate ? .cart) {
                await fetchCartFromShopify(cartId);
                setErrorMessage("");
                return;
            } // Try backup mutation if primary fails
            const backupData = await window.shopXtools ? .handleCartMutation(updatelineMutationNoPlans, {
                cartId,
                lines: [{
                    id: lineId,
                    quantity
                }]
            });
            if (backupData ? .cartLinesUpdate ? .cart) {
                await fetchCartFromShopify(cartId);
                setErrorMessage("");
            } else {
                console.error("Both primary and backup update line mutations failed");
            }
        } catch (error) {
            console.error("Error updating line item:", error);
        }
    }, [fetchCartFromShopify, cartItems, getCurrentProductQuantity]); //console.log("Cart Data in CartProductCard:", cart)
    const errorVisible = errorMessage !== null; // Adjust mock data for compare price
    const mockData = [{
        price: "100.00",
        comparePrice: null
    }, {
        price: "200.00",
        comparePrice: "250.00"
    }, {
        price: "300.00",
        comparePrice: null
    }, {
        price: "400.00",
        comparePrice: null
    }]; // console.log("[RENDER] Cart before rendering:", cart);
    // console.log("[RENDER] Cart items before rendering:", cartItems);
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: RenderTarget.current() === RenderTarget.canvas ? /*#__PURE__*/ _jsxs("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: props.spacingConfigs ? .gap ? ? 24,
                width: "100%"
            },
            children: [ /*#__PURE__*/ _jsx(ShopXCartProductCard, {
                imageVisibility: props.imageConfigs ? .visible,
                image: props.imageConfigs ? .visible ? "https://framerusercontent.com/images/3E7u1YOHRQaZuBdfYRsm3XCzxk.jpg" : null,
                imageConfigs: props.imageConfigs,
                quantityConfigs: props.quantityConfigs,
                removeIconConfigs: props.removeIconConfigs,
                containerConfigs: props.containerConfigs,
                linkConfigs: props.linkConfigs,
                titleConfigs: props.titleConfigs,
                _lineItem: {
                    merchandise: {
                        product: {
                            handle: "example-product"
                        }
                    }
                },
                quantityControlColor: props.quantityConfigs ? .buttons ? .icons,
                quantityNumberColor: props.quantityConfigs ? .container ? .number,
                quantityContainerBgColor: props.quantityConfigs ? .container ? .containerBg,
                quantityControlBgColor: props.quantityConfigs ? .buttons ? .iconBg,
                quantityControlHoverColor: props.quantityConfigs ? .buttons ? .iconBgHover,
                quantityContainerBorder: "1px solid #E2E2E2",
                quantityContainerRadius: "8px",
                xColor: props.removeIconConfigs ? .icon,
                xBgColor: props.removeIconConfigs ? .bg,
                xBgHoverColor: props.removeIconConfigs ? .bgHover,
                style: {
                    width: "100%",
                    ...props.containerConfigs ? .border || {},
                    borderRadius : props.containerConfigs ? .radius || "0px",
                    background: props.containerConfigs ? .background || "#FFF",
                    padding: props.containerConfigs ? .padding || "0px"
                },
                shopifyProductTitle: /*#__PURE__*/ _jsx("p", {
                    style: { ...get(props, "titleConfigs.font"),
                        color: get(props, "titleConfigs.color"),
                        margin: 0
                    },
                    children: "Product Title 1"
                }),
                shopifyProductPriceAmount: /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: props.priceConfigs ? .gap || 4
                    },
                    children: [ /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0,
                            ...get(props, "priceConfigs.price.font"),
                            color: get(props, "priceConfigs.price.color"),
                            whiteSpace: "nowrap",
                            minWidth: 0
                        },
                        children: formatCartPrice(mockData[0].price, "USD")
                    }), mockData[0].comparePrice && /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0,
                            ...get(props, "priceConfigs.comparePrice.font"),
                            color: get(props, "priceConfigs.comparePrice.color"),
                            textDecoration: props.priceConfigs ? .comparePrice ? .strikethrough ? "line-through" : "none",
                            textDecorationColor: props.priceConfigs ? .comparePrice ? .strikethroughColor,
                            whiteSpace: "nowrap",
                            minWidth: 0
                        },
                        children: formatCartPrice(mockData[0].comparePrice, "USD")
                    })]
                }),
                shopifyQuantity: "1",
                variants: null,
                onRemove: () => {},
                onAddQuantity: () => {},
                onSubtractQuantity: () => {}
            }), props.spacingConfigs ? .dividerVisible && /*#__PURE__*/ _jsx("div", {
                style: {
                    width: "100%",
                    borderTop: `${props.spacingConfigs?.divider?.borderWidth||1}px ${props.spacingConfigs?.divider?.borderStyle||"solid"} ${props.spacingConfigs?.divider?.borderColor||"rgba(0,0,0,0.08)"}`
                }
            }), /*#__PURE__*/ _jsx(ShopXCartProductCard, {
                imageVisibility: props.imageConfigs ? .visible,
                image: props.imageConfigs ? .visible ? "https://framerusercontent.com/images/3E7u1YOHRQaZuBdfYRsm3XCzxk.jpg" : null,
                imageConfigs: props.imageConfigs,
                quantityConfigs: props.quantityConfigs,
                removeIconConfigs: props.removeIconConfigs,
                containerConfigs: props.containerConfigs,
                linkConfigs: props.linkConfigs,
                titleConfigs: props.titleConfigs,
                _lineItem: {
                    merchandise: {
                        product: {
                            handle: "example-product"
                        }
                    }
                },
                quantityControlColor: props.quantityConfigs ? .buttons ? .icons,
                quantityNumberColor: props.quantityConfigs ? .container ? .number,
                quantityContainerBgColor: props.quantityConfigs ? .container ? .containerBg,
                quantityControlBgColor: props.quantityConfigs ? .buttons ? .iconBg,
                quantityControlHoverColor: props.quantityConfigs ? .buttons ? .iconBgHover,
                quantityContainerBorder: "1px solid #E2E2E2",
                quantityContainerRadius: "8px",
                xColor: props.removeIconConfigs ? .icon,
                xBgColor: props.removeIconConfigs ? .bg,
                xBgHoverColor: props.removeIconConfigs ? .bgHover,
                style: {
                    width: "100%",
                    ...props.containerConfigs ? .border || {},
                    borderRadius : props.containerConfigs ? .radius || "0px",
                    background: props.containerConfigs ? .background || "#FFF",
                    padding: props.containerConfigs ? .padding || "0px"
                },
                shopifyProductTitle: /*#__PURE__*/ _jsx("p", {
                    style: { ...get(props, "titleConfigs.font"),
                        color: get(props, "titleConfigs.color"),
                        margin: 0
                    },
                    children: "Product Title 2"
                }),
                shopifyProductPriceAmount: /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: props.priceConfigs ? .gap || 4
                    },
                    children: [ /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0,
                            ...get(props, "priceConfigs.price.font"),
                            color: get(props, "priceConfigs.price.color"),
                            whiteSpace: "nowrap",
                            minWidth: 0
                        },
                        children: formatCartPrice(mockData[1].price, "USD")
                    }), mockData[1].comparePrice && /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0,
                            ...get(props, "priceConfigs.comparePrice.font"),
                            color: get(props, "priceConfigs.comparePrice.color"),
                            textDecoration: props.priceConfigs ? .comparePrice ? .strikethrough ? "line-through" : "none",
                            textDecorationColor: props.priceConfigs ? .comparePrice ? .strikethroughColor,
                            whiteSpace: "nowrap",
                            minWidth: 0
                        },
                        children: formatCartPrice(mockData[1].comparePrice, "USD")
                    })]
                }),
                shopifyQuantity: "2",
                variants: /*#__PURE__*/ _jsx("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: props.variantConfigs ? .gap || "4px"
                    },
                    children: /*#__PURE__*/ _jsxs("p", {
                        style: {
                            margin: 0
                        },
                        children: [ /*#__PURE__*/ _jsx("span", {
                            style: { ...get(props, "variantConfigs.titleFont"),
                                color: get(props, "variantConfigs.titleColor"),
                                marginRight: "5px"
                            },
                            children: "Color:"
                        }), /*#__PURE__*/ _jsx("span", {
                            style: { ...get(props, "variantConfigs.valueFont"),
                                color: get(props, "variantConfigs.valueColor")
                            },
                            children: "Blue"
                        })]
                    })
                }),
                onRemove: () => {},
                onAddQuantity: () => {},
                onSubtractQuantity: () => {}
            }), props.spacingConfigs ? .dividerVisible && /*#__PURE__*/ _jsx("div", {
                style: {
                    width: "100%",
                    borderTop: `${props.spacingConfigs?.divider?.borderWidth||1}px ${props.spacingConfigs?.divider?.borderStyle||"solid"} ${props.spacingConfigs?.divider?.borderColor||"rgba(0,0,0,0.08)"}`
                }
            }), /*#__PURE__*/ _jsx(ShopXCartProductCard, {
                imageVisibility: props.imageConfigs ? .visible,
                image: props.imageConfigs ? .visible ? "https://framerusercontent.com/images/3E7u1YOHRQaZuBdfYRsm3XCzxk.jpg" : null,
                imageConfigs: props.imageConfigs,
                quantityConfigs: props.quantityConfigs,
                removeIconConfigs: props.removeIconConfigs,
                containerConfigs: props.containerConfigs,
                linkConfigs: props.linkConfigs,
                titleConfigs: props.titleConfigs,
                _lineItem: {
                    merchandise: {
                        product: {
                            handle: "example-product"
                        }
                    }
                },
                quantityControlColor: props.quantityConfigs ? .buttons ? .icons,
                quantityNumberColor: props.quantityConfigs ? .container ? .number,
                quantityContainerBgColor: props.quantityConfigs ? .container ? .containerBg,
                quantityControlBgColor: props.quantityConfigs ? .buttons ? .iconBg,
                quantityControlHoverColor: props.quantityConfigs ? .buttons ? .iconBgHover,
                quantityContainerBorder: "1px solid #E2E2E2",
                quantityContainerRadius: "8px",
                xColor: props.removeIconConfigs ? .icon,
                xBgColor: props.removeIconConfigs ? .bg,
                xBgHoverColor: props.removeIconConfigs ? .bgHover,
                style: {
                    width: "100%",
                    ...props.containerConfigs ? .border || {},
                    borderRadius : props.containerConfigs ? .radius || "0px",
                    background: props.containerConfigs ? .background || "#FFF",
                    padding: props.containerConfigs ? .padding || "0px"
                },
                shopifyProductTitle: /*#__PURE__*/ _jsx("p", {
                    style: { ...get(props, "titleConfigs.font"),
                        color: get(props, "titleConfigs.color"),
                        margin: 0
                    },
                    children: "Product Title 3"
                }),
                shopifyProductPriceAmount: /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: props.priceConfigs ? .gap || 4
                    },
                    children: [ /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0,
                            ...get(props, "priceConfigs.price.saleFont"),
                            color: get(props, "priceConfigs.price.saleColor"),
                            whiteSpace: "nowrap",
                            minWidth: 0
                        },
                        children: formatCartPrice(300, "USD")
                    }), /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0,
                            ...get(props, "priceConfigs.comparePrice.font"),
                            color: get(props, "priceConfigs.comparePrice.color"),
                            textDecoration: props.priceConfigs ? .comparePrice ? .strikethrough ? "line-through" : "none",
                            textDecorationColor: props.priceConfigs ? .comparePrice ? .strikethroughColor,
                            whiteSpace: "nowrap",
                            minWidth: 0
                        },
                        children: formatCartPrice(400, "USD")
                    })]
                }),
                shopifyQuantity: "3",
                variants: /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: props.variantConfigs ? .gap || "4px"
                    },
                    children: [ /*#__PURE__*/ _jsxs("p", {
                        style: {
                            margin: 0
                        },
                        children: [ /*#__PURE__*/ _jsx("span", {
                            style: { ...get(props, "variantConfigs.titleFont"),
                                color: get(props, "variantConfigs.titleColor"),
                                marginRight: "5px"
                            },
                            children: "Color:"
                        }), /*#__PURE__*/ _jsx("span", {
                            style: { ...get(props, "variantConfigs.valueFont"),
                                color: get(props, "variantConfigs.valueColor")
                            },
                            children: "Black"
                        })]
                    }), /*#__PURE__*/ _jsxs("p", {
                        style: {
                            margin: 0
                        },
                        children: [ /*#__PURE__*/ _jsx("span", {
                            style: { ...get(props, "variantConfigs.titleFont"),
                                color: get(props, "variantConfigs.titleColor"),
                                marginRight: "5px"
                            },
                            children: "Size:"
                        }), /*#__PURE__*/ _jsx("span", {
                            style: { ...get(props, "variantConfigs.valueFont"),
                                color: get(props, "variantConfigs.valueColor")
                            },
                            children: "Medium"
                        })]
                    })]
                }),
                onRemove: () => {},
                onAddQuantity: () => {},
                onSubtractQuantity: () => {}
            }), props.spacingConfigs ? .dividerVisible && /*#__PURE__*/ _jsx("div", {
                style: {
                    width: "100%",
                    borderTop: `${props.spacingConfigs?.divider?.borderWidth||1}px ${props.spacingConfigs?.divider?.borderStyle||"solid"} ${props.spacingConfigs?.divider?.borderColor||"rgba(0,0,0,0.08)"}`
                }
            }), /*#__PURE__*/ _jsx(ShopXCartProductCard, {
                imageVisibility: props.imageConfigs ? .visible,
                image: props.imageConfigs ? .visible ? "https://framerusercontent.com/images/3E7u1YOHRQaZuBdfYRsm3XCzxk.jpg" : null,
                imageConfigs: props.imageConfigs,
                quantityConfigs: props.quantityConfigs,
                removeIconConfigs: props.removeIconConfigs,
                containerConfigs: props.containerConfigs,
                linkConfigs: props.linkConfigs,
                titleConfigs: props.titleConfigs,
                _lineItem: {
                    merchandise: {
                        product: {
                            handle: "example-product"
                        }
                    }
                },
                quantityControlColor: props.quantityConfigs ? .buttons ? .icons,
                quantityNumberColor: props.quantityConfigs ? .container ? .number,
                quantityContainerBgColor: props.quantityConfigs ? .container ? .containerBg,
                quantityControlBgColor: props.quantityConfigs ? .buttons ? .iconBg,
                quantityControlHoverColor: props.quantityConfigs ? .buttons ? .iconBgHover,
                quantityContainerBorder: "1px solid #E2E2E2",
                quantityContainerRadius: "8px",
                xColor: props.removeIconConfigs ? .icon,
                xBgColor: props.removeIconConfigs ? .bg,
                xBgHoverColor: props.removeIconConfigs ? .bgHover,
                style: {
                    width: "100%",
                    ...props.containerConfigs ? .border || {},
                    borderRadius : props.containerConfigs ? .radius || "0px",
                    background: props.containerConfigs ? .background || "#FFF",
                    padding: props.containerConfigs ? .padding || "0px"
                },
                shopifyProductTitle: /*#__PURE__*/ _jsx("p", {
                    style: { ...get(props, "titleConfigs.font"),
                        color: get(props, "titleConfigs.color"),
                        margin: 0
                    },
                    children: "Product Title 4"
                }),
                shopifyProductPriceAmount: /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: props.priceConfigs ? .gap || 4
                    },
                    children: [ /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0,
                            ...get(props, "priceConfigs.price.font"),
                            color: get(props, "priceConfigs.price.color"),
                            whiteSpace: "nowrap",
                            minWidth: 0
                        },
                        children: formatCartPrice(400, "USD")
                    }), /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0,
                            ...get(props, "priceConfigs.comparePrice.font"),
                            color: get(props, "priceConfigs.comparePrice.color"),
                            textDecoration: props.priceConfigs ? .comparePrice ? .strikethrough ? "line-through" : "none",
                            textDecorationColor: props.priceConfigs ? .comparePrice ? .strikethroughColor,
                            whiteSpace: "nowrap",
                            minWidth: 0
                        }
                    })]
                }),
                shopifyQuantity: "4",
                variants: /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: props.variantConfigs ? .gap || "4px"
                    },
                    children: [ /*#__PURE__*/ _jsxs("p", {
                        style: {
                            margin: 0
                        },
                        children: [ /*#__PURE__*/ _jsx("span", {
                            style: { ...get(props, "variantConfigs.titleFont"),
                                color: get(props, "variantConfigs.titleColor"),
                                marginRight: "5px"
                            },
                            children: "Size:"
                        }), /*#__PURE__*/ _jsx("span", {
                            style: { ...get(props, "variantConfigs.valueFont"),
                                color: get(props, "variantConfigs.valueColor")
                            },
                            children: "Medium"
                        })]
                    }), /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0,
                            ...get(props, "subscriptionConfigs.font"),
                            color: get(props, "subscriptionConfigs.color")
                        },
                        children: "Delivers every week"
                    })]
                }),
                onRemove: () => {},
                onAddQuantity: () => {},
                onSubtractQuantity: () => {}
            })]
        }) : cartItems.length === 0 ? /*#__PURE__*/ _jsx("div", {
            style: {
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%"
            },
            children: props.emptyStateComponent
        }) : /*#__PURE__*/ _jsxs("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                gap: 0,
                width: "100%",
                boxSizing: "border-box"
            },
            children: [errorVisible && /*#__PURE__*/ _jsx("p", {
                style: { ...get(props, "errorConfigs.errorFont"),
                    color: get(props, "errorConfigs.errorColor"),
                    textTransform: get(props, "errorConfigs.textTransform", "none")
                },
                children: errorMessage
            }), cartItems.map(({
                node: _lineItem
            }, index) => /*#__PURE__*/ _jsxs(_Fragment, {
                children: [index > 0 && props.spacingConfigs ? .dividerVisible ? /*#__PURE__*/ _jsx("div", {
                    style: {
                        width: "100%",
                        marginTop: typeof props.spacingConfigs ? .gap === "number" ? props.spacingConfigs.gap : 24,
                        marginBottom: typeof props.spacingConfigs ? .gap === "number" ? props.spacingConfigs.gap : 24,
                        borderTop: `${props.spacingConfigs?.divider?.borderWidth||1}px ${props.spacingConfigs?.divider?.borderStyle||"solid"} ${props.spacingConfigs?.divider?.borderColor||"rgba(0,0,0,0.08)"}`
                    }
                }) : index > 0 && !props.spacingConfigs ? .dividerVisible ? /*#__PURE__*/ _jsx("div", {
                    style: {
                        marginTop: typeof props.spacingConfigs ? .gap === "number" ? props.spacingConfigs.gap : 24
                    }
                }) : null, /*#__PURE__*/ _jsx("div", {
                    style: {
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: typeof props.containerConfigs ? .radius === "object" ? `${props.containerConfigs.radius.topLeft}px ${props.containerConfigs.radius.topRight}px ${props.containerConfigs.radius.bottomRight}px ${props.containerConfigs.radius.bottomLeft}px` : typeof props.containerConfigs ? .radius === "string" ? props.containerConfigs.radius : `${props.containerConfigs?.radius||0}px`,
                        background: props.containerConfigs ? .background || "#FFF",
                        ...props.containerConfigs ? .border || {},
                        padding : typeof props.containerConfigs ? .padding === "object" ? `${props.containerConfigs.padding.top}px ${props.containerConfigs.padding.right}px ${props.containerConfigs.padding.bottom}px ${props.containerConfigs.padding.left}px` : props.containerConfigs ? .padding || "0px",
                        display: "flex"
                    },
                    children: /*#__PURE__*/ _jsx(ShopXCartProductCard, {
                        imageVisibility: props.imageConfigs ? .visible,
                        image: get(_lineItem, "merchandise.image.url", null),
                        imageConfigs: props.imageConfigs,
                        quantityConfigs: props.quantityConfigs,
                        removeIconConfigs: props.removeIconConfigs,
                        containerConfigs: { ...props.containerConfigs,
                            background: "transparent"
                        },
                        linkConfigs: props.linkConfigs,
                        titleConfigs: props.titleConfigs,
                        _lineItem: _lineItem,
                        quantityControlColor: props.quantityConfigs ? .buttons ? .icons,
                        quantityNumberColor: props.quantityConfigs ? .container ? .number,
                        quantityContainerBgColor: props.quantityConfigs ? .container ? .containerBg,
                        quantityControlBgColor: props.quantityConfigs ? .buttons ? .iconBg,
                        quantityControlHoverColor: props.quantityConfigs ? .buttons ? .iconBgHover,
                        quantityContainerBorder: "1px solid #E2E2E2",
                        quantityContainerRadius: "8px",
                        xColor: props.removeIconConfigs ? .icon,
                        xBgColor: props.removeIconConfigs ? .bg,
                        xBgHoverColor: props.removeIconConfigs ? .bgHover,
                        Radius: "0px",
                        style: {
                            width: "100%",
                            background: "transparent",
                            ...RenderTarget.current() === RenderTarget.canvas ? {
                                padding: typeof props.containerConfigs ? .padding === "object" ? `${props.containerConfigs.padding.top}px ${props.containerConfigs.padding.right}px ${props.containerConfigs.padding.bottom}px ${props.containerConfigs.padding.left}px` : props.containerConfigs ? .padding || "0px"
                            } : {
                                padding: 0
                            }
                        },
                        shopifyProductTitle: /*#__PURE__*/ _jsx("p", {
                            style: { ...get(props, "titleConfigs.font"),
                                color: get(props, "titleConfigs.color"),
                                margin: 0,
                                textTransform: props.titleConfigs ? .textTransform || "none"
                            },
                            children: _lineItem.merchandise.product.title
                        }),
                        shopifyProductPriceAmount: /*#__PURE__*/ _jsx("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                gap: props.priceConfigs ? .gap || 4
                            },
                            children: (() => {
                                if (!_lineItem) return null; // Use cart data for primary information
                                let price, comparePrice, currencyCode;
                                if (_lineItem.sellingPlanAllocation) { // Subscription item: use unit price from selling plan
                                    price = _lineItem.sellingPlanAllocation.checkoutChargeAmount ? .amount;
                                    comparePrice = _lineItem.merchandise ? .compareAtPrice ? .amount //no compareAtPrice in sellingPlanAllocation!!! _lineItem.sellingPlanAllocation.compareAtPrice?.amount;
                                    ;
                                    currencyCode = _lineItem.sellingPlanAllocation.checkoutChargeAmount ? .currencyCode;
                                } else { // Non-subscription item: use unit price from merchandise object, fallback to cost
                                    price = _lineItem.merchandise ? .price ? .amount || _lineItem.cost ? .amountPerQuantity ? .amount;
                                    currencyCode = _lineItem.merchandise ? .price ? .currencyCode || _lineItem.cost ? .amountPerQuantity ? .currencyCode;
                                    comparePrice = _lineItem.merchandise ? .compareAtPrice ? .amount || _lineItem.cost ? .compareAtAmountPerQuantity ? .amount;
                                } // Supplement with external data
                                const variantId = _lineItem.merchandise.id;
                                const variantGid = variantId.split("/").pop();
                                const matchingProduct = window.shopXtools.products.find(({
                                    node
                                }) => node.variants.edges.some(edge => edge.node.id.includes(variantGid))) ? .node;
                                const matchingVariant = matchingProduct ? .variants ? .edges.find(edge => edge.node.id.includes(variantGid)) ? .node; // Preserve the log
                                // console.log(
                                //     "Cart Product Card - Price Data:",
                                //     {
                                //         variantId,
                                //         variantGid,
                                //         matchingProduct,
                                //         matchingVariant,
                                //         price,
                                //         currencyCode,
                                //         comparePrice,
                                //         variantComparePrice:
                                //             get(
                                //                 matchingVariant,
                                //                 "compareAtPrice.amount"
                                //             ),
                                //         productComparePrice:
                                //             get(
                                //                 matchingProduct,
                                //                 "compareAtPriceRange.minVariantPrice.amount"
                                //             ),
                                //         lineItem: _lineItem,
                                //         showCurrencyCode:
                                //             props.showCurrencyCode,
                                //         currencyPosition:
                                //             props.currencyPosition,
                                //         showCurrencySymbol:
                                //             props.showCurrencySymbol,
                                //     }
                                // )
                                const hasComparePrice = comparePrice && parseFloat(comparePrice) > parseFloat(price);
                                const finalPrice = price || "0";
                                return /*#__PURE__*/ _jsxs(_Fragment, {
                                    children: [ /*#__PURE__*/ _jsx("p", {
                                        style: {
                                            margin: 0,
                                            ...get(props, hasComparePrice ? "priceConfigs.price.saleFont" : "priceConfigs.price.font"),
                                            color: hasComparePrice ? props.priceConfigs ? .price ? .saleColor : props.priceConfigs ? .price ? .color,
                                            whiteSpace: "nowrap",
                                            minWidth: 0
                                        },
                                        children: formatCartPrice(finalPrice, currencyCode)
                                    }), hasComparePrice && /*#__PURE__*/ _jsx("p", {
                                        style: {
                                            margin: 0,
                                            ...get(props, "priceConfigs.comparePrice.font"),
                                            color: get(props, "priceConfigs.comparePrice.color"),
                                            textDecoration: "line-through",
                                            textDecorationColor: props.priceConfigs ? .comparePrice ? .strikethroughColor,
                                            whiteSpace: "nowrap",
                                            minWidth: 0
                                        },
                                        children: formatCartPrice(comparePrice, currencyCode)
                                    })]
                                });
                            })()
                        }),
                        shopifyQuantity: `${_lineItem.quantity||1}`,
                        variants: /*#__PURE__*/ _jsxs("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: props.variantConfigs ? .gap || "4px"
                            },
                            children: [_lineItem.merchandise.selectedOptions.filter(option => option.name !== "Title").map((option, index) => /*#__PURE__*/ _jsxs("p", {
                                style: {
                                    margin: 0
                                },
                                children: [ /*#__PURE__*/ _jsxs("span", {
                                    style: { ...get(props, "variantConfigs.titleFont"),
                                        color: get(props, "variantConfigs.titleColor"),
                                        marginRight: "5px",
                                        textTransform: get(props, "variantConfigs.titleTransform", "none")
                                    },
                                    children: [option.name, ":"]
                                }), /*#__PURE__*/ _jsx("span", {
                                    style: { ...get(props, "variantConfigs.valueFont"),
                                        color: get(props, "variantConfigs.valueColor"),
                                        textTransform: get(props, "variantConfigs.valueTransform", "none")
                                    },
                                    children: option.value
                                })]
                            }, `variant-${option.name}-${index}`)), _lineItem.attributes ? .map((attr, index) => /*#__PURE__*/ _jsxs("p", {
                                style: {
                                    margin: 0
                                },
                                children: [ /*#__PURE__*/ _jsxs("span", {
                                    style: { ...props.attributeConfigs ? .uniqueFormatting ? get(props, "attributeConfigs.titleFont"): get(props, "variantConfigs.titleFont"),
                                        color : props.attributeConfigs ? .uniqueFormatting ? get(props, "attributeConfigs.titleColor"): get(props, "variantConfigs.titleColor"),
                                        marginRight : "5px",
                                        textTransform : props.attributeConfigs ? .uniqueFormatting ? get(props, "attributeConfigs.titleTransform", "none"): get(props, "variantConfigs.titleTransform", "none")
                                    },
                                    children: [attr.key, ":"]
                                }), /*#__PURE__*/ _jsx("span", {
                                    style: { ...props.attributeConfigs ? .uniqueFormatting ? get(props, "attributeConfigs.valueFont"): get(props, "variantConfigs.valueFont"),
                                        color : props.attributeConfigs ? .uniqueFormatting ? get(props, "attributeConfigs.valueColor"): get(props, "variantConfigs.valueColor"),
                                        textTransform : props.attributeConfigs ? .uniqueFormatting ? get(props, "attributeConfigs.valueTransform", "none"): get(props, "variantConfigs.valueTransform", "none")
                                    },
                                    children: attr.value
                                })]
                            }, `attr-${attr.key}-${index}`)), _lineItem.sellingPlanAllocation ? .sellingPlan ? .name && /*#__PURE__*/ _jsx("p", {
                                style: {
                                    margin: 0,
                                    ...get(props, "subscriptionConfigs.font"),
                                    color: get(props, "subscriptionConfigs.color"),
                                    textTransform: get(props, "subscriptionConfigs.textTransform", "none")
                                },
                                children: _lineItem.sellingPlanAllocation.sellingPlan.name
                            })]
                        }),
                        onRemove: () => handleRemoveLine(cart.id, _lineItem.id),
                        onAddQuantity: () => handleUpdateLine(cart.id, _lineItem.id, _lineItem.quantity + 1, _lineItem),
                        onSubtractQuantity: () => handleUpdateLine(cart.id, _lineItem.id, _lineItem.quantity - 1, _lineItem)
                    })
                }, _lineItem.id)]
            }))]
        })
    });
}
FC_CartProductCard.defaultProps = {
    containerConfigs: {
        background: "transparent",
        radius: 0,
        padding: 0,
        insidePadding: 0,
        gap: 8,
        border: {
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "transparent"
        }
    },
    linkConfigs: {
        enabled: false,
        slugPath: ""
    },
    imageConfigs: {
        visible: true,
        type: "Fill",
        width: 104,
        radius: 8,
        background: "#F5F5F5",
        border: {
            borderWidth: 0,
            borderStyle: "solid",
            borderColor: "transparent"
        },
        ratio: "1:1",
        hover: "None",
        zoomScale: 1.05,
        opacity: .75
    },
    titleConfigs: {
        font: {
            family: "Inter",
            size: 14,
            weight: 500
        },
        color: "#000000",
        hoverColor: "#000000"
    },
    variantConfigs: {
        gap: 4,
        titleFont: {
            family: "Inter",
            size: 14,
            weight: 500
        },
        titleColor: "#000000",
        valueFont: {
            family: "Inter",
            size: 14,
            weight: 400
        },
        valueColor: "#666666"
    },
    subscriptionConfigs: {
        font: {
            family: "Inter",
            size: 14,
            weight: 400
        },
        color: "#4A5B89"
    },
    quantityConfigs: {
        type: ControlType.Object,
        title: "Quantity",
        controls: {
            container: {
                type: ControlType.Object,
                title: "Container",
                controls: {
                    font: {
                        family: "Inter",
                        size: 14,
                        weight: 500
                    },
                    number: {
                        type: ControlType.Color,
                        defaultValue: "#000",
                        title: "Number"
                    },
                    containerBg: {
                        type: ControlType.Color,
                        defaultValue: "transparent",
                        title: "BG"
                    },
                    padding: {
                        type: ControlType.Padding,
                        title: "Padding",
                        defaultValue: "4px"
                    },
                    containerRadius: {
                        type: ControlType.BorderRadius,
                        title: "Radius",
                        defaultValue: "4px"
                    },
                    containerBorder: {
                        type: ControlType.Border,
                        title: "Border",
                        defaultValue: {
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "#E2E2E2"
                        }
                    }
                }
            },
            buttons: {
                type: ControlType.Object,
                title: "Buttons",
                controls: {
                    iconType: {
                        type: ControlType.SegmentedEnum,
                        title: "Icon",
                        options: ["Default", "Custom"],
                        optionTitles: ["Default", "Custom"],
                        defaultValue: "Default"
                    },
                    iconWeight: {
                        type: ControlType.Number,
                        title: "Weight",
                        defaultValue: 2,
                        min: .5,
                        max: 5,
                        step: .1,
                        displayStepper: true,
                        hidden: ({
                            iconType
                        }) => iconType !== "Default"
                    },
                    customPlusIcon: {
                        type: ControlType.Image,
                        title: "Plus",
                        hidden: ({
                            iconType
                        }) => iconType !== "Custom"
                    },
                    customMinusIcon: {
                        type: ControlType.Image,
                        title: "Minus",
                        hidden: ({
                            iconType
                        }) => iconType !== "Custom"
                    },
                    icons: {
                        type: ControlType.Color,
                        defaultValue: "#000",
                        title: "Icons"
                    },
                    iconsColorDisabled: {
                        type: ControlType.Color,
                        defaultValue: "#CCCCCC",
                        title: "Icons Color Disabled"
                    },
                    iconSize: {
                        type: ControlType.Number,
                        title: "Icon Size",
                        defaultValue: 8,
                        min: 4,
                        max: 32,
                        unit: "px",
                        step: 1,
                        displayStepper: true
                    },
                    padding: {
                        type: ControlType.Padding,
                        title: "Padding",
                        defaultValue: "4px"
                    },
                    iconBg: {
                        type: ControlType.Color,
                        defaultValue: "#FFFFFF",
                        title: "BG"
                    },
                    iconBgHover: {
                        type: ControlType.Color,
                        defaultValue: "#F5F5F5",
                        title: "BG Hover"
                    },
                    iconBgDisabled: {
                        type: ControlType.Color,
                        defaultValue: "#FFFFFF",
                        title: "BG Disabled"
                    },
                    radius: {
                        type: ControlType.BorderRadius,
                        title: "Radius",
                        defaultValue: "4px"
                    },
                    border: {
                        type: ControlType.Border,
                        title: "Border",
                        defaultValue: {
                            borderWidth: 0,
                            borderStyle: "solid",
                            borderColor: "transparent"
                        }
                    }
                }
            }
        }
    },
    priceConfigs: {
        gap: 4,
        price: {
            font: {
                family: "Inter",
                size: 14,
                weight: 500
            },
            color: "#000000",
            saleFont: {
                family: "Inter",
                size: 14,
                weight: 500
            },
            saleColor: "#000000"
        },
        comparePrice: {
            font: {
                family: "Inter",
                size: 14,
                weight: 400
            },
            color: "#8B0000",
            strikethrough: true,
            strikethroughColor: "#8B0000"
        },
        format: {
            showSymbol: true,
            showCurrency: false,
            showDecimals: "Always show",
            currencyCode: "USD"
        }, // Keep for backward compatibility
        showCurrencyCode: false,
        showSymbol: true
    },
    removeIconConfigs: {
        type: ControlType.Object,
        title: "Remove Icon",
        controls: {
            position: {
                type: ControlType.Enum,
                title: "Position",
                options: ["Top", "Bottom"],
                defaultValue: "Bottom"
            },
            iconType: {
                type: ControlType.SegmentedEnum,
                title: "Icon",
                options: ["Default", "Custom"],
                optionTitles: ["Default", "Custom"],
                defaultValue: "Default"
            },
            iconWeight: {
                type: ControlType.Number,
                title: "Weight",
                defaultValue: 2,
                min: .5,
                max: 5,
                step: .1,
                displayStepper: true,
                hidden: ({
                    iconType
                }) => iconType !== "Default"
            },
            customImage: {
                type: ControlType.Image,
                title: "Image",
                hidden: ({
                    iconType
                }) => iconType !== "Custom"
            },
            icon: {
                type: ControlType.Color,
                defaultValue: "#000000",
                title: "Icon",
                hidden: ({
                    iconType
                }) => iconType === "Custom"
            },
            iconSize: {
                type: ControlType.Number,
                title: "Icon Size",
                defaultValue: 8,
                min: 4,
                max: 32,
                unit: "px",
                step: 1,
                displayStepper: true
            },
            bg: {
                type: ControlType.Color,
                defaultValue: "#F5F5F5",
                title: "BG"
            },
            bgHover: {
                type: ControlType.Color,
                defaultValue: "#EBEBEB",
                title: "BG Hover"
            },
            radius: {
                type: ControlType.BorderRadius,
                title: "Radius",
                defaultValue: "80px"
            },
            border: {
                type: ControlType.Border,
                title: "Border",
                defaultValue: {
                    borderWidth: 0,
                    borderStyle: "solid",
                    borderColor: "transparent"
                }
            }
        }
    }
};
addPropertyControls(FC_CartProductCard, {
    linkConfigs: {
        type: ControlType.Object,
        title: "Link",
        controls: {
            enabled: {
                type: ControlType.Boolean,
                title: "Link",
                defaultValue: false,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            slugPath: {
                type: ControlType.String,
                title: "Path",
                defaultValue: "",
                placeholder: "shop/",
                description: "The path between your domain and slug. [Learn more](https://framercommerce.com/resources/docs/components/cart#cart-product-card)",
                hidden: ({
                    enabled
                }) => !enabled
            }
        }
    },
    imageConfigs: {
        type: ControlType.Object,
        title: "Image",
        controls: {
            visible: {
                type: ControlType.Boolean,
                title: "Image",
                defaultValue: true,
                enabledTitle: "Show",
                disabledTitle: "Hide"
            },
            type: {
                type: ControlType.SegmentedEnum,
                title: "Type",
                options: ["Fill", "Fit"],
                defaultValue: "Fill",
                optionTitles: ["Fill", "Fit"],
                hidden: ({
                    visible
                }) => !visible
            },
            width: {
                type: ControlType.Number,
                title: "Width",
                defaultValue: 112,
                min: 0,
                max: 500,
                unit: "px",
                step: 8,
                displayStepper: true,
                hidden: ({
                    visible
                }) => !visible
            },
            radius: {
                type: ControlType.BorderRadius,
                title: "Radius",
                defaultValue: "4px",
                hidden: ({
                    visible
                }) => !visible
            },
            background: {
                type: ControlType.Color,
                title: "BG",
                defaultValue: "#F2F2F2",
                hidden: ({
                    visible
                }) => !visible
            },
            border: {
                type: ControlType.Border,
                title: "Border",
                defaultValue: {
                    borderWidth: 0,
                    borderStyle: "solid",
                    borderColor: "rgba(0,0,0,0)"
                },
                hidden: ({
                    visible
                }) => !visible
            },
            ratio: {
                type: ControlType.Enum,
                title: "Ratio",
                options: ["1:1", "3:2", "4:5"],
                defaultValue: "1:1",
                hidden: ({
                    visible
                }) => !visible
            },
            hover: {
                type: ControlType.Enum,
                title: "Hover Type",
                options: ["None", "Zoom", "Opacity"],
                defaultValue: "None",
                hidden: ({
                    visible
                }) => !visible
            },
            zoomScale: {
                type: ControlType.Number,
                title: "Zoom Scale",
                defaultValue: 1.05,
                min: 1,
                max: 3,
                step: .05,
                displayStepper: true,
                hidden: ({
                    hover
                }) => hover !== "Zoom"
            },
            opacity: {
                type: ControlType.Number,
                title: "Opacity",
                defaultValue: .75,
                min: 0,
                max: 1,
                step: .05,
                hidden: ({
                    hover
                }) => hover !== "Opacity"
            }
        }
    },
    titleConfigs: {
        type: ControlType.Object,
        title: "Title",
        controls: {
            font: {
                type: ControlType.Font,
                controls: "extended",
                title: "Font"
            },
            color: {
                type: ControlType.Color,
                defaultValue: "#000",
                title: "Color"
            },
            hoverColor: {
                type: ControlType.Color,
                defaultValue: "#000",
                title: "Hover"
            },
            textTransform: {
                type: ControlType.Enum,
                title: "Transform",
                options: ["None", "Uppercase", "Lowercase", "Capitalize"],
                defaultValue: "none"
            }
        }
    },
    variantConfigs: {
        type: ControlType.Object,
        title: "Variants",
        controls: {
            titleFont: {
                type: ControlType.Font,
                controls: "extended",
                title: "Title Font"
            },
            titleColor: {
                type: ControlType.Color,
                defaultValue: "#000",
                title: "Title Color"
            },
            titleTransform: {
                type: ControlType.Enum,
                title: "Transform",
                options: ["None", "Uppercase", "Lowercase", "Capitalize"],
                defaultValue: "none"
            },
            valueFont: {
                type: ControlType.Font,
                controls: "extended",
                title: "Value Font"
            },
            valueColor: {
                type: ControlType.Color,
                defaultValue: "#000",
                title: "Value Color"
            },
            valueTransform: {
                type: ControlType.Enum,
                title: "Transform",
                options: ["None", "Uppercase", "Lowercase", "Capitalize"],
                defaultValue: "none"
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 4,
                min: 0,
                max: 100,
                unit: "px",
                step: 1
            }
        }
    },
    attributeConfigs: {
        type: ControlType.Object,
        title: "Attributes",
        controls: {
            uniqueFormatting: {
                type: ControlType.Boolean,
                title: "Customize",
                defaultValue: false,
                enabledTitle: "Yes",
                disabledTitle: "No",
                description: "By default, attributes use same styling as Variants."
            },
            titleFont: {
                type: ControlType.Font,
                controls: "extended",
                title: "Title Font",
                hidden: ({
                    uniqueFormatting
                }) => !uniqueFormatting
            },
            titleColor: {
                type: ControlType.Color,
                defaultValue: "#000",
                title: "Title Color",
                hidden: ({
                    uniqueFormatting
                }) => !uniqueFormatting
            },
            titleTransform: {
                type: ControlType.Enum,
                title: "Transform",
                options: ["None", "Uppercase", "Lowercase", "Capitalize"],
                defaultValue: "none",
                hidden: ({
                    uniqueFormatting
                }) => !uniqueFormatting
            },
            valueFont: {
                type: ControlType.Font,
                controls: "extended",
                title: "Value Font",
                hidden: ({
                    uniqueFormatting
                }) => !uniqueFormatting
            },
            valueColor: {
                type: ControlType.Color,
                defaultValue: "#000",
                title: "Value Color",
                hidden: ({
                    uniqueFormatting
                }) => !uniqueFormatting
            },
            valueTransform: {
                type: ControlType.Enum,
                title: "Transform",
                options: ["None", "Uppercase", "Lowercase", "Capitalize"],
                defaultValue: "none",
                hidden: ({
                    uniqueFormatting
                }) => !uniqueFormatting
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 4,
                min: 0,
                max: 100,
                unit: "px",
                step: 1,
                hidden: props => !props.attributeConfigs ? .uniqueFormatting
            }
        }
    },
    subscriptionConfigs: {
        type: ControlType.Object,
        title: "Subscription",
        controls: {
            font: {
                type: ControlType.Font,
                controls: "extended",
                title: "Font"
            },
            color: {
                type: ControlType.Color,
                defaultValue: "#000",
                title: "Color"
            },
            textTransform: {
                type: ControlType.Enum,
                title: "Transform",
                options: ["None", "Uppercase", "Lowercase", "Capitalize"],
                defaultValue: "none"
            }
        }
    },
    quantityConfigs: {
        type: ControlType.Object,
        title: "Quantity",
        controls: {
            container: {
                type: ControlType.Object,
                title: "Container",
                controls: {
                    font: {
                        type: ControlType.Font,
                        controls: "extended",
                        title: "Font"
                    },
                    number: {
                        type: ControlType.Color,
                        defaultValue: "#000",
                        title: "Number"
                    },
                    containerBg: {
                        type: ControlType.Color,
                        defaultValue: "transparent",
                        title: "BG"
                    },
                    padding: {
                        type: ControlType.Padding,
                        title: "Padding",
                        defaultValue: "4px"
                    },
                    containerRadius: {
                        type: ControlType.BorderRadius,
                        title: "Radius",
                        defaultValue: "4px"
                    },
                    containerBorder: {
                        type: ControlType.Border,
                        title: "Border",
                        defaultValue: {
                            borderWidth: 1,
                            borderStyle: "solid",
                            borderColor: "#E2E2E2"
                        }
                    }
                }
            },
            buttons: {
                type: ControlType.Object,
                title: "Buttons",
                controls: {
                    iconType: {
                        type: ControlType.SegmentedEnum,
                        title: "Icon",
                        options: ["Default", "Custom"],
                        optionTitles: ["Default", "Custom"],
                        defaultValue: "Default"
                    },
                    iconWeight: {
                        type: ControlType.Number,
                        title: "Weight",
                        defaultValue: 2,
                        min: .5,
                        max: 5,
                        step: .1,
                        displayStepper: true,
                        hidden: ({
                            iconType
                        }) => iconType !== "Default"
                    },
                    customPlusIcon: {
                        type: ControlType.Image,
                        title: "Plus",
                        hidden: ({
                            iconType
                        }) => iconType !== "Custom"
                    },
                    customMinusIcon: {
                        type: ControlType.Image,
                        title: "Minus",
                        hidden: ({
                            iconType
                        }) => iconType !== "Custom"
                    },
                    icons: {
                        type: ControlType.Color,
                        defaultValue: "#000",
                        title: "Icons"
                    },
                    iconsColorDisabled: {
                        type: ControlType.Color,
                        defaultValue: "#CCCCCC",
                        title: "Icons Color Disabled"
                    },
                    iconSize: {
                        type: ControlType.Number,
                        title: "Icon Size",
                        defaultValue: 8,
                        min: 4,
                        max: 32,
                        unit: "px",
                        step: 1,
                        displayStepper: true
                    },
                    padding: {
                        type: ControlType.Padding,
                        title: "Padding",
                        defaultValue: "4px"
                    },
                    iconBg: {
                        type: ControlType.Color,
                        defaultValue: "#FFFFFF",
                        title: "BG"
                    },
                    iconBgHover: {
                        type: ControlType.Color,
                        defaultValue: "#F5F5F5",
                        title: "BG Hover"
                    },
                    iconBgDisabled: {
                        type: ControlType.Color,
                        defaultValue: "#FFFFFF",
                        title: "BG Disabled"
                    },
                    radius: {
                        type: ControlType.BorderRadius,
                        title: "Radius",
                        defaultValue: "4px"
                    },
                    border: {
                        type: ControlType.Border,
                        title: "Border",
                        defaultValue: {
                            borderWidth: 0,
                            borderStyle: "solid",
                            borderColor: "transparent"
                        }
                    }
                }
            }
        }
    },
    priceConfigs: {
        type: ControlType.Object,
        title: "Price",
        controls: {
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 4,
                min: 0,
                max: 40,
                unit: "px",
                step: 1
            },
            price: {
                type: ControlType.Object,
                title: "Price",
                controls: {
                    font: {
                        type: ControlType.Font,
                        controls: "extended",
                        title: "Regular Font"
                    },
                    color: {
                        type: ControlType.Color,
                        defaultValue: "#000",
                        title: "Regular Color"
                    },
                    saleFont: {
                        type: ControlType.Font,
                        controls: "extended",
                        title: "Sale Font"
                    },
                    saleColor: {
                        type: ControlType.Color,
                        defaultValue: "#FF0000",
                        title: "Sale Color"
                    }
                }
            },
            comparePrice: {
                type: ControlType.Object,
                title: "Compare Price",
                controls: {
                    font: {
                        type: ControlType.Font,
                        controls: "extended",
                        title: "Font"
                    },
                    color: {
                        type: ControlType.Color,
                        defaultValue: "#000",
                        title: "Color"
                    },
                    strikethrough: {
                        type: ControlType.Boolean,
                        title: "Strike",
                        defaultValue: true,
                        enabledTitle: "Yes",
                        disabledTitle: "No"
                    },
                    strikethroughColor: {
                        type: ControlType.Color,
                        title: "Strike Color",
                        defaultValue: "#000000",
                        hidden: ({
                            strikethrough
                        }) => !strikethrough
                    }
                }
            },
            format: {
                type: ControlType.Object,
                title: "Format",
                controls: {
                    showSymbol: {
                        type: ControlType.Boolean,
                        title: "Symbol",
                        defaultValue: true,
                        enabledTitle: "Show",
                        disabledTitle: "Hide",
                        description: "$, \xa3, €, etc."
                    },
                    showCurrency: {
                        type: ControlType.Boolean,
                        title: "Code",
                        defaultValue: false,
                        enabledTitle: "Show",
                        disabledTitle: "Hide",
                        description: "USD, EUR, CHF, etc."
                    },
                    showDecimals: {
                        type: ControlType.Enum,
                        title: "Decimals",
                        defaultValue: "Always show",
                        options: ["Always show", "Never show", "Hide when .00"],
                        optionTitles: ["Always show", "Never show", "Hide when .00"],
                        displaySegmentedControl: true,
                        segmentedControlDirection: "vertical"
                    },
                    currencyCode: {
                        type: ControlType.Enum,
                        title: "Preview",
                        defaultValue: "USD",
                        options: ["USD", "EUR", "GBP", "CHF", "JPY", "CAD", "AUD", "CNY", "HKD", "NZD", "SEK", "KRW", "SGD", "NOK", "MXN", "INR", "RUB", "ZAR", "TRY", "BRL", "TWD", "DKK", "PLN", "THB", "IDR", "HUF", "CZK", "ILS", "CLP", "PHP", "AED", "COP", "SAR", "MYR", "RON"],
                        description: "Currency is for canvas preview only."
                    }
                }
            }
        }
    },
    errorConfigs: {
        type: ControlType.Object,
        title: "Errors",
        controls: {
            errorFont: {
                type: ControlType.Font,
                controls: "extended",
                title: "Error Font"
            },
            errorColor: {
                type: ControlType.Color,
                defaultValue: "#000",
                title: "Error Color"
            },
            textTransform: {
                type: ControlType.Enum,
                title: "Transform",
                options: ["None", "Uppercase", "Lowercase", "Capitalize"],
                defaultValue: "none"
            }
        }
    },
    removeIconConfigs: {
        type: ControlType.Object,
        title: "Remove Icon",
        controls: {
            position: {
                type: ControlType.Enum,
                title: "Position",
                options: ["Top", "Bottom"],
                defaultValue: "Bottom"
            },
            iconType: {
                type: ControlType.SegmentedEnum,
                title: "Icon",
                options: ["Default", "Custom"],
                optionTitles: ["Default", "Custom"],
                defaultValue: "Default"
            },
            iconWeight: {
                type: ControlType.Number,
                title: "Weight",
                defaultValue: 2,
                min: .5,
                max: 5,
                step: .1,
                displayStepper: true,
                hidden: ({
                    iconType
                }) => iconType !== "Default"
            },
            customImage: {
                type: ControlType.Image,
                title: "Image",
                hidden: ({
                    iconType
                }) => iconType !== "Custom"
            },
            icon: {
                type: ControlType.Color,
                defaultValue: "#000000",
                title: "Icon",
                hidden: ({
                    iconType
                }) => iconType === "Custom"
            },
            iconSize: {
                type: ControlType.Number,
                title: "Icon Size",
                defaultValue: 8,
                min: 4,
                max: 32,
                unit: "px",
                step: 1,
                displayStepper: true
            },
            bg: {
                type: ControlType.Color,
                defaultValue: "#F5F5F5",
                title: "BG"
            },
            bgHover: {
                type: ControlType.Color,
                defaultValue: "#EBEBEB",
                title: "BG Hover"
            },
            radius: {
                type: ControlType.BorderRadius,
                title: "Radius",
                defaultValue: "80px"
            },
            border: {
                type: ControlType.Border,
                title: "Border",
                defaultValue: {
                    borderWidth: 0,
                    borderStyle: "solid",
                    borderColor: "transparent"
                }
            }
        }
    },
    containerConfigs: {
        type: ControlType.Object,
        title: "Container",
        controls: {
            background: {
                type: ControlType.Color,
                title: "BG",
                defaultValue: "transparent"
            },
            radius: {
                type: ControlType.BorderRadius,
                title: "Radius",
                defaultValue: "0px"
            },
            padding: {
                type: ControlType.Padding,
                title: "Outside Padding",
                defaultValue: "0px"
            },
            insidePadding: {
                type: ControlType.Padding,
                title: "Inside Padding",
                defaultValue: "0px"
            },
            gap: {
                type: ControlType.Number,
                title: "Content Gap",
                defaultValue: 4,
                min: 0,
                max: 100,
                unit: "px",
                step: 1
            },
            imageGap: {
                type: ControlType.Number,
                title: "Image Gap",
                defaultValue: 16,
                min: 0,
                max: 100,
                unit: "px",
                step: 1
            },
            border: {
                type: ControlType.Border,
                title: "Border"
            }
        }
    },
    spacingConfigs: {
        type: ControlType.Object,
        title: "Spacing",
        controls: {
            dividerVisible: {
                type: ControlType.Boolean,
                title: "Divider",
                defaultValue: true,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            divider: {
                type: ControlType.Border,
                title: "Style",
                defaultValue: {
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgba(0,0,0,0.08)"
                },
                hidden: ({
                    dividerVisible
                }) => !dividerVisible
            },
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 24,
                min: 0,
                max: 100,
                unit: "px",
                step: 1
            }
        }
    }
});

function ShopXCartProductCard({
    imageVisibility,
    image,
    quantityControlColor,
    quantityNumberColor,
    quantityContainerBgColor,
    quantityControlBgColor,
    quantityControlHoverColor,
    xColor,
    xBgColor,
    xBgHoverColor,
    shopifyProductTitle,
    shopifyProductPriceAmount,
    shopifyQuantity,
    variants,
    style = {},
    onRemove,
    onAddQuantity,
    onSubtractQuantity,
    imageConfigs,
    quantityConfigs,
    removeIconConfigs,
    containerConfigs,
    linkConfigs,
    titleConfigs,
    _lineItem,
    quantityContainerBorder = "1px solid #E2E2E2",
    quantityContainerRadius = "8px",
    Radius
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlusDisabled, setIsPlusDisabled] = useState(false);
    useEffect(() => {
        const fetchOrderMax = async () => {
            const variant = _lineItem; // console.log("variant:", variant)
            const productHandle = variant ? .product ? .handle;
            if (!productHandle) return;
            const max = await getProductOrderMax(productHandle); // console.log("max:", max)
            const currentLineQuantity = variant ? .quantity || 0; // console.log("currentLineQuantity", currentLineQuantity)
            // console.log("variant:", variant)
            if (!isNaN(max) && max > 0) {
                const remainingAllowed = max - currentLineQuantity; // console.log("remainingAllowed in fetchOrderMax:", remainingAllowed)
                // if (remainingAllowed === 0){
                // }
                setIsPlusDisabled(true) //|| currentProductQty >= maxAllowedQty
                ; // console.log("isPlusDisabled:", isPlusDisabled)
            } else {
                setIsPlusDisabled(false);
            }
        };
        fetchOrderMax();
    }, []);
    const getProductOrderMax = useCallback(async productHandle => {
        try {
            const product = window.shopXtools ? .products.find(p => p.node.handle === productHandle); // const productQtyAvail = product.node.quantityAvailable
            // console.log("product:", product)
            const metafields = await window.shopXtools ? .handleCartMutation(getProductMetafields, {
                handle: productHandle
            });
            const orderMax = parseInt(metafields ? .product ? .metafield_order_max ? .value, 10); // console.log("metafields:", metafields)
            // console.log("orderMax:", orderMax)
            return orderMax;
        } catch (error) {
            return 0;
        }
    }, []);
    const handleMouseEnter = e => { // Only set hover if not clicking quantity or remove buttons
        if (!e.target.closest("button")) {
            setIsHovered(true);
        }
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    }; // Construct product URL if linking is enabled
    const productUrl = linkConfigs ? .enabled && _lineItem ? .merchandise ? .product ? .handle ? `${window.location.origin}/${linkConfigs.slugPath||""}${_lineItem.merchandise.product.handle}` : null;
    const imageHeight = imageConfigs ? .ratio === "4:5" ? (imageConfigs ? .width || 112) * 1.25 : imageConfigs ? .ratio === "3:2" ? (imageConfigs ? .width || 112) * (2 / 3) : imageConfigs ? .width || 112;
    const imageRadius = typeof imageConfigs ? .radius === "object" ? `${imageConfigs.radius.topLeft}px ${imageConfigs.radius.topRight}px ${imageConfigs.radius.bottomRight}px ${imageConfigs.radius.bottomLeft}px` : `${imageConfigs?.radius||4}px`;
    const XIcon = ({
        size = 8,
        weight
    }) => /*#__PURE__*/ _jsxs("svg", {
        width: size,
        height: size,
        viewBox: "0 0 16 16",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        style: {
            display: "block"
        },
        children: [ /*#__PURE__*/ _jsx("line", {
            x1: "2",
            y1: "2",
            x2: "14",
            y2: "14",
            stroke: "currentColor",
            strokeWidth: weight,
            strokeLinecap: "round"
        }), /*#__PURE__*/ _jsx("line", {
            x1: "2",
            y1: "14",
            x2: "14",
            y2: "2",
            stroke: "currentColor",
            strokeWidth: weight,
            strokeLinecap: "round"
        })]
    });
    const removeButton = /*#__PURE__*/ _jsx("button", {
        onClick: onRemove,
        style: { ...removeIconConfigs ? .border || {},
            background : removeIconConfigs ? .bg || "#F5F5F5",
            color: removeIconConfigs ? .icon || "#000000",
            cursor: "pointer",
            padding: "4px",
            borderRadius: typeof removeIconConfigs ? .radius === "object" ? `${removeIconConfigs.radius.topLeft}px ${removeIconConfigs.radius.topRight}px ${removeIconConfigs.radius.bottomRight}px ${removeIconConfigs.radius.bottomLeft}px` : typeof removeIconConfigs ? .radius === "string" ? removeIconConfigs.radius : "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            width: "24px",
            height: "24px"
        },
        onMouseEnter: e => e.currentTarget.style.background = removeIconConfigs ? .bgHover || "#EBEBEB",
        onMouseLeave: e => e.currentTarget.style.background = removeIconConfigs ? .bg || "#F5F5F5",
        children: removeIconConfigs ? .iconType === "Custom" ? /*#__PURE__*/ _jsx("img", {
            src: removeIconConfigs ? .customImage,
            alt: "Remove",
            style: {
                width: removeIconConfigs ? .iconSize,
                height: removeIconConfigs ? .iconSize
            }
        }) : /*#__PURE__*/ _jsx(XIcon, {
            size: removeIconConfigs ? .iconSize || 8,
            weight: removeIconConfigs ? .iconWeight || 2
        })
    });
    const containerStyle = {
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        cursor: productUrl ? "pointer" : "default",
        borderRadius: typeof containerConfigs ? .radius === "object" ? `${containerConfigs.radius.topLeft}px ${containerConfigs.radius.topRight}px ${containerConfigs.radius.bottomRight}px ${containerConfigs.radius.bottomLeft}px` : `${containerConfigs?.radius||0}px`,
        ...containerConfigs ? .border || {},
        padding : typeof containerConfigs ? .padding === "object" ? `${containerConfigs.padding.top}px ${containerConfigs.padding.right}px ${containerConfigs.padding.bottom}px ${containerConfigs.padding.left}px` : containerConfigs ? .padding || "0px",
        background: "transparent",
        ...style
    };
    const contentStyle = {
        display: "flex",
        gap: containerConfigs ? .imageGap ? ? 0,
        flex: 1,
        minWidth: 0,
        padding: containerConfigs ? .insidePadding || "0px"
    };
    const imageStyle = {
        position: "relative",
        width: imageConfigs ? .width || 112,
        height: imageHeight,
        flexShrink: 0,
        background: imageConfigs ? .background || "#F2F2F2",
        borderRadius: imageConfigs ? .radius || "4px",
        ...imageConfigs ? .border || {},
        overflow : "hidden"
    };
    const imageInnerStyle = {
        width: "100%",
        height: "100%",
        objectFit: imageConfigs ? .type === "Fit" ? "contain" : "cover",
        transition: "transform 0.3s ease, opacity 0.3s ease",
        ...isHovered && imageConfigs ? .hover === "Zoom" && {
            transform: `scale(${imageConfigs.zoomScale})`
        },
        ...isHovered && imageConfigs ? .hover === "Opacity" && {
            opacity: imageConfigs.opacity
        }
    };
    const titleStyle = { ...titleConfigs ? .font || {},
        color : isHovered ? titleConfigs ? .hoverColor : titleConfigs ? .color,
        margin: 0,
        transition: "color 0.3s ease",
        textTransform: titleConfigs ? .textTransform || "none"
    };
    const handleClick = e => { // Only navigate if not clicking quantity or remove buttons
        if (productUrl && !e.target.closest("button")) {
            window.location.href = productUrl;
        }
    };
    return /*#__PURE__*/ _jsx("div", {
        style: containerStyle,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick,
        children: /*#__PURE__*/ _jsxs("div", {
            style: {
                display: "flex",
                gap: containerConfigs ? .imageGap ? ? 0,
                flex: 1,
                minWidth: 0
            },
            children: [imageVisibility && image && /*#__PURE__*/ _jsx("div", {
                style: imageStyle,
                children: /*#__PURE__*/ _jsx("img", {
                    src: image,
                    style: imageInnerStyle,
                    onError: e => {
                        e.currentTarget.style.display = "none";
                    }
                })
            }), /*#__PURE__*/ _jsxs("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minWidth: 0,
                    gap: containerConfigs ? .gap ? ? 0,
                    padding: containerConfigs ? .insidePadding || "0px"
                },
                children: [ /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        width: "100%",
                        gap: "16px"
                    },
                    children: [ /*#__PURE__*/ _jsxs("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: containerConfigs ? .gap ? ? 0,
                            flex: 1,
                            minWidth: 0
                        },
                        children: [ /*#__PURE__*/ _jsx("div", {
                            style: titleStyle,
                            children: typeof shopifyProductTitle === "string" ? shopifyProductTitle : /*#__PURE__*/ React.cloneElement(shopifyProductTitle, {
                                style: titleStyle
                            })
                        }), variants]
                    }), removeIconConfigs ? .position === "Top" ? removeButton : shopifyProductPriceAmount]
                }), /*#__PURE__*/ _jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        marginTop: "auto"
                    },
                    children: [ /*#__PURE__*/ _jsxs("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: quantityConfigs ? .container ? .containerBg || "transparent",
                            borderRadius: typeof quantityConfigs ? .container ? .containerRadius === "object" ? `${quantityConfigs.container.containerRadius.topLeft}px ${quantityConfigs.container.containerRadius.topRight}px ${quantityConfigs.container.containerRadius.bottomRight}px ${quantityConfigs.container.containerRadius.bottomLeft}px` : typeof quantityConfigs ? .container ? .containerRadius === "string" ? quantityConfigs.container.containerRadius : "8px",
                            padding: quantityConfigs ? .container ? .padding || "4px",
                            ...quantityConfigs ? .container ? .containerBorder || {
                                borderWidth: 1,
                                borderStyle: "solid",
                                borderColor: "#E2E2E2"
                            },
                            flexShrink : 0
                        },
                        children: [ /*#__PURE__*/ _jsx("button", {
                            onClick: onSubtractQuantity,
                            style: { ...quantityConfigs ? .buttons ? .border || {},
                                background : quantityConfigs ? .buttons ? .iconBg || "#F5F5F5",
                                color : quantityConfigs ? .buttons ? .icons || "#000000",
                                cursor : "pointer",
                                padding : quantityConfigs ? .buttons ? .padding || "4px 8px",
                                borderRadius : typeof quantityConfigs ? .buttons ? .radius === "object" ? `${quantityConfigs.buttons.radius.topLeft}px ${quantityConfigs.buttons.radius.topRight}px ${quantityConfigs.buttons.radius.bottomRight}px ${quantityConfigs.buttons.radius.bottomLeft}px` : typeof quantityConfigs ? .buttons ? .radius === "string" ? quantityConfigs.buttons.radius : "4px",
                                display : "flex",
                                alignItems : "center",
                                justifyContent : "center"
                            },
                            onMouseEnter: e => {
                                e.currentTarget.style.background = quantityConfigs ? .buttons ? .iconBgHover || "#EBEBEB";
                            },
                            onMouseLeave: e => {
                                e.currentTarget.style.background = quantityConfigs ? .buttons ? .iconBg || "#F5F5F5";
                            },
                            children: quantityConfigs ? .buttons ? .iconType === "Custom" ? /*#__PURE__*/ _jsx("img", {
                                src: quantityConfigs.buttons.customMinusIcon,
                                alt: "Minus",
                                style: {
                                    width: quantityConfigs.buttons.iconSize || 8,
                                    height: quantityConfigs.buttons.iconSize || 8
                                }
                            }) : /*#__PURE__*/ _jsx(MinusIcon, {
                                size: quantityConfigs ? .buttons ? .iconSize || 8,
                                weight: quantityConfigs ? .buttons ? .iconWeight || 2
                            })
                        }), /*#__PURE__*/ _jsx("span", {
                            style: {
                                margin: "0 8px",
                                color: quantityConfigs ? .container ? .number || "#000000",
                                ...quantityConfigs ? .container ? .font || {}
                            },
                            children: shopifyQuantity
                        }), /*#__PURE__*/ _jsx("button", {
                            onClick: isPlusDisabled ? undefined : onAddQuantity,
                            disabled: isPlusDisabled,
                            style: { ...quantityConfigs ? .buttons ? .border || {},
                                background : isPlusDisabled ? quantityConfigs ? .buttons ? .iconBgDisabled : quantityConfigs ? .buttons ? .iconBg || "#F5F5F5",
                                color : isPlusDisabled ? quantityConfigs ? .buttons ? .iconsColorDisabled : quantityConfigs ? .buttons ? .icons || "#000000",
                                cursor : isPlusDisabled ? "not-allowed" : "pointer",
                                padding : quantityConfigs ? .buttons ? .padding || "4px 8px",
                                borderRadius : typeof quantityConfigs ? .buttons ? .radius === "object" ? `${quantityConfigs.buttons.radius.topLeft}px ${quantityConfigs.buttons.radius.topRight}px ${quantityConfigs.buttons.radius.bottomRight}px ${quantityConfigs.buttons.radius.bottomLeft}px` : typeof quantityConfigs ? .buttons ? .radius === "string" ? quantityConfigs.buttons.radius : "4px",
                                display : "flex",
                                alignItems : "center",
                                justifyContent : "center"
                            },
                            onMouseEnter: e => {
                                {
                                    isPlusDisabled ? quantityConfigs ? .buttons ? .iconBgDisabled : e.currentTarget.style.background = quantityConfigs ? .buttons ? .iconBgHover || "#EBEBEB";
                                }
                            },
                            onMouseLeave: e => {
                                {
                                    isPlusDisabled ? quantityConfigs ? .buttons ? .iconBgDisabled : e.currentTarget.style.background = quantityConfigs ? .buttons ? .iconBg || "#F5F5F5";
                                }
                            },
                            children: quantityConfigs ? .buttons ? .iconType === "Custom" ? /*#__PURE__*/ _jsx("img", {
                                src: quantityConfigs.buttons.customPlusIcon,
                                alt: "Plus",
                                style: {
                                    width: quantityConfigs.buttons.iconSize || 8,
                                    height: quantityConfigs.buttons.iconSize || 8
                                }
                            }) : /*#__PURE__*/ _jsx(PlusIcon, {
                                size: quantityConfigs ? .buttons ? .iconSize || 8,
                                weight: quantityConfigs ? .buttons ? .iconWeight || 2
                            })
                        })]
                    }), removeIconConfigs ? .position === "Bottom" ? removeButton : shopifyProductPriceAmount]
                })]
            })]
        })
    });
}
const MinusIcon = ({
    size = 8,
    weight
}) => /*#__PURE__*/ _jsx("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
        display: "block"
    },
    children: /*#__PURE__*/ _jsx("line", {
        x1: "2",
        y1: "8",
        x2: "14",
        y2: "8",
        stroke: "currentColor",
        strokeWidth: weight,
        strokeLinecap: "round"
    })
});
const PlusIcon = ({
    size = 8,
    weight
}) => /*#__PURE__*/ _jsxs("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
        display: "block"
    },
    children: [ /*#__PURE__*/ _jsx("line", {
        x1: "8",
        y1: "2",
        x2: "8",
        y2: "14",
        stroke: "currentColor",
        strokeWidth: weight,
        strokeLinecap: "round"
    }), /*#__PURE__*/ _jsx("line", {
        x1: "2",
        y1: "8",
        x2: "14",
        y2: "8",
        stroke: "currentColor",
        strokeWidth: weight,
        strokeLinecap: "round"
    })]
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CartProductCard",
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
//# sourceMappingURL=./FC_CartProductCard.map