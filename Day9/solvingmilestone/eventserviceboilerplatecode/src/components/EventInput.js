import React, { useState } from 'react';
import { useEvents } from '../services/EventService';
import { useEventCategories } from '../services/EventCategoryService';

const EventInput = ({ existingEvent, onEditComplete }) => {
    const { addEvent, editEvent } = useEvents();
    const { categories } = useEventCategories();

    const [title, setTitle] = useState(existingEvent ? existingEvent.title : '');
    const [description, setDescription] = useState(existingEvent ? existingEvent.description : '');
    const [date, setDate] = useState(existingEvent ? existingEvent.date : '');
    const [location, setLocation] = useState(existingEvent ? existingEvent.location : '');
    const [priority, setPriority] = useState(existingEvent ? existingEvent.priority : 'Medium');
    const [category, setCategory] = useState(existingEvent ? existingEvent.category : categories[0]?.name || '');

    const handleSubmit = (e) => {

    };

    return (

    );
};

export default EventInput;
