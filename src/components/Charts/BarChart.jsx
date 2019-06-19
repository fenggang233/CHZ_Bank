import React, { Component } from 'react';
import Chart from "react-apexcharts";

import './index.css';

const donut_option = {
  chart: {
    type: 'donut'
  },
  series: [44, 55, 13, 33],
  labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
}

const radar_option = {
  series: [
    {
      name: "$",
      data: [45, 52, 38, 24, 33, 10]
    },
    {
      name: "¥",
      data: [26, 21, 20, 6, 8, 15]
    }
  ],
  labels: ['April', 'May', 'June', 'July', 'August', 'September'],
}

var mixed_option = {
  series: [67, 84, 97, 61],
  plotOptions: {
    radialBar: {
      dataLabels: {
        total: {
          show: true,
          label: 'TOTAL'
        }
      }
    }
  },
  labels: ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D']
};

var multi_option = {
  stroke: {
    width: [0, 2, 5],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  colors: ['#3A5794', '#A5C351', '#E14A84'],
  series: [{
    name: 'Facebook',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  }, {
    name: 'Vine',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  }, {
    name: 'Dribbble',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }],
  fill: {
    opacity: [0.85, 0.25, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " views";
        }
        return y;

      }
    }
  },
  legend: {
    labels: {
      useSeriesColors: true
    },
    markers: {
      customHTML: [
        function () {
          return '✺'
        }, function () {
          return '✿'
        }, function () {
          return '❁'
        }
      ]
    }
  }
}


class BarChart extends Component{
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

  render(){
    return(
      <div className="mixed-chart">
        <Chart
          className="chart"
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="500"
        />
        <Chart
          className="chart"
          options={this.state.options}
          series={this.state.series}
          type="line"
          width="500"
        />
        <Chart
          className="chart"
          options={donut_option}
          series={donut_option.series}
          type="donut"
          width="500"
        />
        <Chart
          className="chart"
          options={radar_option}
          series={radar_option.series}
          type="radar"
          width="500"
        />
        <Chart
          className="chart"
          options={mixed_option}
          series={mixed_option.series}
          type="radialBar"
          width="500"
        />
        <Chart
          className="chart"
          options={multi_option}
          series={multi_option.series}
          type="line"
          width="500"
        />
      </div>
    )
  }
}

export default BarChart;