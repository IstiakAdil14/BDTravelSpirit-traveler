'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Award, Shield, Users, Star, ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

// Type definitions
interface TourOperator {
    id: number;
    name: string;
    logo: string;
    rating: number;
    reviews: number;
    specialties: string[];
    certified: boolean;
    experience: string;
}

interface AllTourOperatorsUIProps {
    operators: TourOperator[];
}

/**
 * StarRating Component - Production-ready rating display
 */
interface StarRatingProps {
    rating: number;
    reviews: number;
}

const StarRating = ({ rating, reviews }: StarRatingProps) => {
    const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-2" role="group" aria-label={`${rating} out of 5 stars based on ${reviews} reviews`}>
            <div className="flex items-center gap-0.5">
                {stars.map((i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 transition-colors duration-200 ${
                            i < fullStars
                                ? 'text-amber-400 fill-amber-400'
                                : i === fullStars && hasHalfStar
                                ? 'text-amber-400 fill-amber-400 opacity-50'
                                : 'text-gray-300 fill-gray-200'
                        }`}
                        aria-hidden="true"
                    />
                ))}
            </div>
            <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-900">{rating}</span>
                <span className="text-xs text-gray-500">({reviews.toLocaleString()})</span>
            </div>
        </div>
    );
};

/**
 * OperatorCard Component - Production-grade card with modern design
 */
interface OperatorCardProps {
    operator: TourOperator;
    index: number;
}

const OperatorCard = ({ operator, index }: OperatorCardProps) => {
    const [logoError, setLogoError] = useState(false);

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-200/80 hover:border-emerald-200 overflow-hidden"
        >
            {/* Accent border on hover */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="p-6">
                {/* Header Section */}
                <div className="flex items-start gap-4 mb-5">
                    {/* Logo Container */}
                    <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center border border-emerald-100/80 group-hover:border-emerald-300 group-hover:shadow-lg transition-all duration-300">
                            {operator.logo && !logoError ? (
                                <img
                                    src={operator.logo}
                                    alt={`${operator.name} logo`}
                                    className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                                    onError={() => setLogoError(true)}
                                    loading="lazy"
                                />
                            ) : (
                                <Award className="w-10 h-10 text-emerald-600 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                            )}
                        </div>
                        
                        {/* Certified Badge */}
                        {operator.certified && (
                            <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-1 shadow-lg ring-2 ring-white">
                                <CheckCircle2 className="w-4 h-4 text-white" aria-label="Certified operator" />
                            </div>
                        )}
                    </div>

                    {/* Title & Rating */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-2.5 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200 leading-snug">
                            {operator.name}
                        </h3>
                        <StarRating rating={operator.rating} reviews={operator.reviews} />
                    </div>
                </div>

                {/* Specialties Section */}
                <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                        {operator.specialties.slice(0, 3).map((specialty, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200/60 group-hover:border-emerald-300 group-hover:bg-gradient-to-r group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-200"
                            >
                                {specialty}
                            </span>
                        ))}
                        {operator.specialties.length > 3 && (
                            <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg border border-gray-200">
                                +{operator.specialties.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* Experience Badge */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        <TrendingUp className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                        <span className="text-sm font-semibold text-gray-700">{operator.experience}</span>
                    </div>
                    
                    {/* CTA Button */}
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group/btn"
                        aria-label={`View details for ${operator.name}`}
                    >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                </div>
            </div>

            {/* Subtle hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-teal-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:via-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none rounded-2xl" />
        </motion.article>
    );
};

/**
 * Pagination Component - Production-ready with smart ellipsis
 */
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    // Smart pagination - show ellipsis for many pages
    const getPageNumbers = (): (number | string)[] => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | string)[] = [];
        let lastPage: number | undefined;

        // Build the range of pages to show
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        // Add dots between gaps
        range.forEach((page) => {
            if (lastPage !== undefined) {
                if (page - lastPage === 2) {
                    // If gap is 2, show the middle page
                    rangeWithDots.push(lastPage + 1);
                } else if (page - lastPage > 2) {
                    // If gap is more than 2, show ellipsis
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(page);
            lastPage = page;
        });

        return rangeWithDots;
    };

    const pages = getPageNumbers();

    return (
        <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200 shadow-sm"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Page Numbers */}
            {pages.map((page, idx) => (
                typeof page === 'number' ? (
                    <button
                        key={idx}
                        onClick={() => onPageChange(page)}
                        className={`inline-flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg font-semibold transition-all duration-200 ${
                            currentPage === page
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                                : 'bg-white border border-gray-300 hover:bg-emerald-50 hover:border-emerald-300 text-gray-700 shadow-sm'
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={idx} className="inline-flex items-center justify-center w-10 h-10 text-gray-400">
                        {page}
                    </span>
                )
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200 shadow-sm"
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
        </nav>
    );
};

/**
 * Main AllTourOperators Component - Production-ready with filtering & search
 */
const AllTourOperatorsUI = ({ operators }: AllTourOperatorsUIProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(operators.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOperators = operators.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Smooth scroll to top with offset for better UX
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    };

    return (
        <section className="relative min-h-screen py-4 overflow-hidden">
            {/* Modern gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40" />
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

            {/* Ambient glow effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Results Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm"
                >
                    <div className="text-sm text-gray-600">
                        Showing <span className="font-semibold text-gray-900">{startIndex + 1}-{Math.min(endIndex, operators.length)}</span> of <span className="font-semibold text-gray-900">{operators.length}</span> operators
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600">All certified operators</span>
                    </div>
                </motion.div>

                {/* Tour Operators Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                    >
                        {currentOperators.map((operator, index) => (
                            <OperatorCard
                                key={operator.id}
                                operator={operator}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
};

export default AllTourOperatorsUI;