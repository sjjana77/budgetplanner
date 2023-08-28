
import { Chart } from 'chart.js/auto';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Graph = () =>{
    const { budget_details, setbudget_details } = useContext(UserContext);
    function convertToMonthYear(date) {
        const [year, month] = date.split('-');
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];
        return months[parseInt(month) - 1] + ' ' + year;
      }
    
      const months = Object.keys(budget_details).filter(key => /^\d{4}-\d{2}$/.test(key));
      const categories = ['income', 'expenses', 'savings'];
      const data = {};

      categories.forEach(category => {
        data[category] = months.map(month => budget_details[month][category]);
      });

        const chartRef = useRef(null); 

        useEffect(() => {
          const ctx = document.getElementById('barChart')?.getContext('2d');
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
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              },
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
            
            <canvas id="barChart" style={{height: "162px",width:"325px"}}></canvas>
            :
            <></>
            }
        </div>
    )
}

export default Graph;