import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'; // Make sure axios is imported

const StockChart = ({ machineName }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Available Spare Part Stock',
        data: [],
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
  });

  useEffect(() => {
    const getSparePartModelListData = async () => {
      const token = localStorage.getItem("token");
      const url = localStorage.getItem('url');
      console.log("Fetching spare part model list...");
      console.log(url);
      console.log(token);

      try {
        const response = await axios.post(`${url}/Maintenance/GetStockByMachine`, { MachineName: machineName.label }, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        });

        if (response.status === 200 && Array.isArray(response.data)) {
          const sparePartModels = response.data.map(part => ({
            value: part.Spare_Part_Id,
            label: part.SpareNumber,
            SparePartName: part.SparePartName,
            Available_Stock: part.Available_Stock
          }));

          // Update chart data
          setChartData({
            labels: sparePartModels.map(part => part.SparePartName),
            datasets: [
              {
                ...chartData.datasets[0],
                data: sparePartModels.map(part => part.Available_Stock),
              },
            ],
          });
        } else {
          console.error('Unexpected response:', response);
        }
      } catch (error) {
        console.error('Error fetching spare part model list:', error.message);
        console.error(error); // Log the full error object
      }
    };
    getSparePartModelListData();

    // if (machineName) {
    //   getSparePartModelListData(machineName.label); // Assuming machineName is an object with a `label` property
    // }
  }, [machineName]); // Re-run effect when machineName changes

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
