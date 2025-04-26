import React from 'react';
import styles from './RequestCard.module.scss';
import { Button } from '@mantine/core';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../../utils/requestsSlice';
import { notifications } from '@mantine/notifications';

const RequestCard = ({ request, refreshRequests }) => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.requests);

    const { _id: requestId } = request;
    const { firstName, lastName, age, gender, photoUrl, about, skills, _id } = request?.fromUserId;

    const handleRequestClick = async (status) => {

        try {
            const response = await axios.patch(`${API_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
            if (response?.data?.status === "success") {
                notifications.show({
                    title: "Request Reviewed",
                    message: `Request has been ${response?.data?.data?.status} successfully`,
                    color: "green",
                });

                const newRequests = requests.filter(request => request?._id != requestId);
                dispatch(addRequests(newRequests));

            }
        } catch (error) {
            console.error('Error handling request:', error);
        }
    }


    return (
        <div className={styles.card}>
            <div className={styles.card__header}>
                <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className={styles.card__image}
                />
            </div>
            <div className={styles.card__body}>
                <h3 className={styles.card__name}>{firstName} {lastName}</h3>
                <div className={styles.card__info}>
                    <span>{age} years</span>
                    <span>•</span>
                    <span>{gender}</span>
                </div>
                <p className={styles.card__about}>{about}</p>
                <div className={styles.card__skills}>
                    {skills?.map((skill, index) => (
                        <span key={index} className={styles.card__skill}>
                            {skill}
                        </span>
                    ))}
                </div>
                <div className={styles.card__actions}>
                    <Button className={styles.card__accept} onClick={() => handleRequestClick("accepted")}>Accept</Button>
                    <Button className={styles.card__reject} onClick={() => handleRequestClick("rejected")}>Reject</Button>
                </div>
            </div>
        </div>
    );
};

export default RequestCard; 