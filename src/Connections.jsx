import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './utils/constants';
import { addConnections } from './utils/connectionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ConnectionList from './components/ConnectionCard/ConnectionList';
import styles from './Connections.module.scss';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(state => state.connections);

    const getConnectionsList = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/connections`, { withCredentials: true });
            if (response?.data?.status === "success") {
                dispatch(addConnections(response?.data?.data));
            }
        } catch (error) {
            console.error('Error fetching connections:', error);
        }
    }

    useEffect(() => {
        if (!connections) { getConnectionsList(); }
    }, []);

    return (
        <div className={styles.connections}>
            <h1 className={styles.connections__title}>My Connections</h1>
            <div className={styles.connections__list}>
                <ConnectionList connections={connections} />
            </div>
        </div>
    )
}

export default Connections;