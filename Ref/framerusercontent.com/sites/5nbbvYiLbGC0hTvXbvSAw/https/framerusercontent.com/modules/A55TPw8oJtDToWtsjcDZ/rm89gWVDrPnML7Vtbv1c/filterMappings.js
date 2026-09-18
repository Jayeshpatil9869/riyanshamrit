export const getFilterValue = (property, options) => {
    if (property.startsWith("variant_")) {
        return {
            type: "variant",
            value: {
                [property]: options.value
            }
        };
    }
    switch (property) {
        case "product_type":
        case "product_tag":
        case "collection":
            return {
                type: property,
                value: options.value
            };
        case "price":
            return {
                type: "price", // value: options.price_ranges.map((range: string) => {
                //     const [min, max] = range.split('-').map(Number);
                //     return { min, max };
                // }),
                value: options.values.map(value => {
                    if (value.priceType === "Under") {
                        return {
                            min: null,
                            max: value.max
                        } // Handle "Under" case
                        ;
                    } else if (value.priceType === "Over") {
                        return {
                            min: value.min,
                            max: null
                        } // Handle "Over" case
                        ;
                    } else {
                        const [min, max] = value.split("-").map(Number);
                        return {
                            min,
                            max
                        } // Handle regular range
                        ;
                    }
                })
            };
        case "discount_amount":
            return {
                type: "discount_amount",
                value: options.discount_amount_min ? {
                    min: options.discount_amount_min,
                    max: options.discount_amount_max
                } : options.discount_amount
            };
        case "discount_percent":
            return {
                type: "discount_percent",
                value: options.discount_percent_min ? {
                    min: options.discount_percent_min,
                    max: options.discount_percent_max
                } : options.discount_percent
            };
        case "on_sale":
        case "in_stock":
        case "bundle":
        case "subscription":
            return {
                type: property,
                value: options.value === "true"
            };
        default:
            return {
                type: property,
                value: ""
            };
    }
};
/**
 * Convert legacy filter names to new format and vice versa
 */
export const convertFilterName = (name, toLegacy = false) => { //console.log('convertFilterName input:', name, 'toLegacy:', toLegacy);
    const mappings = { // New format to legacy format
        product_type: "product-type",
        product_tag: "product-tag",
        on_sale: "on-sale",
        in_stock: "in-stock",
        bundle: "bundles",
        subscription: "subscriptions"
    };
    if (toLegacy) {
        const result = mappings[name] || name; //console.log('convertFilterName output (toLegacy):', result);
        return result;
    } else { // Legacy format to new format
        const reverseMappings = {};
        Object.entries(mappings).forEach(([key, value]) => {
            reverseMappings[value] = key;
        });
        const result = reverseMappings[name] || name; //console.log('convertFilterName output (fromLegacy):', result);
        return result;
    }
};
/**
 * Parses URL parameters and converts them into filter state
 *
 * URL format conventions:
 * 1. Between different filter types: Always use AND logic with separate parameters
 *    (e.g., ?product_type=shirts&collection=summer)
 *
 * 2. Within the same filter type:
 *    - For collection, product_type, product_tag: Use comma-separated values for OR logic
 *      (e.g., ?product_type=shirts,pants,jackets means products that are shirts OR pants OR jackets)
 *    - For variant filters:
 *      a) Comma-separated values indicate OR logic
 *         (e.g., ?variant_color=blue,red,green means blue OR red OR green)
 *      b) Repeated parameters indicate AND logic
 *         (e.g., ?variant_color=blue&variant_size=large means blue AND large)
 */
