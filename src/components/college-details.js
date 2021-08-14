import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  Grid,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  makeStyles,
} from "@material-ui/core";

import {
  fetchCollege,
  fetchSimilarColleges,
} from "../redux/actions/colleges/colleges.actions";

import { fetchCollegeStudents } from "../redux/actions/students/students.actions";

import CollegeTable from "./college-table";
import StudentTable from "./student-table";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, 
                rgb(145 158 171 / 24%) 0px 16px 32px -4px`,
    borderRadius: "16px",
    padding: "40px 0",
    width: "100%",
  },
  detailsWrapper: {
    backgroundColor: "rgb(0, 123, 85)",
    color: "#fff",
  },
  tableCell: {
    color: "#fff",
    minWidth: 100,
  },
  margins: {
    marginTop: "15px",
    marginBottom: "15px" 
  }
}));

const CollegeDetails = ({
  collegeID,
  college,
  similarColleges,
  collegeStudents,
  fetchCollege,
  fetchSimilarColleges,
  fetchCollegeStudents,
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchCollege(collegeID);
    fetchSimilarColleges(collegeID);
    fetchCollegeStudents(collegeID);
  }, [collegeID]);

  return (
    <Grid container justifyContent="space-around">
      <Grid item container xs={12} justifyContent="center">
        <Grid item container xs={11} md={8}>
          <Paper
            elevation={1}
            className={`${classes.contentWrapper} ${classes.detailsWrapper}`}
          >
            <Grid container item xs={12} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  College Details
                </Typography>
              </Grid>
              <Grid item container xs={10} className={classes.margins}>
                <TableContainer>
                  <Table>
                    <TableHead></TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Name:
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {college ? college.name : ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Year Founded:
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {college ? college.yearFounded : ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          City:
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {college ? college.city : ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          State:
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {college ? college.state : ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Country:
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {college ? college.country : ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          Courses:
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {college ? college.courses.join(", ") : ""}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} justifyContent="space-around">
        <Grid
          item
          container
          xs={11}
          md={5}
          className={classes.margins}
        >
          <StudentTable data={collegeStudents} text={"List of Students"} />
        </Grid>
        <Grid
          item
          container
          xs={11}
          md={5}
          className={classes.margins}
        >
          <CollegeTable
            data={similarColleges}
            text={"List of Similar Colleges"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  const collegeID = ownProps.match.params.id;
  const college = state.colleges.colleges[collegeID];
  const similarColleges = Object.values(state.colleges.similarColleges);
  const collegeStudents = Object.values(state.students);

  return { collegeID, college, similarColleges, collegeStudents };
};

const mapDispatchToProps = {
  fetchCollege,
  fetchSimilarColleges,
  fetchCollegeStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollegeDetails);
