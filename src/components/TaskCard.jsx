const TaskCard = ({
    task,
    toggleTask,
    deleteTask,
    startEdit,
    editId,
    editTitle,
    editDescription,
    setEditTitle,
    setEditDescription,
    saveEdit,
    cancelEdit,
}) => {

    const styles = {
        card: {
            padding: "15px",
            borderRadius: "12px",
            background: "white",
            boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
            transition: "0.2s",
        },

        topRow: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
        },

        status: (completed) => ({
            fontWeight: "bold",
            color: completed ? "#22C55E" : "#F59E0B",
        }),

        title: (completed) => ({
            textDecoration: completed ? "line-through" : "none",
            color: completed ? "#888" : "#111",
            margin: "5px 0",
        }),

        desc: {
            color: "#555",
        },

        input: {
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "8px",
            width: "100%",
        },

        btnGroup: {
            marginTop: "10px",
        },

        editBtn: {
            background: "#3B82F6",
            color: "white",
            border: "none",
            padding: "6px 10px",
            marginRight: "5px",
            borderRadius: "6px",
        },

        deleteBtn: {
            background: "#EF4444",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "6px",
        },

        saveBtn: {
            background: "#22C55E",
            color: "white",
            border: "none",
            padding: "6px 10px",
            marginRight: "5px",
        },

        cancelBtn: {
            background: "#6B7280",
            color: "white",
            border: "none",
            padding: "6px 10px",
        },
    };

    return (
        <div style={styles.card}>
            <div style={styles.topRow}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id, task.completed)}
                />

                <span style={styles.status(task.completed)}>
                    {task.completed ? "✔ Completed" : "⚡ Pending"}
                </span>
            </div>

            {/* ✏️ EDIT MODE */}
            {editId === task.id ? (
                <>
                    <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        style={styles.input}
                    />

                    <input
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        style={styles.input}
                    />

                    <div style={styles.btnGroup}>
                        <button onClick={saveEdit} style={styles.saveBtn}>
                            💾 Save
                        </button>
                        <button onClick={cancelEdit} style={styles.cancelBtn}>
                            ❌ Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h3 style={styles.title(task.completed)}>
                        {task.title}
                    </h3>

                    <p style={styles.desc}>{task.description}</p>

                    <div style={styles.btnGroup}>
                        <button
                            onClick={() => startEdit(task)}
                            style={styles.editBtn}
                        >
                            ✏ Edit
                        </button>

                        <button
                            onClick={() => deleteTask(task.id)}
                            style={styles.deleteBtn}
                        >
                            🗑 Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskCard;