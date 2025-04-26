import { Outlet, useNavigate } from "react-router-dom"
import { NonLoggedInHeader, LoggedInHeader } from "./components/Header/Header.jsx"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import axios from "axios";
import { API_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const Body = () => {


    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();





    const fetchuser = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/view`, { withCredentials: true });
            if (response?.data?.status === "success") {
                dispatch(addUser(response?.data?.data));
            }
            else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    }

    useEffect(() => {
        if (!user) {
            fetchuser();
        }
    }, []);



    return (
        <div className="flex flex-col h-screen">
            {user ? <LoggedInHeader /> : <NonLoggedInHeader />}
            <Outlet />
        </div>
    )
}

export default Body;