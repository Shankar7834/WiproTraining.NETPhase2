import React from 'react';
import { useEvents } from '../services/EventService';
import { useEventCategories } from '../services/EventCategoryService';
import EventInput from './EventInput';
import EventList from './EventList';
import EventCategoryList from './EventCategoryList';

const EventDashboard = () => {
    const { events } = useEvents();
    const { categories } = useEventCategories();

    return (

    );
};

export default EventDashboard;
