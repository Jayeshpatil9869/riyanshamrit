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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
import {
    jsx as _jsx,
    jsxs as _jsxs
} from "react/jsx-runtime";
import * as React from "react";
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    debounce
} from "lodash-es";
import {
    parseUrlFilters
} from "https://framerusercontent.com/modules/A55TPw8oJtDToWtsjcDZ/rm89gWVDrPnML7Vtbv1c/filterMappings.js"; // Matches FC_ProductPurchaseButton stock logic (availableForSale + quantityAvailable)
const isVariantInStock = variant => {
    if (!variant) return false;
    if (variant.availableForSale) return true;
    return (variant.quantityAvailable || 0) > 0;
};
const isProductInStock = product => {
    if (!product ? .variants ? .edges ? .length) return false;
    return product.variants.edges.some(({
        node
    }) => isVariantInStock(node));
}; // Global state management to prevent duplicate instances
const globalSortState = {
    instances: new Set,
    eventListeners: new Map,
    cleanup: () => {
        globalSortState.instances.clear();
        globalSortState.eventListeners.forEach((listener, event) => {
            window.removeEventListener(event, listener);
        });
        globalSortState.eventListeners.clear();
    },
    lastUrl: typeof window !== "undefined" ? window.location.href : "",
    isBackToFilter: false
}; // Ensure cleanup on page unload
if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", globalSortState.cleanup);
} // Helper function to find 13-digit number
function findDeep13DigitNumber(obj) {
    if (typeof obj === "string") {
        const match = obj.match(/\d{12,}/);
        if (match) return match[0];
        return null;
    }
    if (!obj || typeof obj !== "object") return null;
    for (const key in obj) {
        if (Array.isArray(obj[key]) || typeof obj[key] === "object") {
            const found = findDeep13DigitNumber(obj[key]);
            if (found) return found;
        } else if (typeof obj[key] === "string") {
            const match = obj[key].match(/\d{12,}/);
            if (match) return match[0];
        }
    }
    return null;
}
class ErrorBoundary extends React.Component {
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {}
    render() {
        if (this.state.hasError) {
            return /*#__PURE__*/ _jsx("div", {
                style: {
                    padding: 20,
                    color: "red"
                },
                children: "Something went wrong loading the CMS content."
            });
        } // @ts-ignore: TypeScript doesn't recognize props in this context
        return this.props.children;
    }
    constructor(props) {
        super(props);
        _define_property(this, "state", {
            hasError: false,
            error: null
        });
    }
} // Let's add a helper function for consistent logging
const logDebug = (component, action, data) => { // console.log intentionally disabled
}; // [DUPLICATE_VARIANTS_LOGIC_DISABLED] Interface for duplicated products
// interface DuplicatedProduct {
//     originalProduct: Product
//     variant: ProductVariant
//     uniqueId: string // Combination of product ID + variant ID
//     displayPrice: {
//         amount: string
//         currencyCode: string
//     }
//     displayCompareAtPrice?: {
//         amount: string
//         currencyCode: string
//     }
//     selectedOptions: Array<{
//         name: string
//         value: string
//     }>
// }
// Helper function to get active search fields based on scope settings
function getActiveSearchFields(scope) {
    const fields = [];
    if (scope ? .title) fields.push("title");
    if (scope ? .productType) fields.push("productType");
    if (scope ? .productTag) fields.push("tags");
    if (scope ? .collection) fields.push("collections");
    if (scope ? .vendor) fields.push("vendor");
    if (scope ? .variants) fields.push("variants");
    return fields;
} // [DUPLICATE_VARIANTS_LOGIC_DISABLED] Function to process products for variant duplication
// function processProductsForVariantDuplication(
//     products: Array<{ node: any }>,
//     variantTitles: string[]
// ): DuplicatedProduct[] {
//     console.log("🔄 Processing products for variant duplication:", {
//         totalProducts: products.length,
//         variantTitles,
//         sampleProduct: products[0]?.node,
//     })
//     const duplicatedProducts: DuplicatedProduct[] = []
//     products.forEach(({ node: product }) => {
//         if (!product.variants?.edges) {
//             console.log(`⚠️ Product "${product.title}" has no variants`)
//             return
//         }
//         console.log(`🔍 Checking product "${product.title}" variants:`, {
//             totalVariants: product.variants?.edges?.length || 0,
//             variantOptions: product.variants?.edges?.map(({ node: v }) =>
//                 v.selectedOptions?.map((opt) => `${opt.name}: ${opt.value}`) || []
//             ) || [],
//         })
//         // Get all variants that match the specified variant titles
//         const matchingVariants = product.variants.edges.filter(
//             ({ node: variant }) => {
//                 const hasMatchingOption = variant.selectedOptions.some(
//                     (option) => variantTitles.includes(option.name)
//                 )
//                 console.log(
//                     `  Variant ${variant.id}: ${hasMatchingOption ? "✅" : "❌"} matches ${variantTitles.join(", ")}`
//                 )
//                 return hasMatchingOption
//             }
//         )
//         console.log(
//             `📊 Found ${matchingVariants.length} matching variants for "${product.title}"`
//         )
//         // If no matching variants found, include the original product once
//         if (matchingVariants.length === 0) {
//             console.log(
//                 `⚠️ No variants match "${variantTitles.join(", ")}" for "${product.title}" - including original product`
//             )
//             // Create a single entry for the original product
//             duplicatedProducts.push({
//                 originalProduct: product,
//                 variant: product.variants.edges[0]?.node || null, // Use first variant as default
//                 uniqueId: product.id, // Use original product ID
//                 displayPrice: product.priceRange?.minVariantPrice || {
//                     amount: "0",
//                     currencyCode: "USD",
//                 },
//                 displayCompareAtPrice:
//                     product.compareAtPriceRange?.minVariantPrice,
//                 selectedOptions:
//                     product.variants.edges[0]?.node?.selectedOptions || [],
//             })
//             console.log(
//                 `✅ Created original product entry for "${product.title}"`
//             )
//             return
//         }
//         // Group variants by unique values for the specified variant titles only
//         const uniqueVariantGroups = new Map()
//         matchingVariants.forEach(({ node: variant }) => {
//             // Create a key based on the specified variant titles only
//             const variantKey = variant.selectedOptions
//                 .filter((option) => variantTitles.includes(option.name))
//                 .map((option) => `${option.name}:${option.value}`)
//                 .sort()
//                 .join("|")
//             if (!uniqueVariantGroups.has(variantKey)) {
//                 uniqueVariantGroups.set(variantKey, [])
//             }
//             uniqueVariantGroups.get(variantKey).push(variant)
//         })
//         console.log(
//             `🎯 Found ${uniqueVariantGroups.size} unique ${variantTitles.join(", ")} combinations for "${product.title}"`
//         )
//         // Create a duplicated product for each unique variant group
//         uniqueVariantGroups.forEach((variants, variantKey) => {
//             // Use the first variant from each group as the representative
//             const representativeVariant = variants[0]
//             console.log(
//                 `✅ Creating duplicate for "${product.title}" - ${variantKey}`
//             )
//             duplicatedProducts.push({
//                 originalProduct: product,
//                 variant: representativeVariant,
//                 uniqueId: `${product.id}_${representativeVariant.id}`,
//                 displayPrice: representativeVariant.price ||
//                     product.priceRange?.minVariantPrice || {
//                         amount: "0",
//                         currencyCode: "USD",
//                     },
//                 displayCompareAtPrice:
//                     representativeVariant.compareAtPrice ||
//                     product.compareAtPriceRange?.minVariantPrice,
//                 selectedOptions: representativeVariant.selectedOptions,
//             })
//         })
//     })
//     console.log(
//         `🎯 Total duplicated products created: ${duplicatedProducts.length}`
//     )
//     return duplicatedProducts
// }
/**
 * @framerDisableUnlink
 */
