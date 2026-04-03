import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setMessage("");

            const res = await API.post("/users/register", {
                username,
                email,
                password,
            });

            setMessage(res.data.message);

            // 🔥 Redirect after success
            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (err) {
            console.log(err);
            setError(err.response?.data?.error || "Registration failed");
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
        success: {
            color: "green",
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
                <h2 style={styles.title}>Create Account 🚀</h2>

                <input
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p style={styles.error}>{error}</p>}
                {message && <p style={styles.success}>{message}</p>}

                <button
                    style={styles.button}
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Register"}
                </button>

                <p style={styles.footer}>
                    Already have an account?{" "}
                    <span
                        style={styles.link}
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;