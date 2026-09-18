import {
    jsx as _jsx
} from "react/jsx-runtime";
import {
    addPropertyControls,
    ControlType,
    RenderTarget
} from "framer";
import {
    useEffect,
    useRef
} from "react";
/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 *
 * @framerDisableUnlink
 */
export default function AvoidLayoutJumping({
    direction,
    style
}) {
    const isCanvas = RenderTarget.current() === RenderTarget.canvas;
    const ref = useRef(null);
    const rafId = useRef();
    const vertical = direction === "vertical" || direction === "both";
    const horizontal = direction === "horizontal" || direction === "both";
    useEffect(() => {
        if (isCanvas) return;
        const parent = ref.current ? .parentElement ? .parentElement;
        if (!parent) return;
        const container = parent.parentElement;
        if (!container) return;
        const updateSize = () => {
            const rect = parent.getBoundingClientRect();
            if (horizontal) {
                container.style.width = `${rect.width}px`;
            }
            if (vertical) {
                container.style.height = `${rect.height}px`;
            }
            rafId.current = requestAnimationFrame(updateSize);
        }; // Start the RAF loop
        rafId.current = requestAnimationFrame(updateSize);
        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            if (container) {
                if (horizontal) {
                    container.style.width = "";
                }
                if (vertical) {
                    container.style.height = "";
                }
            }
        };
    }, [direction]);
    return /*#__PURE__*/ _jsx("div", {
        ref: ref,
        style: { ...style
        }
    });
}
AvoidLayoutJumping.displayName = "Layout Jump Preventer";
addPropertyControls(AvoidLayoutJumping, {
    direction: {
        type: ControlType.Enum,
        defaultValue: "vertical",
        options: ["vertical", "horizontal", "both"],
        optionTitles: ["Vertical", "Horizontal", "Both"],
        displaySegmentedControl: true,
        segmentedControlDirection: "vertical", // @ts-ignore
        optionIcons: ["direction-vertical", "direction-horizontal", "direction-all"],
        description: "More components at [Framer University](https://frameruni.link/cc)."
    }
});
export const __FramerMetadata__ = {
    "exports": {
        "default": {
            "type": "reactComponent",
            "name": "AvoidLayoutJumping",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1",
                "framerDisableUnlink": "",
                "framerSupportedLayoutWidth": "auto",
                "framerSupportedLayoutHeight": "auto"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}
//# sourceMappingURL=./AvoidLayoutJumping_Prod.map