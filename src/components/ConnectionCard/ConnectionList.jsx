import React from 'react';
import ConnectionCard from './ConnectionCard';
import styles from './ConnectionList.module.scss';

const ConnectionList = ({ connections }) => {
    if (!connections || connections.length === 0) {
        return (
            <div className={styles.empty}>
                <p>No connections found</p>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {connections.map((connection) => (
                <ConnectionCard
                    key={connection._id}
                    connection={connection}
                />
            ))}
        </div>
    );
};

export default ConnectionList;