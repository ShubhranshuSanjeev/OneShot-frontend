import axios from "../../../axios";

import { FETCH_STUDENT, FETCH_STUDENTS } from "./students.types";

export const fetchCollegeStudents = (collegeID) => async (dispatch) => {
  try {
    const res = await axios.get(`/students?collegeID=${collegeID}`);
    const payload = res.data.students;

    dispatch({ type: FETCH_STUDENTS, payload });
  } catch (err) {
    console.log(err);
  }
};

export const fetchStudent = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/students/${id}`);
    const payload = res.data.student;

    dispatch({ type: FETCH_STUDENT, payload });
  } catch (err) {
    console.log(err);
  }
};
