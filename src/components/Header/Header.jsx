import { Link, useNavigate } from "react-router-dom";
import styles from './Header.module.scss';
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../utils/userSlice";

export const NonLoggedInHeader = () => {
    const navItems = [
        { label: "Home", link: "/" },
        { label: "How it Works", link: "/how-it-works" },
        { label: "Success Stories", link: "/success-stories" },
        { label: "Pricing", link: "/pricing" },
    ];

    return (
        <div className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Link to="/" className={styles.logo}>Dev Bumble</Link>
            </div>

            <div className={styles.navContainer}>
                <ul className={styles.navList}>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.link} className={styles.navItem}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.authContainer}>
                <Link to="/login" className={styles.loginButton}>Log In</Link>
                <Link to="/signup" className={styles.signupButton}>Sign Up</Link>
            </div>
        </div>
    )
}

export const LoggedInHeader = () => {
    const navItems = [
        { label: "Home", link: "/" },
        { label: "Profile", link: "/profile" },
        { label: "Messages", link: "/messages" },
        { label: "Connections", link: "/connections" },
    ];

    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
        console.log("logout response", response);
        if (response?.data?.status === "success") {
            dispatch(removeUser());
            navigate("/login");
        }
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Link to="/" className={styles.logo}>Dev Bumble</Link>
            </div>

            <div className={styles.navContainer}>
                <ul className={styles.navList}>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link to={item.link} className={styles.navItem}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.authContainer}>
                <Link to="/profile">
                    <img
                        src={user?.photoUrl}
                        alt="Profile"
                        className={styles.profileImage}
                    />
                </Link>
                <button onClick={() => {
                    handleLogout();
                }} className={styles.signupButton}>
                    Logout
                </button>
            </div>
        </div>
    )
}