import { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ Login function
    const login = (data) => {
        localStorage.setItem("token", data.access); // 🔥 VERY IMPORTANT
        setUser(data);
    };

    // ✅ Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;