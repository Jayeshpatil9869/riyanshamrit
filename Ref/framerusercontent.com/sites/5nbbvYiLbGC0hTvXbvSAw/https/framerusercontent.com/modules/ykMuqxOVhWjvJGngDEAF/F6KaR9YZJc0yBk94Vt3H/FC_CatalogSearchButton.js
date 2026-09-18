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
import * as React from "react";
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    cloneElement
} from "react"; // Helper function for consistent logging
const logDebug = (component, action, data) => {
    console.log(`🔍 [${component}] ${action}:`, data);
}; // Use DOM element to store search state
const searchStore = {
    element: typeof document !== "undefined" ? document.createElement("div") : null,
    getSearchTerm() {
        if (!this.element) return "";
        try {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get("search") || "";
        } catch {
            return "";
        }
    },
    subscribe(callback) {
        if (!this.element) return () => {};
        const handler = e => {
            logDebug("SearchButton", "Received product-search-change event", e.detail);
            callback(e.detail.term || "");
        };
        document.addEventListener("product-search-change", handler);
        return () => {
            document.removeEventListener("product-search-change", handler);
        };
    }
};
/**
 * @framerDisableUnlink
 */
export default function FC_CatalogSearchButton(props) {
    const {
        Button,
        DisabledButton,
        slug
    } = props;
    const buttonRef = React.useRef(null);
    const [searchTerm, setSearchTerm] = React.useState(() => {
        const initialTerm = searchStore.getSearchTerm();
        logDebug("SearchButton", "Initial search term", initialTerm);
        return initialTerm;
    });
    const isInitialMount = React.useRef(true); // Check if DisabledButton is actually connected (has valid content)
    const hasDisabledButton = React.useMemo(() => {
        if (!DisabledButton) return false;
        const content = Array.isArray(DisabledButton) ? DisabledButton[0] : DisabledButton;
        return content && /*#__PURE__*/ React.isValidElement(content);
    }, [DisabledButton]);
    React.useEffect(() => {
        logDebug("SearchButton", "Component mounted", {
            searchTerm,
            hasDisabledButton
        }); // Subscribe to search changes
        const unsubscribe = searchStore.subscribe(newSearchTerm => {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }
            logDebug("SearchButton", "Updating search term", {
                oldTerm: searchTerm,
                newTerm: newSearchTerm
            });
            setSearchTerm(newSearchTerm);
        }); // Also listen for filter-navigation events which are emitted by the search component
        const handleFilterNavigation = e => {
            logDebug("SearchButton", "Received filter-navigation event", e.detail);
            if (e.detail.search !== undefined) {
                setSearchTerm(e.detail.search || "");
            }
        };
        document.addEventListener("filter-navigation", handleFilterNavigation);
        return () => {
            unsubscribe();
            document.removeEventListener("filter-navigation", handleFilterNavigation);
        };
    }, [hasDisabledButton]);
    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation(); // Don't navigate if button is disabled
        if (isDisabled) return;
        if (searchTerm.trim()) {
            window.location.href = `/${slug}?search=${encodeURIComponent(searchTerm.trim())}`;
        } else {
            window.location.href = `/${slug}`;
        }
    };
    const isDisabled = !searchTerm.trim() && hasDisabledButton;
    const componentInstance = isDisabled ? DisabledButton : Button;
    const content = Array.isArray(componentInstance) ? componentInstance[0] : componentInstance; // Log visibility state
    const shouldHide = !searchTerm.trim() && !hasDisabledButton;
    logDebug("SearchButton", "Visibility check", {
        searchTerm,
        hasDisabledButton,
        shouldHide,
        isDisabled
    });
    if (!content || ! /*#__PURE__*/ React.isValidElement(content)) {
        return /*#__PURE__*/ _jsx("div", {
            ref: buttonRef,
            style: {
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
                fontSize: "14px",
                transform: "none"
            },
            children: "Connect Instance"
        });
    }
    const renderedContent = /*#__PURE__*/ cloneElement(content, {
        style: { ...content.props ? .style || {},
            width : "100%",
            height: "100%",
            transform: "none"
        }
    });
    if (RenderTarget.current() === RenderTarget.canvas) {
        return /*#__PURE__*/ _jsx("div", {
            ref: buttonRef,
            style: {
                height: "100%",
                width: "100%",
                transform: "none"
            },
            children: renderedContent
        });
    } // Only render if there's a search term or a disabled button instance
    if (shouldHide) {
        logDebug("SearchButton", "Hiding component", {
            searchTerm,
            hasDisabledButton
        });
        return null;
    }
    return /*#__PURE__*/ _jsx("div", {
        ref: buttonRef,
        style: {
            height: "100%",
            width: "100%",
            transform: "none",
            cursor: isDisabled ? "default" : "pointer",
            pointerEvents: isDisabled ? "none" : "auto"
        },
        onClick: handleClick,
        children: renderedContent
    });
}
addPropertyControls(FC_CatalogSearchButton, {
    Button: {
        type: ControlType.ComponentInstance,
        title: "Active Button"
    },
    DisabledButton: {
        type: ControlType.ComponentInstance,
        title: "Disabled Button",
        description: "If not set, button will hide when there is no search term."
    },
    slug: {
        type: ControlType.String,
        title: "Slug",
        description: "The slug of your dedicated Search page",
        defaultValue: "search",
        placeholder: "search"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CatalogSearchButton",
            "slots": ["Button", "DisabledButton"],
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
//# sourceMappingURL=./FC_CatalogSearchButton.map