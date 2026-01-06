"use client";

import Link from "next/link";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";

type TourItem = {
  name: string;
  region: string;
  img: string;
  url: string;
};

type SubCategory = {
  name: string;
  tours: TourItem[];
};

type Category = {
  name: string;
  subCategories: SubCategory[];
};

/* Sample data */
const categories: Category[] = [
  {
    name: "Places to see",
    subCategories: [
      {
        name: "North America",
        tours: [
          {
            name: "New York City Tours",
            region: "City in United States",
            img: "/images/nyc.jpg",
            url: "/nyc",
          },
          {
            name: "Cozumel Tours",
            region: "Region in Mexico",
            img: "/images/cozumel.jpg",
            url: "/cozumel",
          },
          {
            name: "Miami Tours",
            region: "City in United States",
            img: "/images/miami.jpg",
            url: "/miami",
          },
          {
            name: "Florida Tours",
            region: "Region in United States",
            img: "/images/florida.jpg",
            url: "/florida",
          },
          {
            name: "Mexico City Tours",
            region: "City in Mexico",
            img: "/images/mexico-city.jpg",
            url: "/mexico-city",
          },
          {
            name: "Isla Mujeres Tours",
            region: "Region in Mexico",
            img: "/images/isla-mujeres.jpg",
            url: "/isla-mujeres",
          },
          {
            name: "Grand Canyon Tours",
            region: "Region in United States",
            img: "/images/grand-canyon.jpg",
            url: "/grand-canyon",
          },
          {
            name: "Las Vegas Tours",
            region: "City in United States",
            img: "/images/las-vegas.jpg",
            url: "/las-vegas",
          },
          {
            name: "Everglades National Park Tours",
            region: "Region in United States",
            img: "/images/everglades.jpg",
            url: "/everglades",
          },
          {
            name: "Punta Cana Tours",
            region: "City in Dominican Republic",
            img: "/images/punta-cana.jpg",
            url: "/punta-cana",
          },
          {
            name: "St Martin Tours",
            region: "Region in Saint Martin",
            img: "/images/st-martin.jpg",
            url: "/st-martin",
          },
          {
            name: "Orlando Tours",
            region: "City in United States",
            img: "/images/orlando.jpg",
            url: "/orlando",
          },
        ],
      },
      {
        name: "Europe",
        tours: [
          {
            name: "Paris Tours",
            region: "City in France",
            img: "/images/paris.jpg",
            url: "/paris",
          },
          {
            name: "London Tours",
            region: "City in United Kingdom",
            img: "/images/london.jpg",
            url: "/london",
          },
          {
            name: "Rome Tours",
            region: "City in Italy",
            img: "/images/rome.jpg",
            url: "/rome",
          },
          {
            name: "Barcelona Tours",
            region: "City in Spain",
            img: "/images/barcelona.jpg",
            url: "/barcelona",
          },
          {
            name: "Amsterdam Tours",
            region: "City in Netherlands",
            img: "/images/amsterdam.jpg",
            url: "/amsterdam",
          },
        ],
      },
      {
        name: "Africa",
        tours: [
          {
            name: "Safari Tours",
            region: "Various locations",
            img: "/images/safari.jpg",
            url: "/safari",
          },
          {
            name: "Cape Town Tours",
            region: "City in South Africa",
            img: "/images/cape-town.jpg",
            url: "/cape-town",
          },
          {
            name: "Cairo Tours",
            region: "City in Egypt",
            img: "/images/cairo.jpg",
            url: "/cairo",
          },
          {
            name: "Marrakech Tours",
            region: "City in Morocco",
            img: "/images/marrakech.jpg",
            url: "/marrakech",
          },
        ],
      },
      {
        name: "Central & South America",
        tours: [
          {
            name: "Amazon Tours",
            region: "Region in Brazil",
            img: "/images/amazon.jpg",
            url: "/amazon",
          },
          {
            name: "Machu Picchu Tours",
            region: "Region in Peru",
            img: "/images/machu-picchu.jpg",
            url: "/machu-picchu",
          },
          {
            name: "Rio de Janeiro Tours",
            region: "City in Brazil",
            img: "/images/rio.jpg",
            url: "/rio",
          },
        ],
      },
      {
        name: "Asia",
        tours: [
          {
            name: "Tokyo Tours",
            region: "City in Japan",
            img: "/images/tokyo.jpg",
            url: "/tokyo",
          },
          {
            name: "Kyoto Tours",
            region: "City in Japan",
            img: "/images/kyoto.jpg",
            url: "/kyoto",
          },
          {
            name: "Bangkok Tours",
            region: "City in Thailand",
            img: "/images/bangkok.jpg",
            url: "/bangkok",
          },
          {
            name: "Singapore Tours",
            region: "City in Singapore",
            img: "/images/singapore.jpg",
            url: "/singapore",
          },
        ],
      },
      {
        name: "Australia & the Pacific",
        tours: [
          {
            name: "Sydney Tours",
            region: "City in Australia",
            img: "/images/sydney.jpg",
            url: "/sydney",
          },
          {
            name: "Melbourne Tours",
            region: "City in Australia",
            img: "/images/melbourne.jpg",
            url: "/melbourne",
          },
          {
            name: "Auckland Tours",
            region: "City in New Zealand",
            img: "/images/auckland.jpg",
            url: "/auckland",
          },
        ],
      },
    ],
  },
  {
    name: "Things to do",
    subCategories: [
      {
        name: "Adventure",
        tours: [
          {
            name: "Skydiving",
            region: "Various locations",
            img: "/images/skydiving.jpg",
            url: "/skydiving",
          },
          {
            name: "Bungee Jumping",
            region: "Various locations",
            img: "/images/bungee.jpg",
            url: "/bungee",
          },
          {
            name: "Scuba Diving",
            region: "Various locations",
            img: "/images/scuba.jpg",
            url: "/scuba",
          },
        ],
      },
    ],
  },
  {
    name: "Trip inspiration",
    subCategories: [
      {
        name: "Discover",
        tours: [
          {
            name: "Road Trips",
            region: "Various locations",
            img: "/images/road-trip.jpg",
            url: "/road-trip",
          },
          {
            name: "Family Fun",
            region: "Various locations",
            img: "/images/family.jpg",
            url: "/family",
          },
          {
            name: "Romantic Getaways",
            region: "Various locations",
            img: "/images/romantic.jpg",
            url: "/romantic",
          },
        ],
      },
    ],
  },
];

