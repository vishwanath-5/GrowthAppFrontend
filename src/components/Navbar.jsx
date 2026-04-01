import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const styles = {
        nav: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 15px",
            background: "linear-gradient(135deg, #4F46E5, #22C55E)",
            color: "white",
            position: "sticky",
            top: 0,
            zIndex: 1000,
        },

        logo: {
            fontWeight: "bold",
            fontSize: "16px",
            whiteSpace: "nowrap",
        },

        center: {
            display: "flex",
            gap: "8px",
            flexWrap: "nowrap",
        },

        link: (active) => ({
            textDecoration: "none",
            color: "white",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "13px",
            background: active ? "rgba(255,255,255,0.2)" : "transparent",
            whiteSpace: "nowrap",
        }),

        right: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
        },

        user: {
            fontSize: "12px",
        },

        button: {
            background: "white",
            color: "#4F46E5",
            border: "none",
            padding: "5px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
        },
    };

    return (
        <div style={styles.nav}>
            {/* 🧠 Logo */}
            <div style={styles.logo}>🧠 Growth</div>

            {/* 🔗 Center Links */}
            <div style={styles.center}>
                <Link
                    to="/dashboard"
                    style={styles.link(location.pathname === "/dashboard")}
                >
                    Dashboard
                </Link>

                <Link
                    to="/tasks"
                    style={styles.link(location.pathname === "/tasks")}
                >
                    Tasks
                </Link>

                <Link
                    to="/chat"
                    style={styles.link(location.pathname === "/chat")}
                >
                    AI
                </Link>
            </div>

            {/* 👤 Right */}
            <div style={styles.right}>
                <span style={styles.user}>👤</span>

                <button onClick={handleLogout} style={styles.button}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;