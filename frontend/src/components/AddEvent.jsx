import React, { useState } from 'react';
import axios from 'axios';
import './AddEvent.css'
import { useNavigate } from 'react-router-dom';
const EventForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: '',
        title: '',
        date: '',
        time: null,
        description: '',
        location: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = await localStorage.getItem('id');
        console.log(id);
        const data = new FormData();
        
        for (const key in formData) {
            if(key==="userId")
            {data.append(key,id)}
            else
            {data.append(key, formData[key]);}
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_BackendURL}/events`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Event created:', response.data);
            // Reset form or redirect as needed
            navigate('/');
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="event-form">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label><b>Title</b></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label><b>Date</b></label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label><b>Time</b></label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label><b>Description</b></label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label><b>Location</b></label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className='eventformBTN'>Add Event</button>
            </form>
        </div>
    );
};

export default EventForm;
