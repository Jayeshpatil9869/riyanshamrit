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
} from "react"; // Use DOM element to store state without React re-renders
const favoriteStore = {
    element: typeof document !== "undefined" ? document.createElement("div") : null,
    getState(productId) {
        if (!this.element) return false;
        try {
            const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            return favorites.includes(productId);
        } catch {
            return false;
        }
    },
    toggle(productId) {
        if (!this.element) return;
        try {
            const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            const isCurrentlyActive = favorites.includes(productId);
            const newFavorites = isCurrentlyActive ? favorites.filter(id => id !== productId) : [...favorites, productId]; // Update localStorage first
            localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Immediately notify subscribers of state change
            const event = new CustomEvent("favorite-changed", {
                detail: {
                    productId,
                    isActive: !isCurrentlyActive
                }
            });
            this.element.dispatchEvent(event); // Then dispatch the collection event
            const collectionEvent = new CustomEvent("favorites-updated", {
                detail: {
                    favorites: newFavorites,
                    productId,
                    action: isCurrentlyActive ? "remove" : "add"
                }
            });
            document.dispatchEvent(collectionEvent);
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    },
    subscribe(productId, callback) {
        if (!this.element) return () => {};
        const handler = e => {
            if (e.detail.productId === productId) {
                callback(e.detail.isActive);
            }
        };
        this.element.addEventListener("favorite-changed", handler);
        return () => {
            this.element.removeEventListener("favorite-changed", handler);
        };
    }
};
/**
 * @framerDisableUnlink
 */
export default function FC_CatalogFavoriteButton(props) {
    const {
        DefaultState,
        ActiveState,
        productId
    } = props;
    const buttonRef = React.useRef(null);
    const [isActive, setIsActive] = React.useState(() => favoriteStore.getState(productId));
    const isInitialMount = React.useRef(true);
    React.useEffect(() => {
        const button = buttonRef.current;
        if (!button) return; // Handle click directly on the DOM element
        const handleClick = e => {
            e.preventDefault();
            e.stopPropagation(); // Update state optimistically
            setIsActive(!isActive);
            favoriteStore.toggle(productId);
        }; // Add click listener directly to DOM
        button.addEventListener("click", handleClick, {
            capture: true
        }); // Subscribe to state changes for sync
        const unsubscribe = favoriteStore.subscribe(productId, newIsActive => {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }
            if (isActive !== newIsActive) {
                setIsActive(newIsActive);
            }
        });
        return () => {
            button.removeEventListener("click", handleClick, {
                capture: true
            });
            unsubscribe();
        };
    }, [productId, isActive]);
    const componentInstance = isActive ? ActiveState : DefaultState;
    const content = Array.isArray(componentInstance) ? componentInstance[0] : componentInstance;
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
    }
    return /*#__PURE__*/ _jsx("div", {
        ref: buttonRef,
        style: {
            height: "100%",
            width: "100%",
            transform: "none",
            cursor: "pointer"
        },
        children: renderedContent
    });
}
addPropertyControls(FC_CatalogFavoriteButton, {
    productId: {
        type: ControlType.String,
        title: "Product ID",
        description: "Connect to CMS"
    },
    DefaultState: {
        type: ControlType.ComponentInstance,
        title: "Default State"
    },
    ActiveState: {
        type: ControlType.ComponentInstance,
        title: "Active State"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CatalogFavoriteButton",
            "slots": ["DefaultState", "ActiveState"],
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
//# sourceMappingURL=./FC_CatalogFavoriteButton.map