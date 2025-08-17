import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../AppWrapper";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
        useContext(Context);
    if (isAuthenticated) return <Navigate to={"/"} />;

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                `${server}/users/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            // console.log(data);
            setIsAuthenticated(true);
            toast.success(data.message);
            setLoading(false);
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-title">Login</div>
                <form className="login-form" onSubmit={submitHandler}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <div className="input-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-visibility"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            color: loading ? "#666" : "#fff",
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <hr />
                    <Link to="/register" className="signup-link">
                        Sign Up / Register
                    </Link>
                </form>
            </div>
        </>
    );
};

export default Login;
