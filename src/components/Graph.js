
import { Chart } from 'chart.js/auto';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import { UserContext } from '../UserContext';

const Graph = ({ convertToMonthYear }) =>{
    const { budget_details, setbudget_details } = useContext(UserContext);
    // function convertToMonthYear(date) {
    //     const [year, month] = date.split('-');
    //     const months = [
    //       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    //     ];
    //     return months[parseInt(month) - 1] + ' ' + year;
    //   }
    
      const months = Object.keys(budget_details).filter(key => /^\d{4}-\d{2}$/.test(key));
      const categories = ['income', 'expenses', 'savings'];
      const data = {};

      categories.forEach(category => {
        data[category] = months.map(month => budget_details[month][category]);
      });

        const chartRef = useRef(null); 

        useEffect(() => {
          const ctx = document.getElementById('barChart')?.getContext('2d');
          // const chartOptions = {
          //   scales: {
          //     x: {
          //       beginAtZero: true,
          //       ticks: {
          //         font: {
          //           size: 19, // Adjust the font size as needed
          //         },
          //       },
          //     },
          //     y: {
          //       beginAtZero: true,
          //     },
          //   },
          // };
          const chartOptions = {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 16, // Adjust the font size as needed
                  },
                },
              },
            },
          };
          if (chartRef.current) {
            chartRef.current.destroy();
          }
      
          if (ctx) {
            chartRef.current = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: months.map(convertToMonthYear),
                datasets: categories.map(category => ({
                  label: category.charAt(0).toUpperCase() + category.slice(1),
                  data: data[category],
                  backgroundColor: getCategoryColor(category),
                })),
              },
              options: chartOptions,
            });
          }
        }, [budget_details, months]);

      function getCategoryColor(category) {
        switch (category) {
          case 'income':
            return 'rgb(66, 189, 189)';
          case 'expenses':
            return 'rgb(255, 153, 175)';
          case 'savings':
            return 'rgb(23, 148, 232)';
          default:
            return 'rgba(0, 0, 0, 0.6)';
        }
      }
    return(
        <div id="graphh">
            {(budget_details.selectedmonth !== null && budget_details.selectedmonth !== undefined && budget_details[budget_details.selectedmonth].selectedsource !== null) ? 
            
            <canvas id="barChart" style={{height: "162px !important",width:"325px !important"}}></canvas>
            :
            <></>
            }
        </div>
    )
}

export default Graph; 
