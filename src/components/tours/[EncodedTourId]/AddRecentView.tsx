'use client';

import { useEffect } from 'react';
import useRecentViews from '@/stores/recentViews';
import { TourSummary } from '@/types/tour';

type Props = {
    tour: TourSummary;
};

export default function AddRecentView({ tour }: Props) {
    const { addRecentView } = useRecentViews();

    useEffect(() => {
        addRecentView(tour);
    }, [addRecentView, tour]);

    return null;
}
