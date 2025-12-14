import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Admin = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setError("");
      const [usersRes, tasksRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/tasks"),
      ]);
      setUsers(usersRes.data.users || []);
      setTasks(tasksRes.data.tasks || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load admin data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Admin Panel</h2>
            {user && (
              <p className="text-sm text-gray-600">
                {user.name} ({user.role})
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm text-indigo-600 hover:underline"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Users */}
          <section>
            <h3 className="text-lg font-medium mb-3">All Users</h3>
            {users.length === 0 ? (
              <p className="text-sm text-gray-600">No users found.</p>
            ) : (
              <div className="overflow-x-auto border border-gray-200 rounded">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">
                        Name
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Email
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-t border-gray-200">
                        <td className="px-3 py-2">{u.name}</td>
                        <td className="px-3 py-2">{u.email}</td>
                        <td className="px-3 py-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 border border-gray-200">
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Tasks */}
          <section>
            <h3 className="text-lg font-medium mb-3">All Tasks</h3>
            {tasks.length === 0 ? (
              <p className="text-sm text-gray-600">No tasks found.</p>
            ) : (
              <div className="overflow-x-auto border border-gray-200 rounded max-h-96">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">
                        Title
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Status
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Owner
                      </th>
                      <th className="px-3 py-2 text-left font-semibold">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((t) => (
                      <tr key={t._id} className="border-t border-gray-200">
                        <td className="px-3 py-2">{t.title}</td>
                        <td className="px-3 py-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 border border-gray-200">
                            {t.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          {t.createdBy?.name || "-"}
                        </td>
                        <td className="px-3 py-2">
                          {t.createdBy?.email || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
