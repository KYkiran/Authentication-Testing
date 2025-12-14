import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");
      const res = await api.get("/tasks");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, form);
      } else {
        await api.post("/tasks", form);
      }
      setForm({ title: "", description: "", status: "pending" });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save task");
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status || "pending",
    });
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            {user && (
              <p className="text-sm text-gray-600">
                {user.name} ({user.role})
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-sm text-indigo-600 hover:underline"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Create / Edit */}
          <section>
            <h3 className="text-lg font-medium mb-3">
              {editingId ? "Edit Task" : "Create Task"}
            </h3>
            <form onSubmit={handleCreateOrUpdate} className="space-y-3">
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
              </select>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {editingId ? "Update Task" : "Create Task"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={() => {
                      setEditingId(null);
                      setForm({
                        title: "",
                        description: "",
                        status: "pending",
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Task list */}
          <section>
            <h3 className="text-lg font-medium mb-3">Tasks</h3>
            {tasks.length === 0 ? (
              <p className="text-sm text-gray-600">No tasks yet.</p>
            ) : (
              <ul className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="border border-gray-200 rounded p-3 flex justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{task.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                          {task.status}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-sm text-gray-700">
                          {task.description}
                        </p>
                      )}
                      {task.createdBy && (
                        <p className="text-xs text-gray-500">
                          By {task.createdBy.name} ({task.createdBy.email})
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleEdit(task)}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
