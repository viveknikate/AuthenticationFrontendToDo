import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../AppWrapper";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
        useContext(Context);
    const logoutHandler = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${server}/users/logout`, {
                withCredentials: true,
            });
            toast.success(res.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        } catch (error) {
            console.log("error ", error);
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }
    };

    return (
        <nav className="navbar">
            <div>
                <h1 className="logo">Todo App</h1>
            </div>
            <article className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/all">See Our Users</Link>
                {/* {isAuthenticated ? ( */}
                {/* <button onClick={logoutHandler} disabled={loading}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">Login</Link> */}
                {/* )} */}
                {isAuthenticated ? (
                    <button
                        onClick={logoutHandler}
                        disabled={loading}
                        style={{
                            background: loading
                                ? "linear-gradient(to right, #a78bfa, #c084fc)" // lighter for disabled
                                : "linear-gradient(to right, #bab9deff, #a672deff)",
                            color: "#fff",
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1,
                            transition: "all 0.3s ease",
                        }}
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                ) : (
                    <Link
                        to="/login"
                        style={{
                            background:
                                "linear-gradient(to right, #4f46e5, #c299e9ff)",
                            color: "#fff",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                        }}
                    >
                        Login
                    </Link>
                )}
            </article>
        </nav>
    );
};

export default Header;