export const parseUrlFilters = urlParams => { // Disabled excessive logging that was causing performance issues
    // console.log("Parsing URL filters from:", urlParams.toString());
    const filters = {
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
        variant: {
            active: false,
            values: []
        },
        variant_Color: {
            active: false,
            value: null
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
        }
    };
    ["collection", "product_type", "product_tag", "product-type", "product-tag"].forEach(filterType => {
        const value = urlParams.get(filterType);
        if (value) {
            const normalizedType = convertFilterName(filterType); //console.log(`Found filter ${filterType}, normalized to ${normalizedType}:`, value);
            // Split by comma for OR logic between values
            const values = value.split(",").filter(Boolean);
            filters[normalizedType].values = values;
            filters[normalizedType].active = values.length > 0;
        }
    }); // Process variant filters (variant_color, variant_size, etc.)
    // Support both comma-separated values (OR logic) and multiple params with same name (AND logic between different options)
    Array.from(urlParams.keys()).forEach(key => {
        if (key.startsWith("variant_")) {
            const variantName = key.replace("variant_", "");
            const value = urlParams.get(key);
            if (value) { // Decode the value first to handle any URL encoding
                const decodedValue = decodeURIComponent(value); // Special handling for color filter
                if (variantName.toLowerCase() === "color") {
                    filters.variant_Color.active = true;
                    filters.variant_Color.value = decodedValue.trim();
                } // Log the variant filter values being processed
                // console.log(`Parsing variant filter ${key}:`, {
                //     rawValue: value,
                //     decodedValue,
                //     isMultiValue: decodedValue.includes(',')
                // });
                // Split by comma for OR logic between values of the same option
                const values = decodedValue.split(",").filter(Boolean); // Each value is an OR option for this variant type
                values.forEach(val => {
                    filters.variant.values.push({
                        name: variantName,
                        value: val.trim()
                    });
                }); // console.log(`Found variant filter ${key}:`, {
                //     values,
                //     orLogic: "Values within same variant type use OR logic"
                // });
            }
        }
    });
    filters.variant.active = filters.variant.values.length > 0; // Process price filters
    const priceRanges = urlParams.get("price");
    const priceMax = urlParams.get("price_max");
    const priceMin = urlParams.get("price_min");
    filters.price = {
        active: false,
        values: []
    };
    if (priceRanges) { // Handle regular price ranges
        const ranges = priceRanges.split(",").map(range => {
            const [min, max] = range.split("-").map(Number);
            return {
                min,
                max,
                priceType: "Range"
            };
        });
        filters.price.values.push(...ranges);
        filters.price.active = true;
    }
    if (priceMax) { // Handle "Under" price ranges
        const maxValues = priceMax.split(",").map(Number);
        const underRanges = maxValues.map(max => ({
            min: null,
            max,
            priceType: "Under"
        }));
        filters.price.values.push(...underRanges);
        filters.price.active = true;
    } // Handle "Over" price ranges
    if (priceMin) {
        const minValues = priceMin.split(",").map(Number);
        minValues.forEach(min => {
            filters.price.values.push({
                min,
                max: null,
                priceType: "Over"
            });
        });
        filters.price.active = true;
    } // Process discount filters
    const discountAmount = urlParams.get("discount_amount");
    if (discountAmount) {
        const ranges = discountAmount.split(",").map(range => {
            const [min, max] = range.split("-").map(Number);
            return {
                min,
                max
            };
        });
        filters.discount_amount = {
            active: true,
            values: ranges
        };
    }
    const discountAmountMin = urlParams.get("discount_amount_min");
    if (discountAmountMin) {
        const minValues = discountAmountMin.split(",").map(Number);
        if (!filters.discount_amount) {
            filters.discount_amount = {
                active: true,
                values: []
            };
        } // Add each min value as a range with null max
        minValues.forEach(min => {
            filters.discount_amount.values.push({
                min,
                max: null
            });
        });
        filters.discount_amount.active = true;
    }
    const discountPercent = urlParams.get("discount_percent");
    if (discountPercent) {
        const ranges = discountPercent.split(",").map(range => {
            const [min, max] = range.split("-").map(Number);
            return {
                min,
                max
            };
        });
        filters.discount_percent = {
            active: true,
            values: ranges
        };
    }
    const discountPercentMin = urlParams.get("discount_percent_min");
    if (discountPercentMin) {
        const minValues = discountPercentMin.split(",").map(Number);
        if (!filters.discount_percent) {
            filters.discount_percent = {
                active: true,
                values: []
            };
        } // Add each min value as a range with null max
        minValues.forEach(min => {
            filters.discount_percent.values.push({
                min,
                max: null
            });
        });
        filters.discount_percent.active = true;
    }["on_sale", "in_stock", "bundle", "subscription"].forEach(filterType => {
        const value = urlParams.get(filterType);
        if (value === "true") {
            filters[filterType] = {
                active: true,
                value: true
            };
        }
    });
    return filters;
};
/**
 * Updates URL parameters based on current filter state
 *
 * URL format conventions:
 * 1. Between different filter types: Always use AND logic with separate parameters
 *
 * 2. Within the same filter type:
 *    - For collection, product_type, product_tag: Use comma-separated values for OR logic
 *    - For variant filters:
 *      a) Group variants by name and use comma-separated values for OR logic within same variant type
 *      b) Different variant types use AND logic with separate parameters
 */
