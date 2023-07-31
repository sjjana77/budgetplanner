import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

const PieChartSource = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // If the Chart instance already exists, destroy it before creating a new one
      chartRef.current.destroy();
    }

    // Extract labels (source) and data (income) from the data array
    const labels = data.map(item => item.source);
    const incomes = data.map(item => item.income);

    // Create dynamic colors and background colors based on the number of data points
    const numberOfDataPoints = data.length;
    const colors = generateColors(numberOfDataPoints);
    const backgroundColors = generateBackgroundColors(colors);

    // Function to generate random colors
    function generateColors(count) {
      const colors = [];
      for (let i = 0; i < count; i++) {
        const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        colors.push(color);
      }
      return colors;
    }

    // Function to generate lighter background colors for better visibility of labels
    function generateBackgroundColors(colors) {
      return colors.map(color => {
        const rgbaColor = color.replace("rgb", "rgba").replace(")", ", 0.8)");
        return rgbaColor;
      });
    }

    // Create a new Chart instance for the pie chart
    const ctx = document.getElementById("myPieChartsource").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: incomes,
          backgroundColor: backgroundColors,
          borderColor: colors, // Border color same as background for a cleaner look
          borderWidth: 1, // Add border for better visibility of segments
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Income Distribution by Source',
        },
        plugins: {
          datalabels: {
            color: 'white', // Text color
            font: {
              size: 16, // Text size
            },
            formatter: (value, context) => { // Custom formatter to display text on each segment
              const label = context.chart.data.labels[context.dataIndex];
              const percentage = ((value / incomes.reduce((a, b) => a + b, 0)) * 100).toFixed(2); // Calculate percentage
              return label + ': $' + value + ' (' + percentage + '%)'; // Show both source, income, and percentage
            },
          },
        },
      },
    });
  }, [data]);

  return (
    <div>
      {/* This is the canvas element where the chart will be rendered */}
      <canvas id="myPieChartsource" width="400" height="400"></canvas>
    </div>
  );
};

export default PieChartSource;
