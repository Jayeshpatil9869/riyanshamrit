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
    useRef,
    useState,
    useCallback
} from "react";
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    throttle
} from "lodash-es";
/**
 * @framerDisableUnlink
 */
export default function FC_CartCounter(props) {
    if (RenderTarget.current() === RenderTarget.canvas) { // Always show in canvas (shows placeholder "0")
        return /*#__PURE__*/ _jsx("div", {
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%"
            },
            children: /*#__PURE__*/ _jsx("p", {
                style: { ...props.font,
                    color: props.color,
                    backgroundColor: props.backgroundColor,
                    ...props.border,
                    borderRadius: props.radius,
                    padding: props.padding,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 0,
                    width: "100%",
                    height: props.fixedHeight ? `${props.heightPx}px` : "100%",
                    lineHeight: 1,
                    fontSize: props.font ? .fontSize || "inherit"
                },
                children: "0"
            })
        });
    } else {
        const [isBrowser, setIsBrowser] = useState(false);
        const [cartItemCount, setCartItemCount] = useState(0);
        const [isLoading, setIsLoading] = useState(true);
        const [isVisible, setIsVisible] = useState(false);
        const isFetching = useRef(false);
        const initialLoadDone = useRef(false); // Set isBrowser to true once component mounts
        useEffect(() => {
            setIsBrowser(true);
        }, []); // Helper function to wait until a condition is true
        const waitForCondition = useCallback((conditionFn, checkInterval = 100, timeout = 1e4) => {
            return new Promise((resolve, reject) => {
                const startTime = Date.now();
                const checkCondition = () => {
                    if (conditionFn()) {
                        resolve();
                    } else if (Date.now() - startTime >= timeout) {
                        reject(new Error("Condition not met within timeout"));
                    } else {
                        setTimeout(checkCondition, checkInterval);
                    }
                };
                checkCondition();
            });
        }, []);
        const fetchCartAndUpdateCount = useCallback(async cartId => {
            if (isFetching.current) {
                return;
            }
            isFetching.current = true; // Only set loading state on initial load
            if (!initialLoadDone.current) {
                setIsLoading(true);
                setIsVisible(false);
            }
            try {
                await waitForCondition(() => window.shopXtools && window.shopXtools.fetchCart);
                const cartData = await window.shopXtools.fetchCart(cartId);
                if (cartData && cartData.lines && cartData.lines.edges && cartData.lines.edges.length > 0) {
                    const itemCount = cartData.lines.edges.reduce((total, edge) => total + (edge.node.quantity || 0), 0);
                    setCartItemCount(itemCount);
                } else {
                    setCartItemCount(0); // Show immediately if no items
                    setIsLoading(false);
                    setIsVisible(true);
                    initialLoadDone.current = true;
                }
            } catch (error) {
                setCartItemCount(0); // Show immediately if error
                setIsLoading(false);
                setIsVisible(true);
                initialLoadDone.current = true;
            } finally {
                isFetching.current = false; // Only handle visibility on initial load with items
                if (!initialLoadDone.current) {
                    setIsLoading(false);
                    initialLoadDone.current = true; // Add a small delay before showing the counter for smoother transition
                    setTimeout(() => setIsVisible(true), 50);
                }
            }
        }, [waitForCondition]);
        const handleCartUpdate = useCallback(throttle(async () => {
            if (!isBrowser) return; // Don't run on server-side
            let cartId = window["shopXtools"] ? .cart ? .id;
            if (!cartId) {
                try {
                    cartId = localStorage.getItem("shopX_cart_id");
                } catch (error) { // Error accessing localStorage
                }
            }
            if (cartId) {
                await fetchCartAndUpdateCount(cartId);
            } else {
                setCartItemCount(0); // Show immediately if no cart
                setIsLoading(false);
                setIsVisible(true);
                initialLoadDone.current = true;
            }
        }, 1e3), [fetchCartAndUpdateCount, isBrowser]);
        useEffect(() => {
            if (!isBrowser) return; // Don't run on server-side
            window.addEventListener("shopXtools-cart-update", handleCartUpdate);
            handleCartUpdate();
            return () => {
                window.removeEventListener("shopXtools-cart-update", handleCartUpdate);
            };
        }, [handleCartUpdate, isBrowser]);
        if (props.hideIf0 && cartItemCount === 0) {
            return null;
        }
        return /*#__PURE__*/ _jsx("div", {
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%"
            },
            children: /*#__PURE__*/ _jsx("p", {
                style: { ...props.font,
                    color: props.color,
                    backgroundColor: props.backgroundColor,
                    ...props.border,
                    borderRadius: props.radius,
                    padding: props.padding,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 0,
                    width: "100%",
                    height: props.fixedHeight ? `${props.heightPx}px` : "100%",
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                    visibility: isLoading ? "hidden" : "visible",
                    lineHeight: 1,
                    fontSize: props.font ? .fontSize || "inherit"
                },
                children: isBrowser ? cartItemCount.toString() : "0"
            })
        });
    }
}
FC_CartCounter.defaultProps = {
    hideIf0: false,
    font: undefined,
    color: "#000",
    backgroundColor: "#FFFFFF00",
    backgroundOpacity: 0,
    border: {
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.5)"
    },
    radius: 0,
    padding: 0,
    fixedHeight: false,
    heightPx: 40
};
addPropertyControls(FC_CartCounter, {
    hideIf0: {
        type: ControlType.Boolean,
        title: "When 0",
        defaultValue: false,
        enabledTitle: "Hide",
        disabledTitle: "Show",
        description: "For browser only, canvas will always display 0."
    },
    font: {
        type: ControlType.Font,
        controls: "extended",
        title: "Font"
    },
    color: {
        type: ControlType.Color,
        defaultValue: "#000",
        title: "Color"
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "BG",
        defaultValue: "rgba(255, 255, 255, 0)"
    },
    border: {
        type: ControlType.Border,
        title: "Border",
        defaultValue: {
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderStyle: "solid",
            borderColor: "rgba(0, 0, 0, 0.5)"
        }
    },
    /*     fixedHeight: {
            type: ControlType.Boolean,
            title: "Height",
            defaultValue: false,
            enabledTitle: "Fixed",
            disabledTitle: "Fit",
        },
        heightPx: {
            type: ControlType.Number,
            title: "Height",
            defaultValue: 40,
            min: 0,
            hidden: ({ fixedHeight }) => !fixedHeight,
        }, */
    padding: {
        type: ControlType.FusedNumber,
        title: "Padding",
        defaultValue: 0,
        toggleKey: "paddingPerSide",
        toggleTitles: ["All", "Sides"],
        valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
        valueLabels: ["T", "R", "B", "L"],
        min: 0
    },
    radius: {
        type: ControlType.FusedNumber,
        title: "Radius",
        defaultValue: 0,
        toggleKey: "radiusPerCorner",
        toggleTitles: ["All", "Corners"],
        valueKeys: ["topLeft", "topRight", "bottomRight", "bottomLeft"],
        valueLabels: ["TL", "TR", "BR", "BL"],
        min: 0
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CartCounter",
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
//# sourceMappingURL=./FC_CartCounter.map