export const updateUrlWithFilters = (filters, url) => { //console.log("Updating URL with filters:", filters);
    // Clear existing filter params
    Array.from(url.searchParams.keys()).filter(key => key.startsWith("variant_") || ["product_type", "product_tag", "collection", "price", "price_min", "price_max", "discount_amount", "discount_amount_min", "discount_percent", "discount_percent_min", "on_sale", "in_stock", "bundle", "subscription", // Also include legacy filter names
        "product-type", "product-tag", "on-sale", "in-stock", "bundles", "subscriptions"
    ].includes(key)).forEach(key => url.searchParams.delete(key));
    ["collection", "product_type", "product_tag"].forEach(filterType => {
        if (filters[filterType] ? .active && filters[filterType] ? .values ? .length > 0) {
            url.searchParams.set(filterType, filters[filterType].values.join(",")); //console.log(`Set URL param ${filterType}=`, filters[filterType].values.join(','));
        }
    }); // Add variant filters
    // Group variant values by name, and each group uses comma-separated values for OR logic
    if (filters.variant ? .active && filters.variant ? .values ? .length > 0) { // Group variant values by name
        const variantGroups = {};
        filters.variant.values.forEach(variant => { // Use lowercase name for case-insensitive grouping
            const normalizeName = `variant_${variant.name}`;
            if (!variantGroups[normalizeName]) {
                variantGroups[normalizeName] = [];
            } // Avoid adding duplicate values
            if (!variantGroups[normalizeName].some(v => v.toLowerCase() === variant.value.toLowerCase())) {
                variantGroups[normalizeName].push(variant.value);
            }
        }); // Add each variant group to URL with comma-separated values (OR logic)
        Object.entries(variantGroups).forEach(([key, values]) => { // Don't encode the values here as URLSearchParams will handle that
            url.searchParams.set(key, values.join(",")); //console.log(`Set URL param ${key}=`, values.join(','), '(OR logic between values)');
        });
    } // Add price filters
    if (filters.price ? .active && filters.price.values ? .length > 0) { // const regularRanges = [];
        // const underMaxValues = [];
        // const overMinValues = [];
        const regularRanges = [];
        const underMaxValues = [];
        const overMinValues = [];
        filters.price.values.forEach(range => {
            if (range.priceType === "Under") {
                underMaxValues.push(range.max);
            } else if (range.priceType === "Over") {
                overMinValues.push(range.min);
            } else {
                regularRanges.push(`${range.min}-${range.max}`);
            }
        });
        if (regularRanges.length > 0) {
            url.searchParams.set("price", regularRanges.join(","));
        }
        if (underMaxValues.length > 0) {
            url.searchParams.set("price_max", underMaxValues.join(","));
        }
        if (overMinValues.length > 0) {
            url.searchParams.set("price_min", overMinValues.join(","));
        }
    } // Add discount filters
    if (filters.discount_amount ? .active && filters.discount_amount.values ? .length > 0) {
        const discountRanges = [];
        const discountMinValues = [];
        filters.discount_amount.values.forEach(range => {
            if (range.max === null) { // This is an "Over" type discount
                discountMinValues.push(range.min);
            } else { // This is a regular range
                discountRanges.push(`${range.min}-${range.max}`);
            }
        });
        if (discountRanges.length > 0) {
            url.searchParams.set("discount_amount", discountRanges.join(","));
        }
        if (discountMinValues.length > 0) {
            url.searchParams.set("discount_amount_min", discountMinValues.join(","));
        }
    }
    if (filters.discount_percent ? .active && filters.discount_percent.values ? .length > 0) {
        const discountPercentRanges = [];
        const discountPercentMinValues = [];
        filters.discount_percent.values.forEach(range => {
            if (range.max === null) { // This is an "Over" type discount
                discountPercentMinValues.push(range.min);
            } else { // This is a regular range
                discountPercentRanges.push(`${range.min}-${range.max}`);
            }
        });
        if (discountPercentRanges.length > 0) {
            url.searchParams.set("discount_percent", discountPercentRanges.join(","));
        }
        if (discountPercentMinValues.length > 0) {
            url.searchParams.set("discount_percent_min", discountPercentMinValues.join(","));
        }
    }["on_sale", "in_stock", "bundle", "subscription"].forEach(filterType => {
        if (filters[filterType] ? .active) {
            url.searchParams.set(filterType, "true");
        }
    });
};
export const __FramerMetadata__ = {
    "exports": {
        "FilterValue": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getFilterValue": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "parseUrlFilters": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "updateUrlWithFilters": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "convertFilterName": {
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
//# sourceMappingURL=./filterMappings.map