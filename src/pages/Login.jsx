import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post("/auth/login", {
                username,
                password,
            });

            // ✅ Save token
            localStorage.setItem("token", res.data.access);

            // ✅ Redirect
            navigate("/tasks");

        } catch (err) {
            console.log(err);
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };
    const styles = {
        container: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f5f7fb",
        },
        card: {
            width: "320px",
            padding: "25px",
            borderRadius: "12px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
        },
        title: {
            marginBottom: "20px",
        },
        input: {
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
        },
        button: {
            width: "100%",
            padding: "10px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
        },
        error: {
            color: "red",
            fontSize: "14px",
        },
        footer: {
            marginTop: "15px",
            fontSize: "14px",
        },
        link: {
            color: "#4f46e5",
            cursor: "pointer",
            fontWeight: "bold",
        },
    };
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back 👋</h2>

                <input
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p style={styles.error}>{error}</p>}

                <button
                    style={styles.button}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p style={styles.footer}>
                    Don’t have an account?{" "}
                    <span
                        style={styles.link}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;