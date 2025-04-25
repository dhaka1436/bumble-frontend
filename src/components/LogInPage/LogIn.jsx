import LogInForm from "../LogInForm/LogInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import styles from "./LogInPage.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";

const LogIn = () => {

    const [isLogInForm, setIsLogInForm] = useState(true);
    const user = useSelector(store => store.user);

    if (user) {
        return <Navigate to="/" />
    }


    return (
        <div className={styles.logInPage}>
            {isLogInForm ? <LogInForm setIsLogInForm={setIsLogInForm} /> : <SignUpForm setIsLogInForm={setIsLogInForm} />}
        </div>
    );
}

export default LogIn;