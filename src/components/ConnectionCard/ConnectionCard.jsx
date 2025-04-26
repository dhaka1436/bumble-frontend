import React from 'react';
import styles from './ConnectionCard.module.scss';

const ConnectionCard = ({ connection }) => {
    const { firstName, lastName, age, gender, photoUrl, about, skills } = connection;

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
                    {skills.map((skill, index) => (
                        <span key={index} className={styles.card__skill}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConnectionCard; 