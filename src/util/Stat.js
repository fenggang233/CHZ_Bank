
// 统计1-12月份的借款账单数，储蓄账单数和开账户人数，需要按照不同的支行分开统计
// 请求的时候，传入参数：支行名(name)， 期望的返回如下所示：
const optionBar = {
  series : [{
      name: '支票账户数',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 43, 54, 12]
    }, {
      name: '储蓄账户数',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 54, 5, 77]
    }, {
      name: '贷款人数',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 12, 32, 45]
    }
  ]
}

var optionsByClientTemp = {
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['存储金额', '贷款金额'],
  series: [33, 15],
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
    name: '支票账户数',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 43, 54, 12]
  }, {
    name: '储蓄账户数',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 54, 5, 77]
  }, {
    name: '贷款人数',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 12, 32, 45]
  }
  ],
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

// 统计不同支行储蓄金额和贷款金额
// 输入：支行名(name), 返回数据如下
const optionPie = {
  labels : ['储蓄金额', '贷款金额'],
  series : [77, 55]
}

class Stat {
  getStatByAccount = (branch) => {
    return {
      ...optionsByAccountTemp,
      series: optionBar.series
    }
  }

  getStatByClient = (branch) => {
    return {
      ...optionsByClientTemp,
      series: optionPie.series,
      labels: optionPie.labels
    }
  }
}

export default Stat;