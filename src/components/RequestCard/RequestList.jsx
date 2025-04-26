import React from 'react';
import RequestCard from './RequestCard';
import styles from './RequestList.module.scss';

const RequestList = ({ requests }) => {

    console.log("Request List is", requests);

    if (!requests || requests.length === 0) {
        return (
            <div className={styles.empty}>
                <p>No pending requests found</p>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {requests?.map((request) => (
                <RequestCard
                    key={request._id}
                    request={request}
                />
            ))}
        </div>
    );
};

export default RequestList; 