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
    useState,
    useRef,
    useMemo
} from "react";
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    useIsBrowser
} from "https://framerusercontent.com/modules/ncBs5KPMI9I5GEta13fn/zGXDjuZapa1SGy6D8P5e/IsBrowser.js";
import {
    COUNTRY_DATA
} from "https://framerusercontent.com/modules/N4sehPZvaJy8xzJ4hqGI/VFyWNOlzImx2jSkBS7Mm/countryFlags.js";
const loadFlag = async (countryCode, isSquare = true) => { // Return early if countryCode is missing
    if (!countryCode) {
        return null;
    }
    const maxRetries = 3;
    let retryCount = 0;
    while (retryCount < maxRetries) {
        try {
            const suffix = isSquare ? "-1x1" : "-4x3";
            const iconName = `flag:${countryCode.toLowerCase()}${suffix}`;
            const apiUrl = `https://api.iconify.design/${iconName}.svg`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch icon: ${response.status} ${response.statusText}`);
            }
            let svgContent = await response.text(); // Validate SVG content
            if (!svgContent.includes("<svg") || !svgContent.includes("</svg>")) {
                throw new Error("Invalid SVG content received");
            } // Extract viewBox
            const viewBoxMatch = svgContent.match(/viewBox=["']([^"']*)["']/i);
            const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 512 512"; // Create a data URL from the SVG content
            const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
            return {
                svg: dataUrl,
                viewBox: viewBox
            };
        } catch (error) {
            retryCount++;
            console.warn(`Error loading flag for ${countryCode}, attempt ${retryCount}:`, error);
            if (retryCount === maxRetries) {
                console.error(`Failed to load flag for ${countryCode} after ${maxRetries} attempts`);
                return null;
            } // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1e3));
        }
    }
    return null;
};
const ASPECT_RATIOS = {
    square: 1,
    rectangle: 4 / 3
};
/**
 * @framerDisableUnlink
 */
export default function FC_GlobalCountryFlags(props) {
    const [activeCurrency, setActiveCurrency] = useState("");
    const [activeCountry, setActiveCountry] = useState("");
    const [activeCountryCode, setActiveCountryCode] = useState("");
    const [flagData, setFlagData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldShow, setShouldShow] = useState(true);
    const isBrowser = useIsBrowser();
    const isCanvas = RenderTarget.current() === RenderTarget.canvas; // Memoize canvas country code to prevent unnecessary updates
    const canvasCountryCode = useMemo(() => {
        if (isCanvas) {
            return props.useActive ? props.canvas : props.country || "US";
        }
        return "";
    }, [isCanvas, props.useActive, props.canvas, props.country]); // Always show static flags in browser mode when not using active country
    const shouldAttemptLoad = useMemo(() => {
        if (isCanvas) return true;
        if (!isBrowser) return false;
        if (!props.useActive) return true;
        return shouldShow;
    }, [isCanvas, isBrowser, props.useActive, shouldShow]); // Track mounted state to prevent updates after unmount
    const isMounted = useRef(true);
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);
    useEffect(() => { // Skip all browser-specific logic in canvas mode
        if (isCanvas) {
            setShouldShow(true);
            return;
        }
        if (!isBrowser) return;
        const getStoredCurrencyData = () => {
            try {
                const storedCurrency = localStorage.getItem("selectedCurrency");
                const storedCountry = localStorage.getItem("selectedCountry");
                const storedCountryCode = localStorage.getItem("selectedCountryCode"); // Only set data if we have both currency and country code
                if (storedCurrency && storedCountryCode) {
                    setActiveCurrency(storedCurrency);
                    setActiveCountry(storedCountry || "");
                    setActiveCountryCode(storedCountryCode);
                    setShouldShow(true);
                } else if (!props.useActive) { // If not using active country, still show flag with static country
                    setShouldShow(true);
                } else {
                    setShouldShow(false);
                }
            } catch (e) { // If localStorage fails, fallback to default behavior
                if (!props.useActive) {
                    setShouldShow(true);
                } else {
                    setShouldShow(false);
                }
            }
        };
        getStoredCurrencyData();
        const handleCurrencyChange = event => { // Handle both event types
            if (event.type === "currency_changed") {
                const {
                    currency,
                    country,
                    countryCode
                } = event.detail;
                if (currency && countryCode) {
                    setActiveCurrency(currency);
                    setActiveCountry(country || "");
                    setActiveCountryCode(countryCode);
                    setShouldShow(true); // Update localStorage
                    localStorage.setItem("selectedCurrency", currency);
                    if (country) localStorage.setItem("selectedCountry", country);
                    localStorage.setItem("selectedCountryCode", countryCode);
                } else {
                    setShouldShow(false);
                }
            } else if (event.type === "shop__currency-updated") {
                const {
                    toCurrency
                } = event.detail;
                if (toCurrency) { // Map currency to country code using the currency maps
                    const countryCode = mapCurrencyToCountry(toCurrency);
                    if (countryCode) {
                        setActiveCountryCode(countryCode);
                        setActiveCurrency(toCurrency);
                        setShouldShow(true);
                        localStorage.setItem("selectedCountryCode", countryCode);
                        localStorage.setItem("selectedCurrency", toCurrency);
                    } else {
                        setShouldShow(false);
                    }
                } else {
                    setShouldShow(false);
                }
            }
        }; // Add listeners for both event types
        window.addEventListener("currency_changed", handleCurrencyChange);
        window.addEventListener("shop__currency-updated", handleCurrencyChange);
        return () => {
            window.removeEventListener("currency_changed", handleCurrencyChange);
            window.removeEventListener("shop__currency-updated", handleCurrencyChange);
        };
    }, [isBrowser, isCanvas, props.useActive]);
    useEffect(() => { // Don't attempt to load if we've determined we shouldn't
        if (!shouldAttemptLoad) {
            setFlagData(null);
            setIsLoading(false);
            return;
        } // Determine which country code to use
        let displayCountryCode;
        if (isCanvas) {
            displayCountryCode = canvasCountryCode;
        } else if (!props.useActive) {
            displayCountryCode = props.country;
        } else {
            displayCountryCode = activeCountryCode; // Don't proceed if active mode but no country code
            if (!displayCountryCode) {
                setFlagData(null);
                setIsLoading(false);
                return;
            }
        }
        setIsLoading(true);
        loadFlag(displayCountryCode, props.isSquare).then(data => {
            if (!isMounted.current) return;
            setFlagData(data); // For active mode, control visibility based on data
            if (props.useActive && !isCanvas) {
                setShouldShow(!!data);
            }
            setIsLoading(false);
        }).catch(() => {
            if (!isMounted.current) return;
            if (props.useActive && !isCanvas) {
                setShouldShow(false);
            }
            setIsLoading(false);
        });
    }, [props.useActive, props.country, props.isSquare, activeCountryCode, isCanvas, canvasCountryCode, shouldAttemptLoad]); // Don't render anything if we shouldn't show
    if (!shouldAttemptLoad || !shouldShow && props.useActive && !isCanvas) {
        return null;
    } // For canvas mode, if we have no flag data, return null
    if (isCanvas && !flagData) {
        return null;
    } // Loading state
    if (isLoading) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                position: "relative",
                width: "100%",
                paddingBottom: `${props.isSquare?100:75}%`,
                backgroundColor: "#f0f0f0",
                borderRadius: props.radius
            }
        });
    } // No flag data
    if (!flagData) {
        return null;
    } // Different styling for square vs rectangle
    const imgStyle = props.isSquare ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        display: "block"
    } : {
        position: "absolute",
        top: "-1px",
        left: "-1px",
        width: "calc(100% + 2px)",
        height: "calc(100% + 2px)",
        objectFit: "cover",
        display: "block"
    }; // Use an img tag with the data URL
    return /*#__PURE__*/ _jsx("div", {
        style: {
            position: "relative",
            width: "100%",
            minWidth: "16px",
            height: 0,
            paddingBottom: props.isSquare ? "100%" : "75%",
            overflow: "hidden",
            backgroundColor: "transparent",
            borderRadius: props.radius
        },
        children: /*#__PURE__*/ _jsx("img", {
            src: flagData.svg,
            alt: "Country flag",
            style: imgStyle
        })
    });
} // Define defaultProps with proper type annotation
const defaultProps = {
    useActive: true,
    country: "US",
    canvas: "US",
    isSquare: true,
    radius: 0
};
FC_GlobalCountryFlags.defaultProps = defaultProps;
addPropertyControls(FC_GlobalCountryFlags, {
    useActive: {
        type: ControlType.Boolean,
        title: "Display",
        defaultValue: true,
        enabledTitle: "Active",
        disabledTitle: "Static",
        description: "Display the flag of the active selected country or manually select one."
    },
    country: {
        type: ControlType.Enum,
        title: "Country",
        defaultValue: "US",
        options: Object.keys(COUNTRY_DATA).sort((a, b) => COUNTRY_DATA[a].name.localeCompare(COUNTRY_DATA[b].name)),
        optionTitles: Object.keys(COUNTRY_DATA).sort((a, b) => COUNTRY_DATA[a].name.localeCompare(COUNTRY_DATA[b].name)).map(code => COUNTRY_DATA[code].name),
        hidden: props => Boolean(props.useActive)
    },
    canvas: {
        type: ControlType.Enum,
        title: "Canvas",
        defaultValue: "US",
        options: Object.keys(COUNTRY_DATA).sort((a, b) => COUNTRY_DATA[a].name.localeCompare(COUNTRY_DATA[b].name)),
        optionTitles: Object.keys(COUNTRY_DATA).sort((a, b) => COUNTRY_DATA[a].name.localeCompare(COUNTRY_DATA[b].name)).map(code => COUNTRY_DATA[code].name),
        hidden: props => !Boolean(props.useActive),
        description: "Flag to display on canvas for mock purposes only."
    },
    isSquare: {
        type: ControlType.Boolean,
        title: "Ratio",
        defaultValue: true,
        enabledTitle: "1:1",
        disabledTitle: "4:3"
    },
    radius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 0,
        min: 0,
        max: 100,
        unit: "px",
        step: 1,
        displayStepper: true
    }
}); // Helper function to map currency to country code
const mapCurrencyToCountry = currency => { // Common currency to country mappings
    const currencyToCountry = {
        USD: "US",
        EUR: "EU",
        GBP: "GB",
        CAD: "CA",
        AUD: "AU",
        MDL: "MD"
    };
    return currencyToCountry[currency] || "US";
};
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_GlobalCountryFlags",
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
//# sourceMappingURL=./FC_GlobalCountryFlags.map