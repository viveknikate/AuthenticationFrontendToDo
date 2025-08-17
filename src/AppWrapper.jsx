import { createContext, useState } from "react";
import App from "./App";

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    return (
        <Context.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                loading,
                setLoading,
                user,
                setUser,
            }}
        >
            <App />
        </Context.Provider>
    );
};

export default AppWrapper;
