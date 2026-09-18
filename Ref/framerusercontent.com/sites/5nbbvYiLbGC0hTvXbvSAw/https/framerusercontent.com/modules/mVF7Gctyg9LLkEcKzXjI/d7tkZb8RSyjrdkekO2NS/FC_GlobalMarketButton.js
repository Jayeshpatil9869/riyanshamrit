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
    useState
} from "react";
import {
    addPropertyControls,
    ControlType
} from "framer";
import {
    updateCartCurrency
} from "https://framerusercontent.com/modules/yiRfl1JCGhIBUL31WVDk/wupS2XmBAHu1kBQNv9pi/mutations_v2.js"; // Common countries with names for the dropdown
const COMMON_COUNTRIES = [{
    code: "AF",
    name: "Afghanistan"
}, {
    code: "AL",
    name: "Albania"
}, {
    code: "DZ",
    name: "Algeria"
}, {
    code: "AD",
    name: "Andorra"
}, {
    code: "AO",
    name: "Angola"
}, {
    code: "AG",
    name: "Antigua & Barbuda"
}, {
    code: "AR",
    name: "Argentina"
}, {
    code: "AM",
    name: "Armenia"
}, {
    code: "AU",
    name: "Australia"
}, {
    code: "AT",
    name: "Austria"
}, {
    code: "AZ",
    name: "Azerbaijan"
}, {
    code: "BS",
    name: "Bahamas"
}, {
    code: "BH",
    name: "Bahrain"
}, {
    code: "BD",
    name: "Bangladesh"
}, {
    code: "BB",
    name: "Barbados"
}, {
    code: "BY",
    name: "Belarus"
}, {
    code: "BE",
    name: "Belgium"
}, {
    code: "BZ",
    name: "Belize"
}, {
    code: "BJ",
    name: "Benin"
}, {
    code: "BT",
    name: "Bhutan"
}, {
    code: "BO",
    name: "Bolivia"
}, {
    code: "BA",
    name: "Bosnia & Herzegovina"
}, {
    code: "BW",
    name: "Botswana"
}, {
    code: "BR",
    name: "Brazil"
}, {
    code: "BN",
    name: "Brunei"
}, {
    code: "BG",
    name: "Bulgaria"
}, {
    code: "BF",
    name: "Burkina Faso"
}, {
    code: "BI",
    name: "Burundi"
}, {
    code: "KH",
    name: "Cambodia"
}, {
    code: "CM",
    name: "Cameroon"
}, {
    code: "CA",
    name: "Canada"
}, {
    code: "CV",
    name: "Cape Verde"
}, {
    code: "CF",
    name: "Central African Republic"
}, {
    code: "TD",
    name: "Chad"
}, {
    code: "CL",
    name: "Chile"
}, {
    code: "CN",
    name: "China"
}, {
    code: "CO",
    name: "Colombia"
}, {
    code: "KM",
    name: "Comoros"
}, {
    code: "CG",
    name: "Congo - Brazzaville"
}, {
    code: "CD",
    name: "Congo - Kinshasa"
}, {
    code: "CR",
    name: "Costa Rica"
}, {
    code: "CI",
    name: "C\xf4te d'Ivoire"
}, {
    code: "HR",
    name: "Croatia"
}, {
    code: "CU",
    name: "Cuba"
}, {
    code: "CY",
    name: "Cyprus"
}, {
    code: "CZ",
    name: "Czechia"
}, {
    code: "DK",
    name: "Denmark"
}, {
    code: "DJ",
    name: "Djibouti"
}, {
    code: "DM",
    name: "Dominica"
}, {
    code: "DO",
    name: "Dominican Republic"
}, {
    code: "EC",
    name: "Ecuador"
}, {
    code: "EG",
    name: "Egypt"
}, {
    code: "SV",
    name: "El Salvador"
}, {
    code: "GQ",
    name: "Equatorial Guinea"
}, {
    code: "ER",
    name: "Eritrea"
}, {
    code: "EE",
    name: "Estonia"
}, {
    code: "ET",
    name: "Ethiopia"
}, {
    code: "FO",
    name: "Faroe Islands"
}, {
    code: "FJ",
    name: "Fiji"
}, {
    code: "FI",
    name: "Finland"
}, {
    code: "FR",
    name: "France"
}, {
    code: "GA",
    name: "Gabon"
}, {
    code: "GM",
    name: "Gambia"
}, {
    code: "GE",
    name: "Georgia"
}, {
    code: "DE",
    name: "Germany"
}, {
    code: "GH",
    name: "Ghana"
}, {
    code: "GI",
    name: "Gibraltar"
}, {
    code: "GR",
    name: "Greece"
}, {
    code: "GL",
    name: "Greenland"
}, {
    code: "GD",
    name: "Grenada"
}, {
    code: "GT",
    name: "Guatemala"
}, {
    code: "GN",
    name: "Guinea"
}, {
    code: "GW",
    name: "Guinea-Bissau"
}, {
    code: "GY",
    name: "Guyana"
}, {
    code: "HT",
    name: "Haiti"
}, {
    code: "HN",
    name: "Honduras"
}, {
    code: "HK",
    name: "Hong Kong SAR"
}, {
    code: "HU",
    name: "Hungary"
}, {
    code: "IS",
    name: "Iceland"
}, {
    code: "IN",
    name: "India"
}, {
    code: "ID",
    name: "Indonesia"
}, {
    code: "IR",
    name: "Iran"
}, {
    code: "IQ",
    name: "Iraq"
}, {
    code: "IE",
    name: "Ireland"
}, {
    code: "IL",
    name: "Israel"
}, {
    code: "IT",
    name: "Italy"
}, {
    code: "JM",
    name: "Jamaica"
}, {
    code: "JP",
    name: "Japan"
}, {
    code: "JO",
    name: "Jordan"
}, {
    code: "KZ",
    name: "Kazakhstan"
}, {
    code: "KE",
    name: "Kenya"
}, {
    code: "KI",
    name: "Kiribati"
}, {
    code: "KP",
    name: "North Korea"
}, {
    code: "KR",
    name: "South Korea"
}, {
    code: "KW",
    name: "Kuwait"
}, {
    code: "KG",
    name: "Kyrgyzstan"
}, {
    code: "LA",
    name: "Laos"
}, {
    code: "LV",
    name: "Latvia"
}, {
    code: "LB",
    name: "Lebanon"
}, {
    code: "LS",
    name: "Lesotho"
}, {
    code: "LR",
    name: "Liberia"
}, {
    code: "LY",
    name: "Libya"
}, {
    code: "LI",
    name: "Liechtenstein"
}, {
    code: "LT",
    name: "Lithuania"
}, {
    code: "LU",
    name: "Luxembourg"
}, {
    code: "MK",
    name: "North Macedonia"
}, {
    code: "MG",
    name: "Madagascar"
}, {
    code: "MW",
    name: "Malawi"
}, {
    code: "MY",
    name: "Malaysia"
}, {
    code: "MV",
    name: "Maldives"
}, {
    code: "ML",
    name: "Mali"
}, {
    code: "MT",
    name: "Malta"
}, {
    code: "MH",
    name: "Marshall Islands"
}, {
    code: "MR",
    name: "Mauritania"
}, {
    code: "MU",
    name: "Mauritius"
}, {
    code: "MX",
    name: "Mexico"
}, {
    code: "FM",
    name: "Micronesia"
}, {
    code: "MD",
    name: "Moldova"
}, {
    code: "MC",
    name: "Monaco"
}, {
    code: "MN",
    name: "Mongolia"
}, {
    code: "ME",
    name: "Montenegro"
}, {
    code: "MA",
    name: "Morocco"
}, {
    code: "MZ",
    name: "Mozambique"
}, {
    code: "MM",
    name: "Myanmar (Burma)"
}, {
    code: "NA",
    name: "Namibia"
}, {
    code: "NR",
    name: "Nauru"
}, {
    code: "NP",
    name: "Nepal"
}, {
    code: "NL",
    name: "Netherlands"
}, {
    code: "NZ",
    name: "New Zealand"
}, {
    code: "NI",
    name: "Nicaragua"
}, {
    code: "NE",
    name: "Niger"
}, {
    code: "NG",
    name: "Nigeria"
}, {
    code: "NO",
    name: "Norway"
}, {
    code: "OM",
    name: "Oman"
}, {
    code: "PK",
    name: "Pakistan"
}, {
    code: "PW",
    name: "Palau"
}, {
    code: "PS",
    name: "Palestine"
}, {
    code: "PA",
    name: "Panama"
}, {
    code: "PG",
    name: "Papua New Guinea"
}, {
    code: "PY",
    name: "Paraguay"
}, {
    code: "PE",
    name: "Peru"
}, {
    code: "PH",
    name: "Philippines"
}, {
    code: "PL",
    name: "Poland"
}, {
    code: "PT",
    name: "Portugal"
}, {
    code: "QA",
    name: "Qatar"
}, {
    code: "RO",
    name: "Romania"
}, {
    code: "RU",
    name: "Russia"
}, {
    code: "RW",
    name: "Rwanda"
}, {
    code: "KN",
    name: "St. Kitts & Nevis"
}, {
    code: "LC",
    name: "St. Lucia"
}, {
    code: "VC",
    name: "St. Vincent & Grenadines"
}, {
    code: "WS",
    name: "Samoa"
}, {
    code: "SM",
    name: "San Marino"
}, {
    code: "ST",
    name: "S\xe3o Tom\xe9 & Pr\xedncipe"
}, {
    code: "SA",
    name: "Saudi Arabia"
}, {
    code: "SN",
    name: "Senegal"
}, {
    code: "RS",
    name: "Serbia"
}, {
    code: "SC",
    name: "Seychelles"
}, {
    code: "SL",
    name: "Sierra Leone"
}, {
    code: "SG",
    name: "Singapore"
}, {
    code: "SK",
    name: "Slovakia"
}, {
    code: "SI",
    name: "Slovenia"
}, {
    code: "SB",
    name: "Solomon Islands"
}, {
    code: "SO",
    name: "Somalia"
}, {
    code: "ZA",
    name: "South Africa"
}, {
    code: "SS",
    name: "South Sudan"
}, {
    code: "ES",
    name: "Spain"
}, {
    code: "LK",
    name: "Sri Lanka"
}, {
    code: "SD",
    name: "Sudan"
}, {
    code: "SR",
    name: "Suriname"
}, {
    code: "SZ",
    name: "Swaziland"
}, {
    code: "SE",
    name: "Sweden"
}, {
    code: "CH",
    name: "Switzerland"
}, {
    code: "SY",
    name: "Syria"
}, {
    code: "TW",
    name: "Taiwan"
}, {
    code: "TJ",
    name: "Tajikistan"
}, {
    code: "TZ",
    name: "Tanzania"
}, {
    code: "TH",
    name: "Thailand"
}, {
    code: "TL",
    name: "Timor-Leste"
}, {
    code: "TG",
    name: "Togo"
}, {
    code: "TO",
    name: "Tonga"
}, {
    code: "TT",
    name: "Trinidad & Tobago"
}, {
    code: "TN",
    name: "Tunisia"
}, {
    code: "TR",
    name: "Turkey"
}, {
    code: "TM",
    name: "Turkmenistan"
}, {
    code: "TV",
    name: "Tuvalu"
}, {
    code: "UG",
    name: "Uganda"
}, {
    code: "UA",
    name: "Ukraine"
}, {
    code: "AE",
    name: "United Arab Emirates"
}, {
    code: "GB",
    name: "United Kingdom"
}, {
    code: "US",
    name: "United States"
}, {
    code: "UY",
    name: "Uruguay"
}, {
    code: "UZ",
    name: "Uzbekistan"
}, {
    code: "VU",
    name: "Vanuatu"
}, {
    code: "VA",
    name: "Vatican City"
}, {
    code: "VE",
    name: "Venezuela"
}, {
    code: "VN",
    name: "Vietnam"
}, {
    code: "YE",
    name: "Yemen"
}, {
    code: "ZM",
    name: "Zambia"
}, {
    code: "ZW",
    name: "Zimbabwe"
}]; // Extract just the country codes for validation
const COMMON_COUNTRY_CODES = COMMON_COUNTRIES.map(country => country.code);
/**
 * @framerDisableUnlink
 */
