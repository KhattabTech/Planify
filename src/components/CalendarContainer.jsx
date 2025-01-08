import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarContainer.css";
import { motion } from "framer-motion";

const CalendarContainer = () => {
  const handleDateChange = (date) => {
    console.log("Selected Date:", date);
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
     className="bg-light w-full shadow-custom p-6 rounded-lg  mt-8">
      <h2 className="text-xl font-bold text-white mb-4">Select a Date</h2>
      <Calendar
        onChange={handleDateChange}
        className="shadow-md p-2"
        weekStartsOn={5} 
      />
    </motion.div>
  );
};

export default CalendarContainer;
