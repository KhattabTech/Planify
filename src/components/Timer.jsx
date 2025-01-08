import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Timer = () => {
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [duration, setDuration] = useState(25 * 60); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    if (isPlaying) {
      const updateTitle = () => {
        document.title = `Time Left: ${formatTime(timeRemaining)}`;
      };

      updateTitle(); 

      let interval;
      if (isPlaying && timeRemaining > 0) {
        interval = setInterval(() => {
          setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
      } else if (timeRemaining === 0) {
        handleTimerCompletion();
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying, timeRemaining]);

  const startTimer = () => {
    if (duration > 0) {
      setIsPlaying(true);
    }
  };

  const pauseTimer = () => {
    setIsPlaying(false);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setPomodoroCount(0);
    setIsPomodoro(true);
    setDuration(25 * 60);
    setTimeRemaining(25 * 60);
    document.title = "Task Timer";
  };

  const handleTimerCompletion = () => {
    if (isPomodoro) {
      setPomodoroCount((prevCount) => prevCount + 1);
      setIsPomodoro(false); 
      setDuration(5 * 60); 
      setTimeRemaining(5 * 60);
      toast.success("Pomodoro completed! Take a break.");
    } else {
      setIsPomodoro(true); 
      setDuration(25 * 60);
      setTimeRemaining(25 * 60);
      toast.success("Break time completed! Start your next Pomodoro.");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleDurationChange = (event) => {
    const value = event.target.value;
    if (/^\d+$/.test(value) && value >= 1) {
      setDuration(value * 60);
      setTimeRemaining(value * 60);
    }
  };

  const incrementDuration = () => {
    setDuration((prevDuration) => prevDuration + 60);
    setTimeRemaining((prevTime) => prevTime + 60);
  };

  const decrementDuration = () => {
    if (duration > 60) {
      setDuration((prevDuration) => prevDuration - 60);
      setTimeRemaining((prevTime) => prevTime - 60);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-black w-full p-6 rounded-lg shadow-xl mt-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Task Timer</h2>

      <div className="flex justify-center mb-6">
        <div className="flex items-center rounded-lg bg-white shadow-md border border-gray-300">
          <button
            type="button"
            onClick={decrementDuration}
            className="p-4 text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-300"
          >
            &minus;
          </button>

          <input
            type="number"
            value={duration / 60}
            onChange={handleDurationChange}
            className="h-12 w-16 text-center text-lg font-semibold bg-white border-none focus:outline-none rounded"
            min="1"
          />

          <button
            type="button"
            onClick={incrementDuration}
            className="p-4 text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-300"
          >
            +
          </button>
        </div>
      </div>

      <div className="flip-clock-container flex justify-center mb-8">
        <div className="flip-clock bg-gradient-to-r p-6 rounded-lg shadow-lg">
          <div className="flip-clock-time text-6xl font-bold text-center">
            <span className="flip-clock-item">
              {formatTime(timeRemaining).split(":")[0]}
            </span>
            <span className="text-4xl">:</span>
            <span className="flip-clock-item">
              {formatTime(timeRemaining).split(":")[1]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-6">
        {!isPlaying ? (
          <motion.button
            onClick={startTimer}
            className="p-6 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <FaPlay size={24} />
          </motion.button>
        ) : (
          <motion.button
            onClick={pauseTimer}
            className="p-6 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <FaPause size={24} />
          </motion.button>
        )}

        <motion.button
          onClick={resetTimer}
          className="p-6 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition duration-300"
          whileTap={{ scale: 0.95 }}
        >
          <FaRedo size={24} />
        </motion.button>
      </div>

      <div className="text-center mt-4">
        <p className="text-white text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-lg shadow-lg">
          Pomodoros Completed: {pomodoroCount}
        </p>
      </div>
    </motion.div>
  );
};

export default Timer;
