import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [showPendingOnly, setShowPendingOnly] = useState(false);

    // 📊 Calculations
    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const pendingTasks = tasks.filter(task => !task.completed);

    // 🧠 SMART TASK SUGGESTION
    const getSmartTask = () => {
        const pending = tasks.filter(t => !t.completed);
        if (pending.length === 0) return null;
        return pending.sort((a, b) => a.title.length - b.title.length)[0];
    };
    const smartTask = getSmartTask();

    // 🧠 AI INSIGHT
    const getInsight = () => {
        if (tasks.length === 0) return "Start by adding tasks.";

        const ratio = completedTasks / totalTasks;

        if (ratio === 1) return "🔥 Perfect discipline! You're unstoppable.";
        if (ratio > 0.7) return "💪 Strong progress. Keep pushing.";
        if (ratio > 0.3) return "⚡ You're getting there. Stay consistent.";
        return "⚠️ You are procrastinating. Start small NOW.";
    };
    const insight = getInsight();

    // 🔥 Display Logic (Focus Mode)
    const displayedTasks = showPendingOnly
        ? pendingTasks.slice(0, 3)
        : tasks;

    const styles = {
        container: {
            maxWidth: "650px",
            margin: "auto",
            padding: "20px",
            fontFamily: "Segoe UI",
            backgroundColor: "#F3F4F6",
            minHeight: "100vh",
        },
        heading: {
            textAlign: "center",
            marginBottom: "10px",
            color: "#4F46E5",
        },
        progressBox: {
            marginBottom: "20px",
            textAlign: "center",
        },
        progressBar: {
            height: "10px",
            backgroundColor: "#ddd",
            borderRadius: "10px",
            overflow: "hidden",
        },
        progressFill: {
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#22C55E",
            transition: "0.4s",
        },
        inputContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
        },
        input: {
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
        },
        addBtn: {
            padding: "12px",
            background: "linear-gradient(135deg, #22C55E, #4F46E5)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
        },
        error: {
            color: "red",
            textAlign: "center",
        },
        taskList: {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        },
    };

    // 🔄 Fetch
    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await API.get("/tasks/");
            setTasks(res.data);
            setError("");
        } catch {
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    // ➕ Add
    const addTask = async () => {
        if (!title.trim() || !description.trim()) return;

        try {
            setLoading(true);
            await API.post("/tasks/", {
                title,
                description,
                completed: false,
            });
            setTitle("");
            setDescription("");
            fetchTasks();
        } catch {
            setError("Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    // ❌ Delete
    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}/`);
        fetchTasks();
    };

    // ✅ Toggle
    const toggleTask = async (id, currentStatus) => {
        await API.patch(`/tasks/${id}/`, {
            completed: !currentStatus,
        });
        fetchTasks();
    };

    // ✏️ Edit
    const startEdit = (task) => {
        setEditId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const saveEdit = async () => {
        await API.patch(`/tasks/${editId}/`, {
            title: editTitle,
            description: editDescription,
        });
        setEditId(null);
        fetchTasks();
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditTitle("");
        setEditDescription("");
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>🧠 Growth Dashboard</h2>

            {/* 🧠 Insight */}
            <div style={{
                background: "#E0F2FE",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px",
                textAlign: "center"
            }}>
                <b>{insight}</b>
            </div>

            {/* 🎯 Smart Task */}
            {smartTask && (
                <div style={{
                    background: "#FEF9C3",
                    padding: "15px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                }}>
                    <h3>🎯 Start With This</h3>
                    <p><b>{smartTask.title}</b></p>
                    <p>{smartTask.description}</p>
                </div>
            )}

            {/* 🔥 Progress */}
            <div style={styles.progressBox}>
                <p>Progress: {progress}%</p>
                <div style={styles.progressBar}>
                    <div style={styles.progressFill}></div>
                </div>
            </div>

            {/* ➕ Add Task */}
            <div style={styles.inputContainer}>
                <input
                    value={title}
                    placeholder="🎯 What will you achieve today?"
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                />

                <input
                    value={description}
                    placeholder="🧠 Why is this important?"
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.input}
                />

                <button onClick={addTask} style={styles.addBtn}>
                    {loading ? "Adding..." : "🚀 Add Task"}
                </button>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            {/* 🔥 Controls */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <button
                    onClick={async () => {
                        for (let task of pendingTasks) {
                            await API.patch(`/tasks/${task.id}/`, {
                                completed: true,
                            });
                        }
                        fetchTasks();
                        alert("🔥 Massive progress! Keep going!");
                    }}
                    style={{
                        background: "#22C55E",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    🚀 Complete All Pending
                </button>

                <button
                    onClick={() => setShowPendingOnly(!showPendingOnly)}
                    style={{
                        background: "#4F46E5",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    {showPendingOnly ? "Show All" : "Focus Mode"}
                </button>
            </div>

            {/* 📋 Task List */}
            <div style={styles.taskList}>
                {displayedTasks.length === 0 ? (
                    <p>🔥 No tasks here. Stay productive!</p>
                ) : (
                    displayedTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            toggleTask={toggleTask}
                            deleteTask={deleteTask}
                            startEdit={startEdit}
                            editId={editId}
                            editTitle={editTitle}
                            editDescription={editDescription}
                            setEditTitle={setEditTitle}
                            setEditDescription={setEditDescription}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Tasks;