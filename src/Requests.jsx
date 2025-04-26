import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './utils/constants';
import { addRequests } from './utils/requestsSlice';
import { useDispatch, useSelector } from 'react-redux';
import RequestList from './components/RequestCard/RequestList';
import styles from './Requests.module.scss';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.requests);

    const getRequestsList = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/requests/received`, { withCredentials: true });

            console.log("Requests from Backend are", response);
            if (response?.data?.status === "success") {
                dispatch(addRequests(response?.data?.data));
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    }

    useEffect(() => {
        if (!requests) { getRequestsList(); }
    }, []);


    if (!requests) return null;



    return (
        <div className={styles.requests}>
            <h1 className={styles.requests__title}>Connection Requests</h1>
            <div className={styles.requests__list}>
                <RequestList requests={requests} />
            </div>
        </div>
    )
}

export default Requests;