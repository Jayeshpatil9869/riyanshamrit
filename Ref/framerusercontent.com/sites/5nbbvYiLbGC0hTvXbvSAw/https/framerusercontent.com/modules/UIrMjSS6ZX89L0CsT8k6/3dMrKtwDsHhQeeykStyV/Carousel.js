import {
    jsx as _jsx,
    jsxs as _jsxs
} from "react/jsx-runtime";
import {
    Children,
    useCallback,
    useEffect,
    useState,
    useRef,
    cloneElement,
    startTransition,
    useId
} from "react";
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    scroll,
    resize
} from "@motionone/dom";
import {
    clamp
} from "@motionone/utils";
import {
    animate,
    motion,
    useMotionValue,
    useTransform,
    useReducedMotion,
    LayoutGroup
} from "framer-motion";
import {
    usePadding,
    paddingControl
} from "https://framer.com/m/framer/default-utils.js@^0.45.0";
/**
 * Calculate the width of the fade mask. Fade width and inset are provided
 * as percentages. There's a fade on the left and the right, so we return
 * a maximum of 50%.
 */
function calcMaskWidth([inset, width]) {
    return inset + (100 - inset) * (width / 100) * .5;
}
/**
 * Use media queries to determine if this device uses a mouse as
 * the primary input.
 * TODO: Commented out because of https://framer-team.slack.com/archives/C01B14R6E22/p1745051842676819
 */
/*function useIsMouse() {
    const [isMouseDevice, setIsMouseDevice] = useState(false)

    useLayoutEffect(() => {
        setIsMouseDevice(window.matchMedia("(pointer:fine)").matches)
    }, [])

    return isMouseDevice
}*/
/**
 * This checks a scroll position against the available scrollable
 * range. If we have hit an edge, start/end, we fade out the pagination
 * controls and mask. Likewise if we've just moved away from an edge we
 * fade them back in.
 */
function checkLimit(progress, target, {
    edgeOpacity,
    moreItems,
    buttonRef
}, transition) {
    if (moreItems.current && progress === target) {
        moreItems.current = false;
        animate(edgeOpacity, 1, transition);
        buttonRef.current ? .setAttribute("disabled", "");
    } else if (!moreItems.current && progress !== target) {
        moreItems.current = true;
        animate(edgeOpacity, 0, transition);
        buttonRef.current ? .removeAttribute("disabled");
    }
}

function useGUI(initialMoreItems, initialAlpha) {
    const moreItems = useRef(initialMoreItems);
    const edgeOpacity = useMotionValue(moreItems.current ? 0 : 1);
    const fadeOpacity = useTransform(edgeOpacity, [0, 1], [initialAlpha || 0, 1]);
    const buttonOpacity = useTransform(edgeOpacity, v => 1 - v);
    const buttonRef = useRef(null);
    /**
     * Returns a pointer-events CSS value for a given opacity.
     * The threshold here is arbitrary, the theory being we
     * should only enable pointer-events when the button is
     * somewhat visible.
     */
    const pointerEvents = useTransform(buttonOpacity, v => v > .2 ? "auto" : "none");
    /**
     * Returns a cursor CSS value for a given pointer-events value.
     * So only indicate
     */
    const cursor = useTransform(pointerEvents, v => v === "auto" ? "pointer" : "default");
    const buttonStyle = { ...baseButtonStyles,
        opacity: buttonOpacity,
        pointerEvents,
        cursor
    };
    return {
        moreItems,
        fadeOpacity,
        edgeOpacity,
        buttonStyle,
        buttonRef
    };
}

function setAriaVisible({
    element
}) {
    element.setAttribute("aria-hidden", false);
}

