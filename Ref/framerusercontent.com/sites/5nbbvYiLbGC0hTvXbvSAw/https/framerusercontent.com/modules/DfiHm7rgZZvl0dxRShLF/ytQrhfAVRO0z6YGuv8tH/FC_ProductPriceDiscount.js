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
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    get
} from "lodash-es";
import {
    useIsBrowser
} from "https://framerusercontent.com/modules/ncBs5KPMI9I5GEta13fn/zGXDjuZapa1SGy6D8P5e/IsBrowser.js";
import {
    currencyMaps
} from "https://framerusercontent.com/modules/k9s4cejdkBGDjmzudhzM/18cq93eooqM4YmdbL7E2/currencyMaps.js";
import {
    knownCurrenciesWithCodeAsSymbol
} from "https://framerusercontent.com/modules/k9s4cejdkBGDjmzudhzM/18cq93eooqM4YmdbL7E2/currencyMaps.js";
import {
    getLocaleFromCountry
} from "https://framerusercontent.com/modules/vC6fzbfO83MgBPIhn5zl/DUlbmWuOELzEUenVmv3G/locales.js"; // Helper function to check if a currency's symbol is the same as its code
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
export default function FC_ProductPriceDiscount(props) {
    const {
        shopifyProductID,
        discountType,
        format: {
            showCurrency,
            showSymbol,
            showDecimals,
            currencyCode
        } = {},
        textFormat,
        previewPrice,
        previewComparePrice,
        discountPrefix = "Up to"
    } = props;
    const [product, setProduct] = useState();
    const [activeVariant, setActiveVariant] = useState();
    const [selectedCurrency, setSelectedCurrency] = useState(() => { // Initialize with the currency code from the product or default to "USD"
        return get(product, "priceRange.minVariantPrice.currencyCode") || "USD";
    });
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [partialSelections, setPartialSelections] = useState({});
    const [variantSelectorAction, setVariantSelectorAction] = useState("");
    const isBrowser = useIsBrowser();
    const showMockValues = useMemo(() => typeof RenderTarget !== "undefined" && (RenderTarget.current() === RenderTarget.canvas || isBrowser && window.location.origin.endsWith("framercanvas.com")), [isBrowser]);
    useEffect(() => {
        if (product) {
            setSelectedCurrency(get(product, "priceRange.minVariantPrice.currencyCode") || "USD");
        }
    }, [product]); // Initialize currency from localStorage on page load
    useEffect(() => {
        if (!isBrowser) return;
        const storedCurrency = localStorage.getItem("selectedCurrency");
        const storedCountryCode = localStorage.getItem("selectedCountryCode");
        const storedCountry = localStorage.getItem("selectedCountry");
        setSelectedCurrency(storedCurrency || "USD");
        setSelectedCountryCode(storedCountryCode || "US");
        setSelectedCountry(storedCountry || "United States");
    }, [isBrowser]);
    useEffect(() => {
        if (!isBrowser) return;
        const handleVariantChange = e => {
            try {
                if (e.detail) { // Check for purchase action flag - if this is a purchase action, don't update variant state
                    if (e.detail.isPurchaseAction || e.detail.onClickAction === "purchase") { //console.log("Purchase action detected, returning", e.detail?.isPurchaseAction)
                        return;
                    }
                    const expectedProductId = `gid://shopify/Product/${shopifyProductID}`;
                    if (!e.detail.productId || e.detail.productId !== expectedProductId) {
                        return;
                    }
                } //console.log("variantSelectorAction", e.detail.onClickAction)
                setVariantSelectorAction(e.detail.onClickAction); // Get products from shopXtools storage
                const products = window.shopXtools ? .products || [];
                const _matchingProduct = products.find(({
                    node: _product
                }) => _product.id === `gid://shopify/Product/${shopifyProductID}`);
                if (_matchingProduct) {
                    setProduct(_matchingProduct.node); // Find the matching variant in the current product data
                    const matchingVariant = _matchingProduct.node ? .variants ? .edges ? .find(({
                        node
                    }) => node.selectedOptions.every(option => e.detail.selectedOptions.find(detailOption => detailOption.name === option.name && detailOption.value === option.value)));
                    if (matchingVariant) {
                        if (e.detail.onClickAction === "purchase") {
                            setActiveVariant(null); //console.log("setting partialSelections for purchase action", e.detail.selectedOptions[0])
                            setPartialSelections({
                                [e.detail.selectedOptions[0].name]: e.detail.selectedOptions[0].value
                            });
                        } else if (e.detail ? .isCompleteVariant === false) { // Partial: keep range behavior
                            setActiveVariant(null);
                            if (Array.isArray(e.detail.selectedOptions)) {
                                const partial = {};
                                e.detail.selectedOptions.forEach(opt => {
                                    if (opt ? .name) partial[opt.name] = opt.value;
                                });
                                setPartialSelections(partial);
                            }
                        } else {
                            setActiveVariant(matchingVariant.node);
                            setPartialSelections({});
                        }
                    } else {
                        if (e.detail ? .isCompleteVariant) {
                            setActiveVariant(e.detail);
                            if (e.detail.onClickAction !== "purchase") {
                                setPartialSelections({});
                            }
                        }
                    }
                }
            } catch (error) { // Fallback to using the event detail directly
                if (e.detail ? .isCompleteVariant) {
                    setActiveVariant(e.detail);
                    if (e.detail.onClickAction !== "purchase") {
                        setPartialSelections({});
                    }
                } else {
                    setActiveVariant(null);
                    if (Array.isArray(e.detail ? .selectedOptions)) {
                        const partial = {};
                        e.detail.selectedOptions.forEach(opt => {
                            if (opt ? .name) partial[opt.name] = opt.value;
                        });
                        setPartialSelections(partial);
                    }
                }
            }
        };
        const handleProductsReady = e => {
            if (Array.isArray(e.detail.products)) {
                const _matchingProduct = e.detail.products.find(({
                    node: _product
                }) => _product.id === `gid://shopify/Product/${shopifyProductID}`);
                setProduct(_matchingProduct ? _matchingProduct.node : null); // If there's only one variant, set it as active
                if (_matchingProduct ? .node ? .variants ? .edges ? .length === 1) {
                    const variant = _matchingProduct.node.variants.edges[0].node;
                    setActiveVariant(variant);
                } // setActiveVariant(
                //     _matchingProduct.node?.variants?.edges[0].node
                // )
            }
        }; // Add event listener for variant option selections
        const handleVariantOptionSelected = e => { //console.log("variant_option_selected", e.detail)
            if (e.detail ? .isPurchaseAction) { //console.log("Purchase action is true, returning", e.detail?.isPurchaseAction)
                return;
            } // Check if this event is for our product
            const eventProductId = e.detail ? .productId;
            const expectedProductId = `gid://shopify/Product/${shopifyProductID}`;
            if (eventProductId && eventProductId !== expectedProductId) { //console.log("Event not for this product", eventProductId, expectedProductId)
                return;
            }
            if (e.detail ? .optionName && e.detail ? .value) { // Merge with existing partial selections instead of replacing
                setPartialSelections(prev => ({ ...prev,
                    [e.detail.optionName]: e.detail.value
                })); //console.log("setting partialSelections from individual option", e.detail.optionName, e.detail.value)
            }
        }; // Initial product load function
        const loadProduct = async () => {
            try { // Get products from shopXtools storage
                const products = window.shopXtools ? .products || [];
                const _matchingProduct = products.find(({
                    node: _product
                }) => _product.id === `gid://shopify/Product/${shopifyProductID}`);
                if (_matchingProduct) {
                    setProduct(_matchingProduct.node);
                    if (_matchingProduct.node ? .variants ? .edges ? .length === 1) {
                        setActiveVariant(_matchingProduct.node.variants.edges[0].node);
                    } // setActiveVariant(
                    //     _matchingProduct.node?.variants?.edges[0].node
                    // )
                }
            } catch (error) { // Error handling
            }
        }; // Call loadProduct on mount
        loadProduct(); // Initial check for existing products
        if (window["shopXtools"] ? .products) {
            if (Array.isArray(window["shopXtools"].products)) {
                const _matchingProduct = window["shopXtools"].products.find(({
                    node: _product
                }) => _product.id === `gid://shopify/Product/${shopifyProductID}`);
                setProduct(_matchingProduct ? _matchingProduct.node : null); // If there's only one variant, set it as active
                if (_matchingProduct ? .node ? .variants ? .edges ? .length === 1) {
                    setActiveVariant(_matchingProduct.node.variants.edges[0].node);
                } // setActiveVariant(
                //     _matchingProduct?.node?.variants?.edges[0]?.node
                // )
            }
        } // Add event listeners
        document.addEventListener("data__products-ready", handleProductsReady);
        document.addEventListener("product__active-variant__changed", handleVariantChange);
        document.addEventListener("variant_option_selected", handleVariantOptionSelected);
        document.addEventListener("__variant_option_selected", handleVariantOptionSelected); // Cleanup
        return () => {
            document.removeEventListener("data__products-ready", handleProductsReady);
            document.removeEventListener("product__active-variant__changed", handleVariantChange);
            document.removeEventListener("variant_option_selected", handleVariantOptionSelected);
            document.removeEventListener("__variant_option_selected", handleVariantOptionSelected);
        };
    }, [isBrowser, shopifyProductID, selectedCurrency]);
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
            setSelectedCountry(country);
            try { // Get products from shopXtools storage
                const products = window.shopXtools ? .products || [];
                const _matchingProduct = products.find(({
                    node: _product
                }) => _product.id === `gid://shopify/Product/${shopifyProductID}`);
                if (_matchingProduct) {
                    setProduct(_matchingProduct.node); // Preserve active variant selection if possible
                    if (activeVariant) {
                        const matchingVariant = _matchingProduct.node ? .variants ? .edges ? .find(({
                            node
                        }) => node.selectedOptions.every(option => activeVariant.selectedOptions.find(activeOption => activeOption.name === option.name && activeOption.value === option.value)));
                        if (matchingVariant) {
                            setActiveVariant(matchingVariant.node);
                        }
                    }
                }
            } catch (error) { // Error handling
            }
        };
        window.addEventListener("currency_changed", handleCurrencyChange);
        return () => {
            window.removeEventListener("currency_changed", handleCurrencyChange);
        };
    }, [isBrowser, shopifyProductID, activeVariant, product]);
    const currencyConfig = useMemo(() => {
        const config = typeof window !== "undefined" ? {
            position: window ? .__FcCurrencyConfigs ? .currencyPosition || "Before",
            showCode: window ? .__FcCurrencyConfigs ? .currencyPosition !== "Hide",
            symbol: currencyMaps[selectedCurrency] || "$"
        } : {
            position: "Before",
            showCode: false,
            symbol: "$"
        };
        return config;
    }, [selectedCurrency]); // Common function to format price based on options
    const formatPriceWithOptions = (numericPrice, currCode) => {
        const symbolSameAsCode = isCurrencySymbolSameAsCode(currCode); // Get locale from selected country code
        const locale = getLocaleFromCountry(selectedCountryCode); // Log browser user agent for debugging iOS-specific issues
        // if (isBrowser) {
        //     console.log("[FC_ProductPriceDiscount] Format debug:", {
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
            return new Intl.NumberFormat(locale, {
                style: "decimal",
                minimumFractionDigits: decimalDigits,
                maximumFractionDigits: decimalDigits
            }).format(numericPrice);
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
    }; // Helper function to format discount text using textFormat
    const formatDiscountText = discountValue => {
        if (!textFormat) return discountValue; // Replace {{discount}} placeholder with the actual discount value
        return textFormat.replace(/\{\{discount\}\}/g, discountValue);
    };
    const text = useMemo(() => {
        if (!isBrowser) return ""; // Helper: compute min/max for price and compareAt from product variants
        const computeRange = (p, path) => {
            if (!p) return {
                min: null,
                max: null
            };
            const minStr = get(p, `${path}.minVariantPrice.amount`);
            const maxStr = get(p, `${path}.maxVariantPrice.amount`);
            let minVal = minStr ? parseFloat(minStr) : null;
            let maxVal = maxStr ? parseFloat(maxStr) : null;
            if (minVal === null || isNaN(minVal) || maxVal === null || isNaN(maxVal)) {
                const edges = p ? .variants ? .edges || [];
                for (let i = 0; i < edges.length; i++) {
                    const v = edges[i] ? .node;
                    if (!v) continue;
                    const amtStr = get(v, path.includes("compareAt") ? "compareAtPrice.amount" : "price.amount");
                    const amt = amtStr ? parseFloat(amtStr) : NaN;
                    if (!isNaN(amt) && amt > 0) {
                        if (minVal === null || amt < minVal) minVal = amt;
                        if (maxVal === null || amt > maxVal) maxVal = amt;
                    }
                }
            }
            return {
                min: typeof minVal === "number" && !isNaN(minVal) ? minVal : null,
                max: typeof maxVal === "number" && !isNaN(maxVal) ? maxVal : null
            };
        }; // console.log('[Discount] Debug:', {
        //     activeVariant,
        //     partialSelections,
        //     variantSelectorAction,
        //     product,
        //     discountType
        // })
        // For canvas view, handle the display options directly
        if (typeof RenderTarget !== "undefined" && (RenderTarget.current() === RenderTarget.canvas || showMockValues)) { // Parse previewPrice as range format (e.g., "200.00-250.00")
            let minPrice;
            let maxPrice;
            if (previewPrice) {
                const priceRange = previewPrice.split("-");
                if (priceRange.length === 2) {
                    minPrice = priceRange[0].trim();
                    maxPrice = priceRange[1].trim();
                } else { // If no range format, use the single price for both min and max
                    minPrice = previewPrice;
                    maxPrice = previewPrice;
                }
            } // Parse previewComparePrice as range format (e.g., "200.00-300.00")
            let minComparePrice;
            let maxComparePrice;
            if (previewComparePrice) {
                const comparePriceRange = previewComparePrice.split("-");
                if (comparePriceRange.length === 2) {
                    minComparePrice = comparePriceRange[0].trim();
                    maxComparePrice = comparePriceRange[1].trim();
                } else { // If no range format, use the single price for both min and max
                    minComparePrice = previewComparePrice;
                    maxComparePrice = previewComparePrice;
                }
            }
            const numericMinPrice = parseFloat(minPrice);
            const numericMaxComparePrice = parseFloat(maxComparePrice);
            if (!numericMinPrice || !numericMaxComparePrice || numericMinPrice >= numericMaxComparePrice) {
                return "";
            } // Calculate maximum discount: max compare price - min price
            const maxDiscountAmount = numericMaxComparePrice - numericMinPrice;
            if (maxDiscountAmount <= 0) {
                return "";
            }
            if (discountType === "Percentage") {
                const discount = maxDiscountAmount / numericMaxComparePrice * 100;
                const discountText = `${discountPrefix} ${Math.round(discount)}%`;
                return formatDiscountText(discountText);
            } else {
                const currentCurrencyCode = currencyCode || "USD";
                const formattedAmount = formatPriceWithOptions(maxDiscountAmount, currentCurrencyCode);
                const discountText = `${discountPrefix} ${formattedAmount}`;
                return formatDiscountText(discountText);
            }
        } // For live view, get the discount from active variant
        const activeVariantPrice = activeVariant && get(activeVariant, "price.amount");
        const activeVariantComparePrice = activeVariant && get(activeVariant, "compareAtPrice.amount"); // Only return early if we have no data at all
        if (!activeVariantPrice && !activeVariantComparePrice && !activeVariant && !product ? .variants ? .edges ? .length) return "";
        const currentCurrencyCode = selectedCurrency || currencyCode || "USD"; // If we have an active variant with both prices, calculate discount
        if (activeVariantPrice && activeVariantComparePrice) {
            const price = parseFloat(activeVariantPrice);
            const comparePrice = parseFloat(activeVariantComparePrice);
            if (price > 0 && comparePrice > 0 && comparePrice > price) {
                if (discountType === "Percentage") {
                    const discount = (comparePrice - price) / comparePrice * 100;
                    const discountText = `${Math.round(discount)}%`;
                    return formatDiscountText(discountText);
                } else {
                    const amount = comparePrice - price;
                    const discountText = formatPriceWithOptions(amount, currentCurrencyCode);
                    return formatDiscountText(discountText);
                }
            }
            return "";
        } // Handle partial selections (when user selects only some variant options)
        const hasPartialSelections = Object.keys(partialSelections).length > 0;
        const hasCompleteVariant = activeVariant && activeVariant.selectedOptions ? .length > 0;
        const hasVariantEdges = Array.isArray(product ? .variants ? .edges) && product.variants.edges.length > 0;
        if (hasPartialSelections && !hasCompleteVariant && hasVariantEdges) { // console.log("Handle hasPartialSelections")
            // Filter variants that match the partial selections
            const matchingVariants = (product ? .variants ? .edges || []).filter(({
                node: variant
            }) => {
                return variant.selectedOptions.every(option => { // If this option is in our partial selections, it must match
                    if (partialSelections[option.name]) {
                        return partialSelections[option.name] === option.value;
                    } // If not in partial selections, any value is fine
                    return true;
                });
            }); // console.log("matchingVariants", matchingVariants)
            // if (matchingVariants.length > 0) {
            //     // Get all prices and compare prices for matching variants
            //     const variantData = matchingVariants
            //         .map(({ node: variant }) => ({
            //             price: parseFloat(get(variant, 'price.amount') || "0"),
            //             compareAtPrice: parseFloat(get(variant, 'compareAtPrice.amount') || "0")
            //         }))
            //         .filter(data => data.price > 0 && data.compareAtPrice > 0 && data.compareAtPrice > data.price)
            //     //console.log("variantData", variantData)
            //     const prices = matchingVariants
            //         .map(({ node: variant }) => parseFloat(variant.price?.amount || "0"))
            //         .filter(price => price > 0)
            //     if (variantData.length > 0 && prices.length > 0) {
            //         const minPrice = Math.min(...prices)
            //         const maxPrice = Math.max(...prices)
            //         const discounts = variantData.map(data => {
            //             if (discountType === "Percentage") {
            //                 return ((data.compareAtPrice - data.price) / data.compareAtPrice) * 100
            //             } else {
            //                 return data.compareAtPrice - data.price
            //             }
            //         })
            //         //console.log("discounts", discounts)
            //         const maxDiscount = Math.max(...discounts)
            //         if (discountType === "Percentage") {
            //             if (Math.abs(minPrice - maxPrice) < 0.01) {
            //                 const discountText = `${Math.round(maxDiscount)}%`
            //                 return formatDiscountText(discountText)
            //             }
            //             const discountText = `${discountPrefix} ${Math.round(maxDiscount)}%`
            //             return formatDiscountText(discountText)
            //         } else {
            //             if (Math.abs(minPrice - maxPrice) < 0.01) {
            //                 const formattedAmount = formatPriceWithOptions(maxDiscount, currentCurrencyCode)
            //                 return formatDiscountText(`${formattedAmount}`)
            //             }
            //             const formattedAmount = formatPriceWithOptions(maxDiscount, currentCurrencyCode)
            //             const discountText = `${discountPrefix} ${formattedAmount}`
            //             return formatDiscountText(discountText)
            //         }
            //     }
            // }
            if (matchingVariants.length > 0) {
                const variantData = matchingVariants.map(({
                    node: variant
                }) => {
                    const price = parseFloat(get(variant, "price.amount") || "0");
                    const compareAtPrice = parseFloat(get(variant, "compareAtPrice.amount") || "0");
                    const isDiscounted = compareAtPrice > price && compareAtPrice > 0;
                    return {
                        price,
                        compareAtPrice,
                        discount: isDiscounted ? discountType === "Percentage" ? (compareAtPrice - price) / compareAtPrice * 100 : compareAtPrice - price : 0,
                        isDiscounted
                    };
                }).filter(data => data.price > 0);
                const prices = variantData.map(v => v.price);
                const discounts = variantData.map(v => v.discount);
                const hasAnyDiscount = discounts.some(d => d > 0);
                if (!hasAnyDiscount) return "";
                const maxDiscount = Math.max(...discounts);
                const minDiscount = Math.min(...discounts);
                const currentCurrencyCode = selectedCurrency || currencyCode || "USD"; // ✅ ✅ ✅ CHECK IF DISCOUNTS VARY (even if prices are the same)
                const showUpToPrefix = minDiscount !== maxDiscount;
                if (discountType === "Percentage") {
                    const rounded = Math.round(maxDiscount);
                    const discountText = showUpToPrefix ? `${discountPrefix} ${rounded}%` : `${rounded}%`;
                    return formatDiscountText(discountText);
                } else {
                    const formattedAmount = formatPriceWithOptions(maxDiscount, currentCurrencyCode);
                    const discountText = showUpToPrefix ? `${discountPrefix} ${formattedAmount}` : `${formattedAmount}`;
                    return formatDiscountText(discountText);
                }
            }
        } // Handle product-level discount (no active variant, no partial selections) with fallbacks
        // Prefer product ranges; fall back to computed ranges when missing
        if (!activeVariant && !hasPartialSelections && hasVariantEdges) {
            const currentCurrencyCode = selectedCurrency || currencyCode || "USD";
            const {
                min: priceMin,
                max: priceMax
            } = computeRange(product, "priceRange");
            const {
                min: compMin,
                max: compMax
            } = computeRange(product, "compareAtPriceRange");
            if (priceMin && priceMax && compMin && compMax) { // Use maximum possible discount across ranges
                const maxDiscountAmount = Math.max(compMax - priceMin, compMin - priceMax);
                if (maxDiscountAmount > 0) {
                    if (discountType === "Percentage") {
                        const denom = Math.max(compMax, compMin);
                        const pct = denom > 0 ? Math.round(maxDiscountAmount / denom * 100) : 0;
                        const discountText = pct > 0 ? priceMin === priceMax && compMin === compMax ? `${pct}%` : `${discountPrefix} ${pct}%` : "";
                        return formatDiscountText(discountText);
                    } else {
                        const formatted = formatPriceWithOptions(maxDiscountAmount, currentCurrencyCode);
                        const discountText = priceMin === priceMax && compMin === compMax ? `${formatted}` : `${discountPrefix} ${formatted}`;
                        return formatDiscountText(discountText);
                    }
                }
            }
            const variantData = (product ? .variants ? .edges || []).map(({
                node: variant
            }) => {
                const price = parseFloat(get(variant, "price.amount") || "0");
                const compareAtPrice = parseFloat(get(variant, "compareAtPrice.amount") || "0");
                const isDiscounted = compareAtPrice > price && compareAtPrice > 0;
                return {
                    price,
                    compareAtPrice,
                    discount: isDiscounted ? discountType === "Percentage" ? (compareAtPrice - price) / compareAtPrice * 100 : compareAtPrice - price : 0,
                    isDiscounted
                };
            }).filter(data => data.price > 0);
            if (!variantData.length) return "";
            const prices = variantData.map(v => v.price);
            const discounts = variantData.map(v => v.discount);
            const hasAnyDiscount = discounts.some(d => d > 0);
            if (!hasAnyDiscount) return "";
            const maxDiscount = Math.max(...discounts);
            const minDiscount = Math.min(...discounts);
            const showUpToPrefix = minDiscount !== maxDiscount;
            if (discountType === "Percentage") {
                const rounded = Math.round(maxDiscount);
                const discountText = showUpToPrefix ? `${discountPrefix} ${rounded}%` : `${rounded}%`;
                return formatDiscountText(discountText);
            } else {
                const formatted = formatPriceWithOptions(maxDiscount, currentCurrencyCode);
                const discountText = showUpToPrefix ? `${discountPrefix} ${formatted}` : `${formatted}`;
                return formatDiscountText(discountText);
            }
        }
        return "";
    }, [isBrowser, showMockValues, activeVariant, product, partialSelections, variantSelectorAction, discountType, previewPrice, previewComparePrice, selectedCurrency, selectedCountryCode, currencyCode, showCurrency, showSymbol, showDecimals, discountPrefix, textFormat]); // Return empty div during SSR
    if (!isBrowser) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                display: "none"
            }
        });
    } // Hide component if there's no discount text
    if (!text) return null;
    return /*#__PURE__*/ _jsx("div", {
        style: {
            display: "flex",
            width: "100%",
            height: "100%",
            backgroundColor: props.backgroundColor,
            padding: props.paddingPerSide ? `${props.paddingTop}px ${props.paddingRight}px ${props.paddingBottom}px ${props.paddingLeft}px` : props.padding,
            borderRadius: props.radiusPerCorner ? `${props.radiusTopLeft}px ${props.radiusTopRight}px ${props.radiusBottomRight}px ${props.radiusBottomLeft}px` : props.borderRadius,
            boxSizing: "border-box",
            alignItems: "center",
            justifyContent: "center"
        },
        children: /*#__PURE__*/ _jsx("p", {
            style: { ...props.font,
                color: props.textColor,
                margin: 0,
                padding: 0,
                whiteSpace: "nowrap"
            },
            children: text
        })
    });
}
FC_ProductPriceDiscount.defaultProps = {
    shopifyProductID: "",
    backgroundColor: "transparent",
    padding: 8,
    borderRadius: 0,
    font: undefined,
    textColor: "#000",
    discountPrefix: "Up to",
    textFormat: "{{discount}} OFF",
    discountType: "Percentage",
    previewPrice: "50",
    previewComparePrice: "75",
    format: {
        showCurrency: true,
        showSymbol: true,
        currencyCode: "USD",
        showDecimals: "Always show"
    }
};
addPropertyControls(FC_ProductPriceDiscount, {
    shopifyProductID: {
        type: ControlType.String,
        title: "Product ID",
        description: "Connect to CMS (required)."
    },
    previewPrice: {
        type: ControlType.String,
        title: "Price",
        defaultValue: "50",
        description: "Connect to CMS (canvas preview only)."
    },
    previewComparePrice: {
        type: ControlType.String,
        title: "Compare Price",
        defaultValue: "75",
        description: "Connect to CMS (canvas preview only)."
    },
    discountType: {
        type: ControlType.Enum,
        title: "Type",
        options: ["Percentage", "Amount"],
        optionTitles: ["%", "Amount"],
        defaultValue: "Percentage",
        displaySegmentedControl: true
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
                defaultValue: true,
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
        },
        hidden: props => props.discountType !== "Amount"
    },
    textFormat: {
        type: ControlType.String,
        title: "Text Format",
        defaultValue: "{{discount}} OFF",
        description: "Use {{discount}} to display the discount value"
    },
    discountPrefix: {
        type: ControlType.String,
        title: "Varying Prefix",
        description: "When a product has multiple discount values and a variant has not been selected.",
        defaultValue: "Up to"
    },
    font: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended"
    },
    textColor: {
        type: ControlType.Color,
        title: "Color",
        defaultValue: "#000"
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "BG"
    },
    padding: {
        type: ControlType.FusedNumber,
        title: "Padding",
        defaultValue: 8,
        toggleKey: "paddingPerSide",
        toggleTitles: ["All", "Sides"],
        valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
        valueLabels: ["T", "R", "B", "L"],
        min: 0
    },
    borderRadius: {
        type: ControlType.FusedNumber,
        title: "Radius",
        defaultValue: 0,
        toggleKey: "radiusPerCorner",
        toggleTitles: ["All", "Corners"],
        valueKeys: ["radiusTopLeft", "radiusTopRight", "radiusBottomRight", "radiusBottomLeft"],
        valueLabels: ["TL", "TR", "BR", "BL"],
        min: 0,
        max: 100,
        unit: "px"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_ProductPriceDiscount",
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
//# sourceMappingURL=./FC_ProductPriceDiscount.map