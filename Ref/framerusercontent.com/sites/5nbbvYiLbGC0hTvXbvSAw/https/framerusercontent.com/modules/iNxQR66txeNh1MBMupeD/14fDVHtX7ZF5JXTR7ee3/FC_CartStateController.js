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
    useCallback,
    useRef,
    useEffect,
    useState
} from "react"; // @ts-ignore - Provided by Framer runtime in plugin environment
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
/**
 * @framerDisableUnlink
 */
/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicHeight Auto
 */
function FC_CartStateController(props) {
    const {
        Populated,
        Empty
    } = props;
    const [isBrowser, setIsBrowser] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const isFetching = useRef(false);
    const containerRef = useRef(null); // Set isBrowser to true once component mounts
    useEffect(() => {
        setIsBrowser(true);
    }, []);
    const fetchCartFromShopify = useCallback(async cartId => {
        if (isFetching.current || !isBrowser) return;
        isFetching.current = true;
        try {
            const cartData = await window ? .shopXtools ? .fetchCart ? .(cartId);
            if (cartData) {
                setCartItems(cartData.lines ? .edges || []);
            } else {
                setCartItems([]);
            }
        } catch (error) { // Error handling: Failed to fetch cart
            setCartItems([]);
        } finally {
            isFetching.current = false;
        }
    }, [isBrowser]);
    const handleCartUpdate = useCallback(async () => {
        if (!isBrowser) return;
        let cartId;
        try {
            cartId = window ? .shopXtools ? .cart ? .id;
            if (!cartId) {
                cartId = localStorage.getItem("shopX_cart_id");
            }
        } catch (error) { // Error handling: Unable to access cart ID
            return;
        }
        if (cartId) {
            await fetchCartFromShopify(cartId);
        } else {
            setCartItems([]);
        }
    }, [fetchCartFromShopify, isBrowser]);
    useEffect(() => {
        if (!isBrowser) return;
        handleCartUpdate();
        window.addEventListener("shopXtools-cart-update", handleCartUpdate);
        return () => window.removeEventListener("shopXtools-cart-update", handleCartUpdate);
    }, [handleCartUpdate, isBrowser]); // Apply 100% width and height to the first child element
    useEffect(() => {
        if (containerRef.current ? .firstElementChild) {
            const child = containerRef.current.firstElementChild;
            child.style.width = "100%";
            child.style.height = "100%";
        }
    });
    let content = null;
    const isCanvas = RenderTarget.current() === RenderTarget.canvas;
    const isEmptyView = isCanvas ? true : !isBrowser || cartItems.length === 0;
    content = isEmptyView ? Empty ? .[0] : Populated ? .[0];
    if (!content) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                width: "100%",
                height: "100%"
            }
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        ref: containerRef,
        style: {
            width: "100%",
            height: "100%"
        },
        children: content
    }, isEmptyView ? "empty" : "populated");
}
FC_CartStateController.defaultProps = {
    Populated: null,
    Empty: null
};
addPropertyControls(FC_CartStateController, {
    Populated: {
        type: ControlType.ComponentInstance,
        title: "Populated State"
    },
    Empty: {
        type: ControlType.ComponentInstance,
        title: "Empty State"
    }
});
export default FC_CartStateController;
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CartStateController",
            "slots": [],
            "annotations": {
                "framerSupportedLayoutHeight": "any",
                "framerIntrinsicHeight": "Auto",
                "framerContractVersion": "1",
                "framerSupportedLayoutWidth": "fixed",
                "framerDisableUnlink": ""
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./FC_CartStateController.map