function useScrollLimits(container, axis, directionModifier, scrollInfo, updateCurrentScroll, targetScroll, checkLimits, measureItems) {
    useEffect(() => {
        if (!container.current) return;
        const updateScrollInfo = info => {
            scrollInfo.current = info[axis];
            /**
             * If we've reached our target scroll, delete it.
             * This way we know when to make calculations based on the
             * actual current scroll or the target scroll.
             */
            if (info[axis].current * directionModifier === targetScroll.current) {
                targetScroll.current = undefined;
            }
            updateCurrentScroll(info[axis].current);
            checkLimits();
        };
        const stopScroll = scroll(updateScrollInfo, {
            container: container.current,
            axis
        });
        const stopResize = resize(container.current, () => {
            measureItems();
            checkLimits();
        });
        return () => {
            stopScroll();
            stopResize();
        };
    }, [checkLimits, measureItems]);
}
/**
 *
 * @framerIntrinsicWidth 400
 * @framerIntrinsicHeight 200
 *
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */
export default function Carousel({
    slots,
    gap,
    axis,
    align,
    sizingObject,
    fadeObject,
    arrowObject,
    snapObject,
    progressObject,
    ariaLabel,
    borderRadius,
    effectsObject,
    ...props
}) { // Remove empty slots (such as hidden layers)
    const filteredSlots = slots ? .filter(Boolean);
    const numItems = Children.count(filteredSlots);
    const isCanvas = RenderTarget.current() === RenderTarget.canvas;
    const writingDirection = useWritingDirection();
    /**
     * For RTL the items lay out right to left and therefore scroll will be negative. We
     * flip the sign on the value to avoid overcomplicating things with negative pages etc
     */
    const directionModifier = axis && writingDirection === "rtl" ? -1 : 1;
    const padding = usePadding(props);
    const axisLabel = axis ? "x" : "y";
    const {
        fadeContent,
        fadeWidth,
        fadeInset,
        fadeTransition,
        fadeAlpha
    } = fadeObject;
    const {
        snap,
        snapEdge,
        fluid
    } = snapObject;
    const {
        widthType,
        widthInset,
        widthColumns,
        heightType,
        heightInset,
        heightRows
    } = sizingObject;
    const {
        showScrollbar,
        showProgressDots,
        dotSize,
        dotsInset,
        dotsRadius,
        dotsPadding,
        dotsGap,
        dotsFill,
        dotsBackground,
        dotsActiveOpacity,
        dotsOpacity,
        dotsBlur
    } = progressObject;
    const {
        showMouseControls,
        arrowSize,
        arrowRadius,
        arrowFill,
        leftArrow,
        rightArrow,
        arrowPadding
    } = arrowObject;
    /**
     * The latest scroll info on the scrollable axis as reported by Motion One.
     */
    const scrollInfo = useRef(undefined);
    /**
     * The target scroll we're currently animating to, calculated when
     * a user presses a pagination button.
     */
    const targetScroll = useRef(undefined);
    /**
     * If we're performing a scroll animation, return the target scroll instead
     * of the latest scroll position. This will help users paginate through
     * a carousel much quicker.
     */
    const currentScroll = useMotionValue(0);
    const updateCurrentScroll = newScroll => {
        currentScroll.set(targetScroll.current !== undefined ? targetScroll.current : newScroll);
    };
    /**
     * We only want to display pagination buttons if the user has enabled the setting
     * and this is actually a mouse device.
     * TODO: Commented out because of https://framer-team.slack.com/archives/C01B14R6E22/p1745051842676819
     */ //const isMouseDevice = useIsMouse()
    /**
     * Create all the motion values for the GUI at each end of the carousel.
     */
    const start = useGUI(writingDirection === "rtl", fadeAlpha);
    const end = useGUI(writingDirection !== "rtl", fadeAlpha);
    const startMaskInset = useMotionValue(fadeInset * .5);
    const endMaskInset = useTransform(startMaskInset, v => 100 - v);
    const baseWidth = useMotionValue(fadeWidth);
    const startMaskWidth = useTransform([startMaskInset, baseWidth], calcMaskWidth);
    const endMaskWidth = useTransform(startMaskWidth, v => 100 - v);
    const direction = useMotionValue(axis ? "right" : "bottom");
    const mask = useTransform([direction, start.fadeOpacity, startMaskInset, startMaskWidth, end.fadeOpacity, endMaskInset, endMaskWidth], latest => {
        return `linear-gradient(to ${latest[0]}, rgb(0, 0, 0, ${latest[1]}) ${latest[2]}%, rgb(0, 0, 0, 1) ${latest[3]}%, rgba(0, 0, 0, 1) ${latest[6]}%, rgb(0, 0, 0, ${latest[4]}) ${latest[5]}%)`;
    });
    const carouselRef = useRef(null);
    /**
     * Dots state
     */
    const [numPages, setNumPages] = useState(isCanvas ? 4 : 1);
    /**
     * Generate styles for components.
     */
    const itemStyle = {
        scrollSnapAlign: snapEdge,
        flexShrink: 0
    };
    const childStyle = {};
    if (align === "stretch") {
        if (axis) {
            childStyle.height = "100%";
            itemStyle.height = "auto";
        } else {
            childStyle.width = "100%";
            itemStyle.width = "auto";
        }
    }
    if (!fluid) {
        itemStyle.scrollSnapStop = "always";
    }
    if (widthType === "stretch") {
        itemStyle.width = `calc(100% - ${widthInset||0}px)`;
        childStyle.width = "100%";
    } else if (widthType === "columns") {
        itemStyle.width = `calc(${100/widthColumns}% - ${gap}px + ${gap/widthColumns}px)`;
        childStyle.width = "100%";
    }
    if (heightType === "stretch") {
        itemStyle.height = `calc(100% - ${heightInset||0}px)`;
        childStyle.height = "100%";
    } else if (heightType === "rows") {
        itemStyle.height = `calc(${100/heightRows}% - ${gap}px + ${gap/heightRows}px)`;
        childStyle.height = "100%";
    }
    const scrollOverflow = isCanvas ? "hidden" : "auto";
    const containerStyle = { ...baseContainerStyle,
        padding
    };
    const carouselStyle = { ...baseCarouselStyle,
        gap,
        alignItems: align,
        flexDirection: axis ? "row" : "column",
        overflowX: axis ? scrollOverflow : "hidden",
        overflowY: axis ? "hidden" : scrollOverflow,
        scrollSnapType: snap ? `${axisLabel} mandatory` : undefined,
        WebkitOverflowScrolling: "touch",
        WebkitMaskImage: fadeContent ? mask : undefined,
        maskImage: fadeContent ? mask : undefined,
        borderRadius
    };
    const carouselA11y = {
        ["aria-roledescription"]: "carousel"
    };
    if (ariaLabel) {
        carouselA11y["aria-title"] = ariaLabel;
    }
    const itemA11y = {};
    if (align === "stretch") {
        itemA11y["aria-role"] = "group";
        itemA11y["aria-roledescription"] = "slide";
    }
    if (!isCanvas) {
        const itemSizes = useRef([]);
        useScrollLimits(carouselRef, axisLabel, directionModifier, scrollInfo, updateCurrentScroll, targetScroll, useCallback(() => {
            if (!scrollInfo.current) return;
            const {
                targetLength,
                containerLength,
                scrollLength
            } = scrollInfo.current;
            const current = currentScroll.get();
            if (!targetLength && !containerLength) return;
            if (targetLength > containerLength) {
                checkLimit(current * directionModifier, 0, start, fadeTransition);
                checkLimit(current * directionModifier, scrollLength, end, fadeTransition);
                for (let i = 0; i < itemSizes.current.length; i++) {
                    const {
                        element,
                        start,
                        end
                    } = itemSizes.current[i];
                    const outOfView = end < current || start > current + containerLength;
                    element.setAttribute("aria-hidden", outOfView);
                    if (!outOfView) {
                        element.querySelectorAll("button,a").forEach(el => {
                            const orig = el.dataset.origTabIndex;
                            if (orig) el.tabIndex = orig;
                            else el.removeAttribute("tabIndex");
                        });
                    } else {
                        element.querySelectorAll("button,a").forEach(el => {
                            const orig = el.getAttribute("tabIndex");
                            if (orig) el.dataset.origTabIndex = orig;
                            el.tabIndex = -1;
                        });
                    }
                }
            } else {
                checkLimit(0, 0, start, fadeTransition);
                checkLimit(1, 1, end, fadeTransition);
                itemSizes.current.forEach(setAriaVisible);
            } // This used to be Math.ceil, which would round 3.05 to 4.
            // This now uses Math.round to ensure people get a perfect amount of dots
            // when using Columns or Rows — Benjamin
            /**
             * Update by Matt: changing back to ceil, might break dots but round was incorrectly
             * paginating for all widths - overshooting items at shorter viewports and
             * not paginating at all for wide.
             */
            let newNumPages = Math.ceil(targetLength / containerLength);
            if (!isNaN(newNumPages)) { // If the number of dots is 65% of the number of items, make it 100%
                if (newNumPages / numItems > .65) newNumPages = numItems;
                if (newNumPages !== numPages) setNumPages(newNumPages);
            }
        }, [numPages]), useCallback(() => {
            if (!carouselRef.current) return;
            itemSizes.current = Array.from(carouselRef.current.children).map(element => {
                return axis ? {
                    element,
                    start: element.offsetLeft,
                    end: element.offsetLeft + element.offsetWidth
                } : {
                    element,
                    start: element.offsetTop,
                    end: element.offsetTop + element.offsetHeight
                };
            });
        }, []));
    }
    /**
     * On the canvas, we want to keep the motion values updated
     * with the latest props. Outside of the canvas these will never
     * update.
     */
    if (isCanvas) {
        useEffect(() => {
            baseWidth.set(fadeWidth);
        }, [fadeWidth]);
        useEffect(() => {
            startMaskInset.set(fadeInset * .5);
        }, [fadeInset]);
        useEffect(() => {
            direction.set(axis ? "right" : "bottom");
        }, [axis]);
    }
    /*const findNextItem = (delta: 1 | -1, target: number) => {
            if (!scrollInfo.current) return
            const { current } = scrollInfo.current
            const { children } = carouselRef.current
            let scrollTarget

            let i = delta === 1 ? 0 : children.length - 1
            while (scrollTarget === undefined) {
                const item = children[i]

                const start = axis ? item.offsetLeft : item.offsetTop
                const length = axis ? item.offsetWidth : item.offsetHeight
                const end = start + length

                const threshold = 0.05
                if (delta === 1) {
                    const visibility = progress(start, end, target)
                    if (visibility < 1 - threshold) {
                        scrollTarget = start
                    } else if (i === children.length - 1) {
                        scrollTarget = end
                    }
                } else if (delta === -1) {
                    const visibility = progress(start, end, target)
                    if (visibility > threshold) {
                        scrollTarget = end
                    } else if (i === 0) {
                        scrollTarget = start
                    }
                }

                i += delta
            }

            return scrollTarget
        }*/
    const isReducedMotion = useReducedMotion();
    const goto = scrollTo => {
        targetScroll.current = scrollTo;
        const options = axis ? {
            left: scrollTo
        } : {
            top: scrollTo
        };
        carouselRef.current.scrollTo({ ...options,
            behavior: isReducedMotion ? "auto" : "smooth"
        });
    };
    const gotoPage = (page, adjustment = 0) => {
        if (!scrollInfo.current) return;
        const {
            scrollLength
        } = scrollInfo.current;
        const totalLen = scrollLength / (numPages - 1);
        goto((page * totalLen + adjustment * totalLen) * directionModifier);
    };
    const gotoDelta = delta => () => {
        if (!scrollInfo.current) return;
        const {
            containerLength,
            scrollLength
        } = scrollInfo.current;
        const current = currentScroll.get() * directionModifier;
        const pageLength = scrollLength / numPages;
        const currentPage = clamp(0, numPages - 1, Math.floor(current / pageLength));
        let adjustment = 0;
        if (snap && (snapEdge === "start" || snapEdge === "end") && delta >= 1) adjustment = .4 // this ensures it doesn't snap back to previous page*/
        ;
        gotoPage(currentPage + delta, adjustment);
    };
    /**
     * Return placeholder if no children
     */
    if (numItems === 0) {
        return /*#__PURE__*/ _jsx(Placeholder, {});
    }
    const dots = [];
    const dotsBlurStyle = {};
    if (numPages > 1 && showProgressDots && !showScrollbar) {
        for (let i = 0; i < numPages; i++) {
            const isSelected = isCanvas && !i || false;
            dots.push( /*#__PURE__*/ _jsx(Dot, {
                dotStyle: { ...dotStyle,
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: dotsFill
                },
                buttonStyle: baseButtonStyles,
                isSelected: isSelected,
                selectedOpacity: dotsActiveOpacity,
                opacity: dotsOpacity,
                onClick: () => startTransition(() => gotoPage(i)),
                currentScroll: currentScroll,
                scrollInfo: scrollInfo,
                total: numPages,
                index: i,
                gap: dotsGap,
                padding: dotsPadding,
                axis: axis,
                directionModifier: directionModifier
            }));
        }
        if (dotsBlur) {
            dotsBlurStyle.backdropFilter = dotsBlurStyle.WebkitBackdropFilter = `blur(${dotsBlur}px)`;
        }
    }
    const leftArrowSrc = leftArrow || "https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg";
    const rightArrowSrc = rightArrow || "https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg";
    return /*#__PURE__*/ _jsxs("section", {
        style: containerStyle,
        ...carouselA11y,
        children: [ /*#__PURE__*/ _jsx(motion.ul, {
            ref: carouselRef,
            style: carouselStyle,
            className: "framer--carousel",
            "data-show-scrollbar": showScrollbar,
            "aria-atomic": "false",
            "aria-live": "polite",
            onWheel: () => targetScroll.current = undefined,
            children: Children.map(filteredSlots, (child, index) => /*#__PURE__*/ _jsx(AutoIdLayoutGroup, {
                inherit: "id",
                children: /*#__PURE__*/ _jsx("li", {
                    style: itemStyle,
                    ...itemA11y,
                    "aria-label": `${index+1} of ${numItems}`,
                    children: /*#__PURE__*/ cloneElement(child, { ...child.props,
                        style: { ...child.props ? .style,
                            ...childStyle
                        }
                    })
                })
            }))
        }), /*#__PURE__*/ _jsxs("fieldset", {
            style: { ...controlsStyles,
                padding: arrowPadding,
                display: "flex",
                flexDirection: axis ? "row" : "column"
            },
            "aria-label": "Carousel pagination controls",
            className: "framer--carousel-controls",
            "data-show-mouse-controls": showMouseControls,
            children: [ // isMouseDevice &&
                /*#__PURE__*/
                _jsx(motion.button, {
                    ref: start.buttonRef,
                    type: "button",
                    style: { ...start.buttonStyle,
                        backgroundColor: arrowFill,
                        width: arrowSize,
                        height: arrowSize,
                        borderRadius: arrowRadius,
                        rotate: !axis ? 90 : 0,
                        display: showMouseControls ? "block" : "none"
                    },
                    onClick: gotoDelta(-1),
                    "aria-label": "Previous",
                    whileTap: {
                        scale: .9
                    },
                    transition: {
                        duration: .05
                    },
                    children: /*#__PURE__*/ _jsx("img", {
                        decoding: "async",
                        alt: "",
                        width: arrowSize,
                        height: arrowSize,
                        src: writingDirection === "rtl" && axis ? rightArrowSrc : leftArrowSrc
                    })
                }), // isMouseDevice &&
                /*#__PURE__*/
                _jsx(motion.button, {
                    ref: end.buttonRef,
                    type: "button",
                    style: { ...end.buttonStyle,
                        backgroundColor: arrowFill,
                        width: arrowSize,
                        height: arrowSize,
                        borderRadius: arrowRadius,
                        rotate: !axis ? 90 : 0,
                        display: showMouseControls ? "block" : "none"
                    },
                    onClick: gotoDelta(1),
                    "aria-label": "Next",
                    whileTap: {
                        scale: .9
                    },
                    transition: {
                        duration: .05
                    },
                    children: /*#__PURE__*/ _jsx("img", {
                        decoding: "async",
                        alt: "",
                        width: arrowSize,
                        height: arrowSize,
                        src: writingDirection === "rtl" && axis ? leftArrowSrc : rightArrowSrc
                    })
                }), dots.length > 1 ? /*#__PURE__*/ _jsx("div", {
                    style: { ...dotsContainerStyle,
                        left: axis ? "50%" : dotsInset,
                        top: !axis ? "50%" : "unset",
                        transform: axis ? "translateX(-50%)" : "translateY(-50%)",
                        flexDirection: axis ? "row" : "column",
                        bottom: axis ? dotsInset : "unset",
                        borderRadius: dotsRadius,
                        backgroundColor: dotsBackground,
                        ...dotsBlurStyle
                    },
                    children: dots
                }) : null
            ]
        }), /*#__PURE__*/ _jsx(MouseStyles, {})]
    });
} /* Default Properties */
Carousel.defaultProps = {
    gap: 10,
    padding: 10,
    progressObject: {
        showScrollbar: false,
        showProgressDots: false
    },
    sizingObject: {
        widthType: "auto",
        widthOffset: 0,
        widthColumns: 2,
        heightType: "auto",
        heightOffset: 0,
        heightRows: 2
    },
    borderRadius: 0
}; /* Property Controls */
addPropertyControls(Carousel, {
    slots: {
        type: ControlType.Array,
        title: "Children",
        control: {
            type: ControlType.ComponentInstance
        }
    },
    axis: {
        type: ControlType.Enum,
        title: "Direction",
        options: [true, false],
        optionIcons: ["direction-horizontal", "direction-vertical"],
        displaySegmentedControl: true
    },
    align: {
        type: ControlType.Enum,
        title: "Align",
        options: ["flex-start", "center", "flex-end"],
        optionIcons: {
            axis: {
                true: ["align-top", "align-middle", "align-bottom"],
                false: ["align-left", "align-center", "align-right"]
            }
        },
        defaultValue: "center",
        displaySegmentedControl: true
    },
    gap: {
        type: ControlType.Number,
        title: "Gap"
    },
    ...paddingControl,
    sizingObject: {
        type: ControlType.Object,
        title: "Sizing",
        controls: {
            widthType: {
                type: ControlType.Enum,
                title: "Width",
                options: ["auto", "stretch", "columns"],
                optionTitles: ["Auto", "Stretch", "Columns"],
                defaultValue: "auto"
            },
            widthInset: {
                type: ControlType.Number,
                title: "Inset",
                min: 0,
                max: 500,
                defaultValue: 0,
                hidden: props => props.widthType !== "stretch"
            },
            widthColumns: {
                type: ControlType.Number,
                title: "Columns",
                min: 1,
                max: 10,
                defaultValue: 2,
                displayStepper: true,
                hidden: props => props.widthType !== "columns"
            },
            heightType: {
                type: ControlType.Enum,
                title: "Height",
                options: ["auto", "stretch", "rows"],
                optionTitles: ["Auto", "Stretch", "Rows"],
                defaultValue: "auto"
            },
            heightInset: {
                type: ControlType.Number,
                title: "Inset",
                min: 0,
                max: 500,
                defaultValue: 0,
                hidden: props => props.heightType !== "stretch"
            },
            heightRows: {
                type: ControlType.Number,
                title: "Rows",
                min: 1,
                max: 10,
                defaultValue: 2,
                displayStepper: true,
                hidden: props => props.heightType !== "rows"
            }
        }
    },
    snapObject: {
        type: ControlType.Object,
        title: "Snapping",
        controls: {
            snap: {
                type: ControlType.Boolean,
                title: "Enable"
            },
            snapEdge: {
                type: ControlType.Enum,
                title: "Edge",
                options: ["start", "center", "end"],
                optionTitles: ["Left", "Center", "Right"],
                defaultValue: "center",
                hidden: props => !props.snap
            },
            fluid: {
                type: ControlType.Boolean,
                title: "Fluid",
                defaultValue: false,
                hidden: props => !props.snap
            }
        }
    },
    fadeObject: {
        type: ControlType.Object,
        title: "Fading",
        controls: {
            fadeContent: {
                type: ControlType.Boolean,
                title: "Enable",
                defaultValue: false
            },
            fadeWidth: {
                type: ControlType.Number,
                title: "Width",
                defaultValue: 25,
                min: 0,
                max: 100,
                unit: "%",
                hidden: props => !props.fadeContent
            },
            fadeInset: {
                type: ControlType.Number,
                title: "Inset",
                defaultValue: 0,
                min: 0,
                max: 100,
                unit: "%",
                hidden: props => !props.fadeContent
            },
            fadeAlpha: {
                type: ControlType.Number,
                title: "Opacity",
                hidden: props => !props.fadeContent,
                min: 0,
                max: 1,
                step: .05,
                defaultValue: 0
            },
            fadeTransition: {
                type: ControlType.Transition,
                title: "Transition",
                hidden: props => !props.fadeContent
            }
        }
    },
    progressObject: {
        type: ControlType.Object,
        title: "Progress",
        controls: {
            showScrollbar: {
                type: ControlType.Boolean,
                title: "Scroll Bar",
                defaultValue: false
            },
            showProgressDots: {
                type: ControlType.Boolean,
                title: "Dots",
                defaultValue: false,
                hidden: props => props.showScrollbar
            },
            dotSize: {
                type: ControlType.Number,
                title: "Size",
                min: 1,
                max: 100,
                defaultValue: 10,
                displayStepper: true,
                hidden: props => !props.showProgressDots || props.showScrollbar
            },
            dotsInset: {
                type: ControlType.Number,
                title: "Inset",
                min: 0,
                max: 100,
                defaultValue: 10,
                displayStepper: true,
                hidden: props => !props.showProgressDots || props.showScrollbar
            },
            dotsGap: {
                type: ControlType.Number,
                title: "Gap",
                min: 0,
                max: 100,
                defaultValue: 10,
                displayStepper: true,
                hidden: props => !props.showProgressDots || props.showScrollbar
            },
            dotsPadding: {
                type: ControlType.Number,
                title: "Padding",
                min: 0,
                max: 100,
                defaultValue: 10,
                displayStepper: true,
                hidden: props => !props.showProgressDots || props.showScrollbar
            },
            dotsFill: {
                type: ControlType.Color,
                title: "Fill",
                defaultValue: "#fff",
                hidden: props => !props.showProgressDots || props.showScrollbar
            },
            dotsBackground: {
                type: ControlType.Color,
                title: "Backdrop",
                defaultValue: "rgba(0,0,0,0.2)",
                hidden: props => !props.showProgressDots || props.showScrollbar
            },
            dotsRadius: {
                type: ControlType.Number,
                title: "Radius",
                min: 0,
                max: 200,
                defaultValue: 50,
                hidden: props => !props.showProgressDots || props.showScrollbar
            },
            dotsOpacity: {
                type: ControlType.Number,
                title: "Opacity",
                min: 0,
                max: 1,
                defaultValue: .5,
                step: .1,
                displayStepper: true,
                hidden: props => !props.showProgressDots || props.showScrollbar
            },
            dotsActiveOpacity: {
                type: ControlType.Number,
                title: "Current",
                min: 0,
                max: 1,
                defaultValue: 1,
                step: .1,
                displayStepper: true,
                hidden: props => !props.showProgressDots || props.showScrollbar
            },
            dotsBlur: {
                type: ControlType.Number,
                title: "Blur",
                min: 0,
                max: 50,
                defaultValue: 4,
                step: 1,
                hidden: props => !props.showProgressDots || props.showScrollbar
            }
        }
    },
    arrowObject: {
        type: ControlType.Object,
        title: "Arrows",
        controls: {
            showMouseControls: {
                type: ControlType.Boolean,
                title: "Show",
                defaultValue: true
            },
            arrowFill: {
                type: ControlType.Color,
                title: "Fill",
                defaultValue: "rgba(0,0,0,0.2)",
                hidden: props => !props.showMouseControls
            },
            leftArrow: {
                type: ControlType.Image,
                title: "Previous",
                hidden: props => !props.showMouseControls
            },
            rightArrow: {
                type: ControlType.Image,
                title: "Next",
                hidden: props => !props.showMouseControls
            },
            arrowSize: {
                type: ControlType.Number,
                title: "Size",
                min: 0,
                max: 200,
                displayStepper: true,
                defaultValue: 40,
                hidden: props => !props.showMouseControls
            },
            arrowRadius: {
                type: ControlType.Number,
                title: "Radius",
                min: 0,
                max: 500,
                defaultValue: 40,
                hidden: props => !props.showMouseControls
            },
            arrowPadding: {
                type: ControlType.Number,
                title: "Inset",
                min: 0,
                max: 100,
                defaultValue: 20,
                displayStepper: true,
                hidden: props => !props.showMouseControls
            }
        }
    },
    ariaLabel: {
        type: ControlType.String,
        title: "Aria Label",
        placeholder: "Movies..."
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Radius",
        min: 0,
        max: 500,
        displayStepper: true,
        defaultValue: 0
    }
});

