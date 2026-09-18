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
    addPropertyControls,
    ControlType
} from "framer";
import {
    useEffect,
    useState,
    useCallback,
    useRef
} from "react";
import {
    RenderTarget
} from "framer";
/**
 * @framerIntrinsicWidth 100%
 * @framerIntrinsicHeight auto
 * @framerSupportedLayoutWidth fixed | fill
 * @framerSupportedLayoutHeight fixed | auto
 */ // Helper function for consistent logging
const logDebug = (component, action, data) => { //console.log(`🔍 [${component}] ${action}:`, data)
};
/**
 * @framerDisableUnlink
 */
export default function FC_CatalogSearch(props) {
    const { // Text props
        text: {
            placeholder,
            font,
            color,
            placeholderColor
        }, // Styles props
        styles: {
            gap,
            padding,
            paddingPerSide,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            background: {
                color: backgroundColor,
                border,
                hoverBackground,
                hoverBorder,
                focusBackground,
                focusBorder
            },
            borderRadius,
            radiusPerCorner,
            radiusTopLeft,
            radiusTopRight,
            radiusBottomRight,
            radiusBottomLeft
        }, // Search Icon props
        searchIcon: {
            show: showSearchIcon,
            isCustom: searchIconIsCustom,
            custom: customSearchIcon,
            color: searchIconColor,
            weight: searchIconWeight,
            size: searchIconSize,
            background: {
                color: searchIconBgColor,
                padding: searchIconPadding,
                paddingPerSide: searchIconPaddingPerSide,
                paddingTop: searchIconPaddingTop,
                paddingRight: searchIconPaddingRight,
                paddingBottom: searchIconPaddingBottom,
                paddingLeft: searchIconPaddingLeft,
                radius: searchIconRadius,
                radiusPerCorner: searchIconRadiusPerCorner,
                radiusTopLeft: searchIconRadiusTopLeft,
                radiusTopRight: searchIconRadiusTopRight,
                radiusBottomRight: searchIconRadiusBottomRight,
                radiusBottomLeft: searchIconRadiusBottomLeft
            }
        }, // Clear props
        clear: {
            show: showClear,
            isText: clearIsText,
            content: clearText,
            font: clearFont,
            color: clearColor,
            transform: clearTextTransform, // Icon properties for clear
            iconIsCustom,
            iconCustom,
            iconColor,
            iconWeight,
            iconSize, // Background properties for clear
            background: clearBackground,
            padding: clearPadding,
            paddingPerSide: clearPaddingPerSide,
            paddingTop: clearPaddingTop,
            paddingRight: clearPaddingRight,
            paddingBottom: clearPaddingBottom,
            paddingLeft: clearPaddingLeft,
            radius: clearRadius,
            radiusPerCorner: clearRadiusPerCorner,
            radiusTopLeft: clearRadiusTopLeft,
            radiusTopRight: clearRadiusTopRight,
            radiusBottomRight: clearRadiusBottomRight,
            radiusBottomLeft: clearRadiusBottomLeft,
            border: {
                color: clearBorderColor,
                width: clearBorderWidth,
                style: clearBorderStyle
            }
        }, // Functionality props
        behavior: {
            realTime: realTime,
            debounceDelay,
            page: page,
            slug: slug
        }
    } = props; // Fixed accessibility values
    const searchLabel = "Search products";
    const ariaLabel = "Search products"; // State for input value and UI states
    const [searchValue, setSearchValue] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [showClearButton, setShowClearButton] = useState(false);
    const inputRef = useRef(null);
    const searchTimeoutRef = useRef(null);
    const mountedRef = useRef(false); // Generate a unique component ID
    const uniqueComponentId = useRef(`search-${Math.random().toString(36).substring(2,9)}`).current; // Detect if we're in canvas vs browser
    const isCanvas = () => { // In canvas mode, window is defined but certain browser features are limited
        if (typeof window === "undefined") return false;
        try { // Check for Framer-specific environment indicators
            return window.document ? .location ? .href.includes("framer") || window.document ? .location ? .pathname.includes("preview") || !window.document ? .location ? .host || window.parent !== window;
        } catch (e) { // If we can't access these properties, we're likely in a restricted environment like Canvas
            return true;
        }
    }; // Helper function to generate border style
    const getBorderStyle = borderConfig => {
        if (borderConfig.isMixed) {
            return {
                borderTop: `${borderConfig.top}px ${borderConfig.style} ${borderConfig.color}`,
                borderRight: `${borderConfig.right}px ${borderConfig.style} ${borderConfig.color}`,
                borderBottom: `${borderConfig.bottom}px ${borderConfig.style} ${borderConfig.color}`,
                borderLeft: `${borderConfig.left}px ${borderConfig.style} ${borderConfig.color}`
            };
        }
        return {
            border: `${borderConfig.width}px ${borderConfig.style} ${borderConfig.color}`
        };
    }; // Helper function to generate hover border style
    const getHoverBorderStyle = borderConfig => {
        if (borderConfig.isMixed) {
            return {
                borderTop: `${borderConfig.top}px ${borderConfig.style} ${borderConfig.color}`,
                borderRight: `${borderConfig.right}px ${borderConfig.style} ${borderConfig.color}`,
                borderBottom: `${borderConfig.bottom}px ${borderConfig.style} ${borderConfig.color}`,
                borderLeft: `${borderConfig.left}px ${borderConfig.style} ${borderConfig.color}`
            };
        }
        return {
            border: `${borderConfig.width}px ${borderConfig.style} ${borderConfig.color}`
        };
    }; // Helper function to generate focus border style
    const getFocusBorderStyle = borderConfig => {
        if (borderConfig.isMixed) {
            return {
                borderTop: `${borderConfig.top}px ${borderConfig.style} ${borderConfig.color}`,
                borderRight: `${borderConfig.right}px ${borderConfig.style} ${borderConfig.color}`,
                borderBottom: `${borderConfig.bottom}px ${borderConfig.style} ${borderConfig.color}`,
                borderLeft: `${borderConfig.left}px ${borderConfig.style} ${borderConfig.color}`
            };
        }
        return {
            border: `${borderConfig.width}px ${borderConfig.style} ${borderConfig.color}`
        };
    }; // Generate border radius values
    const getBorderRadius = () => {
        if (radiusPerCorner) {
            return {
                borderTopLeftRadius: `${radiusTopLeft}px`,
                borderTopRightRadius: `${radiusTopRight}px`,
                borderBottomRightRadius: `${radiusBottomRight}px`,
                borderBottomLeftRadius: `${radiusBottomLeft}px`
            };
        }
        return {
            borderRadius: `${borderRadius}px`
        };
    }; // Generate padding values
    const getPadding = () => {
        if (paddingPerSide) {
            return {
                paddingTop: `${paddingTop}px`,
                paddingRight: `${paddingRight}px`,
                paddingBottom: `${paddingBottom}px`,
                paddingLeft: `${paddingLeft}px`
            };
        }
        return {
            padding: `${padding}px`
        };
    }; // Apply text transform
    const getTransformedText = (text, transform) => {
        switch (transform) {
            case "Uppercase":
                return text.toUpperCase();
            case "Lowercase":
                return text.toLowerCase();
            case "Capitalize":
                return text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
            default:
                return text;
        }
    }; // Create a unique class name for the input
    const className = `fc-search-input-${uniqueComponentId}`; // Create a style element for pseudo-classes
    useEffect(() => {
        const styleEl = document.createElement("style");
        styleEl.innerHTML = `
            .${className}::placeholder {
                color: ${placeholderColor};
            }
            .${className}-container:hover .${className}:not(:focus) {
                background-color: ${hoverBackground} !important;
                ${Object.entries(getHoverBorderStyle(hoverBorder)).map(([key,value])=>`${key}: ${value} !important;`).join(" ")}
            }
            .${className}:focus {
                background-color: ${focusBackground} !important;
                ${Object.entries(getFocusBorderStyle(focusBorder)).map(([key,value])=>`${key}: ${value} !important;`).join(" ")}
            }
            /* Hide the default browser search cancel button */
            .${className}::-webkit-search-cancel-button,
            .${className}::-webkit-search-decoration,
            .${className}::-ms-clear {
                -webkit-appearance: none;
                appearance: none;
                display: none;
            }
        `;
        document.head.appendChild(styleEl);
        return () => styleEl.remove();
    }, [className, placeholderColor, hoverBackground, hoverBorder, focusBackground, focusBorder]); // Calculate padding for icons
    const getIconPadding = side => {
        if (paddingPerSide) {
            return side === "left" ? paddingLeft : paddingRight;
        }
        return padding;
    }; // Search container style
    const containerStyle = {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center"
    }; // Input style with space for icons
    const inputStyle = {
        width: "100%",
        height: "100%",
        ...getPadding(),
        ...getBorderRadius(),
        ...font,
        color: color,
        backgroundColor: backgroundColor,
        ...getBorderStyle(border),
        outline: "none",
        transition: "all 0.2s ease-in-out",
        ...showSearchIcon ? {
            paddingLeft: `${getIconPadding("left")+searchIconSize+gap}px`
        } : {},
        ...showClear ? {
            paddingRight: `${getIconPadding("right")+(clearIsText?40:iconSize)+gap}px`
        } : {}
    }; // Generate search icon border radius values
    const getSearchIconBorderRadius = () => {
        if (searchIconRadiusPerCorner) {
            return {
                borderTopLeftRadius: `${searchIconRadiusTopLeft}px`,
                borderTopRightRadius: `${searchIconRadiusTopRight}px`,
                borderBottomRightRadius: `${searchIconRadiusBottomRight}px`,
                borderBottomLeftRadius: `${searchIconRadiusBottomLeft}px`
            };
        }
        return {
            borderRadius: `${searchIconRadius}px`
        };
    }; // Generate search icon padding values
    const getSearchIconPadding = () => {
        if (searchIconPaddingPerSide) {
            return {
                paddingTop: `${searchIconPaddingTop}px`,
                paddingRight: `${searchIconPaddingRight}px`,
                paddingBottom: `${searchIconPaddingBottom}px`,
                paddingLeft: `${searchIconPaddingLeft}px`
            };
        }
        return {
            padding: `${searchIconPadding}px`
        };
    }; // Generate clear button border radius values
    const getClearBorderRadius = () => {
        if (clearRadiusPerCorner) {
            return {
                borderTopLeftRadius: `${clearRadiusTopLeft}px`,
                borderTopRightRadius: `${clearRadiusTopRight}px`,
                borderBottomRightRadius: `${clearRadiusBottomRight}px`,
                borderBottomLeftRadius: `${clearRadiusBottomLeft}px`
            };
        }
        return {
            borderRadius: `${clearRadius}px`
        };
    }; // Generate clear button padding values
    const getClearPadding = () => {
        if (clearPaddingPerSide) {
            return {
                paddingTop: `${clearPaddingTop}px`,
                paddingRight: `${clearPaddingRight}px`,
                paddingBottom: `${clearPaddingBottom}px`,
                paddingLeft: `${clearPaddingLeft}px`
            };
        }
        return {
            padding: `${clearPadding}px`
        };
    }; // Search icon style
    const searchIconStyle = {
        position: "absolute",
        left: `${getIconPadding("left")}px`,
        top: "50%",
        transform: "translateY(-50%)",
        color: searchIconColor,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: searchIconBgColor,
        ...getSearchIconPadding(),
        ...getSearchIconBorderRadius()
    }; // Clear button style
    const clearButtonStyle = {
        position: "absolute",
        right: `${getIconPadding("right")}px`,
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: clearBackground,
        border: `${clearBorderWidth}px ${clearBorderStyle} ${clearBorderColor}`,
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        ...getClearPadding(),
        ...getClearBorderRadius(),
        ...clearIsText ? { ...clearFont,
            color: clearColor || "#999999"
        } : {
            color: iconColor || "#999999"
        },
        textTransform: clearIsText && clearTextTransform ? clearTextTransform.toLowerCase() : undefined, // Only show when there's text in the field or in canvas
        display: searchValue || RenderTarget.current() === "CANVAS" ? "flex" : "none", // Accessibility
        tabIndex: 0,
        outline: "none"
    }; // Function to dispatch search event
    const dispatchSearchEvent = useCallback(searchTerm => {
        try {
            logDebug("Search", "Dispatching search event", {
                searchTerm,
                componentId: uniqueComponentId
            }); // Update URL with search parameter
            if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                if (searchTerm) {
                    url.searchParams.set("search", searchTerm);
                } else {
                    url.searchParams.delete("search");
                } // Update URL without reloading the page
                window.history.pushState({}, "", url.toString());
            } // Dispatch custom event for search - this will be caught by the GlobalCMS component
            const searchEvent = new CustomEvent("product-search-change", {
                detail: {
                    term: searchTerm,
                    componentId: uniqueComponentId
                }
            });
            document.dispatchEvent(searchEvent); // Also dispatch the standard filter-navigation event
            const navigationEvent = new CustomEvent("filter-navigation", {
                detail: {
                    search: searchTerm,
                    sourceComponentId: uniqueComponentId
                }
            });
            document.dispatchEvent(navigationEvent);
        } catch (error) {
            console.error("Error dispatching search event:", error);
        }
    }, [uniqueComponentId]); // Debounced search handler
    const handleSearch = useCallback(value => {
        if (!realTime) return;
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            dispatchSearchEvent(value);
        }, debounceDelay);
    }, [dispatchSearchEvent, debounceDelay, realTime]); // Input change handler
    const handleInputChange = useCallback(e => {
        const value = e.target.value;
        setSearchValue(value); // Only show clear button when there's text AND clear feature is enabled
        setShowClearButton(!!value && showClear);
        handleSearch(value);
    }, [handleSearch, showClear]); // Key down handler for Enter key
    const handleKeyDown = useCallback(e => {
        if (e.key === "Enter") {
            e.preventDefault(); // Clear any pending debounce and search immediately
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            if (page) { // Navigate to search page
                const searchTerm = searchValue.trim();
                if (searchTerm) {
                    window.location.href = `/${slug}?search=${encodeURIComponent(searchTerm)}`;
                } else {
                    window.location.href = `/${slug}`;
                }
            } else {
                dispatchSearchEvent(searchValue);
            }
        } else if (e.key === "Escape") {
            setSearchValue("");
            setShowClearButton(false);
            dispatchSearchEvent("");
            inputRef.current ? .blur();
        }
    }, [searchValue, dispatchSearchEvent, page, slug]); // Clear search handler
    const handleClearSearch = useCallback(() => {
        setSearchValue("");
        setShowClearButton(false);
        dispatchSearchEvent("");
        inputRef.current ? .focus();
    }, [dispatchSearchEvent]); // Initialize component
    useEffect(() => {
        mountedRef.current = true; // Check URL for existing search parameter
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const searchParam = urlParams.get("search");
            if (searchParam) {
                setSearchValue(searchParam);
                setShowClearButton(!isCanvas() ? true : showClearButton);
            }
        } // Set initial state for the clear button based on environment and text
        if (isCanvas() && showClear) {
            setShowClearButton(true);
        } else {
            setShowClearButton(!!searchValue && showClear);
        } // Listen for external search events
        const handleExternalSearchChange = e => {
            if (e.detail.componentId !== uniqueComponentId) {
                logDebug("Search", "Received external search event", {
                    term: e.detail.term,
                    fromComponentId: e.detail.componentId
                });
                setSearchValue(e.detail.term || "");
                setShowClearButton(!!e.detail.term);
            }
        };
        document.addEventListener("product-search-change", handleExternalSearchChange);
        return () => {
            mountedRef.current = false;
            document.removeEventListener("product-search-change", handleExternalSearchChange);
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [uniqueComponentId]); // For Framer canvas - ensure clear button is always visible
    useEffect(() => {
        if (isCanvas() && showClear) { // In canvas, always show the clear button for styling purposes
            setShowClearButton(true);
        } else { // In browser, only show clear button when there's text
            setShowClearButton(!!searchValue && showClear);
        }
    }, [searchValue, showClear, isCanvas]); // Render search icon based on type
    const renderSearchIcon = () => {
        if (!showSearchIcon) return null; // When custom image is provided AND isCustom is false, show the custom image
        // Otherwise show the default SVG icon
        if (!searchIconIsCustom && customSearchIcon) {
            return /*#__PURE__*/ _jsx("img", {
                src: customSearchIcon,
                alt: "Search",
                width: searchIconSize,
                height: searchIconSize,
                style: {
                    width: `${searchIconSize}px`,
                    height: `${searchIconSize}px`,
                    strokeWidth: `${searchIconWeight}px`
                }
            });
        } // Default Phosphor magnifying glass icon
        return /*#__PURE__*/ _jsxs("svg", {
            width: searchIconSize,
            height: searchIconSize,
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [ /*#__PURE__*/ _jsx("circle", {
                cx: "11",
                cy: "11",
                r: "8",
                stroke: searchIconColor,
                strokeWidth: searchIconWeight,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }), /*#__PURE__*/ _jsx("path", {
                d: "M21 21L16.65 16.65",
                stroke: searchIconColor,
                strokeWidth: searchIconWeight,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })]
        });
    }; // Render the clear button content based on type and style
    const renderClearContent = () => { // Always show in canvas, only hide in browser when not enabled
        if (!showClear && RenderTarget.current() !== "CANVAS") return null; // Text mode
        if (clearIsText) { // Make sure there's always text content for the clear button
            const displayText = clearText || "Clear";
            return getTransformedText(displayText, clearTextTransform);
        } // Custom icon mode
        if (!iconIsCustom && iconCustom) {
            return /*#__PURE__*/ _jsx("img", {
                src: iconCustom,
                alt: "Clear search",
                width: iconSize,
                height: iconSize,
                style: {
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    strokeWidth: `${iconWeight}px`
                }
            });
        } // Default X icon
        return /*#__PURE__*/ _jsx("svg", {
            width: iconSize,
            height: iconSize,
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            children: /*#__PURE__*/ _jsx("path", {
                d: "M18 6L6 18M6 6l12 12",
                stroke: iconColor || "#999999",
                strokeWidth: iconWeight,
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })
        });
    }; // Render search component
    return /*#__PURE__*/ _jsxs("div", {
        className: `${className}-container`,
        style: containerStyle,
        role: "search",
        "aria-label": searchLabel,
        children: [showSearchIcon && /*#__PURE__*/ _jsx("div", {
            style: searchIconStyle,
            children: renderSearchIcon()
        }), /*#__PURE__*/ _jsx("input", {
            ref: inputRef,
            className: className,
            type: "text",
            placeholder: placeholder,
            value: searchValue,
            onChange: handleInputChange,
            onKeyDown: handleKeyDown,
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
            style: inputStyle,
            "aria-label": ariaLabel,
            autoComplete: "off"
        }), showClear && /*#__PURE__*/ _jsx("button", {
            type: "button",
            style: clearButtonStyle,
            onClick: handleClearSearch,
            "aria-label": "Clear search",
            tabIndex: 0,
            children: renderClearContent()
        })]
    });
}
FC_CatalogSearch.defaultProps = { // Text defaults
    text: {
        placeholder: "Search...",
        font: {
            family: "Inter",
            fontSize: 16,
            weight: 400
        },
        color: "#000000",
        placeholderColor: "#999999"
    }, // Styles defaults
    styles: {
        gap: 12,
        padding: 12,
        paddingPerSide: false,
        paddingTop: 12,
        paddingRight: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        background: {
            color: "#ffffff",
            border: {
                width: 1,
                color: "#EBEBEB",
                style: "solid"
            },
            hoverBackground: "#f8f8f8",
            hoverBorder: {
                width: 1,
                color: "#D1D1D1",
                style: "solid"
            },
            focusBackground: "#ffffff",
            focusBorder: {
                width: 1,
                color: "#0099ff",
                style: "solid"
            }
        },
        borderRadius: 4,
        radiusPerCorner: false,
        radiusTopLeft: 4,
        radiusTopRight: 4,
        radiusBottomRight: 4,
        radiusBottomLeft: 4
    }, // Search Icon defaults
    searchIcon: {
        show: true,
        isCustom: false,
        custom: "",
        color: "#999999",
        weight: 1.5,
        size: 16,
        background: {
            color: "transparent",
            padding: 4,
            paddingPerSide: false,
            paddingTop: 4,
            paddingRight: 4,
            paddingBottom: 4,
            paddingLeft: 4,
            radius: 4,
            radiusPerCorner: false,
            radiusTopLeft: 4,
            radiusTopRight: 4,
            radiusBottomRight: 4,
            radiusBottomLeft: 4
        }
    }, // Clear defaults
    clear: {
        show: true,
        isText: false,
        content: "Clear",
        font: {
            family: "Inter",
            fontSize: 14,
            weight: 400
        },
        transform: "None",
        color: "#999999", // Icon properties for clear
        iconIsCustom: false,
        iconCustom: "",
        iconColor: "#999999",
        iconWeight: 1.5,
        iconSize: 12, // Background properties for clear
        background: "#F7F7F7",
        padding: 4,
        paddingPerSide: false,
        paddingTop: 4,
        paddingRight: 4,
        paddingBottom: 4,
        paddingLeft: 4,
        radius: 24,
        radiusPerCorner: false,
        radiusTopLeft: 24,
        radiusTopRight: 24,
        radiusBottomRight: 24,
        radiusBottomLeft: 24,
        border: {
            color: "#000000",
            width: 0,
            style: "solid"
        }
    }, // Behavior defaults
    behavior: {
        realTime: true,
        debounceDelay: 300,
        page: false,
        slug: "search"
    }
};
addPropertyControls(FC_CatalogSearch, { // Text Group
    text: {
        type: ControlType.Object,
        title: "Text",
        controls: {
            placeholder: {
                type: ControlType.String,
                title: "Placeholder",
                defaultValue: "Search..."
            },
            font: {
                type: ControlType.Font,
                title: "Font",
                controls: "extended"
            },
            color: {
                type: ControlType.Color,
                title: "Color",
                defaultValue: "#000000"
            },
            placeholderColor: {
                type: ControlType.Color,
                title: "Placeholder",
                defaultValue: "#999999"
            }
        }
    }, // Styles controls (renamed from "Spacing")
    styles: {
        type: ControlType.Object,
        title: "Styles",
        controls: {
            gap: {
                type: ControlType.Number,
                title: "Gap",
                defaultValue: 12,
                min: 0,
                step: 1,
                unit: "px"
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
                defaultValue: 12,
                toggleKey: "paddingPerSide",
                toggleTitles: ["All", "Sides"],
                valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
                valueLabels: ["T", "R", "B", "L"],
                min: 0
            },
            borderRadius: {
                type: ControlType.FusedNumber,
                title: "Radius",
                defaultValue: 4,
                toggleKey: "radiusPerCorner",
                toggleTitles: ["All", "Corners"],
                valueKeys: ["radiusTopLeft", "radiusTopRight", "radiusBottomRight", "radiusBottomLeft"],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0
            }, // Background nested within Styles
            background: {
                type: ControlType.Object,
                title: "BG",
                controls: {
                    color: {
                        type: ControlType.Color,
                        title: "Color",
                        defaultValue: "#ffffff"
                    },
                    border: {
                        type: ControlType.Object,
                        title: "Border",
                        controls: {
                            color: {
                                type: ControlType.Color,
                                title: "Color",
                                defaultValue: "#EBEBEB"
                            },
                            width: {
                                type: ControlType.FusedNumber,
                                title: "Width",
                                toggleKey: "isMixed",
                                toggleTitles: ["All", "Individual"],
                                valueKeys: ["top", "right", "bottom", "left"],
                                valueLabels: ["T", "R", "B", "L"],
                                min: 0,
                                defaultValue: 1
                            },
                            style: {
                                type: ControlType.Enum,
                                title: "Style",
                                options: ["solid", "dashed", "dotted", "double"],
                                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                                defaultValue: "solid"
                            }
                        }
                    },
                    hoverBackground: {
                        type: ControlType.Color,
                        title: "Hover",
                        defaultValue: "#f8f8f8"
                    },
                    hoverBorder: {
                        type: ControlType.Object,
                        title: "Hover Border",
                        controls: {
                            color: {
                                type: ControlType.Color,
                                title: "Color",
                                defaultValue: "#000000"
                            },
                            width: {
                                type: ControlType.FusedNumber,
                                title: "Width",
                                toggleKey: "isMixed",
                                toggleTitles: ["All", "Individual"],
                                valueKeys: ["top", "right", "bottom", "left"],
                                valueLabels: ["T", "R", "B", "L"],
                                min: 0,
                                defaultValue: 1
                            },
                            style: {
                                type: ControlType.Enum,
                                title: "Style",
                                options: ["solid", "dashed", "dotted", "double"],
                                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                                defaultValue: "solid"
                            }
                        }
                    },
                    focusBackground: {
                        type: ControlType.Color,
                        title: "Focus",
                        defaultValue: "#ffffff"
                    },
                    focusBorder: {
                        type: ControlType.Object,
                        title: "Focus Border",
                        controls: {
                            color: {
                                type: ControlType.Color,
                                title: "Color",
                                defaultValue: "#000000"
                            },
                            width: {
                                type: ControlType.FusedNumber,
                                title: "Width",
                                toggleKey: "isMixed",
                                toggleTitles: ["All", "Individual"],
                                valueKeys: ["top", "right", "bottom", "left"],
                                valueLabels: ["T", "R", "B", "L"],
                                min: 0,
                                defaultValue: 1
                            },
                            style: {
                                type: ControlType.Enum,
                                title: "Style",
                                options: ["solid", "dashed", "dotted", "double"],
                                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                                defaultValue: "solid"
                            }
                        }
                    }
                }
            }
        }
    }, // Search Icon Group
    searchIcon: {
        type: ControlType.Object,
        title: "Search Icon",
        controls: {
            show: {
                type: ControlType.Boolean,
                title: "Show",
                defaultValue: true,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            isCustom: {
                type: ControlType.Boolean,
                title: "Icon",
                defaultValue: false,
                enabledTitle: "Default",
                disabledTitle: "Custom",
                hidden: props => !props.show
            },
            weight: {
                type: ControlType.Number,
                title: "Weight",
                defaultValue: 1.5,
                min: .5,
                max: 5,
                step: .5,
                unit: "px",
                hidden: props => !props.show || !props.isCustom
            },
            size: {
                type: ControlType.Number,
                title: "Size",
                defaultValue: 16,
                min: 8,
                max: 48,
                step: 4,
                unit: "px",
                hidden: props => !props.show
            },
            custom: {
                type: ControlType.Image,
                title: "Image",
                hidden: props => !props.show || props.isCustom
            },
            color: {
                type: ControlType.Color,
                title: "Color",
                defaultValue: "#999999",
                hidden: props => !props.show || props.isCustom
            }, // Background nested within Search Icon
            background: {
                type: ControlType.Object,
                title: "BG",
                controls: {
                    color: {
                        type: ControlType.Color,
                        title: "Color",
                        defaultValue: "transparent"
                    },
                    padding: {
                        type: ControlType.FusedNumber,
                        title: "Padding",
                        defaultValue: 4,
                        toggleKey: "paddingPerSide",
                        toggleTitles: ["All", "Sides"],
                        valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
                        valueLabels: ["T", "R", "B", "L"],
                        min: 0
                    },
                    radius: {
                        type: ControlType.FusedNumber,
                        title: "Radius",
                        defaultValue: 4,
                        toggleKey: "radiusPerCorner",
                        toggleTitles: ["All", "Corners"],
                        valueKeys: ["radiusTopLeft", "radiusTopRight", "radiusBottomRight", "radiusBottomLeft"],
                        valueLabels: ["TL", "TR", "BR", "BL"],
                        min: 0
                    },
                    border: {
                        type: ControlType.Object,
                        title: "Border",
                        controls: {
                            color: {
                                type: ControlType.Color,
                                title: "Color",
                                defaultValue: "#EBEBEB"
                            },
                            width: {
                                type: ControlType.FusedNumber,
                                title: "Width",
                                toggleKey: "isMixed",
                                toggleTitles: ["All", "Individual"],
                                valueKeys: ["top", "right", "bottom", "left"],
                                valueLabels: ["T", "R", "B", "L"],
                                min: 0,
                                defaultValue: 1
                            },
                            style: {
                                type: ControlType.Enum,
                                title: "Style",
                                options: ["solid", "dashed", "dotted", "double"],
                                optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                                defaultValue: "solid"
                            }
                        }
                    }
                },
                hidden: props => !props.show
            }
        }
    }, // Clear Button Group
    clear: {
        type: ControlType.Object,
        title: "Clear",
        controls: {
            show: {
                type: ControlType.Boolean,
                title: "Show",
                defaultValue: true,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            isText: {
                type: ControlType.Boolean,
                title: "Type",
                defaultValue: false,
                enabledTitle: "Text",
                disabledTitle: "Icon",
                hidden: props => !props.show
            }, // Text properties
            content: {
                type: ControlType.String,
                title: "Text",
                defaultValue: "Clear",
                hidden: props => !props.show || !props.isText
            },
            font: {
                type: ControlType.Font,
                title: "Font",
                controls: "extended",
                hidden: props => !props.show || !props.isText
            },
            transform: {
                type: ControlType.Enum,
                title: "Transform",
                options: ["None", "Uppercase", "Lowercase", "Capitalize"],
                defaultValue: "None",
                hidden: props => !props.show || !props.isText
            },
            color: {
                type: ControlType.Color,
                title: "Color",
                defaultValue: "#999999",
                hidden: props => !props.show || !props.isText
            }, // Icon properties for clear
            iconIsCustom: {
                type: ControlType.Boolean,
                title: "Icon",
                defaultValue: false,
                enabledTitle: "Default",
                disabledTitle: "Custom",
                hidden: props => !props.show || props.isText
            },
            iconWeight: {
                type: ControlType.Number,
                title: "Weight",
                defaultValue: 1.5,
                min: .5,
                max: 5,
                step: .5,
                unit: "px",
                hidden: props => !props.show || props.isText || !props.iconIsCustom
            },
            iconSize: {
                type: ControlType.Number,
                title: "Size",
                defaultValue: 12,
                min: 8,
                max: 48,
                step: 4,
                unit: "px",
                hidden: props => !props.show || props.isText
            },
            iconCustom: {
                type: ControlType.Image,
                title: "Image",
                hidden: props => !props.show || props.isText || props.clear.iconIsCustom
            },
            iconColor: {
                type: ControlType.Color,
                title: "Color",
                defaultValue: "#999999",
                hidden: props => !props.show || props.isText || props.clear.iconIsCustom
            }, // Background properties
            background: {
                type: ControlType.Color,
                title: "Background",
                defaultValue: "#F7F7F7",
                hidden: props => !props.show
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
                defaultValue: 4,
                toggleKey: "paddingPerSide",
                toggleTitles: ["All", "Sides"],
                valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
                hidden: props => !props.show
            },
            radius: {
                type: ControlType.FusedNumber,
                title: "Radius",
                defaultValue: 24,
                toggleKey: "radiusPerCorner",
                toggleTitles: ["All", "Corners"],
                valueKeys: ["radiusTopLeft", "radiusTopRight", "radiusBottomRight", "radiusBottomLeft"],
                valueLabels: ["TL", "TR", "BR", "BL"],
                min: 0,
                hidden: props => !props.show
            },
            border: {
                type: ControlType.Object,
                title: "Border",
                controls: {
                    color: {
                        type: ControlType.Color,
                        title: "Color",
                        defaultValue: "#000000"
                    },
                    width: {
                        type: ControlType.Number,
                        title: "Width",
                        defaultValue: 0,
                        min: 0,
                        step: 1,
                        unit: "px"
                    },
                    style: {
                        type: ControlType.Enum,
                        title: "Style",
                        options: ["solid", "dashed", "dotted", "double"],
                        optionTitles: ["Solid", "Dashed", "Dotted", "Double"],
                        defaultValue: "solid"
                    }
                },
                hidden: props => !props.show
            }
        }
    }, // Behavior Group
    behavior: {
        type: ControlType.Object,
        title: "Behavior",
        controls: {
            realTime: {
                type: ControlType.Boolean,
                title: "Real Time",
                description: "Update results in real time",
                defaultValue: true,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            debounceDelay: {
                type: ControlType.Number,
                title: "Delay",
                description: "Milliseconds before search is triggered after typing",
                defaultValue: 300,
                min: 0,
                max: 2e3,
                step: 50,
                hidden: props => !props.realTime
            },
            page: {
                type: ControlType.Boolean,
                title: "Page",
                description: "Pressing Enter will navigate to a dedicated Search page with results",
                defaultValue: false,
                enabledTitle: "Yes",
                disabledTitle: "No"
            },
            slug: {
                type: ControlType.String,
                title: "Slug",
                description: "The slug of your dedicated Search page",
                defaultValue: "search",
                placeholder: "search",
                hidden: props => !props.page
            }
        }
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CatalogSearch",
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
//# sourceMappingURL=./FC_CatalogSearch.map