import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import Users from "./components/Users";
import NotFound from "./components/NotFound";
import { useContext, useEffect } from "react";
import { Context } from "./AppWrapper";
import axios from "axios";
import { server } from "./main";

function App() {
    const { setUser, setIsAuthenticated, setLoading } =
        useContext(Context);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${server}/users/me`, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user);
                setIsAuthenticated(true);
                setLoading(false);
            })
            .catch((err) => {
                setUser({});
                console.log(err);
                setIsAuthenticated(false);
                setLoading(false);
            });
    }, [setUser, setIsAuthenticated, setLoading]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/all" element={<Users />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Toaster />
        </Router>
    );
}

export default App;
