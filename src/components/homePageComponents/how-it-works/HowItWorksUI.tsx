'use client';

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState, useEffect } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import HowItWorksSkeleton from "../components/HowItWorksSkeleton";

interface Step {
    number: number;
    icon: typeof Search;
    title: string;
    description: string;
    gradient: string;
    color: string;
}

interface HowItWorksUIProps {
    steps: Step[];
    loading?: boolean;
}

// Animation variants for consistent animations
const ANIMATION_VARIANTS = {
    badge: {
        hidden: { opacity: 0, scale: 0.8, y: -20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.7, type: "spring" as const, bounce: 0.4 }
        }
    },
    title: {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: "easeOut" as const }
        }
    },
    step: {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" as const }
        }
    },
    stepNumber: {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: { duration: 0.5, delay: 0.1 }
        }
    },
    stepCard: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, delay: 0.2 }
        }
    },
    stepIcon: {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: { duration: 0.5, delay: 0.3 }
        }
    },
    cta: {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, delay: 0.5, ease: "easeOut" as const }
        }
    }
} as const;

/**
 * Extracted StepCard component for better code organization and potential memoization
 */
interface StepCardProps {
    step: Step;
    index: number;
}

const StepCard = ({ step, index }: StepCardProps) => {
    const Icon = step.icon;
    const isLeft = index % 2 === 0; // 0 (step 1), 2 (step 3) on left; 1 (step 2), 3 (step 4) on right

    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={ANIMATION_VARIANTS.step}
            className={cn(
                "relative flex w-full",
                isLeft ? "justify-start" : "justify-end"
            )}
        >

            {/* Card Container */}
            <motion.div
                custom={index}
                variants={ANIMATION_VARIANTS.stepCard}
                className={cn(
                    "bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full max-w-md backdrop-blur-sm bg-white/80",
                    isLeft ? "ml-16" : "mr-16"
                )}
            >
                {/* Icon */}
                <motion.div
                    custom={index}
                    variants={ANIMATION_VARIANTS.stepIcon}
                    className={cn(
                        "w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center mb-6",
                        step.gradient
                    )}
                    aria-hidden="true"
                >
                    <Icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
                    {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                    {step.description}
                </p>

                {/* Step Indicator */}
                <div className="mt-6 flex items-center gap-2">
                    <div
                        className={cn(
                            "w-2 h-2 rounded-full bg-gradient-to-r",
                            step.gradient
                        )}
                        aria-hidden="true"
                    />
                    <span className="text-sm text-gray-600">Step {step.number}</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

/**
 * Main HowItWorks Component
 * Displays a 4-step process for using the travel booking platform
 */
const HowItWorksUI = ({ steps, loading = false }: HowItWorksUIProps) => {
    const isClient = useIsClient();

    // Memoize steps to prevent unnecessary re-renders
    const memoizedSteps = useMemo(() => steps, [steps]);

    if (loading) {
        return <HowItWorksSkeleton />;
    }

    return (
        <section
            className="py-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900 relative overflow-hidden"
            aria-labelledby="how-it-works-heading"
        >
            <div className="container mx-auto px-4">
                {/* Section Badge */}
                 <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                        className="flex justify-center mb-10"
                    >
                        <div className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border-2 border-emerald-400/30 px-6 py-1 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 shadow-lg hover:shadow-emerald-200/50">
                            <span className="text-emerald-700 font-semibold tracking-wide text-sm uppercase">How It Works</span>
                    </div>
                </motion.div>

                {/* Section Title */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={ANIMATION_VARIANTS.title}
                    className="text-center mb-16"
                >
                    <h2 className="text-2xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
                        Your Journey in 4 Simple Steps
                    </h2>
                    <p className="text-lg text-gray-800 max-w-2xl mx-auto">
                        From planning to memories, we make every step of your Bangladesh adventure seamless and extraordinary.
                    </p>
                </motion.div>

                {/* Steps Container */}
                <div className="relative flex flex-col items-center">
                    {/* Connecting Line - vertical tree layout */}
                    <div
                        className="absolute left-1/2 transform -translate-x-1/2 h-full w-2.5 bg-gradient-to-b from-emerald-400 via-blue-500 via-purple-500 to-orange-500 rounded-full"
                        aria-hidden="true"
                    />

                    {/* Steps Flex Column */}
                    <div className="flex flex-col gap-8 lg:gap-12 w-full max-w-4xl">
                        {memoizedSteps.map((step, index) => (
                            <StepCard key={step.number} step={step} index={index} />
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={ANIMATION_VARIANTS.cta}
                    className="text-center mt-30"
                >
                    {isClient && (
                        <button
                            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 outline-none cursor-pointer focus:ring-4 focus:ring-emerald-500/50"
                            aria-label="Start planning your trip to Bangladesh"
                        >
                            Start Planning Your Trip
                        </button>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorksUI;