function Dot({
    currentScroll,
    scrollInfo,
    isSelected,
    selectedOpacity,
    opacity: unselectedOpacity,
    total,
    index,
    dotStyle,
    buttonStyle,
    gap,
    padding,
    axis,
    directionModifier,
    ...props
}) {
    const opacity = useTransform(currentScroll, v => {
        if (!scrollInfo.current ? .scrollLength) {
            return index === 0 ? selectedOpacity : unselectedOpacity;
        }
        const currentScroll = v * directionModifier;
        const pageLength = scrollInfo.current ? .scrollLength / total;
        const minScroll = pageLength * index;
        const maxScroll = minScroll + pageLength;
        const isSelected = currentScroll >= minScroll && (index < total - 1 ? currentScroll < maxScroll : index === total - 1);
        return isSelected ? selectedOpacity : unselectedOpacity;
    });
    const inlinePadding = gap / 2;
    let top = !axis && index > 0 ? inlinePadding : padding;
    let bottom = !axis && index !== total - 1 ? inlinePadding : padding;
    let right = axis && index !== total - 1 ? inlinePadding : padding;
    let left = axis && index > 0 ? inlinePadding : padding;
    return /*#__PURE__*/ _jsx("button", {
        "aria-label": `Scroll to page ${index+1}`,
        type: "button",
        ...props,
        style: { ...buttonStyle,
            padding: `${top}px ${right}px ${bottom}px ${left}px`
        },
        children: /*#__PURE__*/ _jsx(motion.div, {
            style: { ...dotStyle,
                opacity
            }
        })
    });
}

