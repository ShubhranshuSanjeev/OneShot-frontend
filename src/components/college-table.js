import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    boxShadow: `rgb(145 158 171 / 24%) 0px 0px 2px 0px, 
                rgb(145 158 171 / 24%) 0px 16px 32px -4px`,
    borderRadius: "16px",
    padding: "20px",
  },
}));

const CollegeTable = ({ data, text }) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Grid item container xs={12} direction="column">
        <Grid item xs={12} style={{ margin: "10px 0" }}>
          <Typography variant="body1" align="center">
            {text}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">College</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">City</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">State</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">Country</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data ? (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <Link to={`/colleges/${row._id}`}>{row.name}</Link>
                      </TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.state}</TableCell>
                      <TableCell align="right">{row.country}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <></>
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
      />
    </TableContainer>
  );
};

export default CollegeTable;
