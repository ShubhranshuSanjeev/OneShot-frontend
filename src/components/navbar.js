import React from "react";
import { Link } from "react-router-dom";

import { AppBar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    backdropFilter: "blur(6px)",
    paddingLeft: "30px",
    boxShadow: "none",
  },
  logo: {
    fontFamily: "Special Elite",
    color: "rgb(0, 171, 85)",
    fontSize: "2rem",
  },
  link: {
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navbar}>
        <Link to="/" className={classes.link}>
          <p className={classes.logo}>CollegeDash</p>
        </Link>
      </AppBar>
    </div>
  );
};

export default Navbar;
