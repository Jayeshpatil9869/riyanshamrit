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
 * © 2024 Framer Commerce. All Rights Reserved.
 */
import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    useEffect
} from "react";
import {
    addPropertyControls,
    ControlType
} from "framer";
import {
    get
} from "lodash-es";
import {
    useIsBrowser
} from "https://framerusercontent.com/modules/ncBs5KPMI9I5GEta13fn/zGXDjuZapa1SGy6D8P5e/IsBrowser.js";
/**
 * @framerDisableUnlink
 */
export default function FC_CartOverlayTrigger(props) {
    const isBrowser = useIsBrowser();
    useEffect(() => {
        if (!isBrowser) return;

        function handleCheckoutChange(e) {
            if (e.detail && get(e, "detail.__triggerCartModal") !== false) {
                props.triggerShopifyCartModal();
            }
        }
        document.addEventListener("checkout__changed", handleCheckoutChange);
        return () => {
            document.removeEventListener("checkout__changed", handleCheckoutChange);
        };
    }, [isBrowser, props.triggerShopifyCartModal]);
    const handleClick = () => {
        if (isBrowser) {
            props.triggerShopifyCartModal();
        }
    };
    if (!isBrowser) {
        return /*#__PURE__*/ _jsx("div", {
            style: {
                width: "100%",
                height: "100%"
            }
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        onClick: handleClick,
        style: {
            width: "100%",
            height: "100%",
            cursor: "pointer"
        }
    });
}
FC_CartOverlayTrigger.defaultProps = {};
addPropertyControls(FC_CartOverlayTrigger, {
    triggerShopifyCartModal: {
        type: ControlType.EventHandler,
        title: "triggerShopifyCartModal"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_CartOverlayTrigger",
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
//# sourceMappingURL=./FC_CartOverlayTrigger.map