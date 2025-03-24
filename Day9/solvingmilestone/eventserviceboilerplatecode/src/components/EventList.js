import React from 'react';
import { useEvents } from '../services/EventService';
import { useEventCategories } from '../services/EventCategoryService';

const EventList = () => {
    const { events, editEvent, deleteEvent, toggleEventStatus } = useEvents();
    const { categories } = useEventCategories();

    return (

    );
};

export default EventList;
