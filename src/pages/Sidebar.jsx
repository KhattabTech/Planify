import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaRegCalendarAlt,
  FaClipboardList,
  FaRegClock,
} from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import { MdEventRepeat } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
      <div>
        <div className="inline-flex items-center justify-center"></div>

        <div className="border-t border-gray-100">
          <div className="px-2 ">
            <div className="py-4">
              <NavLink
                to="/"
                className="group z-50 relative flex justify-center rounded bg-blue-50 px-2 py-4 text-blue-700"
              >
                <FaTachometerAlt className="text-xl opacity-75" />
                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-4 text-xs font-medium text-white group-hover:visible">
                  Dashboard
                </span>
              </NavLink>
            </div>

            <ul className="space-y-1 border-t border-gray-100 pt-4">
              <li>
                <NavLink
                  to="/habit-tracker"
                  className="group relative flex z-50 justify-center rounded px-2 py-4 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <MdEventRepeat className="text-xl opacity-75" />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-4 text-xs font-medium text-white group-hover:visible">
                    Habit Tracker
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/task-list"
                  className="group relative flex z-50  justify-center rounded px-2 py-4 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <FaClipboardList className="text-xl opacity-75" />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-4 text-xs font-medium text-white group-hover:visible">
                    Task List
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/select-date"
                  className="group relative flex z-50  justify-center rounded px-2 py-4 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <FaRegCalendarAlt className="text-xl opacity-75" />

                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-4 text-xs font-medium text-white group-hover:visible">
                    Select Date
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/task-timer"
                  className="group relative flex z-50  justify-center rounded px-2 py-4 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <FaRegClock className="text-xl opacity-75" />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-4 text-xs font-medium text-white group-hover:visible">
                    Task Timer
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sticky-notes"
                  className="group relative flex z-50  justify-center rounded px-2 py-4 text-gray-900 hover:bg-gray-50 hover:text-gray-700"
                >
                  <CiStickyNote className="text-xl opacity-75" />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-4 text-xs font-medium text-white group-hover:visible">
                    Sticky Notes
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/note-book"
                  className="group relative flex z-50  justify-center rounded px-2 py-4 text-gray-900 hover:bg-gray-50 hover:text-gray-700"
                >
                  <LuNotebookPen className="text-xl opacity-75" />
                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-4 text-xs font-medium text-white group-hover:visible">
                    Note Book
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
