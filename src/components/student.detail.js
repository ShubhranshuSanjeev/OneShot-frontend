import React, { useEffect } from "react";
import { connect } from "react-redux";
import posthog from "posthog-js";

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

import { fetchStudent } from "../redux/actions/students/students.actions";

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
}));

const StudentDetail = ({ studentID, student, fetchStudent }) => {
  posthog.capture('$pageview');

  const classes = useStyles();

  useEffect(() => {
    fetchStudent(studentID);
  }, [studentID]);

  return (
    <Grid item container xs={12} justifyContent="center">
      <Grid item container xs={12} md={8}>
        <Paper
          elevation={1}
          className={`${classes.contentWrapper} ${classes.detailsWrapper}`}
        >
          <Grid container item xs={12} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                Student Details
              </Typography>
            </Grid>
            <Grid item container xs={10} style={{ marginTop: "30px" }}>
              <TableContainer>
                <Table>
                  <TableHead></TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableCell}>Name:</TableCell>
                      <TableCell className={classes.tableCell}>
                        {student ? student.name : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        Year of Batch:
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {student ? student.yearOfBatch : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        College:
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {student ? student.collegeID.name : ""}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableCell}>
                        Skills:
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {student ? student.skills.join(", ") : ""}
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
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.match.params.id);
  const studentID = ownProps.match.params.id;
  const student = state.students[studentID];

  return { studentID, student };
};

const mapDispatchToProps = {
  fetchStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetail);
