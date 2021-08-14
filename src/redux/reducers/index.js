import { combineReducers } from "redux";
import colleges from "./colleges/colleges.reducer";
import students from "./students/students.reducer";

export default combineReducers({
  colleges,
  students,
});
