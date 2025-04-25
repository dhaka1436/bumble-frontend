import { useSelector } from "react-redux";

const Feed = () => {
    const user = useSelector(store => store.user);

    if (!user) return null;
    return (
        <div>
            <h1>Feed</h1>
        </div>
    )
}

export default Feed;