import React, { Component } from 'react';
import Chart from "react-apexcharts";
import { Divider } from 'antd';

import SearchPage from './SearchPage';

import './index.css';

var pie_options = {
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  series: [44, 55, 13, 43, 22],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
}

var options = {
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }],
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1

  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands"
      }
    }
  }
}


class BarChart extends Component {
  state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "¥/$",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };

  render() {
    return (
      <div className="root-page" id="client-page">
        <div className="client-card" style={{ marginBottom: 20 }}>
          <SearchPage />
        </div>
        <div className="client-top-card">
          <div className="client-card" style={{ width: "56%" }}>
            <Chart
              options={options}
              series={options.series}
              type="bar"
              width="600"
            />
          </div>
          <div className="emplyee-card" style={{ width: "42%" }}>
            <Chart
              options={pie_options}
              series={pie_options.series}
              type="pie"
              width="300"
            />
            <div style={{ marginLeft: 20, marginTop: 20 }}>
              <h3>CHZ Bank 客户分布情况</h3>
              <Divider />
              <p>共有客户多少</p>
              <p>某某支行客户最多，为233人</p>
              <p>某某支行客户最少，为0人</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BarChart;