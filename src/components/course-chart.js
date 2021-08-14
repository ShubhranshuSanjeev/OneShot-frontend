import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const chartOptions = {
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
    },
    tooltip: {
      bodyColor: "#000",
      usePointStyle: true,
      backgroundColor: "#fff",
      bodyFont: {
        family: "Public Sans",
        weight: "bold",
        size: 13,
      },
      callbacks: {
        title: () => {
          return "";
        },
        label: (ctx) => {
          return `${ctx.label}: ${ctx.raw}`;
        },
      },
      padding: 10,
    },
  },
  scale: {
    y: {
      ticks: {
        color: "#000",
        font: {
          family: "Public Sans",
          weight: "bold",
        },
      },
    },
  },
  maintainAspectRatio: false,
};

const CourseChart = ({ collegesCountByCourse, onClick }) => {
  const [state, setState] = useState({
    data: [],
    labels: [],
    dataLength: 0,
  });

  useEffect(() => {
    if (collegesCountByCourse) {
      const labels = [...Object.keys(collegesCountByCourse)];
      const data = [...Object.values(collegesCountByCourse)];
      const dataLength = data.length;
      setState({ labels, data, dataLength });
    }
  }, [collegesCountByCourse]);

  const chartData = {
    labels: state.labels,
    datasets: [
      {
        data: state.data,
        backgroundColor: "rgba(0,171,85,1)",
        borderRadius: 10,
        maxBarThickness: 20,
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      widht={350}
      height={350}
      options={chartOptions}
      getElementAtEvent={(element, event) => {
        onClick(state.labels[element[0].index]);
      }}
    />
  );
};

export default CourseChart;
