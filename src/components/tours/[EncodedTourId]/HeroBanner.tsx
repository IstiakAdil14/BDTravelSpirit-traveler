"use client"

import React, { useState } from 'react';
import { MapPin, Star, Calendar, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Media = {
  url: string;
  type: string;
};

type Props = {
  title: string;
  subtitle?: string;
  heroImage: string;
  rating?: number;
  priceFrom?: number;
  location?: { country: string; region?: string };
  gallery?: Media[];
};

export default function HeroBanner({ 
  title, 
  subtitle, 
  heroImage, 
  rating, 
  priceFrom, 
  location,
  gallery = []
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const allImages = [heroImage, ...gallery.map(m => m.url)].filter(Boolean);
  const currentImage = allImages[currentImageIndex] || heroImage;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    setIsImageLoaded(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setIsImageLoaded(false);
  };

  return (
    <div className="relative w-full ">
      {/* Image Container */}
      <div className="relative w-full h-[100px] lg:h-[400px] overflow-hidden">
        {/* Loading State */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}
        
        {/* Main Image */}
        <img
          src={currentImage}
          alt={`${title}`}
          className={`w-200 h-100 object-cover transition-opacity duration-500 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Top Bar Actions */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
          <div className="flex gap-2">
            {allImages.length > 1 && (
              <Badge variant="secondary" className="bg-white text-slate-900 font-medium">
                {currentImageIndex + 1} / {allImages.length}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="bg-white hover:bg-white/90 text-slate-900 p-2.5 rounded-lg transition-colors"
              aria-label="Save"
            >
              <Heart 
                className={`w-5 h-5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} 
              />
            </button>
            <button
              className="bg-white hover:bg-white/90 text-slate-900 p-2.5 rounded-lg transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-lg transition-all hover:scale-105"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-lg transition-all hover:scale-105"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {allImages.length > 1 && allImages.length <= 10 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentImageIndex(idx);
                  setIsImageLoaded(false);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex
                    ? 'w-8 bg-white'
                    : 'w-1.5 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1">
              {location && (
                <div className="flex items-center gap-1.5 text-slate-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {location.region ? `${location.region}, ${location.country}` : location.country}
                  </span>
                </div>
              )}

              <h1 
                id="tour-title" 
                className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3"
              >
                {title}
              </h1>

              {subtitle && (
                <p id="tour-sub" className="text-base text-slate-600 mb-4 max-w-2xl">
                  {subtitle}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {rating !== undefined && (
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-900">{rating.toFixed(1)}</span>
                    <span className="text-slate-500 text-sm">(4.5k reviews)</span>
                  </div>
                )}

                {priceFrom !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">From</span>
                    <span className="text-2xl font-bold text-slate-900">${priceFrom}</span>
                    <span className="text-sm text-slate-500">per person</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content - CTA */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8"
                asChild
              >
                <a href="#book" aria-describedby="tour-sub">
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}