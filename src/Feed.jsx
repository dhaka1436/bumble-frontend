import { useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "./utils/constants";
import { useState, useEffect } from "react";
import { addFeed } from "./utils/feedSlice";
import { useDispatch } from "react-redux";
import UserCard from "./components/UserCard/UserCard";
import styles from "./Feed.module.scss";


const Feed = () => {

    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);

    console.log("Feed is", feed);



    const getFeed = async () => {
        try {
            console.log("Making get Feed API CAll");
            const response = await axios.get(`${API_URL}/user/feed`, { withCredentials: true });

            if (response?.data?.status === "success") {
                console.log("Feed from backend is", response?.data?.data);
                dispatch(addFeed(response?.data?.data));
            }
        } catch (error) {
            console.log("error", error);
        }
    }



    useEffect(() => {
        if (!feed) getFeed();
    }, []);

    if (!user || !feed) return null;

    if (feed.length === 0) return (
        <div className={styles.noFeed}>
            <div>
                <h3>No New Users Found</h3>
                <p>We're looking for more matches for you. Check back soon!</p>
            </div>
        </div>
    );

    console.log("first user is ", feed);

    return (
        <div className={styles.feedContainer}>
            <UserCard user={feed[0]} />
        </div>
    )
}

export default Feed;