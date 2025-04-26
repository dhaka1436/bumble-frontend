import React, { use } from 'react';
import styles from './UserCard.module.scss';

const UserCard = ({ user }) => {

    if (!user) return null;

    console.log("Feed user is", user);

    const { firstName, lastName, age, gender, photoUrl, about = " ", skills = [] } = user;


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
                    <button className={`${styles.actionButton} ${styles.ignoreButton}`}>
                        Ignore
                    </button>
                    <button className={`${styles.actionButton} ${styles.interestedButton}`}>
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
