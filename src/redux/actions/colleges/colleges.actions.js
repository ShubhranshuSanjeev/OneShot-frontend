import axios from "../../../axios";

import {
  FETCH_COLLEGE,
  FETCH_COLLEGES,
  FETCH_SIMILAR_COLLEGES,
} from "./colleges.types";

export const fetchColleges = () => async (dispatch) => {
  try {
    const res = await axios.get("/colleges");
    const payload = res.data.colleges;

    dispatch({ type: FETCH_COLLEGES, payload });
  } catch (err) {
    console.log(err);
  }
};

export const fetchCollege = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/colleges?id=${id}`);
    const payload = res.data.college;

    dispatch({ type: FETCH_COLLEGE, payload });
  } catch (err) {
    console.log(err);
  }
};

export const fetchSimilarColleges = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/colleges?id=${id}&getSimilar=true`);
    const payload = res.data.similarColleges;

    dispatch({ type: FETCH_SIMILAR_COLLEGES, payload });
  } catch (err) {
    console.log(err);
  }
};
