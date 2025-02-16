import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import axios from "axios";
import { throttle } from "lodash";
const TaskForm = lazy(() => import("../components/Tasks/TaskForm"));

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("asc");

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tasks`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(Array.isArray(response.data.tasks) ? response.data.tasks : []);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [apiUrl]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Submit handler
  const handleTaskSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showNotification("Unauthorized! Please log in again.", "error");
        return;
      }

      let response;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      if (taskToEdit) {
        response = await axios.put(
          `${apiUrl}/api/tasks/${taskToEdit._id}`,
          data,
          config
        );
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskToEdit._id ? response.data.task : task
          )
        );
        showNotification("Task updated successfully!", "success");
      } else {
        response = await axios.post(`${apiUrl}/api/tasks`, data, config);
        setTasks((prevTasks) => [...prevTasks, response.data.task]);
        showNotification("Task added successfully!", "success");
      }
    } catch (error) {
      showNotification("Failed to save task!", "error");
    } finally {
      setTaskToEdit(null);
      setIsModalOpen(false);
    }
  };

  // Delete tasks
  const handleDelete = throttle(async (task) => {
    if (!task || !task._id) {
      showNotification("Task not found!", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showNotification("Unauthorized! Please log in again.", "error");
        return;
      }

      await axios.delete(`${apiUrl}/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setTasks(tasks.filter((t) => t._id !== task._id));
      showNotification("Task deleted successfully!", "success");
    } catch (error) {
      showNotification("Failed to delete task!", "error");
    }
  }, 2000);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      const taskLocalDate = new Date(
        taskDate.getFullYear(),
        taskDate.getMonth(),
        taskDate.getDate()
      )
        .toISOString()
        .split("T")[0];

      const today = new Date();
      const todayLocalDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
        .toISOString()
        .split("T")[0];

      console.log("Task Date:", taskLocalDate, "Today Date:", todayLocalDate);

      if (filter === "completed") return task.isCompleted;
      if (filter === "pending") return !task.isCompleted;
      if (filter === "today") return taskLocalDate === todayLocalDate;

      if (filter === "week") {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Start of today

        const weekLater = new Date();
        weekLater.setDate(now.getDate() + 7);
        weekLater.setHours(23, 59, 59, 999); // End of the 7th day

        const taskDueDate = new Date(task.dueDate);
        return taskDueDate >= now && taskDueDate <= weekLater;
      }

      return true;
    });
  }, [tasks, filter]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      let valueA = a[sortKey];
      let valueB = b[sortKey];

      if (sortKey === "dueDate") {
        valueA = new Date(valueA);
        valueB = new Date(valueB);
      } else if (sortKey === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        valueA = priorityOrder[valueA] || 0;
        valueB = priorityOrder[valueB] || 0;
      } else {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
  }, [filteredTasks, sortKey, sortOrder]);

  // Converting data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mt-5 text-center">Task Manager</h1>

      {notification && (
        <div
          className={`text-white px-4 py-2 my-3 text-center rounded ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between my-4">
        <div className="mb-2 md:mb-0">
          <label className="mr-2 font-semibold">Filter:</label>
          <select
            className="border px-2 py-1 rounded w-full md:w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="today">Due Today</option>
            <option value="week">Due This Week</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center">
          <label className="mr-2 font-semibold">Sort by:</label>
          <select
            className="border px-2 py-1 rounded mb-2 md:mb-0 w-full md:w-auto"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
          <select
            className="border px-2 py-1 rounded ml-0 md:ml-2 w-full md:w-auto"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded my-4 w-full md:w-auto"
        onClick={() => {
          setIsModalOpen(true);
          setTaskToEdit(null);
        }}
      >
        + Create Task
      </button>

      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No tasks found. Create a new task!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Completion Status</th>
                <th className="border px-4 py-2">Created At</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task) => (
                <tr key={task._id} className="text-center">
                  <td className="border px-4 py-2">{task.title}</td>
                  <td className="border px-4 py-2">{task.description}</td>
                  <td className="border px-4 py-2">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{task.priority}</td>
                  <td className="border px-4 py-2">
                    {task.isCompleted ? (
                      <span className="text-green-500 font-semibold">
                        ✔ Completed
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        ✘ Pending
                      </span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(task.createdAt)}
                  </td>
                  <td className="border px-4 py-2 flex justify-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setTaskToEdit(task);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(task)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Suspense fallback={<p>Loading...</p>}>
        {console.log(taskToEdit)}
        {isModalOpen && (
          <TaskForm
            initialData={taskToEdit}
            onSubmit={handleTaskSubmit}
            onClose={() => setIsModalOpen(false)}
            mode={taskToEdit ? "edit" : "create"}
          />
        )}
      </Suspense>
    </div>
  );
};

export default Home;
