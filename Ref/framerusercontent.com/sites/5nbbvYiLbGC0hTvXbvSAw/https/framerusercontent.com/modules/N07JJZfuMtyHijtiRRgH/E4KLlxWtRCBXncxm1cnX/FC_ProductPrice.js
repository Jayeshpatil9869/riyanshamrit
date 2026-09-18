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
    jsxs as _jsxs
} from "react/jsx-runtime";
import {
    useCallback,
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
export default function FC_ProductPrice(props) {
    const {
        shopifyProductID,
        canvasPrice,
        format: {
            showCurrency,
            showSymbol,
            showDecimals,
            currencyCode
        } = {},
        fromText = "from"
    } = props;
    const isBrowser = useIsBrowser();
    const [product, setProduct] = useState();
    const [activeVariant, setActiveVariant] = useState();
    const [subscriptionPrice, setSubscriptionPrice] = useState(() => {
        if (typeof window !== "undefined") {
            const persisted = window.__fc_activeSubscription ? .[shopifyProductID];
            if (persisted ? .price) return persisted.price;
        }
        return null;
    });
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [isLoadingPrice, setIsLoadingPrice] = useState(false);
    const [partialSelections, setPartialSelections] = useState({});
    const [variantSelectorAction, setVariantSelectorAction] = useState("");
    const [waitingForVariantSelection, setWaitingForVariantSelection] = useState(false); // PERFORMANCE OPTIMIZATION: Progressive loading state
    // - Show prices immediately for fast perceived performance
    // - Compute ranges in background using requestIdleCallback
    // - Cache computed ranges to avoid recalculation
    const [isRangeComputed, setIsRangeComputed] = useState(false);
    const [computedPriceRange, setComputedPriceRange] = useState({
        min: null,
        max: null
    }); // Compute product price range from variants when product.priceRange is missing/partial
    const getProductPriceRange = useCallback((p, useCompareAt = false) => {
        if (!p) return {
            min: null,
            max: null
        }; // Prefer product-level range when available
        const rangePath = useCompareAt ? "compareAtPriceRange" : "priceRange";
        const minFromProduct = get(p, `${rangePath}.minVariantPrice.amount`);
        const maxFromProduct = get(p, `${rangePath}.maxVariantPrice.amount`);
        let minVal = minFromProduct ? parseFloat(minFromProduct) : null;
        let maxVal = maxFromProduct ? parseFloat(maxFromProduct) : null;
        if (minVal === null || isNaN(minVal) || maxVal === null || isNaN(maxVal)) { // OPTIMIZED: Use reduce for better performance on large variant lists
            const edges = p ? .variants ? .edges || [];
            if (edges.length > 0) {
                const {
                    min,
                    max
                } = edges.reduce((acc, {
                    node: v
                }) => {
                    if (!v) return acc;
                    const fieldPath = useCompareAt ? "compareAtPrice.amount" : "price.amount";
                    const amtStr = get(v, fieldPath);
                    const amt = amtStr ? parseFloat(amtStr) : NaN;
                    if (!isNaN(amt) && amt > 0) {
                        if (acc.min === null || amt < acc.min) acc.min = amt;
                        if (acc.max === null || amt > acc.max) acc.max = amt;
                    }
                    return acc;
                }, {
                    min: null,
                    max: null
                });
                minVal = min;
                maxVal = max;
            }
        }
        return {
            min: typeof minVal === "number" && !isNaN(minVal) ? minVal : null,
            max: typeof maxVal === "number" && !isNaN(maxVal) ? maxVal : null
        };
    }, [selectedCurrency]); // Progressive range computation - compute in background after initial render
    useEffect(() => {
        if (!product || isRangeComputed) return; // Use requestIdleCallback for non-blocking computation
        const computeRange = () => {
            const range = getProductPriceRange(product, false);
            setComputedPriceRange(range);
            setIsRangeComputed(true);
        }; // Delay computation to prioritize initial render
        if ("requestIdleCallback" in window) {
            requestIdleCallback(computeRange, {
                timeout: 200
            });
        } else { // Fallback for browsers without requestIdleCallback
            setTimeout(computeRange, 100);
        }
    }, [product, isRangeComputed, getProductPriceRange]); // Reset range computation when product changes
    useEffect(() => {
        if (product) {
            setIsRangeComputed(false);
            setComputedPriceRange({
                min: null,
                max: null
            });
        }
    }, [product]); // Initialize currency and country code on page load
    useEffect(() => {
        if (!isBrowser) return;
        const storedCurrency = localStorage.getItem("selectedCurrency");
        const storedCountryCode = localStorage.getItem("selectedCountryCode");
        const storedCountry = localStorage.getItem("selectedCountry");
        setSelectedCurrency(storedCurrency || "USD");
        setSelectedCountryCode(storedCountryCode || "US");
        setSelectedCountry(storedCountry || "United States");
    }, [isBrowser]); // Handle variant changes
    const handleVariantChange = useCallback(async e => { // Check for purchase action flag - if this is a purchase action, don't update variant state
        if (e.detail ? .isPurchaseAction) { //console.log("Purchase action detected, returning", e.detail?.isPurchaseAction)
            return;
        }
        if (!e.detail || e.detail.productId !== `gid://shopify/Product/${shopifyProductID}`) {
            return;
        } // console.log("variantSelectorAction", e.detail.onClickAction)
        setVariantSelectorAction(e.detail.onClickAction); // Clear waiting state when variant changes are received
        setWaitingForVariantSelection(false); //console.log("Price component: Variant change event received, clearing wait state")
        //console.log("handleVariantChange", e.detail)
        setIsLoadingPrice(true);
        try { // Get products from shopXtools storage
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
                        setActiveVariant(null);
                        setPartialSelections({
                            [e.detail.selectedOptions[0].name]: e.detail.selectedOptions[0].value
                        });
                    } else if (e.detail ? .isCompleteVariant === false) { // Partial selection: keep partial range behavior
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
                }
            }
        } catch (error) { // Fallback
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
        } finally {
            setIsLoadingPrice(false);
        }
    }, [shopifyProductID]); // Handle currency changes
    const handleCurrencyChange = useCallback(event => {
        setIsLoadingPrice(true);
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
                    const matchingVariant = _matchingProduct.node.variants ? .edges.find(({
                        node
                    }) => node.selectedOptions.every(option => activeVariant.selectedOptions.find(activeOption => activeOption.name === option.name && activeOption.value === option.value)));
                    if (matchingVariant) {
                        setActiveVariant(matchingVariant.node);
                    }
                }
            }
        } catch (error) { // Error handling
        } finally {
            setIsLoadingPrice(false);
        }
    }, [shopifyProductID, activeVariant]); // Listen for currency changes
    useEffect(() => {
        if (!isBrowser) return;
        window.addEventListener("currency_changed", handleCurrencyChange);
        return () => {
            window.removeEventListener("currency_changed", handleCurrencyChange);
        };
    }, [isBrowser, handleCurrencyChange]); // Initial product load
    useEffect(() => {
        if (!isBrowser) return; // Single handler for all product-ready events (both priority and regular)
        const handleProductsReady = e => {
            if (product && product.id === `gid://shopify/Product/${shopifyProductID}`) {
                return;
            }
            if (!Array.isArray(e.detail ? .products)) return; // console.log('Products ready event received in Price component', e);
            const matchingProduct = e.detail.products.find(({
                node: _product
            }) => _product.id === `gid://shopify/Product/${shopifyProductID}`);
            if (matchingProduct) {
                setProduct(matchingProduct.node); // console.log('Product loaded:', matchingProduct.node.title);
                if (matchingProduct.node ? .variants ? .edges ? .length === 1) {
                    setActiveVariant(matchingProduct.node.variants.edges[0].node);
                }
            }
        }; // Add event listeners - single handleProductsReady handles both events
        document.addEventListener("data__products-ready", handleProductsReady);
        document.addEventListener("product__active-variant__changed", handleVariantChange); // Cleanup
        return () => {
            document.removeEventListener("data__products-ready", handleProductsReady);
            document.removeEventListener("product__active-variant__changed", handleVariantChange);
        };
    }, [isBrowser, shopifyProductID, selectedCurrency, selectedCountryCode, product]);
    const loadProduct = async () => {
        try { // console.log('Loading product...');
            // Get products from shopXtools storage
            const products = Array.isArray(window ? .shopXtools ? .products) ? window.shopXtools.products : [];
            const _matchingProduct = products.find(({
                node: _product
            }) => _product.id === `gid://shopify/Product/${shopifyProductID}`);
            if (_matchingProduct) {
                setProduct(_matchingProduct.node); // console.log(
                //   'Product found after immediate initialization:',
                //   _matchingProduct.node?.title
                // );
                if (_matchingProduct.node ? .variants ? .edges ? .length === 1) {
                    setActiveVariant(_matchingProduct.node.variants.edges[0].node);
                }
            } else { // Product not found - request priority fetch
                if (window ? .shopXtools ? .getProducts) { // console.log('Product not found - request priority fetch...');
                    window.shopXtools.getProducts(shopifyProductID);
                }
            }
        } catch (error) {
            console.error("Error loading product:", error);
        }
    };
    useEffect(() => {
        if (!isBrowser) return;
        loadProduct();
    }, [isBrowser]); // Wait for variant selection events with timeout
    useEffect(() => {
        if (!isBrowser || !product) return; // Only wait for variant selection if it's a multi-variant product
        const isMultiVariant = product.variants ? .edges ? .length > 1;
        if (!isMultiVariant) return; // Set waiting state and start timeout
        setWaitingForVariantSelection(true); // console.log("Price component: Waiting for variant selection events...")
        const timeout = setTimeout(() => { // If no variant selection events received within timeout, assume no variant selector
            setWaitingForVariantSelection(false); //console.log("Price component: No variant selection events received, showing product price")
        }, 1e3) // 1 second timeout
        ;
        return () => {
            clearTimeout(timeout);
        };
    }, [isBrowser, product]); // Add subscription price listener
    useEffect(() => {
        if (!isBrowser) return; // Check for persisted subscription state that may have been set
        // before this component mounted (solves timing/race on page refresh)
        const persisted = window.__fc_activeSubscription ? .[shopifyProductID];
        if (persisted ? .price && !subscriptionPrice) {
            setSubscriptionPrice(persisted.price);
        }
        const handleSubscriptionPriceUpdate = e => { // Ignore events for other products
            if (e.detail ? .productId && e.detail.productId !== shopifyProductID) return;
            if (e.detail ? .price) {
                setSubscriptionPrice(e.detail.price);
            } else {
                setSubscriptionPrice(null);
            }
        };
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
            } // Clear waiting state when variant selection events are received
            setWaitingForVariantSelection(false); //console.log("Price component: Variant selection event received, clearing wait state")
            setIsLoadingPrice(true);
            if (e.detail ? .optionName && e.detail ? .value) {
                setPartialSelections({
                    [e.detail.optionName]: e.detail.value
                }); //console.log("setting partialSelections from individual option", e.detail.optionName, e.detail.value)
            }
            setIsLoadingPrice(false);
        };
        document.addEventListener("subscription__price-update", handleSubscriptionPriceUpdate);
        document.addEventListener("variant_option_selected", handleVariantOptionSelected);
        document.addEventListener("__variant_option_selected", handleVariantOptionSelected);
        return () => {
            document.removeEventListener("subscription__price-update", handleSubscriptionPriceUpdate);
            document.removeEventListener("variant_option_selected", handleVariantOptionSelected);
            document.removeEventListener("__variant_option_selected", handleVariantOptionSelected);
        };
    }, [isBrowser, shopifyProductID]); // Get currency formatting options at component level
    const _currencyCode = useMemo(() => {
        const variantCurrency = get(activeVariant, "price.currencyCode");
        const productCurrency = get(product, "priceRange.minVariantPrice.currencyCode");
        return variantCurrency || productCurrency || "USD";
    }, [activeVariant, product]);
    const showMockValues = useMemo(() => RenderTarget.current() === RenderTarget.canvas || isBrowser && window.location.origin.endsWith("framercanvas.com"), [isBrowser]); // Common function to format price based on options
    const formatPriceWithOptions = (numericPrice, currCode) => {
        const symbolSameAsCode = isCurrencySymbolSameAsCode(currCode); // Get locale from selected country code
        const locale = getLocaleFromCountry(selectedCountryCode); // Log browser user agent for debugging iOS-specific issues
        // if (isBrowser) {
        //     console.log("[FC_ProductPrice] Format debug:", {
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
                let result;
                if (!showCurrency) {
                    result = `$${number}` // Just "$50" format
                    ;
                } else {
                    result = `$${number} USD` // "$50 USD" format
                    ;
                }
                return result;
            } else { // For non-iOS devices, continue with normal formatting but use
                // a more controlled approach to ensure consistency
                let result;
                if (!showCurrency) {
                    result = new Intl.NumberFormat(locale, {
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
                    result = `${withSymbol} USD`;
                }
                return result;
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
                const result = `${currCode} ${number}`;
                return result;
            }
        } // For currencies with distinct symbols (like USD with $)
        // If showing only the code (no symbol)
        if (!showSymbol && showCurrency) {
            const number = new Intl.NumberFormat(locale, {
                style: "decimal",
                minimumFractionDigits: decimalDigits,
                maximumFractionDigits: decimalDigits
            }).format(numericPrice); // For normal currencies, show code after the number
            const result = `${number} ${currCode}`;
            return result;
        } // If showing only the symbol (no code)
        if (showSymbol && !showCurrency) {
            const result = new Intl.NumberFormat(locale, {
                style: "currency",
                currency: currCode,
                minimumFractionDigits: decimalDigits,
                maximumFractionDigits: decimalDigits,
                currencyDisplay: "narrowSymbol"
            }).format(numericPrice);
            return result;
        } // If showing both symbol and code
        const withSymbol = new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currCode,
            minimumFractionDigits: decimalDigits,
            maximumFractionDigits: decimalDigits,
            currencyDisplay: "narrowSymbol"
        }).format(numericPrice);
        const result = `${withSymbol} ${currCode}`;
        return result;
    };
    const text = useMemo(() => {
        if (!isBrowser) return ""; // For canvas view, handle the display options directly
        if (typeof RenderTarget !== "undefined" && (RenderTarget.current() === RenderTarget.canvas || showMockValues)) { // Parse canvasPrice as range format (e.g., "200.00-250.00")
            let minPrice;
            let maxPrice;
            if (canvasPrice) {
                const priceRange = canvasPrice.split("-");
                if (priceRange.length === 2) {
                    minPrice = priceRange[0].trim();
                    maxPrice = priceRange[1].trim();
                } else { // If no range format, use the single price for both min and max
                    minPrice = canvasPrice;
                    maxPrice = canvasPrice;
                }
            }
            const numericPrice = parseFloat(minPrice);
            const numericMaxPrice = parseFloat(maxPrice);
            const currentCurrencyCode = currencyCode || "USD";
            const formattedPrice = formatPriceWithOptions(numericPrice, currentCurrencyCode); // Handle displayPrice logic for canvas preview
            if (props.displayPrice === "minimum price") { // If min and max are the same, just show one price (no "from" prefix)
                if (Math.abs(numericPrice - numericMaxPrice) < .01) {
                    return formattedPrice;
                }
                return `${fromText} ${formattedPrice}`;
            }
            if (props.displayPrice === "range") {
                const formattedMaxPrice = formatPriceWithOptions(numericMaxPrice, currentCurrencyCode); // If min and max are the same, just show one price
                if (Math.abs(numericPrice - numericMaxPrice) < .01) {
                    return formattedPrice;
                }
                return `${formattedPrice} - ${formattedMaxPrice}`;
            }
            return formattedPrice;
        } // For live view, use the selected currency or preview currency
        const amount = subscriptionPrice || activeVariant && get(activeVariant, "price.amount");
        if (!amount && !activeVariant && !product ? .priceRange) {
            return "";
        }
        const currentCurrencyCode = selectedCurrency || currencyCode || "USD"; // Use cached range if available, otherwise compute on-demand
        const range = computedPriceRange.min !== null ? computedPriceRange : getProductPriceRange(product, false);
        const {
            min: computedMin,
            max: computedMax
        } = range; // FAST PATH: If we have an amount (subscription or active variant), format it immediately
        if (amount) {
            const numericPrice = parseFloat(amount);
            if (isNaN(numericPrice)) return "";
            const formattedPrice = formatPriceWithOptions(numericPrice, currentCurrencyCode);
            return formattedPrice;
        } // FAST PATH: Single variant products - show price immediately
        if (product ? .variants ? .edges ? .length === 1 && !activeVariant) {
            const variant = product.variants.edges[0].node;
            if (variant ? .price ? .amount) {
                const numericPrice = parseFloat(variant.price.amount);
                if (!isNaN(numericPrice)) {
                    return formatPriceWithOptions(numericPrice, currentCurrencyCode);
                }
            }
        } // Handle partial selections (when user selects only some variant options)
        const hasPartialSelections = Object.keys(partialSelections).length > 0;
        const hasCompleteVariant = activeVariant && activeVariant.selectedOptions ? .length > 0; //console.log("hasPartialSelections", hasPartialSelections)
        //console.log("hasCompleteVariant", hasCompleteVariant)
        //console.log("product", product)
        //console.log("partialSelections", partialSelections)
        if (hasPartialSelections && !hasCompleteVariant && product ? .variants ? .edges ? .length && variantSelectorAction !== "purchase") { // Filter variants that match the partial selections
            const matchingVariants = product.variants.edges.filter(({
                node: variant
            }) => {
                return variant.selectedOptions.every(option => { // If this option is in our partial selections, it must match
                    if (partialSelections[option.name]) {
                        return partialSelections[option.name] === option.value;
                    } // If not in partial selections, any value is fine
                    return true;
                });
            }); // console.log("matchingVariants", matchingVariants)
            if (matchingVariants.length > 0) { //console.log("matchingVariants", matchingVariants)
                // Calculate min and max prices for matching variants
                const prices = matchingVariants.map(({
                    node: variant
                }) => parseFloat(variant.price ? .amount || "0")).filter(price => price > 0);
                if (prices.length > 0) {
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    const formattedMinPrice = formatPriceWithOptions(minPrice, currentCurrencyCode);
                    if (props.displayPrice === "range") { // If min and max are the same, just show one price
                        if (Math.abs(minPrice - maxPrice) < .01) {
                            return formattedMinPrice;
                        }
                        const formattedMaxPrice = formatPriceWithOptions(maxPrice, currentCurrencyCode);
                        return `${formattedMinPrice} - ${formattedMaxPrice}`;
                    }
                    if (props.displayPrice === "minimum price") { // If min and max are the same, just show one price (no "from" prefix)
                        if (Math.abs(minPrice - maxPrice) < .01) {
                            return formattedMinPrice;
                        }
                        return `${fromText} ${formattedMinPrice}`;
                    }
                }
            }
        } // Handle price range display logic for complete product (no active variant)
        if (!activeVariant && product ? .priceRange || variantSelectorAction === "purchase" && product ? .priceRange) { // If we're waiting for variant selection, don't show product price
            if (waitingForVariantSelection) {
                return "";
            } // PROGRESSIVE ENHANCEMENT: Show min price immediately, enhance with range when computed
            if (computedMin) {
                const formattedMinPrice = formatPriceWithOptions(computedMin, currentCurrencyCode); // If we have both min and max, show range
                if (computedMax && Math.abs(computedMin - computedMax) > .01) {
                    if (props.displayPrice === "range") {
                        const formattedMaxPrice = formatPriceWithOptions(computedMax, currentCurrencyCode);
                        return `${formattedMinPrice} - ${formattedMaxPrice}`;
                    }
                    if (props.displayPrice === "minimum price") { // If min and max are the same, just show one price (no "from" prefix)
                        if (Math.abs(computedMin - computedMax) < .01) {
                            return formattedMinPrice;
                        }
                        return `${fromText} ${formattedMinPrice}`;
                    }
                } // Single price or fallback
                if (props.displayPrice === "range") {
                    return formattedMinPrice;
                } // If min and max are the same, just show one price (no "from" prefix)
                if (computedMax && Math.abs(computedMin - computedMax) < .01) {
                    return formattedMinPrice;
                }
                return `${fromText} ${formattedMinPrice}`;
            } // FALLBACK: Use product-level range if available
            const productMinPrice = get(product, "priceRange.minVariantPrice.amount");
            const productMaxPrice = get(product, "priceRange.maxVariantPrice.amount");
            if (productMinPrice) {
                const numericMinPrice = parseFloat(productMinPrice);
                if (!isNaN(numericMinPrice) && numericMinPrice > 0) {
                    const formattedMinPrice = formatPriceWithOptions(numericMinPrice, currentCurrencyCode);
                    if (props.displayPrice === "range") {
                        if (productMaxPrice) {
                            const numericMaxPrice = parseFloat(productMaxPrice);
                            if (!isNaN(numericMaxPrice) && numericMaxPrice > 0 && Math.abs(numericMinPrice - numericMaxPrice) > .01) {
                                const formattedMaxPrice = formatPriceWithOptions(numericMaxPrice, currentCurrencyCode);
                                return `${formattedMinPrice} - ${formattedMaxPrice}`;
                            }
                        }
                        return formattedMinPrice;
                    } // If min and max are the same, just show one price (no "from" prefix)
                    if (productMaxPrice) {
                        const numericMaxPrice = parseFloat(productMaxPrice);
                        if (!isNaN(numericMaxPrice) && Math.abs(numericMinPrice - numericMaxPrice) < .01) {
                            return formattedMinPrice;
                        }
                    }
                    return `${fromText} ${formattedMinPrice}`;
                }
            }
        } // Absolute last fallback: try active variant again or show nothing
        return "";
    }, [isBrowser, showMockValues, activeVariant, product, canvasPrice, showCurrency, showSymbol, currencyCode, showDecimals, selectedCurrency, selectedCountryCode, subscriptionPrice, props.displayPrice, partialSelections, variantSelectorAction, fromText, waitingForVariantSelection, getProductPriceRange]);
    const compareAtPrice = useMemo(() => { // For partial selections (variant groups), check if any matching variants have compareAtPrice
        if (Object.keys(partialSelections).length > 0 && product ? .variants ? .edges ? .length) {
            const matchingVariants = product.variants.edges.filter(({
                node: variant
            }) => {
                return variant.selectedOptions.every(option => {
                    if (partialSelections[option.name]) {
                        return partialSelections[option.name] === option.value;
                    }
                    return true;
                });
            }); // Check if ALL matching variants have a valid compareAtPrice
            const allMatchingVariantsHaveComparePrice = matchingVariants.every(({
                node: variant
            }) => {
                const compareAmount = get(variant, "compareAtPrice.amount");
                return compareAmount && parseFloat(compareAmount) > 0;
            }); // If not all matching variants have compareAtPrice, return empty string
            if (!allMatchingVariantsHaveComparePrice) {
                return "";
            } // If all matching variants have compareAtPrice, use the minimum for consistency
            const comparePrices = matchingVariants.map(({
                node: variant
            }) => parseFloat(get(variant, "compareAtPrice.amount") || "0")).filter(price => price > 0);
            if (comparePrices.length > 0) {
                const minComparePrice = Math.min(...comparePrices);
                const currentCurrencyCode = selectedCurrency || currencyCode || "USD";
                return formatPriceWithOptions(minComparePrice, currentCurrencyCode);
            }
        } // For active variant, use its compareAtPrice
        if (activeVariant) {
            const amount = get(activeVariant, "compareAtPrice.amount");
            if (!amount) return "";
            const numericPrice = parseFloat(amount);
            if (isNaN(numericPrice) || numericPrice <= 0) return "";
            const currentCurrencyCode = selectedCurrency || currencyCode || "USD";
            return formatPriceWithOptions(numericPrice, currentCurrencyCode);
        } // For product level (no variant selected), check if ALL variants have compareAtPrice
        if (product ? .variants ? .edges ? .length) {
            const allVariantsHaveComparePrice = product.variants.edges.every(({
                node: variant
            }) => {
                const compareAmount = get(variant, "compareAtPrice.amount");
                return compareAmount && parseFloat(compareAmount) > 0;
            }); // If not all variants have compareAtPrice, don't show sale styling
            if (!allVariantsHaveComparePrice) {
                return "";
            } // If all variants have compareAtPrice, use the product-level compareAtPriceRange
            const amount = get(product, "compareAtPriceRange.minVariantPrice.amount");
            if (!amount) return "";
            const numericPrice = parseFloat(amount);
            if (isNaN(numericPrice) || numericPrice <= 0) return "";
            const currentCurrencyCode = selectedCurrency || currencyCode || "USD";
            return formatPriceWithOptions(numericPrice, currentCurrencyCode);
        }
        return "";
    }, [activeVariant, product, partialSelections, currencyCode, showCurrency, showSymbol, showDecimals, selectedCurrency, selectedCountryCode, showMockValues, props.format]);
    const numericValue = useMemo(() => parseFloat(compareAtPrice.replace(/[^\d.-]/g, "")), [compareAtPrice]);
    const hasValidCompareAtPrice = !isNaN(numericValue) && numericValue > 0;
    const shouldDisplay = useMemo(() => {
        if (showMockValues) return true;
        if (!text) return false;
        const value = parseFloat(text.replace(/[^\d.-]/g, ""));
        return !isNaN(value) && value > 0;
    }, [text, showMockValues]);
    const computedStyles = useMemo(() => {
        const baseStyles = {
            margin: 0,
            padding: 0,
            lineHeight: 1,
            whiteSpace: "nowrap",
            display: "inline-block",
            width: "auto"
        };
        const priceStyles = hasValidCompareAtPrice ? props.saleFont : props.regularFont;
        const priceColor = hasValidCompareAtPrice ? props.saleColor : props.regularColor;
        return { ...baseStyles,
            ...priceStyles,
            color: priceColor
        };
    }, [hasValidCompareAtPrice, props.saleFont, props.regularFont, props.saleColor, props.regularColor]); // console.log("Text", text)
    // // Price calculation logging
    // useEffect(() => {
    //     console.log("[FC_ProductPrice] Price State Update:", {
    //         activeVariant,
    //         product,
    //         selectedCurrency,
    //         subscriptionPrice,
    //     })
    // }, [activeVariant, product, selectedCurrency, subscriptionPrice])
    // useEffect(() => {
    //     console.log("Active variant updated:", activeVariant);
    // }, [activeVariant]);
    // Return placeholder during SSR
    if (!isBrowser || isLoadingPrice) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                display: "none"
            }
        });
    } // Progressive enhancement: Show loading state only when we have no data at all
    const shouldShowLoading = !product && !activeVariant && !subscriptionPrice && !showMockValues;
    if (shouldShowLoading) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                display: "none"
            }
        });
    } // Show progressive loading indicator when computing ranges
    const isComputingRange = product && !isRangeComputed && product.variants ? .edges ? .length > 1;
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
        children: /*#__PURE__*/ _jsxs("p", {
            style: { ...computedStyles,
                transform: "none",
                transition: "none",
                animation: "none",
                willChange: "auto"
            },
            children: [text, isComputingRange && /*#__PURE__*/ _jsx("span", {
                style: {
                    opacity: .6,
                    fontSize: "0.8em",
                    marginLeft: "4px"
                },
                children: "..."
            })]
        })
    });
}
FC_ProductPrice.defaultProps = {
    shopifyProductID: "",
    canvasPrice: "50.00",
    fromText: "from",
    format: {
        showCurrency: true,
        showSymbol: true,
        currencyCode: "USD",
        showDecimals: "Always show"
    }
};
addPropertyControls(FC_ProductPrice, {
    shopifyProductID: {
        type: ControlType.String,
        title: "Product ID",
        description: "Connect to CMS (required)."
    },
    canvasPrice: {
        type: ControlType.String,
        title: "Price",
        defaultValue: "50.00",
        description: "Connect to CMS (for canvas preview only)."
    },
    displayPrice: {
        type: ControlType.Enum,
        title: "Varying Prices",
        options: ["minimum price", "range"],
        optionTitles: ["Minimum Price", "Range"],
        defaultValue: "minimum price",
        displaySegmentedControl: true,
        segmentedControlDirection: "vertical",
        description: "When a product has multiple prices and a variant has not been selected."
    },
    fromText: {
        type: ControlType.String,
        title: "Prefix",
        placeholder: "from",
        defaultValue: "from",
        hidden: props => props.displayPrice !== "minimum price"
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
                description: "Currency is for canvas preview only."
            }
        }
    },
    /** Font and Color Controls */ regularFont: {
        type: ControlType.Font,
        title: "Regular",
        controls: "extended"
    },
    regularColor: {
        type: ControlType.Color,
        title: "↳ Color",
        defaultValue: "#000"
    },
    saleFont: {
        type: ControlType.Font,
        title: "Sale",
        controls: "extended"
    },
    saleColor: {
        type: ControlType.Color,
        title: "↳ Color",
        defaultValue: "#FF0000"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_ProductPrice",
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
//# sourceMappingURL=./FC_ProductPrice.map