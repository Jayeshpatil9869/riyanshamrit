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
    useCallback,
    useEffect,
    useMemo,
    useRef,
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
    knownCurrenciesWithCodeAsSymbol
} from "https://framerusercontent.com/modules/k9s4cejdkBGDjmzudhzM/18cq93eooqM4YmdbL7E2/currencyMaps.js"; // Helper function to map country code to appropriate locale
const getLocaleFromCountry = countryCode => { // Default fallback locale
    if (!countryCode) return undefined; // Common country code to locale mappings
    const countryToLocale = { // North America
        US: "en-US",
        CA: "en-CA",
        QC: "fr-CA", // Europe
        GB: "en-GB",
        FR: "fr-FR",
        DE: "de-DE",
        IT: "it-IT",
        ES: "es-ES",
        PT: "pt-PT",
        NL: "nl-NL",
        BE: "fr-BE",
        LU: "fr-LU",
        CH: "de-CH",
        AT: "de-AT",
        SE: "sv-SE",
        NO: "nb-NO",
        DK: "da-DK",
        FI: "fi-FI",
        PL: "pl-PL",
        CZ: "cs-CZ",
        HU: "hu-HU",
        RU: "ru-RU", // Asia Pacific
        CN: "zh-CN",
        JP: "ja-JP",
        KR: "ko-KR",
        IN: "en-IN",
        AU: "en-AU",
        NZ: "en-NZ", // Latin America
        MX: "es-MX",
        BR: "pt-BR",
        AR: "es-AR",
        CL: "es-CL",
        CO: "es-CO",
        PE: "es-PE", // Middle East & Africa
        AE: "ar-AE",
        SA: "ar-SA",
        ZA: "en-ZA",
        IL: "he-IL"
    };
    return countryToLocale[countryCode] || undefined;
}; // Helper function to check if a currency's symbol is the same as its code
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
export default function FC_ProductPriceCompare(props) {
    const {
        shopifyProductID,
        canvasPrice,
        format: {
            showCurrency,
            showSymbol,
            showDecimals,
            currencyCode
        } = {},
        strikethrough,
        strikethroughColor,
        strikethroughSize,
        font,
        color,
        compareAtPrefix = ""
    } = props;
    const [product, setProduct] = useState();
    const [activeVariant, setActiveVariant] = useState();
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [partialSelections, setPartialSelections] = useState({});
    const [variantSelectorAction, setVariantSelectorAction] = useState("");
    const isBrowser = useIsBrowser();
    const normalizeProduct = useCallback(p => {
        if (!p) return p;
        const edges = p ? .variants ? .edges;
        if (!Array.isArray(edges)) {
            return { ...p,
                variants: { ...p.variants || {},
                    edges: Array.isArray(edges) ? edges : []
                }
            };
        }
        return p;
    }, []); // Initialize currency from localStorage on page load
    useEffect(() => {
        if (!isBrowser) return;
        const storedCurrency = localStorage.getItem("selectedCurrency");
        const storedCountryCode = localStorage.getItem("selectedCountryCode");
        const storedCountry = localStorage.getItem("selectedCountry");
        setSelectedCurrency(storedCurrency || "USD");
        setSelectedCountryCode(storedCountryCode || "US");
        setSelectedCountry(storedCountry || "United States");
    }, [isBrowser]);
    const _currencyCode = useMemo(() => {
        const variantCurrency = get(activeVariant, "price.currencyCode");
        const productCurrency = get(product, "priceRange.minVariantPrice.currencyCode");
        return variantCurrency || productCurrency || "USD";
    }, [activeVariant, product]);
    const showMockValues = useMemo(() => typeof RenderTarget !== "undefined" && (RenderTarget.current() === RenderTarget.canvas || isBrowser && window.location.origin.endsWith("framercanvas.com")), [isBrowser]); // Cached compareAt range per product/currency
    const compareRangeCache = useRef(new Map);
    const getProductCompareRange = useCallback(p => {
        if (!p) return {
            min: null,
            max: null
        };
        const currency = _currencyCode || selectedCurrency || "USD";
        const cacheKey = `${p.id||"no-id"}-${currency}-compare`;
        if (compareRangeCache.current.has(cacheKey)) {
            return compareRangeCache.current.get(cacheKey);
        }
        const minFromProduct = get(p, "compareAtPriceRange.minVariantPrice.amount");
        const maxFromProduct = get(p, "compareAtPriceRange.maxVariantPrice.amount");
        let minVal = minFromProduct ? parseFloat(minFromProduct) : null;
        let maxVal = maxFromProduct ? parseFloat(maxFromProduct) : null;
        if (minVal === null || isNaN(minVal) || maxVal === null || isNaN(maxVal)) {
            const edges = p ? .variants ? .edges || [];
            for (let i = 0; i < (Array.isArray(edges) ? edges.length : 0); i++) {
                const v = edges[i] ? .node;
                if (!v) continue;
                const amtStr = get(v, "compareAtPrice.amount");
                const amt = amtStr ? parseFloat(amtStr) : NaN;
                if (!isNaN(amt) && amt > 0) {
                    if (minVal === null || amt < minVal) minVal = amt;
                    if (maxVal === null || amt > maxVal) maxVal = amt;
                }
            }
        }
        const value = {
            min: typeof minVal === "number" && !isNaN(minVal) ? minVal : null,
            max: typeof maxVal === "number" && !isNaN(maxVal) ? maxVal : null
        };
        compareRangeCache.current.set(cacheKey, value);
        return value;
    }, [_currencyCode, selectedCurrency]);
    const productCompareRange = useMemo(() => getProductCompareRange(product), [product, getProductCompareRange]); // Common function to format price based on options
    const formatPriceWithOptions = (numericPrice, currCode) => {
        const symbolSameAsCode = isCurrencySymbolSameAsCode(currCode); // Get locale from selected country code
        const locale = getLocaleFromCountry(selectedCountryCode); // Determine if we should show decimals based on the setting
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
            const isIOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window); // Format USD manually to avoid the iOS "US$" prefix
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
        if (!isBrowser) return ""; // console.log('[ComparePrice] Debug:', {
        //     activeVariant,
        //     compareAtPrice: activeVariant ? get(activeVariant, 'compareAtPrice.amount') : null,
        //     product,
        //     productComparePrice: get(product, 'compareAtPriceRange.minVariantPrice.amount'),
        //     partialSelections,
        //     variantSelectorAction,
        //     // showMockValues,
        //     // selectedCurrency
        // })
        // For canvas view, handle the display options directly
        if (typeof RenderTarget !== "undefined" && (RenderTarget.current() === RenderTarget.canvas || showMockValues)) { // Parse canvasPrice as range format (e.g., "200.00-250.00")
            let minPrice;
            let maxPrice;
            if (canvasPrice) {
                const priceRange = canvasPrice.split("-");
                if (Array.isArray(priceRange) && priceRange.length === 2) {
                    minPrice = priceRange[0].trim();
                    maxPrice = priceRange[1].trim();
                } else { // If no range format, use the single price for both min and max
                    minPrice = canvasPrice;
                    maxPrice = canvasPrice;
                }
            }
            const numericMinPrice = parseFloat(minPrice);
            const numericMaxPrice = parseFloat(maxPrice);
            const currentCurrencyCode = currencyCode || "USD"; // Apply same logic as product (no active variant) case
            // If min and max are the same, show one price
            if (numericMinPrice === numericMaxPrice && numericMinPrice > 0 && numericMaxPrice > 0) {
                const formattedPrice = formatPriceWithOptions(numericMinPrice, currentCurrencyCode);
                return compareAtPrefix ? `${compareAtPrefix} ${formattedPrice}` : formattedPrice;
            } else {
                return "";
            }
        } // For live view, get the compare at price
        const amount = activeVariant && get(activeVariant, "compareAtPrice.amount");
        const {
            min: compMin,
            max: compMax
        } = productCompareRange;
        if (!amount && !activeVariant && !product ? .compareAtPriceRange && !(compMin && compMax)) return "";
        const currentCurrencyCode = selectedCurrency || currencyCode || "USD"; // If we have an amount, format it
        if (amount) {
            const numericPrice = parseFloat(amount);
            if (isNaN(numericPrice)) return "";
            const formattedPrice = formatPriceWithOptions(numericPrice, currentCurrencyCode);
            return compareAtPrefix ? `${compareAtPrefix} ${formattedPrice}` : formattedPrice;
        } // Handle partial selections (when user selects only some variant options)
        const hasPartialSelections = Object.keys(partialSelections || {}).length > 0;
        const hasCompleteVariant = activeVariant && Array.isArray(activeVariant.selectedOptions) && activeVariant.selectedOptions.length > 0; // console.log("hasPartialSelections", hasPartialSelections)
        // console.log("hasCompleteVariant", hasCompleteVariant)
        // console.log("product", product)
        // console.log("partialSelections", partialSelections)
        if (hasCompleteVariant && variantSelectorAction === "purchase" && product ? .variants ? .edges ? .length) {
            return "";
        }
        const hasVariantEdges = Array.isArray(product ? .variants ? .edges) && (product ? .variants ? .edges ? .length || 0) > 0;
        if (hasPartialSelections && !hasCompleteVariant && hasVariantEdges) { // Filter variants that match the partial selections
            const matchingVariants = (product ? .variants ? .edges || []).filter(({
                node: variant
            }) => {
                return variant.selectedOptions.every(option => { // If this option is in our partial selections, it must match
                    if (partialSelections[option.name]) {
                        return partialSelections[option.name] === option.value;
                    } // If not in partial selections, any value is fine
                    return true;
                });
            });
            if (Array.isArray(matchingVariants) && matchingVariants.length > 0) { //console.log("matchingVariants", matchingVariants)
                // Get all compare at prices for matching variants
                const compareAtPrices = matchingVariants.map(({
                    node: variant
                }) => get(variant, "compareAtPrice.amount")).filter(amount => amount && amount !== "0" && amount !== "0.00"); // If no compare at prices found, return empty
                if (!Array.isArray(compareAtPrices) || compareAtPrices.length === 0) { //console.log("[ComparePrice] (partial selections) no compare at prices found, return empty")
                    return "";
                } // Check if all matching variants have compare at prices
                const allVariantsHaveComparePrice = matchingVariants.every(({
                    node: variant
                }) => {
                    const comparePrice = get(variant, "compareAtPrice.amount");
                    return comparePrice && comparePrice !== "0" && comparePrice !== "0.00";
                }); // If not all variants have compare prices, hide the compare price text
                if (!allVariantsHaveComparePrice) { //console.log("[ComparePrice] not all matching variants have compare prices, hide compare price text")
                    return "";
                } // Convert to numeric values
                const numericComparePrices = compareAtPrices.map(price => parseFloat(price)).filter(price => !isNaN(price) && price > 0);
                if (!Array.isArray(numericComparePrices) || numericComparePrices.length === 0) { //console.log("[ComparePrice] no numeric compare prices found, return empty")
                    return "";
                } // Check if all compare prices are the same
                const minComparePrice = Math.min(...numericComparePrices);
                const maxComparePrice = Math.max(...numericComparePrices);
                const allSamePrice = Math.abs(minComparePrice - maxComparePrice) < .01;
                if (allSamePrice) { // All matching variants have the same compare price, display one price
                    //console.log("[ComparePrice] all matching variants have the same compare price, display one price", minComparePrice, currentCurrencyCode)
                    const formattedPrice = formatPriceWithOptions(minComparePrice, currentCurrencyCode);
                    return compareAtPrefix ? `${compareAtPrefix} ${formattedPrice}` : formattedPrice;
                } else { // Prices differ, hide compare price text
                    //console.log("[ComparePrice] matching variant prices differ, hide compare price text")
                    return "";
                }
            }
        } // Handle product (no active variant) - check all variants
        if (!activeVariant && !hasPartialSelections && hasVariantEdges) { // First, check if ALL variants have compare prices
            const allVariantsHaveComparePrice = (product ? .variants ? .edges || []).every(({
                node: variant
            }) => {
                const comparePrice = get(variant, "compareAtPrice.amount");
                return comparePrice && comparePrice !== "0" && comparePrice !== "0.00";
            }); // If not all variants have compare prices, hide the compare price text
            if (!allVariantsHaveComparePrice) { //console.log("[ComparePrice] not all variants have compare prices, hide compare price text")
                return "";
            } // Use product-level compare range with fallback to computed
            const numericMinPrice = compMin;
            const numericMaxPrice = compMax;
            if (numericMinPrice && numericMaxPrice) {
                if (Math.abs(numericMinPrice - numericMaxPrice) < .01) {
                    const formattedPrice = formatPriceWithOptions(numericMinPrice, currentCurrencyCode);
                    return compareAtPrefix ? `${compareAtPrefix} ${formattedPrice}` : formattedPrice;
                } else {
                    return "";
                }
            }
            return "";
        }
        return "";
    }, [isBrowser, showMockValues, activeVariant, product, canvasPrice, showCurrency, showSymbol, currencyCode, showDecimals, selectedCurrency, selectedCountryCode, partialSelections, variantSelectorAction, compareAtPrefix, props.format]);
    const showComparePrice = useMemo(() => {
        if (showMockValues) {
            return canvasPrice && canvasPrice.trim() !== "";
        }
        return text && text.trim() !== "";
    }, [showMockValues, canvasPrice, text]); // Listen for currency changes
    useEffect(() => {
        if (!isBrowser) return;
        const handleCurrencyChange = event => { // console.log('[ComparePrice] Currency changed:', {
            //     newCurrency: event.detail.currency,
            //     newCountryCode: event.detail.countryCode
            // })
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
                    setProduct(normalizeProduct(_matchingProduct.node)); // Preserve active variant selection if possible
                    if (activeVariant) {
                        const edges = _matchingProduct ? .node ? .variants ? .edges || [];
                        const matchingVariant = edges.find(({
                            node
                        }) => {
                            const nodeOpts = Array.isArray(node ? .selectedOptions) ? node.selectedOptions : [];
                            const activeOpts = Array.isArray(activeVariant ? .selectedOptions) ? activeVariant.selectedOptions : [];
                            return nodeOpts.every(option => activeOpts.some(activeOption => activeOption ? .name === option ? .name && activeOption ? .value === option ? .value));
                        });
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
    }, [isBrowser, shopifyProductID, activeVariant, selectedCurrency, selectedCountryCode]);
    useEffect(() => {
        if (!isBrowser) return;
        const handleVariantChange = e => { // console.log("[ComparePrice] Variant changed:", {
            //     detail: e.detail,
            //     expectedProductId: `gid://shopify/Product/${shopifyProductID}`,
            // })
            // Check for purchase action flag - if this is a purchase action, don't update variant state
            if (e.detail ? .isPurchaseAction || e.detail ? .onClickAction === "purchase") { // console.log(
                //     "Purchase action detected, returning",
                //     e.detail?.isPurchaseAction
                // )
                return;
            }
            try {
                const expectedProductId = `gid://shopify/Product/${shopifyProductID}`;
                if (e.detail) {
                    if (!e.detail.productId || e.detail.productId !== expectedProductId) {
                        return;
                    }
                }
                if (e.detail.productId !== expectedProductId) {
                    setVariantSelectorAction(e.detail.onClickAction); //console.log("variantSelectorAction", e.detail.onClickAction)
                } // If selection is partial, do not set activeVariant; preserve partial range behavior
                if (e.detail ? .isCompleteVariant === false) {
                    setActiveVariant(null);
                    if (Array.isArray(e.detail.selectedOptions)) {
                        const partial = {};
                        e.detail.selectedOptions.forEach(opt => {
                            if (opt ? .name) partial[opt.name] = opt.value;
                        });
                        setPartialSelections(partial);
                    }
                    return;
                } // Get products from shopXtools storage
                const products = window.shopXtools ? .products || [];
                const _matchingProduct = products.find(({
                    node: _product
                }) => _product.id === `gid://shopify/Product/${shopifyProductID}`);
                if (_matchingProduct) {
                    setProduct(normalizeProduct(_matchingProduct.node)); // Find the matching variant in the current product data
                    const edges = _matchingProduct ? .node ? .variants ? .edges || [];
                    const matchingVariant = edges.find(({
                        node
                    }) => {
                        const nodeOpts = Array.isArray(node ? .selectedOptions) ? node.selectedOptions : [];
                        const activeOpts = Array.isArray(e.detail ? .selectedOptions) ? e.detail.selectedOptions : [] //Array.isArray(activeVariant?.selectedOptions) ? activeVariant.selectedOptions : []
                        ;
                        return nodeOpts.every(option => activeOpts.some(activeOption => activeOption ? .name === option ? .name && activeOption ? .value === option ? .value));
                    });
                    if (matchingVariant) {
                        if (e.detail.onClickAction === "purchase") {
                            setActiveVariant(null); //console.log("setting partialSelections for purchase action", e.detail.selectedOptions[0])
                            setPartialSelections({
                                [e.detail.selectedOptions[0].name]: e.detail.selectedOptions[0].value
                            });
                        } else {
                            setActiveVariant(matchingVariant.node);
                            setPartialSelections({});
                        }
                    } else { // If no exact variant match but event was marked complete, fall back to event detail
                        // Otherwise partial branches above already handled
                        if (e.detail ? .isCompleteVariant) {
                            setActiveVariant(e.detail);
                            if (e.detail.onClickAction !== "purchase") {
                                setPartialSelections({});
                            }
                        }
                    }
                }
            } catch (error) { // Error handling without console.error
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
                setProduct(_matchingProduct ? normalizeProduct(_matchingProduct.node) : null); // If there's only one variant, set it as active
                if (Array.isArray(_matchingProduct ? .node ? .variants ? .edges) && (_matchingProduct ? .node ? .variants ? .edges ? .length || 0) === 1) {
                    setActiveVariant(_matchingProduct.node.variants.edges[0].node);
                }
            }
        }; // Add event listener for variant option selections
        const handleVariantOptionSelected = e => { //console.log("variant_option_selected", e.detail)
            if (e.detail ? .isPurchaseAction) { // console.log(
                //     "Purchase action is true, returning",
                //     e.detail?.isPurchaseAction
                // )
                return;
            } // Check if this event is for our product
            const eventProductId = e.detail ? .productId;
            const expectedProductId = `gid://shopify/Product/${shopifyProductID}`;
            if (eventProductId && eventProductId !== expectedProductId) { //console.log("Event not for this product", eventProductId, expectedProductId)
                return;
            }
            if (e.detail ? .optionName && e.detail ? .value) {
                setPartialSelections({
                    [e.detail.optionName]: e.detail.value
                }); //console.log("setting partialSelections from individual option", e.detail.optionName, e.detail.value)
            }
        }; // Initial product load function
        const loadProduct = async () => {
            try { // Get products from shopXtools storage
                const products = window.shopXtools ? .products || [];
                const _matchingProduct = products.find(({
                    node: _product
                }) => _product.id === `gid://shopify/Product/${shopifyProductID}`);
                if (_matchingProduct) {
                    setProduct(normalizeProduct(_matchingProduct.node));
                    if (Array.isArray(_matchingProduct.node ? .variants ? .edges) && (_matchingProduct ? .node ? .variants ? .edges ? .length || 0) === 1) {
                        setActiveVariant(_matchingProduct.node.variants.edges[0].node);
                    } // setActiveVariant(
                    //     _matchingProduct.node?.variants?.edges[0].node
                    // )
                }
            } catch (error) { // Error handling without console.error
            }
        }; // Call loadProduct on mount
        loadProduct(); // Initial check for existing products
        if (window["shopXtools"] ? .products) {
            const products = window["shopXtools"].products;
            if (Array.isArray(products) && products.length > 0) {
                const _matchingProduct = products.find(({
                    node: _product
                }) => _product ? .id === `gid://shopify/Product/${shopifyProductID}`);
                if (_matchingProduct ? .node) {
                    setProduct(normalizeProduct(_matchingProduct.node));
                    if (Array.isArray(_matchingProduct.node ? .variants ? .edges) && (_matchingProduct ? .node ? .variants ? .edges ? .length || 0) === 1) {
                        setActiveVariant(_matchingProduct.node.variants.edges[0].node);
                    } // setActiveVariant(
                    //     _matchingProduct.node?.variants?.edges[0].node
                    // )
                } else {
                    setProduct(null);
                }
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
    }, [isBrowser, shopifyProductID, selectedCurrency]); // Return empty div during SSR
    if (!isBrowser) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                display: "none"
            }
        });
    } // console.log('[ComparePrice] Final render state:', {
    //     showComparePrice,
    //     text,
    //     showMockValues
    // })
    // Always show in canvas view, otherwise only show if there's a compare price
    if (!showComparePrice) {
        return null;
    }
    return /*#__PURE__*/ _jsx("div", {
        style: {
            display: "inline-block",
            maxWidth: "100%",
            width: "auto",
            whiteSpace: "nowrap",
            overflow: "visible",
            transform: "none",
            transition: "none",
            animation: "none",
            willChange: "auto"
        },
        children: /*#__PURE__*/ _jsx("p", {
            style: { ...font,
                color: color,
                margin: 0,
                padding: 0,
                lineHeight: 1,
                textDecoration: strikethrough ? "line-through" : "none",
                textDecorationColor: strikethroughColor,
                textDecorationThickness: strikethrough ? `${strikethroughSize}px` : undefined,
                whiteSpace: "nowrap",
                display: "inline-block",
                width: "auto",
                transform: "none",
                transition: "none",
                animation: "none",
                willChange: "auto"
            },
            children: text
        })
    });
}
FC_ProductPriceCompare.defaultProps = {
    shopifyProductID: "",
    strikethrough: true,
    strikethroughColor: "#000000",
    strikethroughSize: 1,
    canvasPrice: "75.00",
    compareAtPrefix: "",
    format: {
        showCurrency: true,
        showSymbol: true,
        currencyCode: "USD",
        showDecimals: "Always show"
    }
};
addPropertyControls(FC_ProductPriceCompare, {
    shopifyProductID: {
        type: ControlType.String,
        title: "Product ID",
        description: "Connect to CMS (required)."
    },
    canvasPrice: {
        type: ControlType.String,
        title: "Compare Price",
        description: "Connect to CMS (for canvas preview only).",
        defaultValue: "75.00"
    },
    compareAtPrefix: {
        type: ControlType.String,
        title: "Prefix",
        placeholder: "was",
        defaultValue: ""
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
        }
    },
    font: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended"
    },
    color: {
        type: ControlType.Color,
        title: "Color",
        defaultValue: "#000"
    },
    strikethrough: {
        type: ControlType.Boolean,
        title: "Strike",
        defaultValue: true
    },
    strikethroughSize: {
        type: ControlType.Number,
        title: "↳ Size",
        defaultValue: 1,
        min: 0,
        max: 8,
        step: .1,
        hidden: props => !props.strikethrough
    },
    strikethroughColor: {
        type: ControlType.Color,
        title: "↳ Color",
        defaultValue: "#000000",
        hidden: props => !props.strikethrough
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_ProductPriceCompare",
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
//# sourceMappingURL=./FC_ProductPriceCompare.map