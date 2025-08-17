import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main";
import { Context } from "../AppWrapper";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {isAuthenticated, setIsAuthenticated, setLoading} = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(
                `${server}/users/register`,
                {
                    username: name,
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
            toast.success(res.data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            setIsAuthenticated(false);
            setLoading(false);
        }
    };

    if(isAuthenticated) return <Navigate to={'/'} />

    return (
        <div className="login-container">
            <div className="login-title">Register</div>
            <form className="login-form" onSubmit={submitHandler}>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Register</button>
                <hr />
                <Link to="/login" className="signup-link">
                    Login
                </Link>
            </form>
        </div>
    );
};

export default Register;
