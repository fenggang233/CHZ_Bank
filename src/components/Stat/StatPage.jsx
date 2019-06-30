import React, { Component } from 'react';
import Chart from "react-apexcharts";
import { Divider } from 'antd';

import SearchPage from './SearchPage';
import Stat from '../../util/Stat';
import API from '../../util/Api';

import './index.css';


var optionsByClientTemp = {
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['Team A', 'Team B'],
  series: [44, 55],
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

var optionsByAccountTemp = {
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

const stat = new Stat();

class BarChart extends Component {

  state = {
    branch: '',
    branchList: '',
    stat: stat,
    optionsByClient: {},
    optionsByAccount: {}
  }

  componentWillMount() {
    // get branch list
    this.setState({
      optionsByClient: optionsByClientTemp,
      optionsByAccount: optionsByAccountTemp
    })
  }

  onUpdate = (branch) => {
    API.GET('stat/balance/', data => {
      console.log(data)
      var x = optionsByClientTemp;
      x.series = data.series;
      x.labels = data.labels;
      this.setState({
        optionsByClient: x
      })
    }, {
      name: 'FirstBranch'
    })

    API.GET('stat/month/', data => {
      var x = optionsByAccountTemp;
      x.series = data.series;
      x.labels = data.labels;
      this.setState({
        optionsByAccount: x
      })
    }, {
      name: 'FirstBranch'
    })
  }

  render() {
    const { optionsByAccount, optionsByClient } = this.state;
    return (
      <div className="root-page" id="client-page">
        <div className="client-card" style={{ marginBottom: 20 }}>
          <SearchPage onUpdate={this.onUpdate} />
        </div>
        <div className="client-top-card">
          <div className="client-card" style={{ width: "56%" }}>
            <h3> 最近十个月用户数统计 </h3>
            <Chart
              options={ optionsByAccount }
              series={optionsByAccount.series}
              type="bar"
              width="600"
            />
          </div>
          <div className="emplyee-card" style={{ width: "42%" }}>
            <Chart
              options={optionsByClient}
              series={optionsByClient.series}
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
        <div className="client-top-card">
          <div className="client-card" style={{ width: "56%" }}>
            <h3> 最近一年金额统计 </h3>
            <Chart
              options={optionsByAccount}
              series={optionsByAccount.series}
              type="bar"
              width="600"
            />
          </div>
          <div className="emplyee-card" style={{ width: "42%" }}>
            <Chart
              options={optionsByClient}
              series={optionsByClient.series}
              type="pie"
              width="300"
            />
            <div style={{ marginLeft: 20, marginTop: 20 }}>
              <h3>CHZ Bank 金额分布情况</h3>
              <Divider />
              <p>共有金额多少</p>
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