export default function FC_CatalogDisplay(props) { // State declarations at the top of the component
    const [isLoading, setIsLoading] = React.useState(true);
    const [sortedChildren, setSortedChildren] = React.useState(null);
    const [products, setProducts] = React.useState([]); // [DUPLICATE_VARIANTS_LOGIC_DISABLED] State for duplicated products
    // const [duplicatedProducts, setDuplicatedProducts] = React.useState<
    //     DuplicatedProduct[]
    // >([])
    const [duplicatedProducts, setDuplicatedProducts] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    const [isSettling, setIsSettling] = React.useState(false); // console.log("🚨🚨🚨 COMPONENT MOUNTED 🚨🚨🚨", {
    //     hasCollection: !!props.Collection,
    //     hasProducts:
    //         typeof window !== "undefined" && !!window.shopXtools?.products,
    //     url: typeof window !== "undefined" ? window.location.href : null,
    // })
    // Keep a log of component initialization
    logDebug("ProductSort", "Component initializing", {
        props: Object.keys(props)
    });
    const {
        Collection,
        pageType,
        Metafields
    } = props;
    const includeMetafields = Metafields ? .include || false;
    const showInStockOnly = props.Products ? .show === "in_stock";
    const isAwaitingStockFilter = showInStockOnly && sortedChildren === null && products.length === 0;
    const transitionTimeoutRef = React.useRef(null);
    const settlingTimeoutRef = React.useRef(null);
    const lastUpdateRef = React.useRef(null);
    const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams; // Add pagination state
    const [currentPage, setCurrentPage] = React.useState(() => {
        if (typeof window !== "undefined") {
            const pageParam = urlParams.get("page");
            return pageParam ? parseInt(pageParam) : 1;
        }
        return 1;
    });
    const [hasMore, setHasMore] = React.useState(false);
    const observerRef = React.useRef(null);
    const loadMoreRef = React.useRef(null); // Calculate itemsPerPage from props (will update when prop changes)
    const itemsPerPage = React.useMemo(() => props.Pagination ? .items || 8, [props.Pagination ? .items]); // Add state to maintain full product list
    const [allProducts, setAllProducts] = React.useState([]);
    const [displayedProducts, setDisplayedProducts] = React.useState([]); // Track total filtered count (before pagination) for result counter
    const [totalFilteredCount, setTotalFilteredCount] = React.useState(0); // Add search state
    const [searchConfig, setSearchConfig] = React.useState(() => { // Initialize from URL parameter if it exists
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const searchParam = urlParams.get("search"); // console.log("🔍 Initializing search from URL:", {
            //     url: window.location.href,
            //     searchParam,
            //     allParams: Object.fromEntries(urlParams.entries()),
            // })
            if (searchParam) {
                return {
                    term: searchParam,
                    fields: getActiveSearchFields(props.Search ? .Scope),
                    active: true
                };
            }
        }
        return {
            term: "",
            fields: getActiveSearchFields(props.Search ? .Scope),
            active: false
        };
    }); // Add effect to update search fields when scope changes
    React.useEffect(() => {
        setSearchConfig(prev => ({ ...prev,
            fields: getActiveSearchFields(props.Search ? .Scope)
        }));
    }, [props.Search ? .Scope]); // Adjust initial state based on search settings
    React.useEffect(() => {
        if (props.Search.initialSearchState === "none" && props.Search.enableSearch && !searchConfig.term) { // console.log("Applying initial 'none' state")
            setSortedChildren([]) // Start with no products displayed
            ; // Disable pagination buttons for both load more and next/prev types because there are no products to display
            setTimeout(() => {
                if (props.Pagination ? .type === "load_more") {
                    const hasMoreItemsEvent = new CustomEvent("hide-loadmore-button", {
                        detail: {
                            hasMoreItems: false
                        }
                    });
                    document.dispatchEvent(hasMoreItemsEvent); //console.log("hide-loadmore-button dispatched (delayed)", hasMoreItemsEvent);
                } else if (props.Pagination ? .type === "next_prev") {
                    const updateNextPrevButtonsEvent = new CustomEvent("update_next_prev_buttons", {
                        detail: {
                            hasMoreItems: false,
                            type: props.Pagination ? .type,
                            currentPage: 1
                        }
                    });
                    document.dispatchEvent(updateNextPrevButtonsEvent); //console.log("update_next_prev_buttons dispatched (delayed)", updateNextPrevButtonsEvent);
                }
            }, 100) // 100ms delay to ensure listeners are attached
            ;
        }
    }, [props.Search.initialSearchState, props.Search.enableSearch, searchConfig.term]); // Function to get paginated products
    const getPaginatedProducts = React.useCallback(products => {
        if (!props.Pagination ? .enable || !Array.isArray(products)) return products;
        let startIndex, endIndex, paginatedProducts;
        switch (props.Pagination.type) {
            case "load_more": // For Load More, show all items up to current page
                startIndex = 0;
                endIndex = currentPage * itemsPerPage;
                paginatedProducts = products.slice(startIndex, endIndex);
                const hasMoreLoadMore = endIndex < products.length;
                setHasMore(hasMoreLoadMore); // console.log("hasMoreLoadMore", hasMoreLoadMore)
                // console.log("products.length", products?.length)
                // console.log("currentPage", currentPage)
                // console.log("itemsPerPage", itemsPerPage)
                // console.log("endIndex", endIndex)
                // console.log("searchConfig.active", searchConfig.active)
                if (!hasMoreLoadMore) {
                    const hasMoreItemsEvent = new CustomEvent("hide-loadmore-button", {
                        detail: {
                            hasMoreItems: hasMoreLoadMore
                        }
                    });
                    document.dispatchEvent(hasMoreItemsEvent); //console.log("hide-loadmore-button dispatched", hasMoreItemsEvent)
                }
                break;
            case "next_prev": // For Next/Previous, show only current page items
                startIndex = (currentPage - 1) * itemsPerPage;
                endIndex = startIndex + itemsPerPage;
                paginatedProducts = products.slice(startIndex, endIndex);
                const hasMoreNextPrev = endIndex < products.length;
                setHasMore(hasMoreNextPrev);
                const updateNextPrevButtonsEvent = new CustomEvent("update_next_prev_buttons", {
                    detail: {
                        hasMoreItems: hasMoreNextPrev,
                        type: props.Pagination ? .type,
                        currentPage
                    }
                });
                document.dispatchEvent(updateNextPrevButtonsEvent);
                console.log("[CMS Pagination] Next/Previous:", {
                    itemsPerPage,
                    currentPage,
                    startIndex,
                    endIndex,
                    paginatedProducts,
                    hasMoreNextPrev
                });
                break;
            case "infinite": // For Infinite Scroll, show all items up to current page
                startIndex = 0;
                endIndex = currentPage * itemsPerPage;
                paginatedProducts = products.slice(startIndex, endIndex);
                const hasMoreInfinite = endIndex < products.length;
                setHasMore(hasMoreInfinite);
                break;
            default:
                return products;
        }
        return paginatedProducts;
    }, [currentPage, itemsPerPage, props.Pagination ? .enable, props.Pagination ? .type]); // Add effect to handle URL pagination parameters
    React.useEffect(() => {
        if (typeof window === "undefined" || !props.Pagination ? .enable) return;
        const url = new URL(window.location.href);
        const urlParams = new URLSearchParams(url.search); // // Update page parameter
        // if (props.Pagination?.enable) {
        //     if (currentPage > 1) {
        //         urlParams.set("page", currentPage.toString())
        //     } else {
        //         urlParams.delete("page")
        //     }
        // } else {
        //     urlParams.delete("page")
        // }
        // // Update URL without triggering a page reload
        // window.history.pushState(
        //     { page: currentPage },
        //     "",
        //     url.toString()
        // )
        if (currentPage > 1) {
            urlParams.set("page", currentPage.toString());
        } else {
            urlParams.delete("page");
        }
        const newUrl = `${url.pathname}?${urlParams.toString()}`;
        if (newUrl !== window.location.pathname + window.location.search) { //console.log("📌 Pushing new page URL:", newUrl)
            window.history.pushState({
                page: currentPage
            }, "", newUrl);
        }
    }, [currentPage, props.Pagination ? .enable]); // Update the infinite scroll effect
    React.useEffect(() => {
        if (!props.Pagination ? .enable || props.Pagination ? .type !== "infinite" || typeof window === "undefined") return;
        /*
            console.log("[CMS] Setting up infinite scroll observer", {
              hasMore,
              isLoading,
              currentPage,
              loadMoreRefExists: !!loadMoreRef.current,
            });
            */
        const observer = new IntersectionObserver(entries => {
            const target = entries[0];
            /* console.log("[CMS] Intersection observed:", {
                      isIntersecting: target.isIntersecting,
                      hasMore,
                      isLoading,
                      currentPage,
                    }); */
            if (target.isIntersecting && hasMore && !isLoading) { // console.log("[CMS] Loading more items, incrementing page");
                setCurrentPage(prev => prev + 1);
            }
        }, {
            root: null,
            rootMargin: "100px",
            threshold: .1
        });
        if (loadMoreRef.current) { // console.log("[CMS] Observing load more trigger element");
            observer.observe(loadMoreRef.current);
        }
        return () => {
            if (observer) { // console.log("[CMS] Cleaning up observer");
                observer.disconnect();
            }
        };
    }, [hasMore, props.Pagination ? .enable, props.Pagination ? .type, isLoading, currentPage]); // Update the sorted children wrapper to include the infinite scroll trigger
    const updateSortedChildrenWithTransition = newChildren => {
        if (!newChildren) {
            console.warn("[CMS] Received null/undefined children");
            return;
        } // console.log("[CMS] Starting transition update:", {
        //     totalChildren: newChildren.length,
        //     currentPage,
        //     paginationType: props.Pagination?.type,
        //     hasMore,
        // })
        // Store the full list
        setAllProducts(newChildren); // Get paginated subset for display
        const paginatedChildren = getPaginatedProducts(newChildren); //console.log("[CMS] hasMore:", hasMore)
        // Add infinite scroll trigger if needed
        if (props.Pagination ? .enable && props.Pagination ? .type === "infinite" && hasMore && paginatedChildren.length > 0) { // console.log("[CMS] Adding infinite scroll trigger");
            paginatedChildren.push( /*#__PURE__*/ _jsx("div", {
                ref: loadMoreRef,
                style: {
                    width: "100%",
                    height: "50px",
                    gridColumn: "1 / -1",
                    opacity: 0,
                    pointerEvents: "none"
                }
            }, "infinite-scroll-trigger"));
        }
        logDebug("ProductSort", "Updating sorted children with transition", {
            totalChildren: newChildren.length,
            paginatedChildren: paginatedChildren.length,
            currentPage,
            isSettling,
            hasMore
        });
        const now = Date.now();
        if (lastUpdateRef.current && now - lastUpdateRef.current < 100) {
            setIsSettling(true);
            if (settlingTimeoutRef.current) {
                clearTimeout(settlingTimeoutRef.current);
            } //console.log("[CMS] Delaying transition")
            settlingTimeoutRef.current = setTimeout(() => {
                setIsSettling(false);
                setDisplayedProducts(paginatedChildren);
                performTransition(paginatedChildren);
            }, 150);
        } else { //console.log("[CMS] Immediate transition")
            setDisplayedProducts(paginatedChildren);
            performTransition(paginatedChildren);
        }
        lastUpdateRef.current = now;
    }; // Add logging for URL parameters
    if (typeof window !== "undefined") { // logDebug("ProductSort", "URL parameters on init", {
        //   url: window.location.href,
        //   params: Object.fromEntries(urlParams.entries()),
        // });
    }
    const [sortConfig, setSortConfig] = React.useState(() => { // First try to get sort from URL parameter
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const sortParam = urlParams.get("sort");
            logDebug("ProductSort", "Sort parameter from URL", {
                sortParam
            });
            if (sortParam) { // Map URL sort parameter to internal sort configuration
                switch (sortParam) {
                    case "relevance":
                        return {
                            type: "relevancy",
                            sortBy: "relevancy",
                            sortDirection: null
                        };
                    case "title_asc":
                        return {
                            type: "name",
                            sortBy: "name",
                            sortDirection: "aToZ"
                        };
                    case "title_desc":
                        return {
                            type: "name",
                            sortBy: "name",
                            sortDirection: "zToA"
                        };
                    case "price_asc":
                        return {
                            type: "price",
                            sortBy: "price",
                            sortDirection: "lowToHigh"
                        };
                    case "price_desc":
                        return {
                            type: "price",
                            sortBy: "price",
                            sortDirection: "highToLow"
                        };
                    case "newest":
                        return {
                            type: "created",
                            sortBy: "created",
                            sortDirection: "newest"
                        };
                    case "best_selling":
                        return {
                            type: "best-selling",
                            sortBy: "best-selling",
                            sortDirection: null
                        };
                }
            } // Then check session storage
            const storedSort = sessionStorage.getItem("sortBy");
            if (storedSort) {
                switch (storedSort) {
                    case "relevance":
                        return {
                            type: "relevancy",
                            sortBy: "relevancy",
                            sortDirection: null
                        };
                    case "title_asc":
                        return {
                            type: "name",
                            sortBy: "name",
                            sortDirection: "aToZ"
                        };
                    case "title_desc":
                        return {
                            type: "name",
                            sortBy: "name",
                            sortDirection: "zToA"
                        };
                    case "price_asc":
                        return {
                            type: "price",
                            sortBy: "price",
                            sortDirection: "lowToHigh"
                        };
                    case "price_desc":
                        return {
                            type: "price",
                            sortBy: "price",
                            sortDirection: "highToLow"
                        };
                    case "newest":
                        return {
                            type: "created",
                            sortBy: "created",
                            sortDirection: "newest"
                        };
                    case "best_selling":
                        return {
                            type: "best-selling",
                            sortBy: "best-selling",
                            sortDirection: null
                        };
                }
            }
        } // If no URL parameter or session storage, use the default sort from props
        switch (props.defaultSort) {
            case "relevance":
                return {
                    type: "relevancy",
                    sortBy: "relevancy",
                    sortDirection: null
                };
            case "title_asc":
                return {
                    type: "name",
                    sortBy: "name",
                    sortDirection: "aToZ"
                };
            case "title_desc":
                return {
                    type: "name",
                    sortBy: "name",
                    sortDirection: "zToA"
                };
            case "price_asc":
                return {
                    type: "price",
                    sortBy: "price",
                    sortDirection: "lowToHigh"
                };
            case "price_desc":
                return {
                    type: "price",
                    sortBy: "price",
                    sortDirection: "highToLow"
                };
            case "newest":
                return {
                    type: "created",
                    sortBy: "created",
                    sortDirection: "newest"
                };
            case "best_selling":
                return {
                    type: "best-selling",
                    sortBy: "best-selling",
                    sortDirection: null
                };
            default:
                return {
                    type: "relevancy",
                    sortBy: "relevancy",
                    sortDirection: null
                };
        }
    });
    const [filters, setFilters] = React.useState(() => { //console.log("props.display for scopes", props.display)
        // Create the initial filter state based on props
        const initialFilters = {
            collection: {
                active: props.display === "Collection" && props.value ? true : false,
                values: props.display === "Collection" && props.value ? [props.value] : []
            },
            product_type: {
                active: props.display === "Product Type" && props.value ? true : false,
                values: props.display === "Product Type" && props.value ? [props.value] : []
            },
            product_tag: {
                active: props.display === "Product Tag" && props.value ? true : false,
                values: props.display === "Product Tag" && props.value ? [props.value] : []
            },
            on_sale: {
                active: false,
                value: true
            },
            in_stock: {
                active: false,
                value: true
            },
            bundle: {
                active: false,
                value: true
            },
            subscription: {
                active: false,
                value: true
            },
            price: {
                active: false,
                values: []
            },
            discount_amount: {
                active: false,
                values: []
            },
            discount_percent: {
                active: false,
                values: []
            },
            variant: {
                active: false,
                values: []
            }
        }; // Log the initial filter state
        logDebug("ProductSort", "Initial filter state created", {
            display: props.display,
            value: props.value,
            filters: initialFilters,
            activeFilters: Object.entries(initialFilters).filter(([key, filter]) => filter.active).reduce((acc, [key, filter]) => ({ ...acc,
                [key]: filter
            }), {})
        }); // First try to parse filters directly from URL
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            logDebug("ProductSort", "Attempting to parse filters from URL for scopes", {
                url: url.toString(),
                search: url.search
            });
            try {
                const urlFilters = parseUrlFilters(url.searchParams);
                logDebug("ProductSort", "Filters parsed from URL for scopes", urlFilters);
                if (urlFilters && Object.keys(urlFilters).length > 0) {
                    const activeFilters = Object.entries(urlFilters).filter(([key, filter]) => filter.active).reduce((acc, [key, filter]) => ({ ...acc,
                        [key]: filter
                    }), {});
                    logDebug("ProductSort", "Active filters from URL for scopes", activeFilters);
                    if (Object.keys(activeFilters).length > 0) { // Merge URL filters with initial scope instead of replacing them
                        const mergedFilters = { ...initialFilters
                        };
                        logDebug("ProductSort", "Merged filters from URL for scopes", mergedFilters); // For each filter type that has an initial scope, ensure it's preserved
                        if (props.display === "Collection" && props.value) {
                            mergedFilters.collection = {
                                active: true,
                                values: [props.value]
                            };
                        } else if (props.display === "Product Type" && props.value) {
                            mergedFilters.product_type = {
                                active: true,
                                values: [props.value]
                            };
                        } else if (props.display === "Product Tag" && props.value) {
                            mergedFilters.product_tag = {
                                active: true,
                                values: [props.value]
                            };
                        } // console.log("Props - Tag:", {
                        //     active:
                        //         props.display === "Product Tag" && props.value
                        //             ? true
                        //             : false,
                        //     values:
                        //         props.display === "Product Tag" && props.value
                        //             ? [props.value]
                        //             : [],
                        // })
                        // console.log("Props:", props.display)
                        // Then apply URL filters for other filter types
                        Object.entries(urlFilters).forEach(([key, filter]) => {
                            if (key === "collection" && props.display === "Collection" && props.value || key === "product_type" && props.display === "Product Type" && props.value || key === "product_tag" && props.display === "Product Tag" && props.value) { // Merge values for the scoped filter
                                mergedFilters[key] = {
                                    active: true,
                                    values: [...new Set([...mergedFilters[key].values, ...filter.values || []])]
                                };
                            } else { // For non-scoped filters, use the URL filter
                                mergedFilters[key] = filter;
                            }
                        });
                        logDebug("ProductSort", "Merged filters", mergedFilters);
                        return mergedFilters;
                    }
                }
            } catch (error) {
                console.error("❌ Error parsing URL filters:", error);
            }
        } // If no URL filters or error, return the initial filters
        return initialFilters;
    }); // Memoize event handlers
    const handleProductsReady = React.useCallback(e => {
        logDebug("ProductSort", "Products ready event received", {
            eventType: e.type,
            shopXToolsAvailable: typeof window !== "undefined" && !!window.shopXtools,
            shopXProductsCount: typeof window !== "undefined" ? window.shopXtools ? .products ? .length : 0
        }); // First try to get products from shopXtools
        if (typeof window !== "undefined" && window.shopXtools ? .products) { // console.log("🚨 Setting products from shopXtools 🚨", {
            //     count: window.shopXtools.products.length,
            //     sample: window.shopXtools.products[0]?.node,
            //     sampleTitle:
            //         window.shopXtools.products[0]?.node?.title ||
            //         "No title",
            //     hasNode: !!window.shopXtools.products[0]?.node,
            //     searchConfig: searchConfig,
            //     searchActive: searchConfig.active,
            //     searchTerm: searchConfig.term,
            // })
            // Important: shopXtools.products is already in the correct format with node structure
            setProducts(window.shopXtools.products); // Process duplicated products if feature is enabled
            /* console.log("🔧 Checking duplicate variants settings:", {
                      enable: props.DuplicateVariants?.enable,
                      variantTitles: props.DuplicateVariants?.variantTitles,
                      hasProducts: !!window.shopXtools.products,
                }); */ // [DUPLICATE_VARIANTS_LOGIC_DISABLED] Variant duplication logic commented out
            // if (
            //     props.DuplicateVariants?.enable &&
            //     props.DuplicateVariants?.variantTitles?.length > 0
            // ) {
            //     console.log("🚀 Starting variant duplication process...")
            //     const duplicated = processProductsForVariantDuplication(
            //         window.shopXtools.products,
            //         props.DuplicateVariants.variantTitles
            //     )
            //     setDuplicatedProducts(duplicated)
            //     logDebug("ProductSort", "Processed duplicated products", {
            //         originalCount: window.shopXtools.products.length,
            //         duplicatedCount: duplicated.length,
            //         variantTitles: props.DuplicateVariants.variantTitles,
            //     })
            // } else {
            //     console.log(
            //         "❌ Duplicate variants not enabled or no variant titles"
            //     )
            //     setDuplicatedProducts([])
            // }
            setDuplicatedProducts([]) // Always set empty array when logic is disabled
            ; // Re-filter when product inventory data arrives (stock filter needs fresh data)
            if (props.Products ? .show === "in_stock") {
                setSortedChildren(null);
            } // After setting products, force a re-filter if search is active
            if (searchConfig.active && searchConfig.term) { // console.log(
                //     "🔍 Active search detected during product load, forcing re-filter"
                // )
                setSortedChildren(null);
            }
        } else if (Array.isArray(e.detail.products)) { // console.log("🚨 Setting products from event 🚨", {
            //     count: e.detail.products.length,
            //     sample: e.detail.products[0],
            //     sampleTitle:
            //         e.detail.products[0]?.node?.title || "No title",
            //     hasNode: !!e.detail.products[0]?.node,
            //     searchConfig: searchConfig,
            //     searchActive: searchConfig.active,
            //     searchTerm: searchConfig.term,
            // })
            setProducts(e.detail.products); // [DUPLICATE_VARIANTS_LOGIC_DISABLED] Process duplicated products if feature is enabled
            // if (
            //     props.DuplicateVariants?.enable &&
            //     props.DuplicateVariants?.variantTitles?.length > 0
            // ) {
            //     const duplicated = processProductsForVariantDuplication(
            //         e.detail.products,
            //         props.DuplicateVariants.variantTitles
            //     )
            //     setDuplicatedProducts(duplicated)
            //     logDebug("ProductSort", "Processed duplicated products", {
            //         originalCount: e.detail.products.length,
            //         duplicatedCount: duplicated.length,
            //         variantTitles: props.DuplicateVariants.variantTitles,
            //     })
            // } else {
            //     setDuplicatedProducts([])
            // }
            setDuplicatedProducts([]) // Always set empty array when logic is disabled
            ; // Re-filter when product inventory data arrives (stock filter needs fresh data)
            if (props.Products ? .show === "in_stock") {
                setSortedChildren(null);
            } // After setting products, force a re-filter if search is active
            if (searchConfig.active && searchConfig.term) { // console.log(
                //     "🔍 Active search detected during product load, forcing re-filter"
                // )
                setSortedChildren(null);
            }
        }
    }, [searchConfig, props.Products ? .show]);
    const handleSortChange = React.useCallback(e => {
        setSortConfig(e.detail);
        setSortedChildren(null) // Reset sorted children to trigger resort
        ;
    }, []);
    const handleFilterReset = React.useCallback(e => { // console.log("Resetting filters", e)
        // Check if we should reset to initial scope
        const shouldResetToInitialScope = e ? .detail ? .resetToInitialScope === true; // console.log(
        //     "Should reset to initial scope:",
        //     shouldResetToInitialScope
        // )
        if (shouldResetToInitialScope) { // Create a reset state that respects the initial filter scope
            const resetFilters = {
                collection: {
                    active: props.display === "Collection" && props.value ? true : false,
                    values: props.display === "Collection" && props.value ? [props.value] : []
                },
                product_type: {
                    active: props.display === "Product Type" && props.value ? true : false,
                    values: props.display === "Product Type" && props.value ? [props.value] : []
                },
                product_tag: {
                    active: props.display === "Product Tag" && props.value ? true : false,
                    values: props.display === "Product Tag" && props.value ? [props.value] : []
                },
                on_sale: {
                    active: false,
                    value: true
                },
                in_stock: {
                    active: false,
                    value: true
                },
                bundle: {
                    active: false,
                    value: true
                },
                subscription: {
                    active: false,
                    value: true
                },
                price: {
                    active: false,
                    values: []
                },
                discount_amount: {
                    active: false,
                    values: []
                },
                discount_percent: {
                    active: false,
                    values: []
                },
                variant: {
                    active: false,
                    values: []
                }
            }; // console.log("Resetting to initial filter scope:", resetFilters)
            setFilters(resetFilters);
        } else { // Reset all filters to inactive
            setFilters({
                collection: {
                    active: false,
                    values: []
                },
                product_type: {
                    active: false,
                    values: []
                },
                product_tag: {
                    active: false,
                    values: []
                },
                on_sale: {
                    active: false,
                    value: true
                },
                in_stock: {
                    active: false,
                    value: true
                },
                bundle: {
                    active: false,
                    value: true
                },
                subscription: {
                    active: false,
                    value: true
                },
                price: {
                    active: false,
                    values: []
                },
                discount_amount: {
                    active: false,
                    values: []
                },
                discount_percent: {
                    active: false,
                    values: []
                },
                variant: {
                    active: false,
                    values: []
                }
            });
        }
        setSortedChildren(null) // Reset sorted children to trigger filter reset
        ;
    }, [props.display, props.value]);
    const handleFilter = React.useCallback(e => {
        const {
            type,
            value,
            active
        } = e.detail; // console.log(
        //     "Received filter event:",
        //     e?.detail || "Reset filter event is not receieved"
        // )
        logDebug("ProductSort", "Processing filter event", {
            type: e.detail.type,
            group: e.detail.group,
            active: e.detail.active,
            value: e.detail.value,
            filterType: e.detail.filterType,
            componentId: e.detail.componentId
        }); // Check if this filter matches the initial filter scope
        const isInitialFilter = type === "collection" && props.display === "Collection" && props.value === value || type === "product_type" && props.display === "Product Type" && props.value === value || type === "product_tag" && props.display === "Product Tag" && props.value === value; // If this is the initial filter and we're trying to deactivate it, ignore the event
        if (isInitialFilter && !active) { // console.log("Ignoring deactivation of initial filter scope")
            return;
        } // Continue with normal filter handling
        setFilters(prev => {
            const newFilters = { ...prev
            };
            const {
                type,
                group,
                active,
                value,
                filterType,
                variantStockFilter
            } = e.detail; // console.log("Processing filter:", {
            //     type,
            //     group,
            //     active,
            //     value,
            //     filterType,
            //     variantStockFilter,
            // })
            // Log previous state of this filter
            logDebug("ProductSort", "Filter state before update", {
                filterType: type,
                previousState: prev[type] || "not set",
                newActive: active,
                newValue: value
            }); // Use filterMappings to handle the filter
            if (type.startsWith("variant_")) { // Handle dynamic variant filters
                const variantName = type.replace("variant_", ""); // Add more comprehensive debugging for variant filters
                // console.log("🚨 Processing variant filter:", {
                //     type,
                //     variantName,
                //     active,
                //     variantStockFilter,
                //     value,
                //     isMultiValue:
                //         typeof value === "string" && value.includes(","),
                //     multipleValues:
                //         typeof value === "string" && value.includes(",")
                //             ? value.split(",").filter(Boolean)
                //             : null,
                //     currentVariantValues:
                //         newFilters.variant?.values?.filter(
                //             (v) => v.name === variantName
                //         ) || [],
                //     rawValue: value,
                //     decodedValue:
                //         typeof value === "string"
                //             ? decodeURIComponent(value)
                //             : value,
                // })
                if (active) {
                    if (!newFilters.variant) {
                        newFilters.variant = {
                            active: true,
                            values: [],
                            variantStockFilter: variantStockFilter || undefined
                        };
                    } else if (variantStockFilter) {
                        newFilters.variant.variantStockFilter = variantStockFilter;
                    } // Check if value is a comma-separated list - support both encoded and decoded commas
                    // Both %2C and , should be treated as delimiters
                    let valueToProcess = value;
                    if (typeof value === "string") { // First decode the value to handle any URL encoding
                        valueToProcess = decodeURIComponent(value);
                    }
                    if (typeof valueToProcess === "string" && valueToProcess.includes(",")) { // Handle multiple comma-separated values (OR condition)
                        const variantValues = valueToProcess.split(",").filter(Boolean); // console.log("Processing multiple variant values:", {
                        //     variantName,
                        //     variantValues,
                        //     original: valueToProcess,
                        // })
                        // Add each value as a separate entry
                        variantValues.forEach(val => { // Check if this value already exists to avoid duplicates
                            const exists = newFilters.variant.values.some(v => v.name.toLowerCase() === variantName.toLowerCase() && v.value.toLowerCase() === val.trim().toLowerCase());
                            if (!exists) {
                                newFilters.variant.values.push({
                                    name: variantName,
                                    value: val.trim()
                                });
                            }
                        });
                    } else { // Handle single value
                        // Check if this value already exists
                        const exists = newFilters.variant.values.some(v => v.name.toLowerCase() === variantName.toLowerCase() && v.value.toLowerCase() === String(valueToProcess).toLowerCase());
                        if (!exists) {
                            newFilters.variant.values.push({
                                name: variantName,
                                value: valueToProcess
                            });
                        }
                    }
                    newFilters.variant.active = true;
                } else {
                    if (newFilters.variant && newFilters.variant.values) { // console.log(
                        //     "[Variant Removal] Initial variant values:",
                        //     newFilters.variant.values
                        // )
                        // Check if we're removing a comma-separated list - support both encoded and decoded commas
                        let valueToProcess = value; // console.log(
                        //     "[Variant Removal] Value to process",
                        //     valueToProcess
                        // )
                        if (typeof value === "string") { // First decode the value to handle any URL encoding
                            valueToProcess = decodeURIComponent(value); // console.log(
                            //     "[Variant Removal] Value to process (decoded)",
                            //     valueToProcess
                            // )
                        }
                        if (typeof valueToProcess === "string" && valueToProcess.includes(",")) {
                            const variantValues = valueToProcess.split(",").filter(Boolean); // console.log(
                            //     "[Variant Removal] Comma-separated variant values:",
                            //     variantValues
                            // )
                            // Remove each value individually (case-insensitive)
                            newFilters.variant.values = newFilters.variant.values.filter(v => {
                                const nameMatches = v.name.toLowerCase() === variantName.toLowerCase();
                                const valueMatches = v.value.toLowerCase() === String(valueToProcess).toLowerCase();
                                const shouldRemove = nameMatches && valueMatches; // console.log(
                                //     "[Variant Removal] Checking variant:",
                                //     {
                                //         variant: v,
                                //         nameMatches,
                                //         valueMatches,
                                //         shouldRemove,
                                //     }
                                // )
                                return !shouldRemove;
                            });
                        } else { // Remove single value (case-insensitive)
                            newFilters.variant.values = newFilters.variant.values.filter(v => {
                                const nameMatches = v.name.toLowerCase() === variantName.toLowerCase();
                                const valueMatches = v.value.toLowerCase() === String(valueToProcess).toLowerCase();
                                const shouldRemove = nameMatches && valueMatches; // console.log(
                                //     "[Variant Removal] Checking variant:",
                                //     {
                                //         variant: v,
                                //         nameMatches,
                                //         valueMatches,
                                //         shouldRemove,
                                //     }
                                // )
                                return !shouldRemove;
                            });
                        } // console.log(
                        //     "[Variant Removal] Updated variant values:",
                        //     newFilters.variant.values
                        // )
                        newFilters.variant.active = newFilters.variant.values.length > 0; // console.log(
                        //     "[Variant Removal] Variant active state:",
                        //     newFilters.variant.active
                        // )
                    }
                }
            } else { // Handle other filter types
                switch (type) {
                    case "product_type":
                    case "product_tag":
                    case "collection":
                        logDebug("ProductSort", `Processing ${type} filter`, {
                            active,
                            value,
                            currentValues: newFilters[type].values
                        });
                        if (active) {
                            newFilters[type].values = [...newFilters[type].values || [], value];
                        } else {
                            newFilters[type].values = newFilters[type].values.filter(v => v !== value);
                        }
                        newFilters[type].active = newFilters[type].values.length > 0;
                        logDebug("ProductSort", `${type} filter updated`, {
                            newActive: newFilters[type].active,
                            newValues: newFilters[type].values
                        });
                        break;
                    case "price":
                        if (active) { // console.log(
                            //     "🏷️ Processing ACTIVE price filter:",
                            //     {
                            //         currentPriceFilter:
                            //             newFilters.price.values,
                            //         incomingValue: value,
                            //     }
                            // )
                            if (!newFilters.price) {
                                newFilters.price = {
                                    active: active,
                                    values: []
                                };
                            } // Always ensure active state is set when adding ranges
                            newFilters.price.active = active;
                            const newRange = value ? .values ? .[0];
                            if (newRange) { // console.log(
                                //     "🎯 Processing new price range:",
                                //     {
                                //         newRange,
                                //         priceType: newRange.priceType,
                                //         currentRanges:
                                //             newFilters.price.values,
                                //     }
                                // )
                                // Format the range based on priceType
                                const formattedRange = {
                                    priceType: newRange.priceType,
                                    min: newRange.priceType === "Under" ? null : newRange.min,
                                    max: newRange.priceType === "Over" ? null : newRange.max
                                };
                                const rangeExists = newFilters.price.values.some(range => range.priceType === formattedRange.priceType && range.min === formattedRange.min && range.max === formattedRange.max);
                                if (!rangeExists) {
                                    newFilters.price.values.push(formattedRange); // console.log(
                                    //     "✅ Added new price range. Updated ranges:",
                                    //     newFilters.price.values
                                    // )
                                }
                            }
                        } else { // console.log(
                            //     "🏷️ Processing INACTIVE price filter:",
                            //     {
                            //         currentPriceFilter: newFilters.price,
                            //         incomingValue: value,
                            //     }
                            // )
                            if (newFilters.price.active && newFilters.price.values) { // Loop through incoming values and remove them from current filters
                                value.values ? .forEach(valueRange => {
                                    newFilters.price.values = newFilters.price.values.filter(currentRange => { // Check if the current range matches the incoming range
                                        const isMatchingRange = currentRange.priceType === valueRange.priceType && currentRange.min === valueRange.min && currentRange.max === valueRange.max;
                                        return !isMatchingRange // Remove only the matching range
                                        ;
                                    });
                                });
                            } // Update the active state based on remaining ranges
                            newFilters.price.active = newFilters.price.values.length > 0;
                        }
                        break;
                    case "discount_amount":
                    case "discount_percent":
                        const discountType = type;
                        if (!newFilters[discountType]) {
                            newFilters[discountType] = {
                                active: false,
                                values: []
                            };
                        }
                        if (active) { // Add new discount range
                            newFilters[discountType].values.push(...value.values);
                        } else { // Remove discount range
                            newFilters[discountType].values = newFilters[discountType].values.filter(range => !value.values.some(v => v.min === range.min && v.max === range.max));
                        } // Update active state
                        newFilters[discountType].active = newFilters[discountType].values.length > 0;
                        break;
                    case "on_sale":
                    case "in_stock":
                    case "bundle":
                    case "subscription":
                        newFilters[type] = {
                            active: active,
                            value: true
                        };
                        break;
                    default:
                        console.warn("Unhandled filter type:", type);
                }
            }
            logDebug("ProductSort", "Updated filters", {
                filterType: type,
                newFilterState: newFilters[type],
                allActiveFilters: Object.entries(newFilters).filter(([key, filter]) => filter.active).reduce((acc, [key, filter]) => ({ ...acc,
                    [key]: filter
                }), {})
            });
            return newFilters;
        }); // Force reset sorted children to trigger re-filter and re-sort
        logDebug("ProductSort", "Resetting sorted children to trigger re-filtering", null);
        setSortedChildren(null);
    }, [props.display, props.value]); // Add a new handler for search events
    const handleSearch = React.useCallback(e => { // Only process search if it's enabled
        if (!props.Search ? .enableSearch) {
            return;
        }
        setSearchConfig({
            term: e.detail.term,
            fields: getActiveSearchFields(props.Search ? .Scope),
            active: !!e.detail.term
        });
        setSortedChildren(null);
    }, [props.Search ? .enableSearch, props.Search ? .Scope]); // Load favorites from localStorage
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const loadFavorites = () => {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]"); // console.log("Loaded favorites:", storedFavorites)
            setFavorites(storedFavorites);
        };
        loadFavorites();
        const handleFavoritesUpdate = e => { // console.log("favorites_updated event", e.detail)
            const {
                favorites: newFavorites,
                action,
                productId
            } = e.detail || {}; // Set isTransitioning early to prevent flash
            if (pageType === "favorites" && action === "remove") {
                setIsTransitioning(true);
            }
            if (action === "remove" && productId) { // console.log("Removing from favorites:", productId)
                setFavorites(prev => {
                    const updatedFavorites = prev.filter(id => id !== productId); // Only retrigger UI if we're in favorites display mode
                    if (pageType === "favorites") { // If we have sorted children already, prepare for a smoother transition
                        if (sortedChildren && sortedChildren.length > 0) { // Filter out the removed product from current view without setting to null
                            const updatedChildren = sortedChildren.filter(child => {
                                const key = child.key || "";
                                return key !== productId;
                            });
                            if (updatedChildren.length > 0) {
                                performTransition(updatedChildren);
                            } else { // If all items removed, then do a full reset
                                setSortedChildren(null);
                            }
                        } else {
                            setSortedChildren(null);
                        }
                    }
                    return updatedFavorites;
                });
            } else if (action === "add" && productId) { // console.log("Adding to favorites:", productId)
                setFavorites(prev => {
                    const updatedFavorites = [...prev, productId]; // Only retrigger UI if we're in favorites display mode
                    if (pageType === "favorites") {
                        setSortedChildren(null);
                    }
                    return updatedFavorites;
                });
            } else { //("Loading favorites with loadFavorites")
                loadFavorites(); // Only retrigger UI if we're in favorites display mode
                if (pageType === "favorites") {
                    setSortedChildren(null);
                }
            }
        };
        document.addEventListener("favorites-updated", handleFavoritesUpdate);
        return () => {
            document.removeEventListener("favorites-updated", handleFavoritesUpdate);
        };
    }, [pageType, sortedChildren]); // Use global state management for event listeners
    React.useEffect(() => { // console.log("🚨 Setting up event listeners 🚨", {
        //     hasShopXTools: typeof window !== "undefined" && !!window.shopXtools,
        //     hasProducts:
        //         typeof window !== "undefined" && !!window.shopXtools?.products,
        //     productsCount:
        //         typeof window !== "undefined"
        //             ? window.shopXtools?.products?.length
        //             : 0,
        // })
        // Use global state management
        globalSortState.instances.add("FC_CatalogDisplay"); // Add event listeners with proper typing
        const handleProductsReadyEvent = e => { // console.log("🚨 Received data__products-ready event 🚨", {
            //     hasEventDetail: !!e,
            //     hasProducts: !!(e as any).detail?.products,
            //     productsCount: (e as any).detail?.products?.length || 0,
            // })
            const customEvent = e;
            logDebug("ProductSort", "data__products-ready event received", {
                hasProducts: !!customEvent.detail ? .products,
                count: customEvent.detail ? .products ? .length || 0
            });
            handleProductsReady(customEvent);
        };
        const handleSortChangeEvent = e => {
            const customEvent = e;
            logDebug("ProductSort", "product-sort-change event received", customEvent.detail);
            handleSortChange(customEvent);
        };
        const handleFilterResetEvent = e => {
            const customEvent = e;
            logDebug("ProductSort", "filter-reset for reset event received", customEvent.detail);
            handleFilterReset(customEvent);
        };
        const handleFilterChangeEvent = e => {
            const customEvent = e;
            logDebug("ProductSort", "product-filter-change event received", customEvent.detail);
            handleFilter(customEvent);
        };
        const handleSearchChangeEvent = e => {
            const customEvent = e;
            logDebug("ProductSort", "product-search-change event received", customEvent.detail);
            handleSearch(customEvent);
        };
        document.addEventListener("filter-reset", handleFilterResetEvent);
        document.addEventListener("data__products-ready", handleProductsReadyEvent);
        document.addEventListener("product-sort-change", handleSortChangeEvent);
        document.addEventListener("product-filter-change", handleFilterChangeEvent);
        document.addEventListener("product-search-change", handleSearchChangeEvent); // Cleanup
        return () => {
            globalSortState.instances.delete("FC_CatalogDisplay");
            document.removeEventListener("data__products-ready", handleProductsReadyEvent);
            document.removeEventListener("product-sort-change", handleSortChangeEvent);
            document.removeEventListener("product-filter-change", handleFilterChangeEvent);
            document.removeEventListener("product-search-change", handleSearchChangeEvent);
            document.removeEventListener("filter-reset", handleFilterResetEvent);
            logDebug("ProductSort", "Event listeners cleaned up", null);
        };
    }, [handleProductsReady, handleSortChange, handleFilter, handleSearch, handleFilterReset]); // At the top of your component, add this debug log
    React.useEffect(() => {
        if (products.length > 0) { // console.log("Products data structure:", {
            //     totalProducts: products.length,
            //     sampleProduct: products[0]?.node,
            //     allFields: products[0]?.node
            //         ? Object.keys(products[0].node)
            //         : [],
            //     allProductTypes: products
            //         .slice(0, 10)
            //         .map((p) => p.node?.productType), // Log first 10 product types
            //     activeFilters: Object.entries(filters)
            //         .filter(([key, filter]: [string, any]) => filter.active)
            //         .reduce(
            //             (acc, [key, filter]: [string, any]) => ({
            //                 ...acc,
            //                 [key]: filter,
            //             }),
            //             {}
            //         ),
            // })
            // Log a specific check for the filter value
            if (filters.product_type ? .active) {
                const filterValues = filters.product_type.values;
                const matchingProducts = products.filter(p => {
                    const productType = p.node ? .productType;
                    if (!productType) return false;
                    return filterValues.some(filterValue => productType.toLowerCase().includes(filterValue.toLowerCase()));
                }); // console.log("Filter match check:", {
                //     filterValues: filterValues,
                //     totalProducts: products.length,
                //     matchingProductsCount: matchingProducts.length,
                //     sampleMatches: matchingProducts.slice(0, 3).map((p) => ({
                //         title: p.node?.title,
                //         productType: p.node?.productType,
                //     })),
                // })
            }
        }
    }, [products]); // At the top of your component, add this debug log
    // React.useEffect(() => {
    //     if (products.length > 0) {
    //         console.log("🔍 Debugging Product Structure:", {
    //             firstProduct: products[0]?.node,
    //             hasSellingPlanGroups:
    //                 products[0]?.node?.sellingPlanGroups?.edges?.length > 0,
    //             variants: products[0]?.node?.variants?.edges?.map((edge) => ({
    //                 title: edge.node.title,
    //                 hasSellingPlans:
    //                     edge.node.sellingPlanAllocations?.edges?.length > 0,
    //                 sellingPlans: edge.node.sellingPlanAllocations?.edges,
    //             })),
    //         })
    //     }
    // }, [products])
    // Helper to get product details
    const getProductDetails = React.useCallback(productId => {
        logDebug("ProductSort", "Looking up product details", {
            searchingForId: productId,
            fullId: `gid://shopify/Product/${productId}`,
            productsCount: products.length,
            usingShopXTools: typeof window !== "undefined" && !!window.shopXtools
        });
        const fullId = `gid://shopify/Product/${productId}`;
        let product; // First try to find product in shopXtools
        if (typeof window !== "undefined" && window.shopXtools ? .products) {
            product = window.shopXtools.products.find(({
                node
            }) => node.id === fullId) ? .node;
            if (product) {
                logDebug("ProductSort", "Found product in shopXtools", {
                    id: product.id,
                    title: product.title
                });
            }
        } // Fall back to products state if not found in shopXtools
        if (!product) {
            product = products.find(({
                node
            }) => node.id === fullId) ? .node;
        }
        if (product) {
            logDebug("ProductSort", "Raw product data found", {
                id: product.id,
                title: product.title,
                rawProductType: product.productType,
                rawTags: product.tags,
                rawCollections: product.collections,
                fromShopXTools: !!window.shopXtools
            });
            return {
                id: product.id,
                title: product.title || "",
                price: product.priceRange ? .minVariantPrice ? .amount ? parseFloat(product.priceRange.minVariantPrice.amount) : 0,
                productType: product.productType || "",
                tags: product.tags || [],
                compareAtPrice: product.compareAtPriceRange ? .minVariantPrice ? .amount ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) : 0,
                isOnSale: product.compareAtPriceRange ? .minVariantPrice ? .amount ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) > parseFloat(product.priceRange ? .minVariantPrice ? .amount || "0") : false,
                collections: Array.isArray(product.collections) ? product.collections.map(c => c.title) : [],
                options: product.options || [],
                variants: product.variants ? .edges || [],
                sellingPlanGroups: product.sellingPlanGroups ? .edges || [],
                hasProductLevelPlans: product.sellingPlanGroups ? .edges ? .length > 0,
                hasVariantLevelPlans: product.variants ? .edges ? .some(edge => edge.node.sellingPlanAllocations ? .edges ? .length > 0)
            };
        }
        logDebug("ProductSort", "Product not found in any source", {
            searchId: productId
        });
        return {
            id: "",
            title: "",
            price: 0,
            productType: "",
            tags: [],
            compareAtPrice: 0,
            isOnSale: false,
            collections: [],
            options: [],
            variants: [],
            sellingPlanGroups: [],
            hasProductLevelPlans: false,
            hasVariantLevelPlans: false
        };
    }, [products]); // Helper function to perform the actual transition
    const performTransition = newChildren => {
        logDebug("ProductSort", "Performing transition", {
            childrenCount: newChildren ? newChildren.length : 0
        });
        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
        }
        setIsTransitioning(true); // Directly set sorted children without fade out
        setSortedChildren(newChildren);
        setTimeout(() => {
            setIsTransitioning(false);
            setIsSettling(false);
        }, 200) // Fade in duration
        ;
    }; // Cleanup timeouts
    React.useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
            if (settlingTimeoutRef.current) {
                clearTimeout(settlingTimeoutRef.current);
            }
        };
    }, []); // Add a debug log to show which filters are active when filtering products
    // After the getProductDetails function, add this useEffect for debugging
    // React.useEffect(() => {
    //     console.log(
    //         "Active filters:",
    //         Object.entries(filters)
    //             .filter(([key, filter]: [string, any]) => filter.active)
    //             .reduce(
    //                 (acc, [key, filter]: [string, any]) => ({
    //                     ...acc,
    //                     [key]: filter,
    //                 }),
    //                 {}
    //             )
    //     )
    // }, [filters])
    // Add this function to check if a product matches the filters
    const productMatchesFilters = React.useCallback(product => {
        /**
         * Determines if a product matches all active filters
         * Returns details about which filters matched or failed
         */
        const filterResults = {}; // [DUPLICATE_VARIANTS_LOGIC_DISABLED] Check if this is a duplicated product with variant-specific data
        // const isDuplicatedProduct =
        //     product._variantData && product._variantData.selectedVariant
        // const variantData = product._variantData
        const isDuplicatedProduct = false;
        const variantData = null; // Log active filters at the beginning
        const activeFilters = {
            search: searchConfig.active ? {
                term: searchConfig.term,
                fields: searchConfig.fields
            } : null,
            collection: filters.collection ? .active ? {
                values: filters.collection.values
            } : null,
            product_type: filters.product_type ? .active ? {
                values: filters.product_type.values
            } : null,
            product_tag: filters.product_tag ? .active ? {
                values: filters.product_tag.values
            } : null,
            price: filters.price ? .active ? {
                values: filters.price.values
            } : null,
            on_sale: filters.on_sale ? .active || null,
            in_stock: filters.in_stock ? .active || null,
            bundle: filters.bundle ? .active || null,
            subscription: filters.subscription ? .active || null,
            variant: filters.variant ? .active ? {
                values: filters.variant.values
            } : null,
            discount_amount: filters.discount_amount ? .active ? {
                values: filters.discount_amount.values
            } : null,
            discount_percent: filters.discount_percent ? .active ? {
                values: filters.discount_percent.values
            } : null
        }; // console.log("Active filters (line 1128):", activeFilters)
        // Only log if we have any active filters
        if (Object.values(activeFilters).some(v => v !== null)) { // console.log(
            //     `🔍 FILTERING PRODUCT "${product.title}" with active filters:`,
            //     Object.fromEntries(
            //         Object.entries(activeFilters).filter(
            //             ([_, v]) => v !== null
            //         )
            //     )
            // )
        } // ---- SEARCH TERM FILTER ----
        if (searchConfig.active && searchConfig.term && props.Search ? .enableSearch) {
            const searchTerm = searchConfig.term.toLowerCase();
            let matches = false; // Add debug log for search filtering
            // console.log("🔍 FILTERING PRODUCT by search term", {
            //     productTitle: product.title,
            //     searchTerm: searchTerm,
            //     searchFields: searchConfig.fields,
            //     searchConfig: searchConfig
            // })
            // Map search fields to shopX product structure
            for (const field of searchConfig.fields) { // console.log(`🔍 Checking search field:`, {
                //     field,
                //     searchTerm,
                //     productTitle: product.title
                // });
                switch (field) {
                    case "variants": // Search through variant values with proper null checks
                        if (product ? .variants ? .edges && Array.isArray(product.variants.edges)) try { // First check variant colors
                            const variantMatches = product.variants.edges.some(edge => {
                                if (!edge ? .node ? .selectedOptions || !Array.isArray(edge.node.selectedOptions)) {
                                    return false;
                                }
                                return edge.node.selectedOptions.some(option => {
                                    return option ? .value && typeof option.value === "string" && option.value.toLowerCase().includes(searchTerm);
                                });
                            }); // Search all custom.fc_* metafields for the search term
                            let metafieldMatches = false;
                            if (includeMetafields && product ? .metafields && Array.isArray(product.metafields)) {
                                metafieldMatches = product.metafields.some(mf => {
                                    if (mf && mf.namespace === "custom" && mf.key.startsWith("fc_") && typeof mf.value === "string") {
                                        let values = [];
                                        try {
                                            const parsed = JSON.parse(mf.value);
                                            if (Array.isArray(parsed)) {
                                                values = parsed ? .map(v => v.toLowerCase()) || [];
                                            } else if (typeof parsed === "string") {
                                                values = [parsed.toLowerCase()];
                                            }
                                        } catch {
                                            values = [mf.value.toLowerCase()];
                                        }
                                        return values.some(val => val.includes(searchTerm));
                                    }
                                    return false;
                                });
                            }
                            matches = matches || variantMatches || metafieldMatches;
                            if (matches) { // console.log(`🎯 Final match found for "${product.title}"`, {
                                //     variantMatches,
                                //     metafieldMatches
                                // })
                            }
                        } catch (error) {
                            console.error("Error searching variants and custom color:", error);
                            return false;
                        }
                        break;
                    case "title": // Product title is directly accessible on the product object
                        if (product.title) {
                            const titleMatches = product.title.toLowerCase().includes(searchTerm);
                            if (titleMatches) { // Only log matches to reduce console noise
                                // console.log(
                                //     `🎯 Title match: "${product.title}" includes "${searchTerm}"`
                                // )
                            }
                            matches = matches || titleMatches;
                        } else { // console.log(
                            //     `⚠️ Product has no title property:`,
                            //     product
                            // )
                        }
                        break;
                    case "productType": // Product type is under productType
                        if (product.productType) {
                            const typeMatches = product.productType.toLowerCase().includes(searchTerm);
                            if (typeMatches) { // console.log(
                                //     `🎯 Product Type match: "${product.productType}" includes "${searchTerm}"`
                                // )
                            }
                            matches = matches || typeMatches;
                        }
                        break;
                    case "tags": // Tags are in an array
                        if (Array.isArray(product.tags)) {
                            const tagMatches = product.tags.some(tag => tag && tag.toLowerCase().includes(searchTerm));
                            if (tagMatches) { // console.log(
                                //     `🎯 Tag match: "${product.tags.join(", ")}" includes "${searchTerm}"`
                                // )
                            }
                            matches = matches || tagMatches;
                        }
                        break;
                    case "collections": // Collections are in an array
                        if (Array.isArray(product.collections)) {
                            const collectionMatches = product.collections.some(collection => {
                                const collectionTitle = collection ? .title || collection;
                                return typeof collectionTitle === "string" && collectionTitle.toLowerCase().includes(searchTerm);
                            });
                            if (collectionMatches) { // console.log(
                                //     `🎯 Collection match: "${product.collections
                                //         .map((c) => c?.title || c)
                                //         .filter(Boolean)
                                //         .join(
                                //             ", "
                                //         )}" includes "${searchTerm}"`
                                // )
                            }
                            matches = matches || collectionMatches;
                        }
                        break;
                    case "vendor": // Vendor is under product.vendor
                        if (product.vendor) {
                            const vendorMatches = product.vendor.toLowerCase().includes(searchTerm);
                            if (vendorMatches) { // console.log(
                                //     `🎯 Vendor match: "${product.vendor}" includes "${searchTerm}"`
                                // )
                            }
                            matches = matches || vendorMatches;
                        }
                        break;
                } // If we found a match, no need to check other fields
                if (matches) break;
            }
            filterResults.search = {
                active: true,
                term: searchConfig.term,
                matches
            }; // If search is active but we don't match, return early
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- COLLECTION FILTER -----
        if (filters.collection ? .active && filters.collection.values ? .length > 0) {
            const collectionValues = filters.collection.values;
            let matches = false; // Get the collection titles from the new nested structure
            const productCollections = Array.isArray(product ? .collections) ? product.collections.map(collection => collection ? .node ? .title || collection ? .node ? .handle || collection).filter(Boolean) : []; // Use OR logic (some) for collections if not scoped to collections
            // Use AND logic (every) only if scoped to collections
            if (props.display === "Collection") {
                matches = collectionValues.every(collectionValue => productCollections.some(col => col ? .toLowerCase() === collectionValue ? .toLowerCase()));
            } else {
                matches = collectionValues.some(collectionValue => productCollections.some(col => col ? .toLowerCase() === collectionValue ? .toLowerCase()));
            }
            filterResults.collection = {
                active: true,
                values: collectionValues,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- PRODUCT TYPE FILTER -----
        if (filters.product_type ? .active && filters.product_type.values ? .length > 0) {
            const productTypeValues = filters.product_type.values;
            let matches = false; // Safely check product type
            const productType = product ? .productType || "";
            if (productType) { // Use OR logic (some) for product types if not scoped to product types
                // Use AND logic (every) only if scoped to product types
                if (props.display === "Product Type") {
                    matches = productTypeValues.every(type => productType.toLowerCase() === type.toLowerCase());
                } else {
                    matches = productTypeValues.some(type => productType.toLowerCase() === type.toLowerCase());
                }
            }
            filterResults.product_type = {
                active: true,
                values: productTypeValues,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- PRODUCT TAG FILTER -----
        if (filters.product_tag ? .active && filters.product_tag.values ? .length > 0) {
            const tagValues = filters.product_tag.values;
            let matches = false; // Safely check tags
            const productTags = Array.isArray(product ? .tags) ? product.tags.map(tag => tag ? .toLowerCase()).filter(Boolean) : [];
            if (productTags.length > 0) { // Use OR logic (some) for tags if not scoped to tags
                // Use AND logic (every) only if scoped to tags
                if (props.display === "Product Tag") {
                    matches = tagValues.every(tag => productTags.some(productTag => productTag === tag.toLowerCase()));
                } else {
                    matches = tagValues.some(tag => productTags.some(productTag => productTag === tag.toLowerCase()));
                }
            }
            filterResults.product_tag = {
                active: true,
                values: tagValues,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- PRICE FILTER -----
        if (filters.price ? .active && filters.price.values ? .length > 0) {
            const productPrice = parseFloat(product.priceRange ? .minVariantPrice ? .amount || "0");
            let matches = false; // Check if product matches any of the active price ranges
            matches = filters.price.values.some(range => {
                if (range.min === null) { // Handle "Under" price range
                    return productPrice <= range.max;
                } else if (range.max === null) { // Handle "Over" price range
                    return productPrice >= range.min;
                } else { // Handle regular price range
                    return productPrice >= range.min && productPrice <= range.max;
                }
            });
            filterResults.price = {
                active: true,
                values: filters.price.values,
                productPrice,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- DISCOUNT FILTER -----
        if (filters.discount_amount ? .active && filters.discount_amount.values ? .length > 0) {
            const productPrice = parseFloat(product.priceRange ? .minVariantPrice ? .amount || "0");
            const compareAtPrice = parseFloat(product.compareAtPriceRange ? .minVariantPrice ? .amount || "0");
            const discountAmount = compareAtPrice > productPrice ? compareAtPrice - productPrice : 0;
            let matches = false; // console.log("🔍 Checking discount amount:", {
            //     productPrice,
            //     compareAtPrice,
            //     discountAmount,
            //     ranges: filters.discount_amount.values,
            // })
            // Check if product matches any of the active discount ranges
            matches = filters.discount_amount.values.some(range => {
                if (range.min === null) { // Handle "Under" discount range
                    return discountAmount <= range.max;
                } else if (range.max === null) { // Handle "Over" discount range
                    return discountAmount >= range.min;
                } else { // Handle regular discount range
                    return discountAmount >= range.min && discountAmount <= range.max;
                }
            });
            filterResults.discount_amount = {
                active: true,
                values: filters.discount_amount.values,
                discountAmount,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        }
        if (filters.discount_percent ? .active && filters.discount_percent.values ? .length > 0) {
            const productPrice = parseFloat(product.priceRange ? .minVariantPrice ? .amount || "0");
            const compareAtPrice = parseFloat(product.compareAtPriceRange ? .minVariantPrice ? .amount || "0");
            const discountPercent = compareAtPrice > productPrice ? (compareAtPrice - productPrice) / compareAtPrice * 100 : 0;
            let matches = false; // console.log("🔍 Checking discount percent:", {
            //     productPrice,
            //     compareAtPrice,
            //     discountPercent,
            //     ranges: filters.discount_percent.values,
            // })
            // Check if product matches any of the active discount percentage ranges
            matches = filters.discount_percent.values.some(range => {
                if (range.min === null) { // Handle "Under" discount percentage range
                    return discountPercent <= range.max;
                } else if (range.max === null) { // Handle "Over" discount percentage range
                    return discountPercent >= range.min;
                } else { // Handle regular discount percentage range
                    return discountPercent >= range.min && discountPercent <= range.max;
                }
            });
            filterResults.discount_percent = {
                active: true,
                values: filters.discount_percent.values,
                discountPercent,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- DISCOUNT FILTER -----
        if (filters.discount_amount ? .active && filters.discount_amount.values ? .length > 0) {
            const productPrice = parseFloat(product.priceRange ? .minVariantPrice ? .amount || "0");
            const compareAtPrice = parseFloat(product.compareAtPriceRange ? .minVariantPrice ? .amount || "0");
            const discountAmount = compareAtPrice > productPrice ? compareAtPrice - productPrice : 0;
            let matches = false; // console.log("🔍 Checking discount amount:", {
            //     productPrice,
            //     compareAtPrice,
            //     discountAmount,
            //     ranges: filters.discount_amount.values,
            // })
            // Check if product matches any of the active discount ranges
            matches = filters.discount_amount.values.some(range => {
                if (range.min === null) { // Handle "Under" discount range
                    return discountAmount <= range.max;
                } else if (range.max === null) { // Handle "Over" discount range
                    return discountAmount >= range.min;
                } else { // Handle regular discount range
                    return discountAmount >= range.min && discountAmount <= range.max;
                }
            });
            filterResults.discount_amount = {
                active: true,
                values: filters.discount_amount.values,
                discountAmount,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        }
        if (filters.discount_percent ? .active && filters.discount_percent.values ? .length > 0) {
            const productPrice = parseFloat(product.priceRange ? .minVariantPrice ? .amount || "0");
            const compareAtPrice = parseFloat(product.compareAtPriceRange ? .minVariantPrice ? .amount || "0");
            const discountPercent = compareAtPrice > productPrice ? (compareAtPrice - productPrice) / compareAtPrice * 100 : 0;
            let matches = false; // console.log("🔍 Checking discount percent:", {
            //     productPrice,
            //     compareAtPrice,
            //     discountPercent,
            //     ranges: filters.discount_percent.values,
            // })
            // Check if product matches any of the active discount percentage ranges
            matches = filters.discount_percent.values.some(range => {
                if (range.min === null) { // Handle "Under" discount percentage range
                    return discountPercent <= range.max;
                } else if (range.max === null) { // Handle "Over" discount percentage range
                    return discountPercent >= range.min;
                } else { // Handle regular discount percentage range
                    return discountPercent >= range.min && discountPercent <= range.max;
                }
            });
            filterResults.discount_percent = {
                active: true,
                values: filters.discount_percent.values,
                discountPercent,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- DISCOUNT FILTER -----
        if (filters.discount_amount ? .active && filters.discount_amount.values ? .length > 0) {
            const productPrice = parseFloat(product.priceRange ? .minVariantPrice ? .amount || "0");
            const compareAtPrice = parseFloat(product.compareAtPriceRange ? .minVariantPrice ? .amount || "0");
            const discountAmount = compareAtPrice > productPrice ? compareAtPrice - productPrice : 0;
            let matches = false; // console.log("🔍 Checking discount amount:", {
            //     productPrice,
            //     compareAtPrice,
            //     discountAmount,
            //     ranges: filters.discount_amount.values,
            // })
            // Check if product matches any of the active discount ranges
            matches = filters.discount_amount.values.some(range => {
                if (range.min === null) { // Handle "Under" discount range
                    return discountAmount <= range.max;
                } else if (range.max === null) { // Handle "Over" discount range
                    return discountAmount >= range.min;
                } else { // Handle regular discount range
                    return discountAmount >= range.min && discountAmount <= range.max;
                }
            });
            filterResults.discount_amount = {
                active: true,
                values: filters.discount_amount.values,
                discountAmount,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        }
        if (filters.discount_percent ? .active && filters.discount_percent.values ? .length > 0) {
            const productPrice = parseFloat(product.priceRange ? .minVariantPrice ? .amount || "0");
            const compareAtPrice = parseFloat(product.compareAtPriceRange ? .minVariantPrice ? .amount || "0");
            const discountPercent = compareAtPrice > productPrice ? (compareAtPrice - productPrice) / compareAtPrice * 100 : 0;
            let matches = false; // console.log("🔍 Checking discount percent:", {
            //     productPrice,
            //     compareAtPrice,
            //     discountPercent,
            //     ranges: filters.discount_percent.values,
            // })
            // Check if product matches any of the active discount percentage ranges
            matches = filters.discount_percent.values.some(range => {
                if (range.min === null) { // Handle "Under" discount percentage range
                    return discountPercent <= range.max;
                } else if (range.max === null) { // Handle "Over" discount percentage range
                    return discountPercent >= range.min;
                } else { // Handle regular discount percentage range
                    return discountPercent >= range.min && discountPercent <= range.max;
                }
            });
            filterResults.discount_percent = {
                active: true,
                values: filters.discount_percent.values,
                discountPercent,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- ON SALE FILTER -----
        if (filters.on_sale ? .active) {
            let matches = false;
            if (product.compareAtPriceRange ? .minVariantPrice ? .amount && product.priceRange ? .minVariantPrice ? .amount) {
                const comparePrice = parseFloat(product.compareAtPriceRange.minVariantPrice.amount);
                const price = parseFloat(product.priceRange.minVariantPrice.amount);
                matches = comparePrice > price;
            }
            filterResults.on_sale = {
                active: true,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- IN STOCK FILTER -----
        if (filters.in_stock ? .active) {
            let matches = false; // Check if any variant is available for sale
            if (product.variants ? .edges ? .some(edge => edge.node.availableForSale)) {
                matches = true;
            }
            filterResults.in_stock = {
                active: true,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- SUBSCRIPTION FILTER -----
        if (filters.subscription ? .active) {
            let matches = false;
            const sellingPlanGroups = product.sellingPlanGroups ? .edges || []; // Check if the product has subscription plans
            if (sellingPlanGroups && product.sellingPlanGroups ? .edges ? .length > 0) {
                matches = true;
            } // Check for variant-level subscription plans
            if (product.variants ? .edges ? .some(edge => edge.node.sellingPlanAllocations ? .edges ? .length > 0)) {
                matches = true;
            }
            filterResults.subscription = {
                active: true,
                matches
            }; // console.log(
            //     "filterResults.subscription",
            //     filterResults.subscription
            // )
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // ----- VARIANT FILTER -----
        if (filters.variant ? .active && filters.variant.values ? .length > 0) {
            const variantFilters = filters.variant.values;
            let matches = false; // [DUPLICATE_VARIANTS_LOGIC_DISABLED] For duplicated products, check against the specific variant
            // if (isDuplicatedProduct && variantData.selectedVariant) {
            //     const variant = variantData.selectedVariant
            //     // Optional stock filter for variant match
            //     const shouldCheckStock =
            //         filters.variant?.variantStockFilter === "in_stock"
            //     const isAvailable = variant.availableForSale
            //     if (shouldCheckStock && !isAvailable) {
            //         return { matches: false, filterResults }
            //     }
            //     // Group filters by variant name (e.g., Color, Size)
            //     const variantFiltersByName: Record<string, string[]> = {}
            //     variantFilters.forEach((filter) => {
            //         if (!variantFiltersByName[filter.name]) {
            //             variantFiltersByName[filter.name] = []
            //         }
            //         variantFiltersByName[filter.name].push(filter.value)
            //     })
            //     // A variant matches if it satisfies at least one value from each variant type
            //     const matchesByType = Object.entries(
            //         variantFiltersByName
            //     ).map(([name, values]) => {
            //         // Find the option that matches the filter name
            //         const matchingOption = variant.selectedOptions.find(
            //             (option) =>
            //             option.name.toLowerCase() === name.toLowerCase()
            //         )
            //         if (!matchingOption) {
            //             return false
            //         }
            //         // Check if the option value matches any of the filter values (case-insensitive)
            //         const valueMatches = values.some(
            //             (value) =>
            //             matchingOption.value.toLowerCase() ===
            //             value.toLowerCase()
            //         )
            //         return valueMatches
            //     })
            //     // All variant types must match (AND logic)
            //     const allTypesMatch = matchesByType.every((match) => match)
            //     matches = allTypesMatch
            // }
            // For regular products, check against all variants
            if (product.variants ? .edges) {
                matches = product.variants.edges.some(edge => {
                    const variant = edge.node;
                    if (!variant.selectedOptions) {
                        return false;
                    } // Optional stock filter for variant match
                    const shouldCheckStock = filters.variant ? .variantStockFilter === "in_stock";
                    const isAvailable = variant.availableForSale;
                    if (shouldCheckStock && !isAvailable) {
                        return false;
                    } // Group filters by variant name
                    const variantFiltersByName = {};
                    variantFilters.forEach(filter => {
                        if (!variantFiltersByName[filter.name]) {
                            variantFiltersByName[filter.name] = [];
                        }
                        variantFiltersByName[filter.name].push(filter.value);
                    }); // A variant matches if it satisfies at least one value from each variant type
                    const matchesByType = Object.entries(variantFiltersByName).map(([name, values]) => {
                        const matchingOption = variant.selectedOptions.find(option => option.name.toLowerCase() === name.toLowerCase());
                        if (!matchingOption) {
                            return false;
                        }
                        const valueMatches = values.some(value => matchingOption.value.toLowerCase() === value.toLowerCase());
                        return valueMatches;
                    });
                    const allTypesMatch = matchesByType.every(match => match);
                    return allTypesMatch;
                }); // If no variant matches and we're looking for a color, check custom metadata
                if (includeMetafields && product.metafields && Array.isArray(product.metafields)) {
                    variantFilters.forEach(filter => {
                        const metafieldKey = `fc_${filter.name.toLowerCase()}`;
                        const metafield = product.metafields.find(mf => mf && mf.namespace === "custom" && mf.key === metafieldKey && typeof mf.value === "string");
                        if (metafield) {
                            let values = [];
                            try { // Try to parse as JSON array
                                const parsed = JSON.parse(metafield.value);
                                if (Array.isArray(parsed)) {
                                    values = parsed.map(v => v.toLowerCase());
                                } else if (typeof parsed === "string") {
                                    values = [parsed.toLowerCase()];
                                }
                            } catch { // If not JSON, treat as a single string value
                                values = [metafield.value.toLowerCase()];
                            }
                            if (values.length > 0 && filter.value) {
                                if (values.includes(filter.value.toLowerCase())) {
                                    matches = true;
                                }
                            }
                        }
                    });
                }
            }
            filterResults.variant = {
                active: true,
                values: variantFilters,
                matches
            };
            if (!matches) {
                return {
                    matches: false,
                    filterResults
                };
            }
        } // Log final result
        // console.log(
        //     `🔍 FILTER RESULT for "${product.title}": ${JSON.stringify({ matches: true, filterResults })}`
        // )
        // All tests passed
        return {
            matches: true,
            filterResults
        };
    }, [filters, searchConfig]); // Add this after the handleFilter useCallback
    React.useEffect(() => { // console.log("🚨 Search state 🚨", {
        //   sortedChildren: sortedChildren,
        //   sortedChildrenCount: sortedChildren ? sortedChildren.length : 0,
        //   searchConfig: searchConfig,
        //   paginationType: props.Pagination.type,
        //   enableSearch: props.Search.enableSearch,
        //   initialSearchState: props.Search.initialSearchState,
        // });
        // Dispatch product-search-results event when filtered products change
        if (sortedChildren && searchConfig.active || !searchConfig.active) {
            const shouldShowCustomInitial = props.Search ? .enableSearch && props.Search ? .initialSearchState === "custom" && !searchConfig.term; // Determine the effective count - always use total filtered count (before pagination)
            // - In search mode with a custom initial state, force 0
            // - Use totalFilteredCount (total filtered results before pagination)
            // - Fall back to products.length if totalFilteredCount not available yet
            // - Absolute fallback to 0 if all else fails (prevents undefined/null errors)
            let effectiveCount = 0;
            if (shouldShowCustomInitial) {
                effectiveCount = 0;
            } else if (totalFilteredCount > 0) { // Use total filtered count (before pagination) - this is what we want to show
                effectiveCount = totalFilteredCount;
            } else if (Array.isArray(products) && products.length > 0) { // Fallback to total products if filtered count not available yet
                effectiveCount = products.length;
            } else {
                effectiveCount = 0 // Safe fallback
                ;
            }
            const searchResultsEvent = new CustomEvent("product-search-results", {
                detail: {
                    count: effectiveCount,
                    term: searchConfig.term || ""
                }
            });
            document.dispatchEvent(searchResultsEvent); //console.log("product-search-results dispatched", searchResultsEvent);
            // if (sortedChildren && searchConfig.active) {
            //     if (props.Pagination.type === "load_more") {
            //         const hasMoreLoadMore = sortedChildren?.length > 0
            //         console.log("sortedChildren", sortedChildren)
            //         console.log("hasMoreLoadMore", hasMoreLoadMore)
            //         setHasMore(hasMoreLoadMore)
            //         const hasMoreItemsEvent = new CustomEvent("hide-loadmore-button", {
            //             detail: { hasMoreItems: hasMoreLoadMore },
            //         })
            //         document.dispatchEvent(hasMoreItemsEvent)
            //         // console.log("hide-loadmore-button dispatched", hasMoreItemsEvent)
            //     }
            //     if (props.Pagination.type === "next_prev") {
            //         const startIndex = (currentPage - 1) * itemsPerPage
            //         const endIndex = startIndex + itemsPerPage
            //         const paginatedProducts = products.slice(startIndex, endIndex)
            //         const hasMoreNextPrev = endIndex < products.length
            //         setHasMore(hasMoreNextPrev)
            //         const updateNextPrevButtonsEvent = new CustomEvent("update_next_prev_buttons", {
            //             detail: {
            //                 hasMoreItems: hasMoreNextPrev,
            //                 type: props.Pagination?.type,
            //                 currentPage,
            //                 paginatedProducts
            //             },
            //         })
            //         document.dispatchEvent(updateNextPrevButtonsEvent)
            //         console.log("[CMS Pagination] Search pagination:", {
            //             itemsPerPage,
            //             currentPage,
            //             startIndex,
            //             endIndex,
            //             paginatedProducts,
            //             hasMoreNextPrev,
            //         })
            //         console.log("update_next_prev_buttons dispatched: search", updateNextPrevButtonsEvent)
            //     }
            // }
        }
    }, [products, sortedChildren, searchConfig.active, totalFilteredCount]); // React.useEffect(() => {
    //     const hasMoreLoadMore = sortedChildren?.length > 0
    //         setHasMore(hasMoreLoadMore)
    //         if (props.Pagination.type === "load_more" && searchConfig.active && !sortedChildren) {
    //             const hasMoreItemsEvent = new CustomEvent("hide-loadmore-button", {
    //                 detail: { hasMoreItems: hasMoreLoadMore },
    //             })
    //             document.dispatchEvent(hasMoreItemsEvent)
    //             //console.log("hide-loadmore-button dispatched", hasMoreItemsEvent)
    //         }
    //         if (props.Pagination.type === "next_prev" && searchConfig.active && !sortedChildren) {
    //             const startIndex = (currentPage - 1) * itemsPerPage
    //             const endIndex = startIndex + itemsPerPage
    //             const paginatedProducts = Array.isArray(
    //                 sortedChildren) ? sortedChildren.slice(startIndex, endIndex) : []
    //             console.log("products", products)
    //             const hasMoreNextPrev = endIndex < paginatedProducts
    //             setHasMore(hasMoreNextPrev)
    //             const updateNextPrevButtonsEvent = new CustomEvent("update_next_prev_buttons", {
    //                 detail: {
    //                 hasMoreItems: hasMoreNextPrev,
    //                 type: props.Pagination?.type,
    //                 currentPage,
    //                 paginatedProducts
    //             },
    //             })
    //             console.log("[CMS Pagination] Search pagination:", {
    //                 itemsPerPage,
    //                 currentPage,
    //                 startIndex,
    //                 endIndex,
    //                 paginatedProducts,
    //                 hasMoreNextPrev,
    //             })
    //             document.dispatchEvent(updateNextPrevButtonsEvent)
    //             console.log("update_next_prev_buttons dispatched: no search results", updateNextPrevButtonsEvent)
    //         }
    // }, [products, sortedChildren, searchConfig.active, props.Pagination.type])
    // Add this after the URL parameters useEffect
    React.useEffect(() => { // Check if we're in a browser environment
        if (typeof window === "undefined") return; // Check for shopXtools and products
        const hasShopXTools = !!window.shopXtools;
        const products = window.shopXtools ? .products; // Log initial state
        // console.log("🚨 Checking for initial shopXtools products 🚨", {
        //     hasShopXTools,
        //     hasProducts: !!products,
        //     productsCount: products?.length || 0,
        // })
        // Set products if available
        if (products) { // console.log("🚨 Setting initial products from shopXtools 🚨", {
            //     count: products.length,
            //     sample: products[0]?.node,
            // })
            setProducts(products);
        }
    }, []) // Only run on mount
    ; // Get the appropriate component instance based on display mode
    const selectedInstance = props.displayMode === "Desktop" ? props.Collection : props.phoneInstance;
    const collectionInstance = selectedInstance ? .[0];
    const emptyStateInstance = props.displayMode === "Desktop" ? props.EmptyState ? .[0] : props.EmptyStatePhone ? .[0];
    if (!collectionInstance) {
        logDebug("ProductSort", "No collection instance found", null);
        return /*#__PURE__*/ _jsxs("div", {
            style: {
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
                fontSize: "14px"
            },
            children: ["Connect ", props.displayMode, " instance"]
        });
    }
    const sizedInstance = /*#__PURE__*/ React.cloneElement(collectionInstance, {
        style: { ...collectionInstance.props ? .style || {},
            width : "100%",
            height: "100%"
        }
    }); // Update the layout styling logic
    let layoutStyle = {};
    if (props.layout) {
        const layout = props.layout; // Add background and radius to all layout types
        if (layout.background) {
            layoutStyle.backgroundColor = layout.background;
        }
        if (layout.radius) {
            if (layout.radiusPerSide) {
                layoutStyle.borderRadius = `${layout.radiusTopLeft}px ${layout.radiusTopRight}px ${layout.radiusBottomRight}px ${layout.radiusBottomLeft}px`;
            } else {
                layoutStyle.borderRadius = `${layout.radius}px`;
            }
        }
        switch (layout.type) {
            case "stack":
                const isVertical = layout.direction === "vertical";
                layoutStyle = { ...layoutStyle,
                    display: "flex",
                    flexDirection: isVertical ? "column" : "row",
                    flexWrap: layout.wrap ? "wrap" : "nowrap",
                    alignItems: isVertical ? layout.align : layout.alignH,
                    justifyContent: layout.distribute,
                    gap: layout.gap,
                    padding: layout.paddingPerSide ? `${layout.paddingTop}px ${layout.paddingRight}px ${layout.paddingBottom}px ${layout.paddingLeft}px` : `${layout.padding}px`,
                    width: "100%",
                    "& > *": {
                        minWidth: layout.stackMinWidth,
                        flexGrow: 1,
                        flexShrink: 1,
                        flexBasis: 0
                    }
                };
                break;
            case "grid":
                let gridTemplateColumns = "";
                if (layout.columns === "auto") { // Combine auto-fit with a calculated minmax to respect both gridWidth and maxColumns.
                    // The min value ensures columns are at least gridWidth, but also effectively caps
                    // the column count at maxColumns by calculating the width required for that many columns.
                    gridTemplateColumns = `repeat(auto-fit, minmax(max(${layout.gridWidth}px, calc((100% - ${layout.gap*(layout.maxColumns-1)}px) / ${layout.maxColumns})), 1fr))`;
                } else {
                    gridTemplateColumns = `repeat(${layout.columnCount}, 1fr)`;
                }
                layoutStyle = { ...layoutStyle,
                    display: "grid",
                    gridTemplateColumns,
                    justifyItems: layout.gridAlign,
                    gap: layout.gapY && layout.gapY > 0 ? `${layout.gapY}px ${layout.gap}px` : `${layout.gap}px`,
                    padding: layout.paddingPerSide ? `${layout.paddingTop}px ${layout.paddingRight}px ${layout.paddingBottom}px ${layout.paddingLeft}px` : `${layout.padding}px`,
                    width: "100%"
                };
                break;
        }
    } // Create the styled instance with layout
    const styledInstance = /*#__PURE__*/ React.cloneElement(sizedInstance, {
        style: { ...sizedInstance.props.style,
            ...layoutStyle
        }
    });
    if (RenderTarget.current() === RenderTarget.canvas) {
        return styledInstance;
    }
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const handleUrlChange = event => { // console.log("popstate", event)
            const url = new URL(window.location.href);
            const urlParams = new URLSearchParams(url.search); // Handle page parameter
            const pageParam = urlParams.get("page");
            const newPage = pageParam ? parseInt(pageParam, 10) : 1; //console.log("[CMS] Checking page change:", { currentPage, newPage })
            if (newPage !== currentPage) { //console.log("[CMS] Updating to page:", newPage)
                setCurrentPage(newPage);
                setSortedChildren(null) // Reset sorted children to trigger re-render
                ;
            }
            setIsLoading(true); // console.log('ProductSort', 'URL changed', {
            //   url: url.toString(),
            //   search: url.search,
            //   eventType: event?.type || 'direct',
            //   currentPage: currentPage,
            //   newPage: newPage,
            // });
            if (event.type === "popstate") { // console.log('Reloading the page');
                event.stopImmediatePropagation();
                window.location.reload();
            } // Set loading to false after a short delay to prevent flash
            setTimeout(() => {
                setIsLoading(false);
            }, 150);
        }; // Run initial check
        handleUrlChange({}); // Listen for both popstate and pagination events
        window.addEventListener("popstate", handleUrlChange);
        document.addEventListener("product-pagination-change", handleUrlChange);
        return () => {
            window.removeEventListener("popstate", handleUrlChange);
            document.removeEventListener("product-pagination-change", handleUrlChange);
        };
    }, [currentPage]);
    try { // logDebug("ProductSort", "Rendering collection", {
        //   hasCollection: !!collectionInstance,
        //   productsCount: products.length,
        //   sortedChildrenCount: sortedChildren ? sortedChildren.length : 0,
        //   isBackNavigation,
        //   isLoading,
        // });
        // Inject a children function wherever QueryData expects it, robust to Suspense wrappers
        const replaceChildrenFunction = (element, wrapper) => {
            let replaced = false;
            const visit = el => {
                if (! /*#__PURE__*/ React.isValidElement(el)) return el;
                const child = el.props ? .children;
                if (typeof child === "function" && !replaced) {
                    replaced = true;
                    return /*#__PURE__*/ React.cloneElement(el, { ...el.props,
                        children: wrapper(child)
                    });
                }
                if (Array.isArray(child) && child.length) {
                    const newChildren = child.map(c => replaced ? c : visit(c));
                    if (replaced) {
                        return /*#__PURE__*/ React.cloneElement(el, { ...el.props,
                            children: newChildren
                        });
                    }
                    return el;
                }
                if ( /*#__PURE__*/ React.isValidElement(child) && !replaced) {
                    const newChild = visit(child);
                    if (newChild !== child) {
                        return /*#__PURE__*/ React.cloneElement(el, { ...el.props,
                            children: newChild
                        });
                    }
                }
                return el;
            };
            return {
                node: visit(element),
                replaced
            };
        };
        const childrenWrapper = originalChildrenFn => collection => {
            const getCatalogChildren = originalChildren => {
                if (sortedChildren !== null) return sortedChildren;
                if (showInStockOnly) return [];
                return originalChildren;
            }; // logDebug("ProductSort", "Collection render function called", {
            //   collectionSize: collection?.length || 0,
            // });
            const originalRender = originalChildrenFn(collection);
            if (!originalRender ? .props ? .children) {
                logDebug("ProductSort", "No children in original render", null);
                return /*#__PURE__*/ React.isValidElement(originalRender) ? /*#__PURE__*/ React.cloneElement(originalRender, {
                    style: { ...originalRender.props ? .style || {},
                        ...layoutStyle
                    }
                }) : originalRender;
            }
            if (props.Search ? .enableSearch && props.Search ? .initialSearchState === "custom" && !searchConfig.term && props.CustomInitialState ? .[0]) { // console.log(
                //     "Rendering custom initial state:",
                //     {
                //         enableSearch: props.Search?.enableSearch,
                //         initialSearchState: props.Search?.initialSearchState,
                //         searchConfig: searchConfig,
                //     }
                // )
                const styledCustomInitial = /*#__PURE__*/ React.cloneElement(props.CustomInitialState[0], {
                    style: { ...props.CustomInitialState[0].props ? .style || {},
                        width : "100%",
                        height: "100%",
                        maxWidth: "100%",
                        transform: "none"
                    }
                }); // Create a wrapper that completely overrides any grid styles
                const CustomInitialWrapper = () => /*#__PURE__*/ _jsx("div", {
                    style: {
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: props.layout ? .padding ? `${props.layout.padding}px` : "0px", // Override any grid properties
                        gridColumn: "1 / -1",
                        gridRow: "1 / -1", // Ensure it spans the full container
                        position: "relative",
                        minWidth: "100%",
                        maxWidth: "100%"
                    },
                    children: styledCustomInitial
                });
                return { ...originalRender,
                    props: { ...originalRender.props,
                        style: { ...originalRender.props ? .style || {},
                            ...layoutStyle
                        },
                        children: /*#__PURE__*/ _jsx(CustomInitialWrapper, {})
                    }
                };
            }
            if (!sortedChildren && products.length > 0) { // console.log(
                //     "🚨🚨🚨 STARTING FILTERING PROCESS 🚨🚨🚨",
                //     {
                //         productsLength: products.length,
                //         hasShopXTools:
                //             typeof window !== "undefined" &&
                //             !!window.shopXtools,
                //         activeFilters: Object.entries(filters)
                //             .filter(
                //                 ([key, filter]: [
                //                     string,
                //                     any,
                //                 ]) => filter.active
                //             )
                //             .reduce(
                //                 (
                //                     acc,
                //                     [key, filter]: [string, any]
                //                 ) => ({
                //                     ...acc,
                //                     [key]: filter,
                //                 }),
                //                 {}
                //             ),
                //         firstProduct: products[0]?.node,
                //     }
                // )
                // [DUPLICATE_VARIANTS_LOGIC_DISABLED] Determine which products to filter based on duplicate variants setting
                // console.log("🔍 Filtering logic check:", {
                //     duplicateEnabled:
                //         props.DuplicateVariants?.enable,
                //     duplicatedProductsCount:
                //         duplicatedProducts.length,
                //     originalProductsCount: products.length,
                //     willUseDuplicates:
                //         props.DuplicateVariants?.enable &&
                //         duplicatedProducts.length > 0,
                //     sampleDuplicated: duplicatedProducts[0]
                //         ? {
                //               title: duplicatedProducts[0]
                //                   .originalProduct.title,
                //               variant:
                //                   duplicatedProducts[0].selectedOptions
                //                       .map(
                //                           (opt) =>
                //                               `${opt.name}: ${opt.value}`
                //                       )
                //                       .join(", "),
                //               uniqueId:
                //                   duplicatedProducts[0]
                //                       .uniqueId,
                //           }
                //         : null,
                // })
                // Process duplicated products inline to avoid timing issues
                let productsToFilter = products; // [DUPLICATE_VARIANTS_LOGIC_DISABLED] Inline duplication logic commented out
                // if (
                //     props.DuplicateVariants?.enable &&
                //     props.DuplicateVariants?.variantTitles
                //         ?.length > 0
                // ) {
                // ) {
                //     console.log(
                //         "🚀 Processing duplicates inline for filtering..."
                //     )
                //     const duplicated =
                //         processProductsForVariantDuplication(
                //             products,
                //             props.DuplicateVariants
                //                 .variantTitles
                //         )
                //     if (duplicated.length > 0) {
                //         productsToFilter = duplicated.map(
                //             (dp) => {
                //                 const mappedProduct = {
                //                     node: {
                //                         ...dp.originalProduct,
                //                         id: dp.uniqueId, // Use unique ID for duplicated products
                //                         priceRange: {
                //                             minVariantPrice:
                //                                 dp.displayPrice,
                //                         },
                //                         compareAtPriceRange:
                //                             dp.displayCompareAtPrice
                //                                 ? {
                //                                       minVariantPrice:
                //                                           dp.displayCompareAtPrice,
                //                                   }
                //                                 : null,
                //                         _variantData: {
                //                             selectedVariant:
                //                             dp.variant,
                //                             selectedOptions:
                //                             dp.selectedOptions,
                //                         },
                //                     },
                //                 }
                //                 console.log(
                //                     "🔄 Mapped duplicated product:",
                //                     {
                //                         originalTitle:
                //                             dp.originalProduct
                //                                 .title,
                //                         newId: dp.uniqueId,
                //                         variant:
                //                             dp.selectedOptions
                //                                 .map(
                //                                     (opt) =>
                //                                         `${opt.name}: ${opt.value}`
                //                                 )
                //                                 .join(", "),
                //                         price: dp.displayPrice
                //                             .amount,
                //                     }
                //                 )
                //                 return mappedProduct
                //             }
                //         )
                //         console.log(
                //             "✅ Using duplicated products for filtering:",
                //             productsToFilter.length
                //         )
                //     } else {
                //         console.log(
                //             "⚠️ No duplicated products created, using original products"
                //         )
                //     }
                // } else {
                //     console.log(
                //         "ℹ️ Using original products (duplication not enabled)"
                //     )
                // }
                // console.log(
                //   "ℹ️ Using original products (duplication logic disabled)"
                // );
                // console.log("📊 Products to filter:", {
                //   totalProducts: productsToFilter.length,
                //   isUsingDuplicates: false,
                //   sampleProduct: productsToFilter[0]?.node?.title,
                // });
                // First filter all products (either original or duplicated)
                const filteredShopXProducts = productsToFilter.filter(({
                    node
                }) => { // Ensure node exists
                    if (!node) {
                        return false;
                    }
                    const matches = productMatchesFilters(node);
                    return matches.matches;
                });
                const stockFilteredProducts = props.Products ? .show === "in_stock" ? filteredShopXProducts.filter(({
                    node
                }) => isProductInStock(node)) : filteredShopXProducts; // console.log("🎯 After filtering:", {
                //   beforeFilter: productsToFilter.length,
                //   afterFilter: filteredShopXProducts.length,
                //   sampleFiltered: filteredShopXProducts[0]?.node?.title,
                // });
                // console.log(
                //     "🔍 Filtered shopX products results:",
                //     {
                //         totalBefore: products.length,
                //         totalAfter:
                //             filteredShopXProducts.length,
                //         firstProduct: filteredShopXProducts[0]
                //             ?.node
                //             ? {
                //                   title: filteredShopXProducts[0]
                //                       .node.title,
                //                   productType:
                //                       filteredShopXProducts[0]
                //                           .node.productType,
                //               }
                //             : null,
                //         activeFilters: Object.entries(filters)
                //             .filter(
                //                 ([key, filter]: [
                //                     string,
                //                     any,
                //                 ]) => filter.active
                //             )
                //             .reduce(
                //                 (
                //                     acc,
                //                     [key, filter]: [string, any]
                //                 ) => ({
                //                     ...acc,
                //                     [key]: filter,
                //                 }),
                //                 {}
                //             ),
                //         searchActive: searchConfig.active,
                //         searchTerm: searchConfig.term,
                //     }
                // )
                // Add additional debugging if no products match
                // if (
                //     filteredShopXProducts.length === 0 &&
                //     products.length > 0
                // ) {
                //     console.log(
                //         "⚠️ NO PRODUCTS MATCHED FILTERS! Active filters:",
                //         {
                //             searchConfig: searchConfig.active
                //                 ? searchConfig
                //                 : null,
                //             otherFilters: Object.entries(
                //                 filters
                //             )
                //                 .filter(
                //                     ([key, filter]: [
                //                         string,
                //                         any,
                //                     ]) => filter.active
                //                 )
                //                 .reduce(
                //                     (
                //                         acc,
                //                         [key, filter]: [
                //                             string,
                //                             any,
                //                         ]
                //                     ) => ({
                //                         ...acc,
                //                         [key]: filter,
                //                     }),
                //                     {}
                //                 ),
                //         }
                //     )
                //     // Log some sample products to help diagnose
                //     console.log(
                //         "Sample products that didn't match:",
                //         products.slice(0, 3).map((p) => ({
                //             title: p.node?.title,
                //             productType: p.node?.productType,
                //             tags: p.node?.tags?.slice(0, 3),
                //             collections: p.node?.collections
                //                 ?.map((c) => c.node.title || c)
                //                 .slice(0, 3),
                //         }))
                //     )
                // }
                const filteredForPage = pageType === "favorites" ? stockFilteredProducts.filter(({
                    node
                }) => {
                    const productId = findDeep13DigitNumber(node);
                    return productId && favorites.includes(productId);
                }) : stockFilteredProducts; // Store total filtered count (before pagination) for result counter
                setTotalFilteredCount(filteredForPage.length); // console.log("📄 Page filtering:", {
                //   pageType,
                //   beforePageFilter: filteredShopXProducts.length,
                //   afterPageFilter: filteredForPage.length,
                //   isFavorites: pageType === "favorites",
                //   favoritesCount: favorites.length,
                // });
                // If no items match, render the empty state directly
                if (filteredForPage.length === 0) { // Store zero count for result counter
                    setTotalFilteredCount(0); // Ensure result counters and other listeners see a zero state
                    // even when we short-circuit to the Empty state UI.
                    if (typeof document !== "undefined") {
                        const emptyResultsEvent = new CustomEvent("product-search-results", {
                            detail: {
                                count: 0,
                                term: searchConfig.term || ""
                            }
                        });
                        document.dispatchEvent(emptyResultsEvent);
                    }
                    if (emptyStateInstance) {
                        const styledEmptyState = /*#__PURE__*/ React.cloneElement(emptyStateInstance, {
                            style: { ...emptyStateInstance.props ? .style || {},
                                width : "100%",
                                height: "100%",
                                maxWidth: "100%",
                                transform: "none"
                            }
                        }); // Create a wrapper that completely overrides any grid styles
                        const EmptyStateWrapper = () => /*#__PURE__*/ _jsx("div", {
                            style: {
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: props.layout ? .padding ? `${props.layout.padding}px` : "0px", // Override any grid properties
                                gridColumn: "1 / -1",
                                gridRow: "1 / -1", // Ensure it spans the full container
                                position: "relative",
                                minWidth: "100%",
                                maxWidth: "100%"
                            },
                            children: styledEmptyState
                        }); // Return the wrapper component directly
                        return { ...originalRender,
                            props: { ...originalRender.props,
                                style: { ...layoutStyle,
                                    ...originalRender.props.style, // Override grid properties at the container level
                                    display: "flex",
                                    gridTemplateColumns: "none",
                                    gridAutoColumns: "none",
                                    gridTemplateRows: "none",
                                    gap: 0
                                },
                                children: /*#__PURE__*/ _jsx(EmptyStateWrapper, {})
                            }
                        };
                    }
                    return null;
                } // Then map the filtered products to collection items
                // console.log("🔧 Creating items from children:", {
                //   originalChildrenCount: originalRender.props.children.length,
                //   filteredForPageCount: filteredForPage.length,
                //   isUsingDuplicates:
                //     props.DuplicateVariants?.enable &&
                //     props.DuplicateVariants?.variantTitles?.length > 0,
                // });
                let items = [];
                if (props.DuplicateVariants ? .enable && props.DuplicateVariants ? .variantTitles ? .length > 0) { // For duplicated products, we need to match each product with its original child
                    items = filteredForPage.map(({
                        node: product
                    }, index) => { // Find the original child that corresponds to this product
                        // For duplicated products, we need to match based on the original product ID
                        const originalChild = originalRender.props.children.find(child => {
                            const item = collection.find(collectionItem => collectionItem.id === child.key);
                            const productId = item ? findDeep13DigitNumber(item) : null;
                            const originalFullId = `gid://shopify/Product/${productId}`; // For duplicated products, the product.id is the uniqueId (product.id + variant.id)
                            // We need to extract the original product ID from the duplicated product
                            const duplicatedProductId = product.id; // The uniqueId format is: product.id_variant.id
                            // So we need to extract just the product.id part
                            const originalProductId = duplicatedProductId.split("_")[0] // Get the part before the underscore
                            ;
                            console.log("🔍 Matching child:", {
                                originalFullId,
                                duplicatedProductId,
                                originalProductId,
                                matches: originalFullId === originalProductId
                            });
                            return originalFullId === originalProductId;
                        });
                        if (!originalChild) { // console.log(
                            //   "⚠️ No original child found for product:",
                            //   product.title
                            // );
                            return null;
                        }
                        /* console.log("✅ Creating item for duplicated product:", {
                                                id: product.id,
                                                title: product.title,
                                                variant: product._variantData?.selectedOptions
                                                  ?.map((opt) => `${opt.name}: ${opt.value}`)
                                                  .join(", "),
                                                originalChildKey: originalChild.key,
                                        }); */
                        return {
                            child: /*#__PURE__*/ React.cloneElement(originalChild, {
                                key: product.id,
                                ...product._variantData
                            }),
                            productId: product.id,
                            price: product.priceRange ? .minVariantPrice ? .amount ? parseFloat(product.priceRange.minVariantPrice.amount) : 0,
                            title: product.title || "",
                            originalIndex: index,
                            details: {
                                id: product.id,
                                title: product.title || "",
                                price: product.priceRange ? .minVariantPrice ? .amount ? parseFloat(product.priceRange.minVariantPrice.amount) : 0,
                                productType: product.productType || "",
                                tags: product.tags || [],
                                compareAtPrice: product.compareAtPriceRange ? .minVariantPrice ? .amount ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) : 0,
                                collections: Array.isArray(product.collections) ? product.collections.map(c => c.node.title) : []
                            }
                        };
                    }).filter(Boolean) // Remove null items
                    ;
                } else { // Original logic for non-duplicated products
                    items = originalRender.props.children.map(child => {
                        const item = collection.find(collectionItem => collectionItem.id === child.key);
                        const productId = item ? findDeep13DigitNumber(item) : null; // Find the product in our filtered shopX products
                        const fullId = `gid://shopify/Product/${productId}`;
                        const matchingProduct = filteredForPage.find(({
                            node
                        }) => node.id === fullId); // Only include items that exist in our filtered products
                        if (!matchingProduct) {
                            logDebug("ProductSort", "Product filtered out", {
                                id: fullId,
                                productId
                            });
                            return null;
                        }
                        const details = {
                            id: matchingProduct.node.id,
                            title: matchingProduct.node.title || "",
                            price: matchingProduct.node.priceRange ? .minVariantPrice ? .amount ? parseFloat(matchingProduct.node.priceRange.minVariantPrice.amount) : 0,
                            productType: matchingProduct.node.productType || "",
                            tags: matchingProduct.node.tags || [],
                            compareAtPrice: matchingProduct.node.compareAtPriceRange ? .minVariantPrice ? .amount ? parseFloat(matchingProduct.node.compareAtPriceRange.minVariantPrice.amount) : 0,
                            collections: Array.isArray(matchingProduct.node.collections) ? matchingProduct.node.collections.map(c => c.node.title) : []
                        };
                        return {
                            child,
                            productId: productId || "0",
                            price: details.price,
                            title: details.title,
                            originalIndex: originalRender.props.children.indexOf(child),
                            details
                        };
                    }).filter(Boolean) // Remove null items
                    ;
                }
                logDebug("ProductSort", "Final filtered items", {
                    totalProducts: products.length,
                    filteredForPage: filteredForPage.length,
                    finalItems: items.length,
                    finalItemsList: items,
                    sample: items[0] ? {
                        title: items[0].title,
                        productType: items[0].details.productType
                    } : null
                }); // Use React.memo for components that do not change
                const OptimizedChild = /*#__PURE__*/ React.memo(({
                    child,
                    ...props
                }) => {
                    return /*#__PURE__*/ React.cloneElement(child, props);
                }); // Ensure debouncing is applied effectively
                const debouncedUpdateSort = React.useCallback(debounce(newSortConfig => {
                    setSortConfig(newSortConfig);
                }, 150), []);
                const debouncedUpdateFilter = React.useCallback(debounce(newFilters => {
                    setFilters(newFilters);
                }, 150), []); // Add detailed logging around transition logic
                // console.log(
                //     "🔍 Transition state before rendering",
                //     {
                //         isTransitioning,
                //         isSettling,
                //         itemsLength: items.length,
                //         emptyStateInstanceExists:
                //             !!emptyStateInstance,
                //     }
                // )
                // Modify the child wrapper styles to include settling state
                const getTransitionStyles = baseStyles => ({ ...baseStyles,
                    opacity: isTransitioning || isSettling ? 0 : 1,
                    transition: `opacity ${isSettling?"0.5s":"0.3s"} ease-in-out`,
                    pointerEvents: isTransitioning || isSettling ? "none" : "auto"
                }); // Render sorted items
                // console.log("🔍 Rendering sorted items", {
                //     sortedItemsCount: items.length,
                //     sortedItems: items,
                //     isTransitioning,
                //     isSettling,
                // })
                // Sort the filtered items
                const sorted = [...items].sort((a, b) => {
                    if (sortConfig.type === "relevancy") {
                        return a.originalIndex - b.originalIndex;
                    }
                    if (sortConfig.type === "price") {
                        const result = sortConfig.sortDirection === "highToLow" ? b.price - a.price : a.price - b.price;
                        return result || a.originalIndex - b.originalIndex;
                    } else if (sortConfig.type === "name") { // sort by name
                        const result = sortConfig.sortDirection === "aToZ" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
                        return result || a.originalIndex - b.originalIndex;
                    } else if (sortConfig.type === "created") { // For "newest", we try to use the product ID as a proxy
                        // since Shopify IDs are sequential
                        // Higher ID = newer product
                        const aId = parseInt(a.productId);
                        const bId = parseInt(b.productId);
                        if (!isNaN(aId) && !isNaN(bId)) {
                            return bId - aId // Newest first
                            ;
                        } // Fall back to original order if we can't parse IDs
                        return a.originalIndex - b.originalIndex;
                    } else if (sortConfig.type === "best-selling") { // For best-selling, maintain the original order
                        // as we assume Shopify has already sorted by best-selling
                        return a.originalIndex - b.originalIndex;
                    } else { // Default to original order for unknown types
                        return a.originalIndex - b.originalIndex;
                    }
                }); // Apply pagination if enabled
                let paginatedItems = sorted; // console.log("🔍 Paginated items", {
                //     paginatedItemsCount: sorted.length,
                //     paginatedItems: sorted,
                // })
                // Update the product items wrapper with a standard list instead of virtualized one
                // console.log("🎨 Processing children:", {
                //   paginatedItemsCount: paginatedItems.length,
                //   sampleItem: paginatedItems[0]
                //     ? {
                //         productId: paginatedItems[0].productId,
                //         originalIndex: paginatedItems[0].originalIndex,
                //         childType: typeof paginatedItems[0].child,
                //       }
                //     : null,
                // });
                const wrappedChildren = paginatedItems.map(item => /*#__PURE__*/ React.cloneElement(item.child, {
                    style: getTransitionStyles(item.child.props.style),
                    key: item.productId || item.originalIndex
                })); // console.log("🎨 Wrapped children created:", {
                //   wrappedChildrenCount: wrappedChildren.length,
                // });
                // console.log("🔍 Rendering wrapped children", {
                //     wrappedChildrenCount: wrappedChildren.length,
                //     wrappedChildren: wrappedChildren,
                // })
                // Update sorted children state which triggers re-render
                updateSortedChildrenWithTransition(wrappedChildren); // Return the placeholder structure expected by the outer cloneElement
                // The actual content will be replaced by sortedChildren on re-render
                return { ...originalRender,
                    props: { ...originalRender.props,
                        style: { ...originalRender.props ? .style || {},
                            ...layoutStyle
                        }, // Use the original children length initially
                        children: getCatalogChildren(originalRender.props.children)
                    }
                };
            } // Initial render or while loading/filtering
            return { ...originalRender,
                props: { ...originalRender.props,
                    style: { ...originalRender.props ? .style || {},
                        ...layoutStyle
                    },
                    children: getCatalogChildren(originalRender.props.children)
                }
            };
        };
        const ensureFunctionChildren = el => {
            if (! /*#__PURE__*/ React.isValidElement(el)) return el;
            const child = el.props ? .children; // If this element has a query prop (likely QueryData parent), ensure its children is a function
            const hasQuery = !!el.props ? .query;
            if (hasQuery && typeof child !== "function") {
                return /*#__PURE__*/ React.cloneElement(el, { ...el.props,
                    children: () => child
                });
            }
            if (Array.isArray(child)) {
                const newChildren = child.map(c => ensureFunctionChildren(c));
                return /*#__PURE__*/ React.cloneElement(el, { ...el.props,
                    children: newChildren
                });
            }
            if ( /*#__PURE__*/ React.isValidElement(child)) {
                const newChild = ensureFunctionChildren(child);
                if (newChild !== child) {
                    return /*#__PURE__*/ React.cloneElement(el, { ...el.props,
                        children: newChild
                    });
                }
            }
            return el;
        };
        const safeChildrenTree = ensureFunctionChildren(styledInstance.props.children);
        const injected = replaceChildrenFunction(safeChildrenTree, childrenWrapper);
        return /*#__PURE__*/ React.cloneElement(styledInstance, { ...styledInstance.props,
            style: { ...styledInstance.props.style,
                opacity: isLoading || isAwaitingStockFilter ? 0 : 1,
                transition: "opacity 0.2s ease-in-out",
                visibility: isLoading || isAwaitingStockFilter ? "hidden" : "visible"
            },
            children: injected.node
        });
    } catch (error) {
        console.error("Error in ProductSort:", error);
        logDebug("ProductSort", "Render error", {
            error: error.message
        });
        return styledInstance;
    }
}
addPropertyControls(FC_CatalogDisplay, {
    Collection: {
        type: ControlType.ComponentInstance,
        title: "CMS (L)"
    },
    phoneInstance: {
        type: ControlType.ComponentInstance,
        title: "CMS (S)",
        description: "Connect to CMS collection off-page with no filters. Inside, use a single component with Product ID set.  \n\n (S optional)"
    },
    EmptyState: {
        type: ControlType.ComponentInstance,
        title: "Empty (L)"
    },
    EmptyStatePhone: {
        type: ControlType.ComponentInstance,
        title: "Empty (S)",
        description: "Connect to empty state design off-page. \n\n (S optional)"
    },
    CustomInitialState: {
        type: ControlType.ComponentInstance,
        title: "Initial State",
        description: "Initial state for Search. Connect to design off-page.",
        hidden: props => !props.Search ? .enableSearch || props.Search ? .initialSearchState !== "custom"
    },
    displayMode: {
        type: ControlType.Enum,
        title: "Responsive",
        defaultValue: "Desktop",
        options: ["Desktop", "Phone"],
        optionTitles: ["L", "S"],
        displaySegmentedControl: true,
        description: "Display the Large (L) or Small (S) designs connected above."
    },
    pageType: {
        type: ControlType.Enum,
        title: "Display",
        options: ["default", "favorites"],
        optionTitles: ["All", "Favorites"],
        defaultValue: "default",
        displaySegmentedControl: true,
        segmentedControlDirection: "vertical"
    },
    display: {
        type: ControlType.Enum,
        title: "Filter Type",
        options: ["All", "Collection", "Product Tag", "Product Type"],
        defaultValue: "All"
    },
    value: {
        type: ControlType.String,
        title: "Filter Value",
        placeholder: "New Arrivals"
    },
    defaultSort: {
        type: ControlType.Enum,
        title: "Default Sort",
        options: ["relevance", "title_asc", "title_desc", "price_asc", "price_desc", "newest", "best_selling"],
        optionTitles: ["Relevance", "Title A-Z", "Title Z-A", "Price Low-High", "Price High-Low", "Newest", "Best Selling"],
        defaultValue: "relevance"
    },
    Search: {
        type: ControlType.Object,
        title: "Search",
        controls: {
            enableSearch: {
                type: ControlType.Boolean,
                title: "Allow",
                defaultValue: true,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            initialSearchState: {
                type: ControlType.Enum,
                title: "Initial State",
                options: ["all", "none", "custom"],
                optionTitles: ["Full", "Empty", "Custom"],
                defaultValue: "all",
                description: "Use custom to display product or search suggestions. Connect your component on the main panel.",
                displaySegmentedControl: true,
                segmentedControlDirection: "vertical",
                hidden: props => !props.enableSearch
            },
            Scope: {
                type: ControlType.Object,
                title: "Scope",
                hidden: props => !props.enableSearch,
                controls: {
                    title: {
                        type: ControlType.Boolean,
                        title: "Title",
                        defaultValue: true,
                        enabledTitle: "Yes",
                        disabledTitle: "No"
                    },
                    productType: {
                        type: ControlType.Boolean,
                        title: "Product Type",
                        defaultValue: true,
                        enabledTitle: "Yes",
                        disabledTitle: "No"
                    },
                    productTag: {
                        type: ControlType.Boolean,
                        title: "Tags",
                        defaultValue: true,
                        enabledTitle: "Yes",
                        disabledTitle: "No"
                    },
                    collection: {
                        type: ControlType.Boolean,
                        title: "Collections",
                        defaultValue: true,
                        enabledTitle: "Yes",
                        disabledTitle: "No"
                    },
                    vendor: {
                        type: ControlType.Boolean,
                        title: "Vendor",
                        defaultValue: true,
                        enabledTitle: "Yes",
                        disabledTitle: "No"
                    },
                    variants: {
                        type: ControlType.Boolean,
                        title: "Variants",
                        defaultValue: true,
                        enabledTitle: "Yes",
                        disabledTitle: "No"
                    }
                }
            }
        }
    },
    Metafields: {
        type: ControlType.Object,
        title: "Metafields",
        controls: {
            include: {
                type: ControlType.Boolean,
                title: "Include",
                defaultValue: false,
                enabledTitle: "Yes",
                disabledTitle: "No",
                description: "Searching or filtering by Variant: Color will also check custom metafields using custom.fc_color. \n [Learn more](https://framercommerce.com/resources/docs/components/catalog#catalog-display)"
            }
        }
    },
    Products: {
        type: ControlType.Object,
        title: "Products",
        controls: {
            show: {
                type: ControlType.Enum,
                title: "Show",
                options: ["all", "in_stock"],
                optionTitles: ["All", "In Stock Only"],
                defaultValue: "all",
                displaySegmentedControl: true,
                segmentedControlDirection: "vertical"
            }
        }
    },
    /*  DuplicateVariants: {
            type: ControlType.Object,
            title: "Duplicate Variants (NEW)",
            controls: {
                enable: {
                    type: ControlType.Boolean,
                    title: "Enable",
                    defaultValue: false,
                    enabledTitle: "Yes",
                    disabledTitle: "No",
                    description:
                        "Create separate product instances for each variant. Max 3 variants per product for testing.",
                },
                variantTitles: {
                    type: ControlType.Array,
                    title: "Variant Titles",
                    control: {
                        type: ControlType.String,
                        placeholder: "e.g., Color, Size",
                    },
                    defaultValue: [],
                    description:
                        'Show all variants or filter by title (e.g., "Color", "Size") using multiple components.',
                    maxCount: 3,
                },
            },
        }, */
    Pagination: {
        type: ControlType.Object,
        title: "Pagination",
        controls: {
            enable: {
                type: ControlType.Boolean,
                title: "Enable",
                defaultValue: false,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            type: {
                type: ControlType.Enum,
                title: "Type",
                options: ["load_more", "next_prev" /* "infinite"*/ ],
                optionTitles: ["Load More", "Next/Prev" /*"Infinite Scroll"*/ ],
                defaultValue: "load_more",
                displaySegmentedControl: true,
                segmentedControlDirection: "vertical",
                hidden: ({
                    enable
                }) => !enable
            },
            items: {
                type: ControlType.Number,
                title: "Items",
                defaultValue: 12,
                min: 1,
                step: 1,
                displayStepper: true,
                hidden: ({
                    enable
                }) => !enable,
                description: "Insert our Pagination button from the plugin."
            }
        }
    },
    layout: {
        type: ControlType.Object,
        optional: true,
        controls: {
            type: {
                type: ControlType.Enum,
                defaultValue: "grid",
                options: ["stack", "grid"],
                optionTitles: ["Stack", "Grid"],
                displaySegmentedControl: true
            }, // Stack specific controls
            direction: {
                type: ControlType.Enum,
                defaultValue: "vertical",
                options: ["horizontal", "vertical"],
                optionTitles: ["Horizontal", "Vertical"],
                optionIcons: ["direction-horizontal", "direction-vertical"],
                displaySegmentedControl: true,
                hidden: props => props.type !== "stack"
            },
            wrap: {
                type: ControlType.Boolean,
                defaultValue: false,
                title: "Wrap",
                hidden: props => props.type !== "stack"
            },
            stackMinWidth: {
                type: ControlType.Number,
                defaultValue: 200,
                min: 1,
                max: 1e3,
                step: 1,
                title: "Min Width",
                hidden: props => props.type !== "stack" || !props.wrap
            },
            distribute: {
                type: ControlType.Enum,
                defaultValue: "start",
                options: ["start", "center", "end", "space-between", "space-around", "space-evenly"],
                optionTitles: ["Start", "Center", "End", "Space Between", "Space Around", "Space Evenly"],
                hidden: props => props.type !== "stack"
            },
            align: {
                type: ControlType.Enum,
                defaultValue: "start",
                options: ["start", "center", "end"],
                optionTitles: ["Start", "Center", "End"],
                optionIcons: ["align-left", "align-center", "align-right"],
                displaySegmentedControl: true,
                hidden: props => props.type !== "stack" || props.direction !== "vertical"
            },
            alignH: {
                type: ControlType.Enum,
                defaultValue: "start",
                options: ["start", "center", "end"],
                optionTitles: ["Top", "Center", "Bottom"],
                optionIcons: ["align-top", "align-middle", "align-bottom"],
                displaySegmentedControl: true,
                title: "Align",
                hidden: props => props.type !== "stack" || props.direction !== "horizontal"
            }, // Grid specific controls
            columns: {
                type: ControlType.Enum,
                defaultValue: "fixed",
                options: ["auto", "fixed"],
                optionTitles: ["Auto", "Fixed"],
                displaySegmentedControl: true,
                hidden: props => props.type !== "grid"
            },
            columnCount: {
                type: ControlType.Number,
                defaultValue: 3,
                min: 1,
                step: 1,
                displayStepper: true,
                title: "Columns",
                hidden: props => props.type !== "grid" || props.columns === "auto"
            },
            gridWidth: {
                type: ControlType.Number,
                defaultValue: 300,
                min: 1,
                max: 1e3,
                step: 1,
                title: "Min Width",
                hidden: props => props.type !== "grid" || props.columns === "fixed"
            },
            maxColumns: {
                type: ControlType.Number,
                defaultValue: 4,
                min: 1,
                step: 1,
                title: "Max Col",
                displayStepper: true,
                hidden: props => props.type !== "grid" || props.columns === "fixed"
            },
            gridAlign: {
                type: ControlType.Enum,
                defaultValue: "center",
                options: ["start", "center", "end"],
                optionTitles: ["Left", "Center", "Right"],
                displaySegmentedControl: true,
                title: "Align",
                hidden: props => props.type !== "grid"
            }, // Common controls
            gap: {
                type: ControlType.Number,
                defaultValue: 24,
                min: 0,
                step: 1,
                title: "Gap"
            },
            gapY: {
                type: ControlType.Number,
                defaultValue: 24,
                min: 0,
                step: 1,
                title: "Gap Y",
                hidden: props => props.type !== "grid"
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
                defaultValue: 0,
                min: 0,
                toggleKey: "paddingPerSide",
                toggleTitles: ["All", "Sides"],
                valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
                valueLabels: ["T", "R", "B", "L"]
            },
            radius: {
                type: ControlType.FusedNumber,
                title: "Radius",
                defaultValue: 0,
                min: 0,
                toggleKey: "radiusPerSide",
                toggleTitles: ["All", "Sides"],
                valueKeys: ["radiusTopLeft", "radiusTopRight", "radiusBottomRight", "radiusBottomLeft"],
                valueLabels: ["TL", "TR", "BR", "BL"]
            },
            background: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "#FFFFFF00"
            }
        }
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CatalogDisplay",
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
//# sourceMappingURL=./FC_CatalogDisplay.map