import {
  FETCH_COLLEGE,
  FETCH_COLLEGES,
  FETCH_SIMILAR_COLLEGES,
} from "../../actions/colleges/colleges.types";

const initialState = {
  colleges: {},
  similarColleges: {},
};

const collegeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_COLLEGES:
      const colleges = {};
      Object.values(payload).forEach((college) => {
        colleges[college._id] = college;
      });
      return { ...state, colleges: { ...colleges } };

    case FETCH_COLLEGE:
      const college = payload;
      return {
        ...state,
        colleges: { ...state.colleges, [college._id]: college },
      };

    case FETCH_SIMILAR_COLLEGES:
      const similarColleges = {};
      Object.values(payload).forEach((college) => {
        similarColleges[college._id] = college;
      });

      return {
        ...state,
        similarColleges: { ...similarColleges },
      };

    default:
      return state;
  }
};

export default collegeReducer;