/* =========================
   Enhanced Mega Menu Component
========================= */
export default function QuickLinks() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("North America");
  const [isAnimating, setIsAnimating] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  const activeCatData = categories.find((cat) => cat.name === activeCategory);
  const selectedSubData = activeCatData?.subCategories.find(
    (sub) => sub.name === selectedSubCategory
  );

  useEffect(() => {
    if (navRef.current && activeCategory) {
      const rect = navRef.current.getBoundingClientRect();
      setTopOffset(rect.bottom);
    }
  }, [activeCategory]);

  const handleCategoryHover = (catName: string) => {
    if (activeCategory !== catName) {
      setIsAnimating(true);
      setActiveCategory(catName);
      const newCat = categories.find((cat) => cat.name === catName);
      if (newCat && newCat.subCategories.length > 0) {
        setSelectedSubCategory(newCat.subCategories[0].name);
      }
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleSubCategoryChange = (subName: string) => {
    setIsAnimating(true);
    setSelectedSubCategory(subName);
    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <>
      <nav 
        ref={navRef} 
        className="w-full bg-white relative shadow-sm border-b border-gray-100" 
        onMouseLeave={() => setActiveCategory(null)}
      >
        <ul className="flex max-w-7xl mx-auto relative">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <li
                key={cat.name}
                className="group relative flex items-center"
                onMouseEnter={() => handleCategoryHover(cat.name)}
              >
                <Button
                  className={`
                    px-6 py-5 font-semibold flex items-center gap-2 relative
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2
                    transition-all duration-200 text-sm tracking-wide
                    ${
                      isActive
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }
                  `}
                >
                  {cat.name}
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? "rotate-180" : ""
                    }`} 
                  />
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500"></span>
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ENHANCED MEGA PANEL */}
      {activeCategory && (
        <div
          className="fixed left-0 right-0 z-50 bg-white shadow-2xl w-full border-t border-gray-100"
          style={{ 
            top: `${topOffset}px`,
            animation: "slideDown 0.2s ease-out"
          }}
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <div className="max-w-7xl mx-auto p-8">
            <div className="grid grid-cols-[280px_1px_1fr] gap-10">
              {/* LEFT SUBCATEGORIES - Enhanced */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-bold text-gray-900">Top Attractions</h3>
                </div>
                <div className="flex flex-col space-y-1">
                  {activeCatData?.subCategories.map((sub) => {
                    const isSelected = selectedSubCategory === sub.name;
                    return (
                      <button
                        key={sub.name}
                        onClick={() => handleSubCategoryChange(sub.name)}
                        onMouseEnter={() => handleSubCategoryChange(sub.name)}
                        className={`
                          px-4 py-3 text-left transition-all duration-200 rounded-lg
                          ${
                            isSelected
                              ? "bg-gradient-to-r from-orange-50 to-red-50 text-gray-900 font-semibold shadow-sm"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                      >
                        <span className="flex items-center gap-3">
                          {isSelected && (
                            <span className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></span>
                          )}
                          <span className="text-sm">{sub.name}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SEPARATOR */}
              <div className="w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

              {/* RIGHT TOURS GRID - Enhanced */}
              <div className={`transition-opacity duration-200 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
                <div className="grid grid-cols-3 gap-4">
                  {selectedSubData?.tours.map((tour, idx) => (
                    <Link
                      key={tour.name}
                      href={tour.url}
                      className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-orange-100"
                      style={{
                        animation: `fadeInUp 0.3s ease-out ${idx * 0.03}s both`
                      }}
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={tour.img}
                          alt={tour.name}
                          className="w-14 h-14 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 rounded-xl transition-all duration-200"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-orange-600 transition-colors">
                          {tour.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {tour.region}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}