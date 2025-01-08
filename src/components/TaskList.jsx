import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./checkbox.css";

const TaskList = () => {
  const [tasks, setTasks] = useState({
    Saturday: [],
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask && selectedDay) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedDay]: [
          ...prevTasks[selectedDay],
          { task: newTask, checked: false },
        ],
      }));
      setNewTask("");
      setIsModalOpen(false);
      toast.success(`Task "${newTask}" added to ${selectedDay}!`);
    }
  };

  const toggleCheckbox = (day, index) => {
    const updatedTasks = [...tasks[day]];
    updatedTasks[index].checked = !updatedTasks[index].checked;

    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: updatedTasks,
    }));
  };

  const clearTasks = (day) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: [],
    }));
    toast.success(`All tasks for ${day} cleared!`);
  };

  const deleteTask = (day, index) => {
    const updatedTasks = tasks[day].filter((_, idx) => idx !== index);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [day]: updatedTasks,
    }));
    toast.success("Task deleted!");
  };

  const truncateText = (text, length = 30) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 text-center">
        Task List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(tasks).map((day) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-5 bg-white rounded-lg shadow-lg relative"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-700">{day}</h3>
            <ul className="space-y-3">
              {tasks[day].map((task, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => toggleCheckbox(day, idx)}
                      className="checkbox-style w-5 h-5 text-indigo-500 rounded-full focus:ring-2 focus:ring-indigo-400"
                    />
                    <span
                      className={`${
                        task.checked
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {truncateText(task.task)}
                    </span>
                  </label>
                  <button
                    onClick={() => deleteTask(day, idx)}
                    className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  setSelectedDay(day);
                  setIsModalOpen(true);
                }}
                className="flex items-center space-x-2 px-3 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition-transform transform hover:scale-105"
              >
                <AiOutlinePlus size={18} />
                <span>Add Task</span>
              </button>
              {tasks[day].length > 0 && (
                <button
                  onClick={() => clearTasks(day)}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                  <AiOutlineDelete size={18} />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {isModalOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-dark text-black p-6 rounded-2xl shadow-xl w-96">
            <h3 className="text-2xl font-bold mb-4 text-center text-white">
              Add New Task
            </h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter new task"
            />
            <div className="flex space-x-4">
              <button
                onClick={addTask}
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                Add Task
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TaskList;