import { useState } from "react";
import axios from 'axios'
import { useNavigate, useLocation, useParams } from "react-router-dom";
import './AddEvent.css'
export default function UpdateMemory() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: '',
        title: '',
        date: '',
        time: null,
        description: '',
        location: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleEdit = async (e) => {
        e.preventDefault();

        const userTag = localStorage.getItem('id');
        console.log(userTag);
        const data = new FormData();

        for (const key in formData) {
            if (key === "userId") {
                console.log("User Tag:", data.append(key, userTag))
            }
            else { data.append(key, formData[key]); }
        }
        try {
            const response = await axios.put(`${process.env.REACT_APP_BackendURL}/edit/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);

            // Update the event in the state


            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    return (<div className="event-form">
        <h2>Edit Memory</h2>
        <form onSubmit={handleEdit}>

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

    </div>)
}