export default function FC_GlobalMarketButton({
    componentInstance,
    countryCode = "US",
    closeModal = false,
    padding = "0px",
    blur = 0,
    radius = "0px"
}) {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [availableCountries, setAvailableCountries] = useState([]); // Check if we're in Framer canvas
    const isFramerCanvas = !window ? .shopXtools; // Initialize available countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await window ? .shopXtools ? .fetchAvailableCurrencies();
                if (response ? .availableCurrenciesAndCountries) {
                    setAvailableCountries(response.availableCurrenciesAndCountries);
                }
            } catch (error) {
                console.error("Error fetching available countries:", error);
            }
        };
        if (!isFramerCanvas) {
            fetchCountries();
        }
    }, [isFramerCanvas]);
    useEffect(() => { // Get the currently selected country from localStorage
        const storedCountryCode = localStorage.getItem("selectedCountryCode");
        if (storedCountryCode) {
            setSelectedCountry(storedCountryCode);
        } // Listen for currency/country changes
        const handleCurrencyChange = event => {
            setSelectedCountry(event.detail.countryCode);
        };
        if (!isFramerCanvas) {
            window.addEventListener("currency_changed", handleCurrencyChange);
            return () => {
                window.removeEventListener("currency_changed", handleCurrencyChange);
            };
        }
    }, [isFramerCanvas]);
    useEffect(() => { // Hide button when country is selected
        if (isFramerCanvas) {
            setIsVisible(true);
        } else {
            setIsVisible(selectedCountry ? .toUpperCase() !== countryCode ? .toUpperCase());
        }
    }, [selectedCountry, countryCode, isFramerCanvas]);
    const handleClick = async e => {
        if (isFramerCanvas) { // console.log("In Framer canvas, ignoring click")
            // Ensure scroll is enabled in Framer canvas
            document.body.style.overflow = "auto";
            return;
        }
        try { // If closeModal is enabled, dispatch the close event
            if (closeModal) { //console.log("Dispatching global_modal_close event")
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                const event = new CustomEvent("global_modal_close");
                document.dispatchEvent(event); // Restore scroll behavior
                document.body.style.overflow = "auto"; // If we're just closing the modal without changing country, return early
                if (selectedCountry ? .toUpperCase() === countryCode ? .toUpperCase()) {
                    return;
                }
            } // console.log("Starting country change process for:", countryCode)
            // Validate country code
            const normalizedCountryCode = countryCode ? .toUpperCase() || ""; // console.log("Normalized country code:", normalizedCountryCode)
            // console.log("Available countries:", availableCountries)
            if (!COMMON_COUNTRY_CODES.some(code => code.toUpperCase() === normalizedCountryCode)) {
                console.error("Invalid country code:", countryCode);
                return;
            } // Find country in available countries
            const countryData = availableCountries.find(c => c.isoCode.toUpperCase() === normalizedCountryCode); // console.log("Found country data:", countryData)
            if (!countryData) {
                console.error("Country not available:", countryCode);
                return;
            }
            const currency = countryData.currency.isoCode;
            const countryName = countryData.name;
            const finalCountryCode = countryData.isoCode; // console.log("Updating to:", {
            //     currency,
            //     countryName,
            //     finalCountryCode,
            // })
            // Update localStorage
            localStorage.setItem("selectedCurrency", currency);
            localStorage.setItem("selectedCountry", countryName);
            localStorage.setItem("selectedCountryCode", finalCountryCode); // Update cart in localStorage
            const cartStr = localStorage.getItem("shopXtools.cart");
            const cart = cartStr ? JSON.parse(cartStr) : {};
            if (!cart.buyerIdentity) cart.buyerIdentity = {};
            cart.buyerIdentity.countryCode = finalCountryCode;
            localStorage.setItem("shopXtools.cart", JSON.stringify(cart));
            const existingCartId = localStorage.getItem("shopX_cart_id");
            const shopXtools = window.shopXtools;
            if (existingCartId && shopXtools ? .handleCartMutation) {
                try { //console.log("Updating cart with mutation")
                    const updateData = await shopXtools.handleCartMutation(updateCartCurrency, {
                        cartId: existingCartId,
                        countryCode: finalCountryCode
                    });
                    if (updateData ? .cartBuyerIdentityUpdate ? .cart) { // Merge the updated cart with existing cart
                        const existingCartStr = localStorage.getItem("shopXtools.cart");
                        const existingCart = existingCartStr ? JSON.parse(existingCartStr) : {};
                        const updatedCart = { ...existingCart,
                            ...updateData.cartBuyerIdentityUpdate.cart,
                            buyerIdentity: { ...existingCart.buyerIdentity,
                                countryCode: finalCountryCode
                            },
                            cost: { ...existingCart.cost,
                                ...updateData.cartBuyerIdentityUpdate.cart.cost
                            }
                        }; // Save the merged cart back to localStorage
                        localStorage.setItem("shopXtools.cart", JSON.stringify(updatedCart));
                        shopXtools.cart = updatedCart;
                        window.dispatchEvent(new Event("shopXtools-cart-update"));
                    }
                } catch (error) {
                    console.error("Error updating cart currency:", error);
                    window.dispatchEvent(new CustomEvent("errorChanged", {
                        detail: error.message || "Failed to update cart currency"
                    }));
                }
            } // Update global defaults
            shopXtools.defaultCurrency = currency;
            shopXtools.defaultCountry = countryName;
            shopXtools.defaultCountryCode = finalCountryCode; // Update products if possible
            if (shopXtools.fetchProductsByCountry) {
                try { // console.log(
                    //     "Fetching products for country:",
                    //     finalCountryCode
                    // )
                    const products = await shopXtools.fetchProductsByCountry(finalCountryCode);
                    if (products) {
                        shopXtools.products = products; //console.log("Products updated successfully")
                    }
                } catch (error) {
                    console.error("Error updating products:", error);
                }
            } // Dispatch currency changed event
            const changeEvent = new CustomEvent("currency_changed", {
                detail: {
                    currency: currency,
                    country: countryName,
                    countryCode: finalCountryCode
                }
            });
            window.dispatchEvent(changeEvent);
        } catch (error) {
            console.error("Error changing country:", error);
        }
    };
    if (!isVisible) return null;
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
            padding
        },
        children: /*#__PURE__*/ _jsx("div", {
            style: {
                height: "100%",
                width: "100%",
                backdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
                WebkitBackdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
                borderRadius: radius,
                overflow: "hidden"
            },
            children: /*#__PURE__*/ React.cloneElement(content, {
                style: { ...content.props ? .style || {},
                    width : "100%",
                    height: "100%"
                },
                onClick: e => {
                    handleClick(e);
                    if (content.props ? .onClick) {
                        content.props.onClick(e);
                    }
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: e => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault() // Prevent scrolling with spacebar
                        ;
                        handleClick();
                    }
                },
                "aria-label": `Switch to ${COMMON_COUNTRIES.find(country=>country.code===countryCode)?.name||countryCode} currency`
            })
        })
    });
} // Add Framer property controls
addPropertyControls(FC_GlobalMarketButton, {
    componentInstance: {
        type: ControlType.ComponentInstance,
        title: "Component",
        description: "Connect to your design on canvas"
    },
    countryCode: {
        type: ControlType.Enum,
        title: "Country",
        defaultValue: "US",
        options: COMMON_COUNTRY_CODES,
        optionTitles: COMMON_COUNTRIES.map(country => `${country.name} (${country.code})`),
        description: "Select the target country for this button.\n\nThis button changes the active country/currency. It only appears when the current country differs from the selected one."
    },
    closeModal: {
        type: ControlType.Boolean,
        title: "Close Modal",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
        description: "Close the modal when clicked"
    },
    padding: {
        type: ControlType.Padding,
        title: "Spacing",
        defaultValue: "0px",
        description: "Space between this and other elements"
    },
    blur: {
        type: ControlType.Number,
        title: "BG Blur",
        defaultValue: 0,
        min: 0,
        max: 50,
        step: 1,
        displayStepper: true
    },
    radius: {
        type: ControlType.BorderRadius,
        title: "Radius",
        defaultValue: "0px"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_GlobalMarketButton",
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
//# sourceMappingURL=./FC_GlobalMarketButton.map