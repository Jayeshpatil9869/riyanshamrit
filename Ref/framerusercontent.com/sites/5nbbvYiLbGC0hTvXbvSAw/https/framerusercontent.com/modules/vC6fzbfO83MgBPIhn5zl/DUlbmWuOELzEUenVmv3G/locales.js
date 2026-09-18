export const getCurrentLanguage = () => {
    if (typeof window === "undefined") return "en"; // First check URL path for language
    const pathname = window.location.pathname;
    const pathSegments = pathname.split("/").filter(Boolean);
    const validLanguages = [ // Basic language codes
        "ar", "bg", "bn", "cs", "da", "de", "el", "en", "es", "fi", "fr", "he", "hi", "hr", "hu", "id", "it", "ja", "ko", "lt", "ms", "nb", "nl", "pl", "ro", "ru", "sk", "sl", "sr", "sv", "ta", "th", "tr", "uk", "vi", // Region-specific language codes
        "pt-BR", "pt-PT", "zh-CN", "zh-TW"
    ]; // Helper function to normalize language codes
    const normalizeLanguageCode = code => {
        const lowerCode = code.toLowerCase(); // Special handling for region-specific codes
        if (lowerCode === "pt" || lowerCode.startsWith("pt-")) { // Default Portuguese to Brazilian Portuguese if no specific region
            if (lowerCode.length === 2) return "pt-BR"; // Preserve uppercase region codes for Portuguese
            const region = code.substring(3).toUpperCase();
            return `pt-${region}`;
        }
        if (lowerCode === "zh" || lowerCode.startsWith("zh-")) { // Default Chinese to Simplified Chinese if no specific region
            if (lowerCode.length === 2) return "zh-CN"; // Preserve uppercase region codes for Chinese
            const region = code.substring(3).toUpperCase();
            return `zh-${region}`;
        } // For basic language codes, return lowercase
        return lowerCode;
    }; // Check if the first path segment is a valid language code
    if (pathSegments[0]) {
        const normalizedCode = normalizeLanguageCode(pathSegments[0]);
        if (validLanguages.includes(normalizedCode)) {
            return normalizedCode;
        }
    } // Then check sessionStorage for checkoutLocale
    const sessionStorageLocale = sessionStorage.getItem("checkoutLocale");
    if (sessionStorageLocale) {
        const normalizedLocale = normalizeLanguageCode(sessionStorageLocale);
        if (validLanguages.includes(normalizedLocale)) {
            return normalizedLocale;
        }
    } // Then check localStorage for checkoutLocale
    const localStorageLocale = localStorage.getItem("checkoutLocale");
    if (localStorageLocale) {
        const normalizedLocale = normalizeLanguageCode(localStorageLocale);
        if (validLanguages.includes(normalizedLocale)) {
            return normalizedLocale;
        }
    } // Then check if we have a default language set in the window config
    if (window.__FcCheckoutConfigs ? .locale) {
        const configLocale = normalizeLanguageCode(window.__FcCheckoutConfigs.locale);
        if (validLanguages.includes(configLocale)) {
            return configLocale;
        }
    }
    return "en";
};
export const appendLanguageToUrl = url => {
    if (!url) return url;
    try {
        const urlObj = new URL(url);
        const currentLang = getCurrentLanguage();
        urlObj.searchParams.delete("locale");
        urlObj.searchParams.append("locale", currentLang);
        return urlObj.toString();
    } catch (error) {
        console.error("Error in appendLanguageToUrl:", error);
        return url;
    }
}; // Helper function to map country code to appropriate locale
export const getLocaleFromCountry = countryCode => { // Default fallback locale
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
};
export const __FramerMetadata__ = {
    "exports": {
        "getCurrentLanguage": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "getLocaleFromCountry": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "appendLanguageToUrl": {
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
//# sourceMappingURL=./locales.map