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
import React from "react";
import {
    addPropertyControls,
    ControlType
} from "framer";
/**
 * @framerDisableUnlink
 */
export default function FC_GlobalSmartModalClose({
    componentInstance
}) { // Check if we're in Framer canvas
    const isFramerCanvas = !window ? .shopXtools;
    const handleClose = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!isFramerCanvas) { // Dispatch the event synchronously
            document.dispatchEvent(new CustomEvent("global_modal_close", {
                bubbles: true,
                cancelable: true
            }));
        } else {
            console.log("In Framer canvas - close event not dispatched");
        }
    };
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
            onClick: handleClose,
            role: "button",
            tabIndex: 0,
            onKeyDown: e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault() // Prevent scrolling with spacebar
                    ;
                    handleClose(e);
                }
            },
            "aria-label": "Close modal",
            children: "Connect Instance"
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        style: {
            height: "100%",
            width: "100%"
        },
        children: /*#__PURE__*/ React.cloneElement(content, {
            style: { ...content.props ? .style || {},
                width : "100%",
                height: "100%"
            },
            onClick: e => {
                handleClose(e); // Call the original onClick after our close handler
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
                    handleClose(e);
                }
            },
            "aria-label": "Close modal"
        })
    });
} // Add Framer property controls
addPropertyControls(FC_GlobalSmartModalClose, {
    componentInstance: {
        type: ControlType.ComponentInstance,
        title: "Component",
        description: "Connect to your close button design on canvas"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_GlobalSmartModalClose",
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
//# sourceMappingURL=./FC_GlobalSmartModalClose.map