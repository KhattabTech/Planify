import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habitList: [],
};
const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      const newHabit = {
        name: action.payload,
        days: {
          Sat: false,
          Sun: false,
          Mon: false,
          Tue: false,
          Wed: false,
          Thu: false,
          Fri: false,
        },
      };
      state.habitList.push(newHabit);
    },
    toggleDay: (state, action) => {
      const { habitName, day } = action.payload;
      const habit = state.habitList.find((h) => h.name === habitName);
      if (habit) {
        habit.days[day] = !habit.days[day];
      }
    },
    deleteHabit: (state, action) => {
      state.habitList = state.habitList.filter(
        (habit) => habit.name !== action.payload
      );
    },
  },
});

export const { addHabit, toggleDay, deleteHabit } = habitSlice.actions;
export default habitSlice.reducer;
