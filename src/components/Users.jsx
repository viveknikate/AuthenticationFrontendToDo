import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { Context } from "../AppWrapper";

const Users = () => {
    const [users, setUsers] = useState([]);
    const { loading, setLoading } = useContext(Context);

    useEffect(() => {
        const getAllUsers = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${server}/users/all`, {
                    withCredentials: true,
                });
                setUsers(res.data.users);
                toast.success(res.data.message);
                setLoading(false);
            } catch (error) {
                toast.error("Could not fetch users");
                console.log(error);
                setLoading(false);
            }
        };
        getAllUsers();
    }, [setLoading]);

    return loading ? (
        <Loading />
    ) : (
        <div>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Our Users
            </h2>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                }}
            >
                {users.map((user) => (
                    <div
                        key={user._id}
                        style={{
                            background:
                                "linear-gradient(to right, #4f46e5, #9333ea)",
                            color: "#fff",
                            padding: "16px",
                            borderRadius: "8px",
                            width: "200px",
                            boxShadow: "0 0 10px #0f0",
                            transition: "transform 0.2s",
                            fontWeight: "bold",
                            letterSpacing: "1px",
                        }}
                    >
                        <h3>{user.username}</h3>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;
