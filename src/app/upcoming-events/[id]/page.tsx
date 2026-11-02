import { EventProps } from '@/Types/EventsType';
import React from 'react';

const EventDetailsPage = async ({params}:{params:{id:string}}) => {
    const {id} = await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upcoming-event/${id}`)
    const data:EventProps = await res.json()
    return (
        <div>
            <h1>{data.title}</h1>
            
            
        </div>
    );
};

export default EventDetailsPage;