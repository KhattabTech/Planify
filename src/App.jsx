import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./store";
import "./index.css";

import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import HabitTracker from "./components/HabitTracker"; // إضافة مكونات إضافية هنا
import TaskList from "./components/TaskList";
import CalendarContainer from "./components/CalendarContainer";
import TaskTimer from "./components/Timer";
import StickyNotes from "./components/StickyNotes";
import Footer from "./pages/Footer";
import Notebook from "./components/Notebook";


const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 ">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/habit-tracker" element={<HabitTracker />} />
                <Route path="/task-list" element={<TaskList />} />
                <Route path="/select-date" element={<CalendarContainer />} />
                <Route path="/task-timer" element={<TaskTimer />} />
                <Route path="/sticky-notes" element={<StickyNotes />} />
                <Route path="/note-book" element={<Notebook />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