function Placeholder() {
    return /*#__PURE__*/ _jsxs("section", {
        style: placeholderStyles,
        children: [ /*#__PURE__*/ _jsx("div", {
            style: emojiStyles,
            children: "✨"
        }), /*#__PURE__*/ _jsx("p", {
            style: titleStyles,
            children: "Connect to Content"
        }), /*#__PURE__*/ _jsx("p", {
            style: subtitleStyles,
            children: "Add layers or components to swipe between."
        })]
    });
}

function MouseStyles() {
    return /*#__PURE__*/ _jsx("div", {
        dangerouslySetInnerHTML: {
            __html: `<style>@media (pointer: fine) {
                .framer--carousel[data-show-scrollbar="false"]::-webkit-scrollbar {
                    display: none;
                    -webkit-appearance: none;
                    width: 0;
                    height: 0;
                }

                .framer--carousel[data-show-scrollbar="false"]::-webkit-scrollbar-thumb {
                    display: none;
                }

                .framer--carousel[data-show-scrollbar="false"] {
                    scrollbar-width: none;
                    scrollbar-height: none;
                }
            }</style>`
        }
    });
} /* Styles */
const placeholderStyles = {
    display: "flex",
    width: "100%",
    height: "100%",
    placeContent: "center",
    placeItems: "center",
    flexDirection: "column",
    color: "#96F",
    background: "rgba(136, 85, 255, 0.1)",
    fontSize: 11,
    overflow: "hidden",
    padding: "20px 20px 30px 20px"
};
const emojiStyles = {
    fontSize: 32,
    marginBottom: 10
};
const titleStyles = {
    margin: 0,
    marginBottom: 10,
    fontWeight: 600,
    textAlign: "center"
};
const subtitleStyles = {
    margin: 0,
    opacity: .7,
    maxWidth: 130,
    lineHeight: 1.5,
    textAlign: "center"
};
const labelStyle = {
    clip: "rect(0 0 0 0)",
    WebkitClipPath: "inset(50%)",
    clipPath: "inset(50%)",
    height: 1,
    width: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap"
};
/**
 * GUI styles
 */
