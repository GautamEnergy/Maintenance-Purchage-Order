import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // This will automatically register all components

const StockChart = () => {
  const data = [
    { StockName: "Stringer", AvailableStock: 3000 },
    { StockName: "Stringer1", AvailableStock: 500 },
    { StockName: "Stringer2", AvailableStock: 2000 },
    { StockName: "Stringer3", AvailableStock: 700 },
    { StockName: "Stringer4", AvailableStock: 310 },
    { StockName: "Stringer5", AvailableStock: 205 },
    { StockName: "Stringer", AvailableStock: 2200 },
    { StockName: "Stringer1", AvailableStock: 500 },
    { StockName: "Stringer2", AvailableStock: 900 },
    { StockName: "Stringer3", AvailableStock: 700 },
    { StockName: "Stringer4", AvailableStock: 310 },
    { StockName: "Stringer5", AvailableStock: 205 },
    { StockName: "Stringer", AvailableStock: 2800 },
    { StockName: "Stringer1", AvailableStock: 500 },
    { StockName: "Stringer2", AvailableStock: 900 },
    { StockName: "Stringer3", AvailableStock: 700 },
    { StockName: "Stringer4", AvailableStock: 310 },
 
  ];

  const chartData = {
    labels: data.map(item => item.StockName),
    datasets: [
      {
        label: 'Available Spare Part Stock',
        data: data.map(item => item.AvailableStock),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(75, 192, 192, 1)', // Color of y-axis labels
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(75, 192, 192, 0.2)', // Color of y-axis grid lines
        },
      },
      x: {
        ticks: {
          color: 'rgba(75, 192, 192, 1)', // Color of x-axis labels
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(75, 192, 192, 0.2)', // Color of x-axis grid lines
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(75, 192, 192, 1)', // Color of legend labels
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StockChart;


