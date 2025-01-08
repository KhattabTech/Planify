import { useSelector, useDispatch } from "react-redux";
import { addHabit, toggleDay, deleteHabit } from "../features/habitSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./checkbox.css";
import "../App.css";

const HabitTracker = () => {
  const habits = useSelector((state) => state.habits.habitList || []);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState("");

  const handleAddHabit = () => {
    const trimmedHabit = newHabit.trim();
    if (!trimmedHabit) {
      toast.error("Habit name cannot be empty!");
      return;
    }
    if (habits.find((h) => h.name === trimmedHabit)) {
      toast.error("Habit already exists!");
      return;
    }
    dispatch(addHabit(trimmedHabit));
    setNewHabit("");
    setIsModalOpen(false);
    toast.success(`Habit "${trimmedHabit}" added!`);
  };

  const handleToggleDay = (habitName, day) => {
    dispatch(toggleDay({ habitName, day }));
    toast.info(`Marked "${habitName}" as complete for ${day}`);
  };

  const handleDeleteHabit = (habitName) => {
    dispatch(deleteHabit(habitName));
    toast.success(`Habit "${habitName}" deleted!`);
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-light shadow-custom p-6 my-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-black">Habit Tracker</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-black text-sm md:text-base">
          <thead>
            <tr>
              <th className="border p-2 text-left">Habit</th>
              {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <th key={day} className="border p-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {habits.length > 0 ? (
              habits.map((habit, idx) => (
                <tr key={idx}>
                  <td className="border p-3 flex items-center justify-between">
                    {habit.name}
                    <button
                      onClick={() => handleDeleteHabit(habit.name)}
                      className="ml-2 px-2 py-1 text-red-500 hover:text-red-600 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  {Object.keys(habit.days || {}).map((day) => (
                    <td key={day} className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={habit.days ? habit.days[day] : false}
                        onChange={() => handleToggleDay(habit.name, day)}
                        className="checkbox-habit w-5 h-5 text-blue-500 rounded transition-all duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No habits added yet. Add a new habit to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white text-sm md:text-base transition-all duration-200"
        >
          <AiOutlinePlus className="w-5 h-5" />
          <span className="ml-2">Add Habit</span>
        </button>
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
              Add New Habit
            </h3>
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex space-x-4">
              <button
                onClick={handleAddHabit}
                className="w-full px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600"
              >
                Add Habit
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
    </motion.div>
  );
};

export default HabitTracker;