const baseContainerStyle = {
    display: "flex",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    position: "relative"
};
const baseCarouselStyle = {
    padding: 0,
    margin: 0,
    listStyle: "none",
    position: "relative",
    display: "flex",
    flex: "1 1 100%",
    width: "100%",
    height: "100%"
};
const baseButtonStyles = {
    border: "none",
    display: "flex",
    placeContent: "center",
    placeItems: "center",
    overflow: "hidden",
    background: "transparent",
    cursor: "pointer",
    margin: 0,
    padding: 0
};
const controlsStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    border: 0,
    padding: 0,
    margin: 0
};
/**
 * Dot styles
 */
const dotsContainerStyle = {
    display: "flex",
    placeContent: "center",
    placeItems: "center",
    overflow: "hidden",
    position: "absolute",
    pointerEvents: "auto"
};
const dotStyle = {
    borderRadius: "50%",
    background: "white",
    cursor: "pointer",
    border: "none",
    placeContent: "center",
    placeItems: "center",
    padding: 0
};

function useWritingDirection() {
    const [writingDirection, setWritingDirection] = useState("ltr"); // must be done this way to ensure that there isn't a mismatch with SSG
    // which leads to button images not updating for the real writing direction
    useEffect(() => {
        if (window ? .document ? .documentElement ? .dir === "rtl") {
            setWritingDirection("rtl");
        }
    }, []);
    return writingDirection;
}

function AutoIdLayoutGroup({
    children,
    ...props
}) {
    const id = useId();
    return /*#__PURE__*/ _jsx(LayoutGroup, {
        id: id,
        ...props,
        children: children
    });
}
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "Carousel",
            "slots": [],
            "annotations": {
                "framerIntrinsicHeight": "200",
                "framerSupportedLayoutWidth": "any-prefer-fixed",
                "framerContractVersion": "1",
                "framerSupportedLayoutHeight": "any-prefer-fixed",
                "framerIntrinsicWidth": "400",
                "framerDisableUnlink": "*"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./Carousel.map