import { useState, useEffect } from "react"
import axios from 'axios'
import './GetEvents.css'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function GetEvents() {
    const [events, setEvents] = useState([]);
    const navigate=useNavigate();
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');;
    };
    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:1234/delete/${id}`);
            console.log(response.data);
            setEvents(events.filter((eventsItem) => eventsItem._id !== id));
        } catch (error) {
            console.log(error);
        }
    }
    function handleEdit(id) {
        navigate(`/Edit/${id}`);
    }
    useEffect(() => {
        const fetchEvents = async () => {
            const id = await localStorage.getItem('id');

            const response = await
                axios.get(`http://localhost:1234/getEvents`, { params: { id } });
            console.log(response);
            setEvents(response.data.response);
        }
        fetchEvents();
    }, [])
    return (
        <div className="events-grid">
            {events.length > 0 ? (<div>
                <ul className="Event">
                    {events.map(eventItem => (<div className="EventCard">
                        <div className="event-block" style={{ backgroundColor: eventItem.color || '#ccc' }}>
                            <div className="event-date">
                                <span className="month">{formatDate(eventItem.date).split(' ')[1]}</span>
                                <span className="day">{formatDate(eventItem.date).split(' ')[0]}</span>
                                <br></br>
                                <span className="month">{formatDate(eventItem.date).split(' ')[2]}</span>
                            </div>
                            <div className="event-details">
                                <h2 className="event-title">{eventItem.title}</h2>
                                <p className="event-speaker">  {truncateText(eventItem.description, 80)}</p>
                                <p className="event-speaker">{eventItem.location}</p>
                                <button onClick={() => handleDelete(eventItem._id)}><MdDelete /></button>
                                <button onClick={() => handleEdit(eventItem._id)}><CiEdit /></button>
                            </div>
                        </div>

                    </div>))}

                </ul>

            </div>) : (<div className="Banner">

                <div className="BannerImgDiv">
                    <div className="BannerImgDivSubDomain">
                        <h2>Have Some Work to Schedule,here you are</h2>
                        <img src="https://i.pinimg.com/originals/d0/b6/69/d0b6699c086df2e9d298d1589eb07857.gif" />
                    </div>
                    <div className="BannerImgDivSubDomain">
                        <h2>Have a function, add your functions</h2>
                        <img  src="https://i.pinimg.com/originals/5f/55/08/5f550814e5d7b03857b270b3501274ef.gif" />
                    </div>
                    <div className="BannerImgDivSubDomain">
                        <h2>Need to Travel, Add your vacation</h2>
                        <img  src="https://i.pinimg.com/originals/02/5f/29/025f29a640db04a067d7a540a7b4d004.gif" />
                    </div>
                    <div className="BannerImgDivSubDomain">
                        <h2>Prepare events for your family</h2>
                        <img  src="https://i.pinimg.com/originals/61/b2/d3/61b2d33f39927afa72e5f57a28cc7c83.gif" />
                    </div>
                </div>

            </div>)}
        </div>
    )
}