import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

import { interpolateYlGnBu } from "d3-scale-chromatic";
import posthog from "posthog-js";

const COLOR_SCALE = interpolateYlGnBu;

const COLOR_RANGE_INFO = {
  colorStart: 0.1,
  colorEnd: 1,
  useEndAsStart: false,
};

function calculatePoint(i, intervalSize, colorRangeInfo) {
  let { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
  return useEndAsStart
    ? colorEnd - i * intervalSize
    : colorStart + i * intervalSize;
}

function interpolateColors(dataLength, colorScale, colorRangeInfo) {
  let { colorStart, colorEnd } = colorRangeInfo;
  let colorRange = colorEnd - colorStart;
  let intervalSize = colorRange / dataLength;
  let i, colorPoint;
  let colorArray = [];

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}

const COLORS = interpolateColors(7, COLOR_SCALE, COLOR_RANGE_INFO);

const chartOptions = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        usePointStyle: true,
        color: "#000",
        boxWidth: 20,
        boxHeight: 20,
        font: {
          family: "Public Sans",
          weight: "bold",
        },
      },
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
      padding: 10,
    },
    datalabels: {
      display: true,
      formatter: (val, ctx) => {
        return `${val}%`;
      },
      color: "#fff",
      anchor: "center",
      align: "center",
      font: {
        weight: "bold",
        family: "Public Sans",
      },
    },
  },
  maintainAspectRatio: false,
};

const StatesChart = ({ collegesCountByState, onClick }) => {
  const [state, setState] = useState({
    data: [],
    colors: [],
    labels: [],
    dataLength: 0,
  });

  useEffect(() => {
    if (collegesCountByState) {
      const labels = [...Object.keys(collegesCountByState)];
      const data = [...Object.values(collegesCountByState)];
      const dataLength = data.length;
      const colors = COLORS.slice(0, dataLength);
      setState({ labels, data, dataLength, colors });
    }
  }, [collegesCountByState]);

  const chartData = {
    labels: state.labels,
    datasets: [
      {
        label: "# of Colleges",
        data: state.data,
        backgroundColor: state.colors,
        borderWidth: 3,
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      width={350}
      height={350}
      options={chartOptions}
      getElementAtEvent={(element, event) => {
        posthog.capture(
          'state-chart-clicked', 
          { state: state.labels[element[0].index] }
        );
        onClick(state.labels[element[0].index]);
      }}
    />
  );
};

export default StatesChart;
