import { useEffect, useState } from "react";
import HabitTracker from "../components/HabitTracker";
import TaskList from "../components/TaskList";
import CalendarContainer from "../components/CalendarContainer";
import Timer from "../components/Timer";
import { motion, AnimatePresence } from "framer-motion";
import StickyNotes from "../components/StickyNotes";
import Notebook from "../components/Notebook";

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="p-4 min-h-screen text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {showWelcome && (
          <motion.aside
            className="fixed bottom-4 end-4 z-50 flex items-center justify-center gap-4 rounded-lg bg-black px-5 py-3 text-white"
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium hover:opacity-75"
            >
              Welcome back my friend 👋😊
            </a>

            <button
              onClick={() => setShowWelcome(false)}
              className="rounded bg-white/20 p-1 hover:bg-white/10"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
      <StickyNotes />{" "}
      <div className="grid grid-cols-1 text-black">
        <HabitTracker />
        <TaskList />
      </div>
      <div className="block sm:flex gap-4">
        <CalendarContainer />
        <Timer />
      </div>
      <Notebook />
    </motion.div>
  );
};

export default Dashboard;
