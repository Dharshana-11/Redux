import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slice"; //default export imported with user-defined name
const store = configureStore({
  reducer: {
    //property of configureStore
    students: studentReducer, //reducer function of students slice is given as root reducer
  },
});
export default store;
