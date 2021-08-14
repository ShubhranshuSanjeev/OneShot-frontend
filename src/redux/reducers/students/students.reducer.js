import {
  FETCH_STUDENTS,
  FETCH_STUDENT,
} from "../../actions/students/students.types";

const INITIAL_STATE = {};

const studentReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_STUDENTS:
      const students = {};
      Object.values(payload).forEach((student) => {
        students[student._id] = student;
      });
      return { ...students };

    case FETCH_STUDENT:
      const student = payload;
      return { ...state, [student._id]: student };

    default:
      return state;
  }
};

export default studentReducer;
