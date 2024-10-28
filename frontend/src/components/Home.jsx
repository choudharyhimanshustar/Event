import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Home.css'
import { useState } from 'react';
import GetEvents from './GetEvents';



export default function Home() {
    const navigate = useNavigate();
    function isExpired(token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return (payload.exp * 1000) < Date.now();
    }
    const fetchHomePage = async (req, res) => {
        const token = await localStorage.getItem('token');
        console.log(token);
        if (token === null || isExpired(token)) {
            navigate('/intro');
        }
        try {
            const response = await
                axios.get(`${process.env.REACT_APP_BackendURL}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,

                    },

                    withCredentials: true,  // Ensures cookies/auth headers are sent with the request

                });

        } catch (error) {
            if (error) {
                console.log(error);
                navigate('/intro');
            }
        }


    }
    function handleLogout()
    {
        localStorage.removeItem('token');
        navigate('/login');
    }
    fetchHomePage();
    function handleClick() {
        navigate('/AddEvent');
    }
    return (
        <><div className='HomeMainDiv'>
            <h1>Welcome</h1>
            <div className='HomeBTN'>
                <button onClick={() => handleClick()} className='addEventbtn'>Add Event</button>
                <button onClick={() => handleLogout()} className='addEventbtn'>Log Out</button>
            </div>
        </div>
            <div className='GetEventsCSS'>
                <GetEvents />
            </div></>);
}