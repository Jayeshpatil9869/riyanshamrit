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
    jsxs as _jsxs,
    Fragment as _Fragment
} from "react/jsx-runtime";
import React, {
    useEffect,
    useState,
    useRef
} from "react";
import {
    addPropertyControls,
    ControlType
} from "framer"; // Add useIsBrowser hook
const useIsBrowser = () => {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        setIsBrowser(true);
    }, []);
    return isBrowser;
}; // Static tracking of active modals and scroll state
const activeModals = new Map;
const scrollBlockingModals = new Set;
let originalScrollY = 0;
let modalCounter = 0; // Create a shared state variable for currentModalKey
const currentModalKeyState = {
    value: null
};
/**
 * @framerDisableUnlink
 */
export default function FC_GlobalSmartModal({
    desktopInstance,
    phoneInstance,
    displayMode = "Desktop",
    storageKey = "countryModal",
    style = {
        maxWidthType: "Fixed",
        maxWidthFixed: 1200,
        maxWidthPercent: 90,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 24,
        paddingPerSide: false,
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        transition: {
            duration: .3,
            ease: "cubic-bezier(0.4, 0, 0.2, 1)"
        },
        allowScroll: false,
        height: "Fit",
        alignH: "center",
        alignV: "center"
    },
    logic = {
        appear: "instant",
        appearDelay: 1,
        appearDistance: "pixels",
        appearPixels: 24,
        appearPercentage: 50,
        showBehavior: "interval",
        showInterval: 30
    },
    preview = false
}) { // Add isBrowser check
    const isBrowser = useIsBrowser(); // Store scroll position in a ref for this specific modal instance
    const savedScrollPositionRef = useRef(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);
    const [hasScrolledToTrigger, setHasScrolledToTrigger] = useState(false);
    const [canvasOrder] = useState(() => modalCounter++);
    const [isClosing, setIsClosing] = useState(false) // Add closing state
    ; // Create a state to track currentModalKey
    const [currentModalKey, setCurrentModalKey] = useState(currentModalKeyState.value); // Update the shared state object whenever currentModalKey changes
    useEffect(() => {
        currentModalKeyState.value = currentModalKey;
    }, [currentModalKey]); // Extract nested props for easier access
    const {
        appear,
        appearDelay,
        appearDistance,
        appearPixels,
        appearPercentage,
        showBehavior,
        showInterval
    } = logic; // Extract allowScroll from style
    const {
        allowScroll
    } = style; // Check if we're in Framer canvas
    const isFramerCanvas = !isBrowser || !window ? .shopXtools; // Track this modal instance
    useEffect(() => {
        if (!isBrowser || isFramerCanvas) return; //console.log('Registering modal:', storageKey, 'with order:', canvasOrder)
        activeModals.set(storageKey, canvasOrder); // If no modal is currently shown, check if we should be shown
        if (!currentModalKey) { // console.log("No currentModalKey", currentModalKey)
            // Only show the first modal (lowest canvasOrder) initially
            const isFirstModal = Array.from(activeModals.entries()).filter(([key, order]) => order < canvasOrder).length === 0;
            if (isFirstModal) { // console.log('This is the first modal:', storageKey)
                // Check localStorage only for the first modal
                const localStorageKey = `modal_dismissed_${storageKey}`;
                let storedValue;
                try {
                    storedValue = localStorage.getItem(localStorageKey);
                } catch (e) { // Handle localStorage access error
                    storedValue = null;
                }
                if (!storedValue || showBehavior === "interval" && new Date(storedValue) < new Date(Date.now() - showInterval * 24 * 60 * 60 * 1e3)) { // console.log('Setting as current modal:', storageKey)
                    setCurrentModalKey(storageKey); // For instant appear, show immediately
                    if (appear === "instant") {
                        setShouldShow(true);
                    } // For delay and scroll, the other effects will handle showing
                }
            }
        }
        return () => { // console.log('Unregistering modal:', storageKey)
            activeModals.delete(storageKey);
            if (currentModalKey === storageKey) { // console.log('This was the current modal, finding next one')
                setCurrentModalKey(null); // Find next modal to show
                const nextModal = Array.from(activeModals.entries()).sort(([, orderA], [, orderB]) => orderA - orderB).find(([key]) => { // Check if this modal has been dismissed
                    const modalLocalStorageKey = `modal_dismissed_${key}`;
                    let storedValue;
                    try {
                        storedValue = localStorage.getItem(modalLocalStorageKey);
                    } catch (e) { // Handle localStorage access error
                        storedValue = null;
                    } // If no stored value, this modal hasn't been dismissed
                    return !storedValue;
                });
                if (nextModal) { // console.log('Found next modal on unmount:', nextModal[0])
                    setCurrentModalKey(nextModal[0]); // Dispatch event to show next modal
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("show_next_modal", {
                            detail: {
                                key: nextModal[0]
                            }
                        }));
                    }
                }
            }
        };
    }, [isBrowser, isFramerCanvas, storageKey, canvasOrder, showBehavior, showInterval, appear, currentModalKey]); // Handle scroll blocking - direct approach
    useEffect(() => {
        if (!isBrowser || isFramerCanvas || !isRendered || allowScroll) return; // Add this modal to blocking set
        scrollBlockingModals.add(storageKey); // Detect Safari (both iOS and macOS)
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); // console.log("[MODAL] Scroll blocking modals:", isSafari);
        // If this is the first modal blocking scroll
        if (scrollBlockingModals.size === 1) { // For delay appear type, use the saved position
            if (appear === "delay" && savedScrollPositionRef.current > 0) {
                originalScrollY = savedScrollPositionRef.current;
            } else { // Otherwise use current position
                originalScrollY = window.scrollY;
            }
            console.log("[MODAL] About to lock scroll", {
                originalScrollY,
                scrollBlockingModalsSize: scrollBlockingModals.size
            }); // Apply body styles that preserve scroll position
            document.body.style.overflow = "hidden";
            if (!isSafari) {
                document.body.style.position = "fixed";
                document.body.style.width = "100%";
                document.body.style.top = `-${originalScrollY}px`;
            }
        } // Cleanup function
        return () => {
            scrollBlockingModals.delete(storageKey); // If this was the last modal blocking scroll
            if (scrollBlockingModals.size === 0) {
                const scrollPosition = originalScrollY; // Reset body styles first
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.width = "";
                document.body.style.height = "";
                document.body.style.top = ""; // Then restore scroll position
                if (!isSafari) {
                    window.scrollTo(0, originalScrollY);
                } // Reset for next time
                originalScrollY = 0;
            }
        };
    }, [isBrowser, isFramerCanvas, isRendered, allowScroll, storageKey, appear]); // Handle delay appearance
    useEffect(() => {
        if (!isBrowser) return;
        if (isFramerCanvas) { // In Framer canvas, handle preview mode
            if (appear === "delay") {
                const showTimer = setTimeout(() => {
                    setShouldShow(true);
                }, appearDelay * 1e3);
                return () => clearTimeout(showTimer);
            } else if (appear === "scroll") { // In canvas, show immediately for scroll mode
                setShouldShow(true);
            } else {
                setShouldShow(true);
            }
            return;
        } // For non-canvas mode with delay appear type
        if (appear === "delay" && currentModalKey === storageKey && !shouldShow) { // Save current scroll position in this modal's ref
            savedScrollPositionRef.current = window.scrollY;
            const showTimer = setTimeout(() => { // Only show if we're still the current modal
                if (currentModalKey === storageKey) { // Now show the modal
                    setShouldShow(true);
                }
            }, appearDelay * 1e3);
            return () => clearTimeout(showTimer);
        }
    }, [isBrowser, isFramerCanvas, appear, appearDelay, storageKey, currentModalKey, shouldShow]); // Listen for next modal event
    useEffect(() => {
        if (!isBrowser || isFramerCanvas) return;
        const handleNextModal = event => { //console.log("[MODAL] Handle next modal");
            if (event.detail.key === storageKey) { // console.log(`[${storageKey}] Received show_next_modal event`);
                // Clear any existing localStorage entry for this modal to ensure it shows
                const localStorageKey = `modal_dismissed_${storageKey}`;
                try {
                    localStorage.removeItem(localStorageKey);
                } catch (e) { // Handle localStorage access error
                }
                setCurrentModalKey(storageKey); // For scroll modals, reset the hasScrolledToTrigger state
                if (appear === "scroll") {
                    setHasScrolledToTrigger(false);
                } // For instant appear, show immediately
                if (appear === "instant") {
                    setShouldShow(true);
                } // For delay and scroll, the other effects will handle showing
            }
        };
        const handleForceShowModal = event => { //console.log("[MODAL] Handle force show modal");
            if (event.detail.key === storageKey) { // Set as current modal and show immediately, regardless of localStorage
                setCurrentModalKey(storageKey); // Reset trigger state for scroll modals
                if (appear === "scroll") {
                    setHasScrolledToTrigger(false);
                }
                setShouldShow(true);
            }
        }; // Listen for close events
        const handleModalClose = event => { //console.log(`[${storageKey}] Modal close event received`);
            // Always close this modal when the event is received
            setShouldShow(false); // Reset scroll trigger state
            if (appear === "scroll") {
                setHasScrolledToTrigger(false);
            } //console.log("currentModalKey", currentModalKey)
            // Only update localStorage and check for next modal if this is the current modal
            if (currentModalKey === storageKey) { //console.log(`[${storageKey}] This is the current modal, updating localStorage and finding next modal`);
                // Use a unique localStorage key for each modal
                const localStorageKey = `modal_dismissed_${storageKey}`;
                try {
                    localStorage.setItem(localStorageKey, new Date().toISOString());
                } catch (e) { // Handle localStorage access error
                }
                setCurrentModalKey(null); // Remove from scroll blocking set
                if (!allowScroll) {
                    scrollBlockingModals.delete(storageKey);
                    if (scrollBlockingModals.size === 0) {
                        document.body.style.overflow = "";
                        document.body.style.position = "";
                        document.body.style.width = "";
                        document.body.style.height = "";
                        document.body.style.top = ""; // Restore scroll position
                        window.scrollTo(0, originalScrollY);
                    }
                } // After a short delay, check for and show the next modal
                setTimeout(() => { // Only look for next modal if no modal is currently active
                    if (!currentModalKey) {
                        const nextModal = Array.from(activeModals.entries()).sort(([, orderA], [, orderB]) => orderA - orderB).find(([key]) => {
                            if (key === storageKey) return false;
                            const modalLocalStorageKey = `modal_dismissed_${key}`;
                            let storedValue;
                            try {
                                storedValue = localStorage.getItem(modalLocalStorageKey);
                            } catch (e) { // Handle localStorage access error
                                storedValue = null;
                            }
                            return !storedValue;
                        });
                        if (nextModal) { //console.log(`[${storageKey}] Found next modal: ${nextModal[0]}`);
                            setCurrentModalKey(nextModal[0]);
                            window.dispatchEvent(new CustomEvent("show_next_modal", {
                                detail: {
                                    key: nextModal[0]
                                }
                            }));
                        }
                    }
                }, 100);
            }
        };
        window.addEventListener("show_next_modal", handleNextModal);
        window.addEventListener("force_show_modal", handleForceShowModal);
        document.addEventListener("global_modal_close", handleModalClose);
        return () => {
            window.removeEventListener("show_next_modal", handleNextModal);
            window.removeEventListener("force_show_modal", handleForceShowModal);
            document.removeEventListener("global_modal_close", handleModalClose);
        };
    }, [isBrowser, isFramerCanvas, storageKey, appear, allowScroll, currentModalKey]); // Handle scroll appearance
    useEffect(() => {
        if (!isBrowser || isFramerCanvas || appear !== "scroll") return;
        if (currentModalKey === storageKey) {
            const handleScrollTrigger = () => {
                if (hasScrolledToTrigger) return; // Calculate total scrollable height
                const totalHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight) - window.innerHeight;
                const distance = appearDistance === "pixels" ? appearPixels : Math.max(0, appearPercentage / 100 * totalHeight); // Guards against short pages or zero scroll area with to avoid immediate modal trigger
                if (totalHeight > 0 && window.scrollY > 0 && window.scrollY >= distance) {
                    setHasScrolledToTrigger(true);
                    setShouldShow(true); // Preserve scroll position when modal appears
                    if (!allowScroll) {
                        originalScrollY = window.scrollY;
                    }
                }
            }; // Initial check in case we're already past the trigger point
            handleScrollTrigger();
            window.addEventListener("scroll", handleScrollTrigger);
            return () => {
                window.removeEventListener("scroll", handleScrollTrigger);
            };
        } else { // Reset the hasScrolledToTrigger state when this is no longer the current modal
            setHasScrolledToTrigger(false);
        }
    }, [isBrowser, isFramerCanvas, appear, appearDistance, appearPixels, appearPercentage, storageKey, currentModalKey, hasScrolledToTrigger, allowScroll]); // Handle visibility states
    useEffect(() => {
        if (!isBrowser) return;
        if (!shouldShow) {
            setIsVisible(false); // Dispatch modal closed event
            if (!isFramerCanvas) {
                window.dispatchEvent(new CustomEvent("modal_closed", {
                    detail: {
                        key: storageKey
                    }
                }));
            }
            const timer = setTimeout(() => {
                setIsRendered(false);
            }, (style ? .transition ? .duration || .3) * 1e3);
            return () => clearTimeout(timer);
        }
        setIsRendered(true); // Small delay to ensure DOM is ready before transition
        const showTimer = requestAnimationFrame(() => {
            setIsVisible(true); // Dispatch modal opened event
            if (!isFramerCanvas) {
                window.dispatchEvent(new CustomEvent("modal_opened", {
                    detail: {
                        key: storageKey
                    }
                }));
            }
        });
        return () => cancelAnimationFrame(showTimer);
    }, [isBrowser, shouldShow, style ? .transition ? .duration, storageKey, isFramerCanvas]); // Add logging to state setters
    const setShouldShowWithLog = value => {
        setShouldShow(value);
    }; // Replace all instances of setShouldShow with setShouldShowWithLog
    useEffect(() => {
        if (!isBrowser || isFramerCanvas) return;
        if (!currentModalKey && appear === "instant") {
            const isFirstModal = Array.from(activeModals.entries()).filter(([key, order]) => order < canvasOrder).length === 0;
            if (isFirstModal) {
                const localStorageKey = `modal_dismissed_${storageKey}`;
                let storedValue;
                try {
                    storedValue = localStorage.getItem(localStorageKey);
                } catch (e) { // Handle localStorage access error
                    storedValue = null;
                }
                if (!storedValue || showBehavior === "interval" && new Date(storedValue) < new Date(Date.now() - showInterval * 24 * 60 * 60 * 1e3)) {
                    setCurrentModalKey(storageKey);
                    setShouldShow(true);
                }
            }
        }
    }, [isBrowser, isFramerCanvas, appear, storageKey, canvasOrder, showBehavior, showInterval, currentModalKey]); // Get the appropriate component instance based on display mode
    const selectedInstance = displayMode === "Desktop" ? desktopInstance : phoneInstance; // Process the content from the selected instance
    const content = selectedInstance ? Array.isArray(selectedInstance) ? selectedInstance[0] : selectedInstance : null; // Return null during SSR
    if (!isBrowser) {
        return null;
    } // Show storage key text when in canvas mode, regardless of preview state
    const previewText = /*#__PURE__*/ _jsx("div", {
        style: {
            padding: 24,
            color: "#666",
            fontSize: "14px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80px",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ddd",
            borderRadius: "4px",
            margin: "10px"
        },
        children: preview ? `Preview active for ${displayMode} Modal (${storageKey})` : `Preview disabled for ${displayMode} Modal (${storageKey})`
    });
    if (isFramerCanvas && !preview) {
        return previewText;
    }
    if (!isRendered) {
        return null;
    }
    const getInitialTransform = () => {
        if (appear !== "scroll") return "translateY(0)";
        const distance = appearDistance === "pixels" ? `${appearPixels}px` : `${appearPercentage}%`;
        return `translateY(${distance})`;
    };
    const getMaxWidthValue = () => {
        if (!style) return "none";
        let result;
        switch (style.maxWidthType) {
            case "Fixed":
                result = typeof style.maxWidthFixed === "number" ? `${style.maxWidthFixed}px` : "1200px";
                return result;
            case "Relative":
                result = typeof style.maxWidthPercent === "number" ? `${style.maxWidthPercent}%` : "90%";
                return result;
            case "None":
            default:
                return "none";
        }
    };
    const containerStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: style ? .alignV || "center",
        justifyContent: style ? .alignH || "center",
        backgroundColor: style ? .backgroundColor || "rgba(0, 0, 0, 0.5)",
        padding: style ? .paddingPerSide ? `${style?.paddingTop!==undefined?style.paddingTop:20}px ${style?.paddingRight!==undefined?style.paddingRight:20}px ${style?.paddingBottom!==undefined?style.paddingBottom:20}px ${style?.paddingLeft!==undefined?style.paddingLeft:20}px` : `${style?.padding!==undefined?style.padding:20}px`,
        opacity: isVisible ? 1 : isFramerCanvas ? 1 : 0,
        visibility: isRendered ? "visible" : "hidden",
        transition: isFramerCanvas ? "none" : `opacity ${style?.transition?.duration||.3}s ${style?.transition?.ease||"ease"}`,
        overflow: style ? .height === "100vh" && allowScroll ? "auto" : "hidden",
        pointerEvents: isRendered && isVisible ? "auto" : "none",
        height: "100vh",
        boxSizing: "border-box",
        zIndex: 9999
    };
    const modalStyle = {
        width: style ? .maxWidthType === "Relative" ? getMaxWidthValue() : "100%",
        maxWidth: style ? .maxWidthType === "Relative" ? "none" : getMaxWidthValue(),
        margin: (() => { // Only apply auto margins if alignH is center
            if (style ? .alignH === "center") return "0 auto";
            if (style ? .alignH === "end") return "0 0 0 auto";
            return "0" // start alignment
            ;
        })(),
        transform: isVisible ? "translateY(0)" : isFramerCanvas ? "translateY(0)" : "translateY(20px)",
        transition: isFramerCanvas ? "none" : `all ${style?.transition?.duration||.3}s ${style?.transition?.ease||"ease"}`,
        willChange: isFramerCanvas ? "auto" : "transform, opacity",
        opacity: isVisible ? 1 : isFramerCanvas ? 1 : 0,
        overflow: style ? .height === "100vh" ? allowScroll ? "auto" : "hidden" : "visible",
        height: style ? .height === "100vh" ? "100%" : "auto",
        maxHeight: style ? .height === "100vh" ? "100%" : "none",
        display: "flex",
        flexDirection: "column",
        flex: style ? .height === "100vh" ? "1" : "none",
        boxSizing: "border-box"
    }; // Handle background click - simplified
    const handleBackgroundClick = () => { //console.log("[MODAL] Background clicked");
        if (isFramerCanvas) return; // Close this modal
        setShouldShow(false); // Reset scroll trigger state for scroll modals
        if (appear === "scroll") {
            setHasScrolledToTrigger(false);
        } //console.log("handleBackgroundClick, currentModalKey", currentModalKey);
        // Only update localStorage and find next modal if this is the current modal
        if (currentModalKey === storageKey) { // Update localStorage
            const localStorageKey = `modal_dismissed_${storageKey}`;
            localStorage.setItem(localStorageKey, new Date().toISOString()); // Clear current modal key
            setCurrentModalKey(null); // After animation completes, find next modal
            setTimeout(() => { // Only look for next modal if no modal is currently active
                if (!currentModalKey) {
                    const nextModal = Array.from(activeModals.entries()).sort(([, orderA], [, orderB]) => orderA - orderB).find(([key]) => {
                        if (key === storageKey) return false;
                        const modalLocalStorageKey = `modal_dismissed_${key}`;
                        const storedValue = localStorage.getItem(modalLocalStorageKey);
                        return !storedValue;
                    });
                    if (nextModal) { //console.log(`[${storageKey}] Found next modal: ${nextModal[0]}`);
                        setCurrentModalKey(nextModal[0]);
                        window.dispatchEvent(new CustomEvent("show_next_modal", {
                            detail: {
                                key: nextModal[0]
                            }
                        }));
                    }
                }
            }, (style ? .transition ? .duration || .3) * 1e3);
        }
    }; //console.log("[MODAL] Rendered", { isBrowser, isFramerCanvas, isRendered, isVisible, shouldShow });
    if (!content || ! /*#__PURE__*/ React.isValidElement(content)) {
        return /*#__PURE__*/ _jsx("div", {
            style: containerStyle,
            onClick: handleBackgroundClick,
            children: /*#__PURE__*/ _jsxs("div", {
                style: { ...modalStyle,
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    color: "#666",
                    fontSize: "14px",
                    textAlign: "center",
                    minHeight: "104px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                },
                children: ["Connect ", displayMode, " Instance"]
            })
        });
    }
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [isFramerCanvas && previewText, /*#__PURE__*/ _jsx("div", {
            style: containerStyle,
            onClick: handleBackgroundClick,
            "data-modal-container": "true",
            "data-modal-height-mode": style ? .height,
            children: /*#__PURE__*/ _jsx("div", {
                style: modalStyle,
                onClick: e => e.stopPropagation(),
                "data-modal-wrapper": "true",
                "data-modal-width-type": style ? .maxWidthType,
                "data-modal-width-value": getMaxWidthValue(),
                "data-modal-height-mode": style ? .height,
                children: /*#__PURE__*/ React.cloneElement(content, {
                    style: { ...content.props ? .style,
                        width : "100%",
                        maxWidth: style ? .maxWidthType === "Relative" ? "none" : content.props ? .style ? .maxWidth || getMaxWidthValue(),
                        overflow: style ? .height === "100vh" ? allowScroll ? "auto" : "hidden" : "visible",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        height: style ? .height === "100vh" ? "100%" : "auto",
                        minHeight: style ? .height === "100vh" ? "100%" : "auto",
                        flex: style ? .height === "100vh" ? "1 1 auto" : "0 0 auto",
                        boxSizing: "border-box"
                    },
                    onClick: e => {
                        e.stopPropagation();
                        if (content.props ? .onClick) {
                            content.props.onClick(e);
                        }
                    },
                    "data-modal-content": "true",
                    "data-modal-max-width": getMaxWidthValue(),
                    "data-modal-width-type": style.maxWidthType,
                    "data-modal-width": "100%",
                    "data-modal-content-width": content.props ? .style ? .width || "not-set",
                    "data-modal-content-max-width": content.props ? .style ? .maxWidth || "not-set",
                    "data-modal-height-mode": style ? .height,
                    "data-modal-content-height": style ? .height === "100vh" ? "100%" : "auto"
                })
            })
        })]
    });
} // Add Framer property controls
addPropertyControls(FC_GlobalSmartModal, {
    preview: {
        type: ControlType.Boolean,
        title: "Preview",
        defaultValue: false,
        enabledTitle: "On",
        disabledTitle: "Off"
    },
    displayMode: {
        type: ControlType.Enum,
        title: "Display",
        defaultValue: "Desktop",
        options: ["Desktop", "Phone"],
        optionTitles: ["Desktop", "Phone"],
        displaySegmentedControl: true
    },
    desktopInstance: {
        type: ControlType.ComponentInstance,
        title: "Desktop"
    },
    phoneInstance: {
        type: ControlType.ComponentInstance,
        title: "Phone"
    },
    style: {
        type: ControlType.Object,
        title: "Appearance",
        controls: {
            height: {
                type: ControlType.Enum,
                title: "Height",
                defaultValue: "Fit",
                options: ["Fit", "100vh"],
                optionTitles: ["Fit", "100vh"],
                displaySegmentedControl: true
            },
            alignH: {
                type: ControlType.Enum,
                title: "Align H",
                defaultValue: "center",
                options: ["start", "center", "end"],
                optionTitles: ["Left", "Center", "Right"],
                optionIcons: ["align-left", "align-center", "align-right"],
                displaySegmentedControl: true
            },
            alignV: {
                type: ControlType.Enum,
                title: "Align V",
                defaultValue: "center",
                options: ["start", "center", "end"],
                optionTitles: ["Top", "Middle", "Bottom"],
                optionIcons: ["align-top", "align-middle", "align-bottom"],
                displaySegmentedControl: true
            },
            maxWidthType: {
                type: ControlType.Enum,
                title: "Max Width",
                defaultValue: "Fixed",
                options: ["None", "Fixed", "Relative"],
                optionTitles: ["None", "Fixed", "Relative"]
            },
            maxWidthFixed: {
                type: ControlType.Number,
                title: "Fixed",
                defaultValue: 1200,
                min: 0,
                max: 2e3,
                step: 100,
                unit: "px",
                displayStepper: true,
                hidden({
                    maxWidthType
                }) {
                    return maxWidthType !== "Fixed";
                }
            },
            maxWidthPercent: {
                type: ControlType.Number,
                title: "Percent",
                defaultValue: 90,
                min: 0,
                max: 100,
                step: 5,
                unit: "%",
                displayStepper: true,
                hidden({
                    maxWidthType
                }) {
                    return maxWidthType !== "Relative";
                }
            },
            padding: {
                type: ControlType.FusedNumber,
                title: "Padding",
                defaultValue: 20,
                toggleKey: "paddingPerSide",
                toggleTitles: ["All", "Sides"],
                valueKeys: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
                valueLabels: ["T", "R", "B", "L"],
                min: 0
            },
            transition: {
                type: ControlType.Object,
                title: "Transition",
                defaultValue: {
                    duration: .3,
                    ease: "cubic-bezier(0.4, 0, 0.2, 1)"
                },
                controls: {
                    duration: {
                        type: ControlType.Number,
                        title: "Duration",
                        defaultValue: .3,
                        min: 0,
                        max: 8,
                        step: .1,
                        unit: "s"
                    },
                    ease: {
                        type: ControlType.Enum,
                        title: "Ease",
                        defaultValue: "cubic-bezier(0.4, 0, 0.2, 1)",
                        options: ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0.0, 0.0, 0.2, 1)", "cubic-bezier(0.4, 0.0, 1, 1)", "ease", "ease-in", "ease-out", "ease-in-out"],
                        optionTitles: ["Standard", "Decelerate", "Accelerate", "Ease", "Ease In", "Ease Out", "Ease In Out"]
                    }
                }
            },
            backgroundColor: {
                type: ControlType.Color,
                title: "BG",
                defaultValue: "rgba(0, 0, 0, 0.25)"
            },
            allowScroll: {
                type: ControlType.Boolean,
                title: "Page Scroll",
                defaultValue: false,
                enabledTitle: "Allow",
                disabledTitle: "Block"
            }
        }
    },
    logic: {
        type: ControlType.Object,
        title: "Logic",
        controls: {
            appear: {
                type: ControlType.Enum,
                title: "Appear",
                defaultValue: "instant",
                options: ["instant", "delay", "scroll"],
                optionTitles: ["Instant", "Delay", "Scroll"],
                displaySegmentedControl: true,
                segmentedControlDirection: "vertical"
            },
            appearDelay: {
                type: ControlType.Number,
                title: "Delay",
                defaultValue: 1,
                min: 0,
                max: 10,
                step: .1,
                unit: "s",
                hidden({
                    appear
                }) {
                    return appear !== "delay";
                }
            },
            appearDistance: {
                type: ControlType.Enum,
                title: "Y Distance",
                defaultValue: "pixels",
                options: ["pixels", "percentage"],
                optionTitles: ["px", "%"],
                displaySegmentedControl: true,
                hidden({
                    appear
                }) {
                    return appear !== "scroll";
                }
            },
            appearPixels: {
                type: ControlType.Number,
                title: "Pixels",
                defaultValue: 24,
                min: 0,
                step: 1,
                unit: "px",
                hidden({
                    appear,
                    appearDistance
                }) {
                    return appear !== "scroll" || appearDistance !== "pixels";
                }
            },
            appearPercentage: {
                type: ControlType.Number,
                title: "Percentage",
                defaultValue: 50,
                min: 0,
                max: 100,
                step: 1,
                unit: "%",
                hidden({
                    appear,
                    appearDistance
                }) {
                    return appear !== "scroll" || appearDistance !== "percentage";
                }
            },
            showBehavior: {
                type: ControlType.Enum,
                title: "Show",
                defaultValue: "interval",
                options: ["once", "interval"],
                optionTitles: ["Once", "Every X Days"],
                displaySegmentedControl: true,
                segmentedControlDirection: "vertical"
            },
            showInterval: {
                type: ControlType.Number,
                title: "Reset After",
                defaultValue: 30,
                min: 1,
                max: 365,
                step: 1,
                unit: " days",
                hidden({
                    showBehavior
                }) {
                    return showBehavior !== "interval";
                }
            }
        }
    },
    storageKey: {
        type: ControlType.String,
        title: "Identifier",
        defaultValue: "modal",
        description: "Unique identifier for Modal Trigger component and localStorage"
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "FC_GlobalSmartModal",
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
//# sourceMappingURL=./FC_GlobalSmartModal.map