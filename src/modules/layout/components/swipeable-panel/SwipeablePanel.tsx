'use client'

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface SwipeablePanelProps {
    isOpen: boolean;
    toggleOpen: () => void;
    direction: "left" | "right";
    children: React.ReactNode;
    className?: string;
}

export default function SwipeablePanel({
                                           isOpen,
                                           toggleOpen,
                                           direction,
                                           children,
                                           className,
                                       }: SwipeablePanelProps) {
    const controls = useAnimation();
    const panelRef = useRef<HTMLDivElement>(null);

    // Animation variants based on direction
    const variants = {
        open: { x: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
        closed:
            direction === "left"
                ? { x: "-100%", transition: { type: "spring", stiffness: 400, damping: 30 } }
                : { x: "100%", transition: { type: "spring", stiffness: 400, damping: 30 } },
    };

    // Handle drag end to determine if the panel should close
    const handleDragEnd = (event: any, info: any) => {
        const threshold = direction === "left" ? -100 : 100; // Pixels to drag before closing
        const velocityThreshold = direction === "left" ? -200 : 200; // Velocity to trigger close
        if (
            (direction === "left" && (info.offset.x < threshold || info.velocity.x < velocityThreshold)) ||
            (direction === "right" && (info.offset.x > threshold || info.velocity.x > velocityThreshold))
        ) {
            toggleOpen();
        } else {
            controls.start("open"); // Snap back to open
        }
    };

    // Sync animation with isOpen state
    useEffect(() => {
        controls.start(isOpen ? "open" : "closed");
        console.log("isOpen changed, now: ", isOpen)
    }, [isOpen, controls]);

    return (
        <motion.div
            ref={panelRef}
            className={className}
            layout
            initial="closed"
            animate={controls}
            variants={variants}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            dragMomentum={true}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            onDragEnd={handleDragEnd}
            style={{ touchAction: "pan-y" }}
        >
            {children}
        </motion.div>
    );
}