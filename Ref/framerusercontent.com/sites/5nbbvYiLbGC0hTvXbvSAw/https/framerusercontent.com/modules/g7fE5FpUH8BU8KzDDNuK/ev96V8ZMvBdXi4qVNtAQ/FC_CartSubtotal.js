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
import {
    useEffect,
    useMemo,
    useState
} from "react";
import ShopXCartSubtotal from "https://framer.com/m/shopX-cartSubtotal-pv7y.js";
import {
    addPropertyControls,
    ControlType
} from "framer";
import {
    get
} from "lodash-es";
import {
    knownCurrenciesWithCodeAsSymbol
} from "https://framerusercontent.com/modules/k9s4cejdkBGDjmzudhzM/18cq93eooqM4YmdbL7E2/currencyMaps.js";
import {
    getLocaleFromCountry
} from "https://framerusercontent.com/modules/vC6fzbfO83MgBPIhn5zl/DUlbmWuOELzEUenVmv3G/locales.js";
import {
    RenderTarget
} from "framer"; // Helper function to check if a currency's symbol is the same as its code
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
export default function FC_CartSubtotal(props) {
    const {
        format: {
            showCurrency,
            showSymbol,
            showDecimals,
            currencyCode: previewCurrencyCode
        } = {}
    } = props;
    const [subtotal, setSubtotal] = useState(0);
    const [cart, setCart] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [currencyConfig, setCurrencyConfig] = useState(() => { // Initialize with window values if available
        if (typeof window !== "undefined") {
            const position = window ? .__FcCurrencyConfigs ? .currencyPosition || "Before";
            const initialConfig = {
                position: position,
                showCode: position !== "Hide",
                symbol: window ? .__FcCurrencyConfigs ? .currencySymbol || "$"
            }; //console.log('Initial currency config state:', initialConfig, window?.__FcCurrencyConfigs);
            return initialConfig;
        }
        return {
            position: "Before",
            showCode: false,
            symbol: "$"
        };
    });
    const isBrowser = typeof window !== "undefined"; // Initialize currency from localStorage on page load
    useEffect(() => {
        if (!isBrowser) return;
        const storedCurrency = localStorage.getItem("selectedCurrency");
        const storedCountryCode = localStorage.getItem("selectedCountryCode");
        const storedCountry = localStorage.getItem("selectedCountry");
        setSelectedCurrency(storedCurrency || "USD");
        setSelectedCountryCode(storedCountryCode || "US");
        setSelectedCountry(storedCountry || "United States"); // console.log("[FC_CartSubtotal] Initial Currency State:", {
        //     currency: storedCurrency
        // })
    }, [isBrowser]); // Debug current currency config
    // useEffect(() => {
    //     console.log('Currency config changed:', currencyConfig);
    // }, [currencyConfig]);
    // Add currency settings listener
    useEffect(() => {
        if (!isBrowser) return;

        function updateCurrencyConfig(position, symbol) { //console.log('Updating currency config with:', { position, symbol });
            const newConfig = {
                position: position || "Before",
                showCode: position !== "Hide",
                symbol: symbol || "$"
            }; //console.log('New currency config:', newConfig);
            setCurrencyConfig(newConfig);
        } // Handle currency settings updates
        const handleCurrencySettingsUpdate = e => { //console.log('Currency update event received:', e.detail);
            if (!e.detail ? .current) { //console.log('Invalid currency update event:', e);
                return;
            }
            updateCurrencyConfig(e.detail.current.currencyPosition, e.detail.current.currencySymbol);
        }; // Initial setup
        const currentPosition = window.__FcCurrencyConfigs ? .currencyPosition;
        const currentSymbol = window.__FcCurrencyConfigs ? .currencySymbol; //console.log('Initial currency values:', { currentPosition, currentSymbol });
        updateCurrencyConfig(currentPosition, currentSymbol); // Add event listener
        document.addEventListener("currency__settings-updated", handleCurrencySettingsUpdate); //console.log('Currency event listener added');
        // Listen for currency changes
        const handleCurrencyChange = event => { //console.log("[FC_CartSubtotal] Currency Change Event:", event.detail);
            const {
                currency,
                countryCode,
                country
            } = event.detail;
            setSelectedCurrency(currency);
            setSelectedCountryCode(countryCode);
            setSelectedCountry(country);
        };
        window.addEventListener("currency_changed", handleCurrencyChange);
        return () => {
            document.removeEventListener("currency__settings-updated", handleCurrencySettingsUpdate);
            window.removeEventListener("currency_changed", handleCurrencyChange); //console.log('Currency event listeners removed');
        };
    }, [isBrowser]); // // Cart calculation effect
    useEffect(() => {
        if (!isBrowser) return;
        const logCartDetails = () => {
            const cart = get(window, "shopXtools.cart"); // Log the entire cart object
            //console.log('Cart Data:', cart);
            if (cart) {
                setCart(cart); // Log each line item in the cart
                const cartItems = get(cart, "lines.edges", []); // console.log(
                //     'Cart Items:',
                //     cartItems.map((edge) => {
                //         const item = edge.node;
                //         return {
                //             title: get(item, 'merchandise.product.title', 'Unknown'),
                //             variantId: get(item, 'merchandise.id', ''),
                //             price: get(item, 'cost.totalAmount.amount') ||
                //                    get(item, 'cost.subtotalAmount.amount') ||
                //                    get(item, 'merchandise.price.amount', '0'),
                //             quantity: get(item, 'quantity', 0),
                //             currencyCode: get(item, 'cost.totalAmount.currencyCode') ||
                //                           get(item, 'merchandise.price.currencyCode', 'USD'),
                //         };
                //     })
                // );
                // Log the subtotal
                const subtotal = parseFloat(get(cart, "cost.subtotalAmount.amount", "0")); //console.log('Parsed Subtotal (to be set in state):', subtotal);
                setSubtotal(subtotal);
            } else { // console.log("No cart data available.")
            }
        }; // Log cart details on load
        logCartDetails(); // Re-log cart details on cart update events
        window.addEventListener("shopXtools-cart-update", logCartDetails);
        return () => window.removeEventListener("shopXtools-cart-update", logCartDetails);
    }, [isBrowser]);
    const _currencyCode = useMemo(() => {
        if (!isBrowser) return "USD"; // Try different paths to get currency code
        const cartCurrencyCode = get(window, "shopXtools.cart.cost.subtotalAmount.currencyCode", "USD"); //console.log('Currency Code in _currencyCode:', cartCurrencyCode);
        return selectedCurrency || cartCurrencyCode;
    }, [isBrowser, cart, selectedCurrency]);
    const showMockValues = useMemo(() => subtotal === 0 && isBrowser && window.location.origin.endsWith("framercanvas.com"), [subtotal, isBrowser]); // Common function to format price based on options
    const formatPriceWithOptions = (numericPrice, currCode) => {
        const symbolSameAsCode = isCurrencySymbolSameAsCode(currCode); // Get locale from selected country code
        const locale = getLocaleFromCountry(selectedCountryCode); // Log browser user agent for debugging iOS-specific issues
        // if (isBrowser) {
        //     console.log("[FC_CartSubtotal] Format debug:", {
        //         userAgent: navigator.userAgent,
        //         isCurrencySymbolSameAsCode: symbolSameAsCode,
        //         currencyCode: currCode,
        //         selectedCountryCode,
        //         locale,
        //         showSymbol,
        //         showCurrency,
        //         showDecimals,
        //     })
        // }
        // Determine if we should show decimals based on the setting
        const shouldShowDecimals = () => {
            if (showDecimals === "Always show") return true;
            if (showDecimals === "Never show") return false;
            if (showDecimals === "Hide when .00") { // Check if the decimal part is zero
                return numericPrice % 1 !== 0;
            }
            return true // Default fallback for boolean value
            ;
        };
        const decimalDigits = shouldShowDecimals() ? 2 : 0; // If showing neither symbol nor code, just format the number
        if (!showSymbol && !showCurrency) {
            const formattedNumber = new Intl.NumberFormat(locale, {
                style: "decimal",
                minimumFractionDigits: decimalDigits,
                maximumFractionDigits: decimalDigits
            }).format(numericPrice); //console.log('Formatted Number (No Symbol or Currency):', formattedNumber);
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
    };
    const text = useMemo(() => {
        if (!isBrowser) return ""; // For canvas view, handle the display options directly
        if (RenderTarget.current() === RenderTarget.canvas || showMockValues) {
            const mockAmount = 150;
            const currentCurrencyCode = previewCurrencyCode || "USD";
            return formatPriceWithOptions(mockAmount, currentCurrencyCode);
        } // For live view, use the actual subtotal
        return formatPriceWithOptions(subtotal, _currencyCode);
    }, [isBrowser, showMockValues, subtotal, _currencyCode, showCurrency, showSymbol, showDecimals, previewCurrencyCode, props.format]);
    if (!isBrowser) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                display: "inline-flex"
            }
        });
    } // For debugging
    // console.log('Rendering FC_CartSubtotal with:', {
    //     subtotal,
    //     text,
    //     currencyConfig,
    //     props
    // })
    // Render a basic div if ShopXCartSubtotal is not available
    if (typeof ShopXCartSubtotal === "undefined") {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                width: "100%",
                textAlign: "right"
            },
            children: /*#__PURE__*/ _jsx("p", {
                style: { ...props.font,
                    color: props.color,
                    margin: 0
                },
                children: text
            })
        });
    }
    return /*#__PURE__*/ _jsx(ShopXCartSubtotal, { ...props,
        text: /*#__PURE__*/ _jsx("p", {
            style: { ...props.font,
                color: props.color,
                margin: 0
            },
            children: text
        }),
        style: {
            width: "100%"
        }
    });
}
FC_CartSubtotal.defaultProps = {
    format: {
        showCurrency: false,
        showSymbol: true,
        currencyCode: "USD",
        showDecimals: "Always show"
    }
};
addPropertyControls(FC_CartSubtotal, {
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
                description: "Currency on your site is automatic, this is only shown in canvas preview."
            }
        }
    },
    font: {
        type: ControlType.Font,
        controls: "extended",
        title: "Font"
    },
    color: {
        type: ControlType.Color,
        defaultValue: "#000",
        title: "Color"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CartSubtotal",
            "slots": [],
            "annotations": {
                "framerDisableUnlink": "",
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}