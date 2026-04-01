import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await API.get("/tasks/");
            setTasks(res.data);
        } catch (error) {
            console.error("DASHBOARD ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) return <h3>Loading Dashboard...</h3>;

    // 📊 Calculations
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    // 🎯 Focus Tasks (Top 3 Pending)
    const focusTasks = tasks.filter(t => !t.completed).slice(0, 3);

    // 🧠 Dynamic Motivation
    const quotes = [
        "Discipline beats motivation.",
        "Small steps daily = Big success.",
        "You are becoming unstoppable.",
        "Action creates confidence.",
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    // 🎨 Dynamic Progress Color
    const progressColor =
        progress < 30 ? "#EF4444" :
            progress < 70 ? "#F59E0B" :
                "#22C55E";

    const styles = {
        container: {
            padding: "20px",
            fontFamily: "Segoe UI",
            background: "#F3F4F6",
            minHeight: "100vh",
        },

        heading: {
            textAlign: "center",
            color: "#4F46E5",
            marginBottom: "20px",
        },

        cardContainer: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "15px",
            marginBottom: "20px",
        },

        card: {
            background: "white",
            padding: "15px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },

        progressBar: {
            width: "100%",
            height: "15px",
            background: "#ddd",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "20px",
        },

        progressFill: {
            width: `${progress}%`,
            height: "100%",
            background: progressColor,
            transition: "0.4s",
        },

        focusBox: {
            background: "white",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },

        quoteBox: {
            background: "#4F46E5",
            color: "white",
            padding: "15px",
            borderRadius: "12px",
            textAlign: "center",
            fontStyle: "italic",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>🧠 Growth Dashboard</h2>

            {/* 📊 Stats */}
            <div style={styles.cardContainer}>
                <div style={styles.card}>
                    <h3>{total}</h3>
                    <p>Total</p>
                </div>

                <div style={styles.card}>
                    <h3 style={{ color: "#22C55E" }}>{completed}</h3>
                    <p>Completed</p>
                </div>

                <div style={styles.card}>
                    <h3 style={{ color: "#F59E0B" }}>{pending}</h3>
                    <p>Pending</p>
                </div>

                <div style={styles.card}>
                    <h3>{progress}%</h3>
                    <p>Progress</p>
                </div>
            </div>

            {/* 🔥 Progress Bar */}
            <div style={styles.progressBar}>
                <div style={styles.progressFill}></div>
            </div>

            {/* 🎯 Focus Section */}
            <div style={styles.focusBox}>
                <h3>🎯 Today's Focus</h3>
                {focusTasks.length === 0 ? (
                    <p>All tasks completed! 🔥</p>
                ) : (
                    focusTasks.map(task => (
                        <p key={task.id}>• {task.title}</p>
                    ))
                )}
            </div>

            {/* 🧠 Motivation */}
            <div style={styles.quoteBox}>
                <p>“{quote}”</p>
            </div>
        </div>
    );
};

export default Dashboard;