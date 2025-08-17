import React from "react";

const NotFound = () => {
    return (
        <div
            style={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#eae2e2ff",
                padding: "2rem",
            }}
        >
            <div
                style={{
                    background: "rgba(216, 46, 168, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "40px",
                    boxShadow: "0 8px 24px rgba(21, 19, 19, 1)",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    color: "#333",
                    textAlign: "center",
                }}
            >
                <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
                    404
                </h1>
                <p style={{ fontSize: "1.2rem" }}>Page Not Found</p>
            </div>
        </div>
    );
};

export default NotFound;
