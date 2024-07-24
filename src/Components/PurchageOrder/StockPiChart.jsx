import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // This will automatically register all components

const StockPiChart = () => {
  const data = [
    { StockName: "Stringer", AvailableStock: 3000 },
    { StockName: "Stringer1", AvailableStock: 500 },
    { StockName: "Stringer2", AvailableStock: 900 },
    { StockName: "Stringer3", AvailableStock: 700 },
    { StockName: "Stringer4", AvailableStock: 310 },
    { StockName: "Stringer5", AvailableStock: 205 },
  ];

  const chartData = {
    labels: data.map(item => item.StockName),
    datasets: [
      {
        label: 'Available Spare Part Stock',
        data: data.map(item => item.AvailableStock),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top', // Position of the legend
        labels: {
          color: '#333', // Color of legend labels
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default StockPiChart;