import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import posthog from "posthog-js";

import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";

import StatesChart from "./states-chart";
import CourseChart from "./course-chart";
import CollegeTable from "./college-table";
import { fetchColleges } from "../redux/actions/colleges/colleges.actions";

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, 
                rgb(145 158 171 / 24%) 0px 16px 32px -4px`,
    borderRadius: "16px",
    padding: "20px",
  },
  statsContainer: {
    padding: "20px",
  },
  margins: {
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

const Dashboard = ({ colleges, fetchColleges }) => {
  posthog.capture('$pageview');

  const [state, setState] = useState({
    collegesAggregatedByState: {},
    collegesCountByState: {},
    collegesAggregatedByCourse: {},
    collegesCountByCourse: {},

    isSelectedItemState: false,
    isSelectedItemCourse: false,
    selectedState: "",
    selectedCourse: "",
  });
  const classes = useStyles();

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    let collegesAggregatedByState = {},
      collegesCountByState = {};
    colleges.forEach((college) => {
      if (collegesAggregatedByState.hasOwnProperty(college.state)) {
        collegesAggregatedByState[college.state].push(college);
        ++collegesCountByState[college.state];
      } else {
        collegesAggregatedByState[college.state] = [college];
        collegesCountByState[college.state] = 1;
      }
    });

    let collegesAggregatedByCourse = {},
      collegesCountByCourse = {};
    colleges.forEach((college) => {
      const courses = college.courses;

      courses.forEach((course) => {
        if (collegesAggregatedByCourse.hasOwnProperty(course)) {
          collegesAggregatedByCourse[course].push(college);
          ++collegesCountByCourse[course];
        } else {
          collegesAggregatedByCourse[course] = [college];
          collegesCountByCourse[course] = 1;
        }
      });
    });

    setState({
      ...state,
      collegesAggregatedByState,
      collegesCountByState,
      collegesAggregatedByCourse,
      collegesCountByCourse,
    });
  }, [colleges]);

  const handleOnClickStateChart = (stateName) => {
    console.log(stateName);
    let isSelectedItemState = true,
      isSelectedItemCourse = false,
      selectedState = stateName,
      selectedCourse = "";

    setState({
      ...state,
      isSelectedItemCourse,
      isSelectedItemState,
      selectedCourse,
      selectedState,
    });
  };

  const handleOnClickCourseChart = (courseName) => {
    console.log(courseName);
    let isSelectedItemState = false,
      isSelectedItemCourse = true,
      selectedState = "",
      selectedCourse = courseName;

    setState({
      ...state,
      isSelectedItemCourse,
      isSelectedItemState,
      selectedCourse,
      selectedState,
    });
  };

  let tableData = colleges,
    tableText = "List of Colleges";
  console.log(state);
  if (state.selectedCourse !== "") {
    tableData = state.collegesAggregatedByCourse[state.selectedCourse];
    tableText = `Colleges offering ${state.selectedCourse}`;
  } else if (state.selectedState !== "") {
    tableData = state.collegesAggregatedByState[state.selectedState];
    tableText = `Colleges in ${state.selectedState}`;
  }

  return (
    <Grid container p={3}>
      <Grid item container xs={12} justifyContent="space-around">
        <Grid item xs={11} sm={5} md={2} className={classes.margins}>
          <Paper
            elevation={0}
            className={classes.statsContainer}
            style={{ backgroundColor: "rgb(200, 250, 205)" }}
          >
            <Typography variant="subtitle1" align="center">
              7
            </Typography>
            <Typography variant="subtitle2" align="center">
              States
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={11} sm={5} md={2} className={classes.margins}>
          <Paper
            elevation={0}
            className={classes.statsContainer}
            style={{ backgroundColor: "rgb(208, 242, 255)" }}
          >
            <Typography variant="subtitle1" align="center">
              100
            </Typography>
            <Typography variant="subtitle2" align="center">
              Colleges
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={11} sm={5} md={2} className={classes.margins}>
          <Paper
            elevation={0}
            className={classes.statsContainer}
            style={{ backgroundColor: "rgb(255, 247, 205)" }}
          >
            <Typography variant="subtitle1" align="center">
              18
            </Typography>
            <Typography variant="subtitle2" align="center">
              Courses
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={11} sm={5} md={2} className={classes.margins}>
          <Paper
            elevation={0}
            className={classes.statsContainer}
            style={{ backgroundColor: "rgb(255, 231, 217)" }}
          >
            <Typography variant="subtitle1" align="center">
              10k
            </Typography>
            <Typography variant="subtitle2" align="center">
              Students
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} justifyContent="space-around">
        <Grid item xs={11} md={5} className={classes.margins}>
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.chartContainer}>
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6">Colleges in States</Typography>
                </Grid>
                <Grid item xs={12}>
                  <StatesChart
                    onClick={handleOnClickStateChart}
                    collegesCountByState={state.collegesCountByState}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={11} md={5} className={classes.margins}>
          <Grid item xs={12}>
            <Paper elevation={1} className={classes.chartContainer}>
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6">Colleges by Course</Typography>
                </Grid>
                <Grid item xs={12}>
                  <CourseChart
                    onClick={handleOnClickCourseChart}
                    collegesCountByCourse={state.collegesCountByCourse}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        justifyContent="center"
        className={classes.margins}
      >
        <Grid item container xs={11} md={11}>
          <CollegeTable data={tableData} text={tableText} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { colleges } = state.colleges;
  return {
    colleges: [...Object.values(colleges)],
  };
};

const mapDispatchToProps = {
  fetchColleges,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
