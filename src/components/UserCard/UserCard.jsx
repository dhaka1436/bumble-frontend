import React, { use } from 'react';
import styles from './UserCard.module.scss';
import axios from 'axios';
import { API_URL } from '../../utils/constants';
import { notifications } from '@mantine/notifications';
import { removeUserfromFeed } from '../../utils/feedSlice';
import { useDispatch } from 'react-redux';

const UserCard = ({ user, isPreview = false }) => {

    if (!user) return null;

    console.log("Feed user is", user);
    const dispatch = useDispatch();

    const { firstName, lastName, age, gender, photoUrl, _id, about = " ", skills = [] } = user;


    const handleRequestClick = async (status) => {
        try {
            const response = await axios.post(`${API_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });

            if (response?.data?.status === "success" && response?.data?.data?.status === "interested") {
                notifications.show({
                    title: "Request Sent",
                    message: "Sent Interest successfully",
                    color: "green",
                });

            }
            dispatch(removeUserfromFeed(_id));
        } catch (error) {
            console.error('Error handling request:', error);
        }
    }

    return (
        <div className={styles.userCard}>
            <div className={styles.header}>
                <div className={styles.imageContainer}>
                    <img src={photoUrl} alt={`${firstName} ${lastName}`} className={styles.image} />
                </div>
                <div className={styles.badge}>{age}</div>
            </div>
            <div className={styles.content}>
                <h2 className={styles.name}>{firstName} {lastName}</h2>
                <p className={styles.gender}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
                <div className={styles.about}>
                    <p>{about}</p>
                </div>
                <div className={styles.skills}>
                    <h3>Skills</h3>
                    <div className={styles.skillsList}>
                        {skills.map((skill, index) => (
                            <span key={index} className={styles.skillTag}>{skill}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    <button className={`${styles.actionButton} ${styles.ignoreButton} ${isPreview ? styles.disabledButton : ''}`} disabled={isPreview} onClick={() => handleRequestClick("ignored")}>
                        Ignore
                    </button>
                    <button className={`${styles.actionButton} ${styles.interestedButton} ${isPreview ? styles.disabledButton : ''}`} disabled={isPreview} onClick={() => handleRequestClick("interested")}>
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
