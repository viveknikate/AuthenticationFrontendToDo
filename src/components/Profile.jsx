import { useContext } from "react";
import { Context } from "../AppWrapper";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";

const Profile = () => {
    const { isAuthenticated, loading, user } = useContext(Context);

    if(loading) return <Loading />
    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "40px auto",
                padding: "20px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                color: "#000000ff",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
        >
            <h1
                style={{
                    fontSize: "1.8rem",
                    background: "linear-gradient(to right, #4f46e5, #9333ea)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "20px",
                }}
            >
                Profile Info
            </h1>
            <p style={{ margin: "8px 0" }}>
                <strong>Name:</strong> {user?.username}
            </p>
            <p style={{ margin: "8px 0" }}>
                <strong>Email:</strong> {user?.email}
            </p>
            <p style={{ margin: "8px 0" }}>
                <strong>Member Since:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
};

export default Profile;
