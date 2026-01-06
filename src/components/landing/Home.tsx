import dynamic from 'next/dynamic';
import LoadingSkeleton from '@/components/skeletons/LoadingSkeleton';

const MostPopularDestinationsClient = dynamic(() => import('@/components/homePageComponents/most-popular-destinations/MostPopularDestinationsClient'), {
    loading: () => <LoadingSkeleton variant="section" />
});

const TravelWithBestTourOperatorsClient = dynamic(() => import('@/components/homePageComponents/travel-with-best-tour-operators'), {
    loading: () => <LoadingSkeleton variant="section" />
});

const HeroSection = dynamic(() => import('@/components/homePageComponents/hero'), {
    loading: () => <LoadingSkeleton variant="full-screen" />
});
const ExploreBangladesh = dynamic(() => import('@/components/homePageComponents/explore-bangladesh'), {
    loading: () => <LoadingSkeleton variant="section" />
});
const OurTourLocationsForYou = dynamic(() => import('@/components/homePageComponents/our-tour-locations-for-you'), {
    loading: () => <LoadingSkeleton variant="section" />
});
const WhyPartner = dynamic(() => import('@/components/homePageComponents/features'), {
    loading: () => <LoadingSkeleton variant="section" />
});
const HowItWorks = dynamic(() => import('@/components/homePageComponents/how-it-works'), {
    loading: () => <LoadingSkeleton variant="section" />
});
const Testimonials = dynamic(() => import('@/components/homePageComponents/testimonials'), {
    loading: () => <LoadingSkeleton variant="section" />
});
const FinalCTA = dynamic(() => import('@/components/homePageComponents/cta'), {
    loading: () => <LoadingSkeleton variant="section" />
});

export default function Home() {
    return (
        <main className="min-h-screen mt-16">
            <HeroSection />
            <ExploreBangladesh />
            <MostPopularDestinationsClient />
            <OurTourLocationsForYou />
            <HowItWorks />
            <TravelWithBestTourOperatorsClient />
            <WhyPartner />
            <Testimonials />
            <FinalCTA />
        </main>
    );
}
