import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import CollegeDeatils from "./components/college-details";
import StudentDetail from "./components/student.detail";
import history from "./history";

function App() {
  Chart.register(ChartDataLabels);

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Navbar />
        <div style={{ width: "100%", height: "100px" }}></div>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/colleges/:id" exact component={CollegeDeatils} />
          <Route path="/students/:id" exact component={StudentDetail} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
