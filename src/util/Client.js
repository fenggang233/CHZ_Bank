var data = [
  { id: '1234567789', phone: '1234576788', name: '张三', addr: '火星', rname: 'jack', rphone: '201808', remail: 'char@ms.com', rr: '父子' },
  { id: '1234567789', phone: '1234576788', name: '例三', addr: '地球', rname: 'jack', rphone: '201808', remail: 'char@ms.com', rr: '父子' },
  { id: '1234567789', phone: '1234576788', name: '猪头', addr: '火星', rname: 'jack', rphone: '201808', remail: 'char@ms.com', rr: '父子' },
];

class Client {
  constructor(props) {
    if (props === null) {
      this.props = props
    } else {
      this.props = {
        count: 3,
      }
    }
    this.props = {
      ...this.props,
      sum: 0
    }
    this.data = data;
  }

  getClient = () => {
    // 每次只顺序返回count个，count由程序员初始化时设置
    // 还应该返回各种错误：已经全部返回，数据库错误等
    var data = this.data.slice(this.props.sum, this.props.sum + this.props.count);
    this.props.sum = this.props.sum + this.props.count;
    return data;
  }

  addClient = (emplyee) => {
    // 输入：要添加的支行  list[obj]
    // 功能：添加元组到数据库，
    // 返回错误：数据库方面的错误
    this.data = [emplyee].concat(this.data);
    this.props.sum += 1;
  }

  changeClient = (oldKey, newClient) => {
    // 输入：修改多的新信息 obj
    // 操作：更新，首先检查key是不是新的
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id === oldKey) {
        this.data[i] = newClient;
        break;
      }
    }
  }

  searchClient = (keys) => {
    // 对数据进行查询，
    this.data = [
      { id: '1234567789', phone: '1234576788', name: '张三?', addr: '火星', rname: 'jack', rphone: '201808', remail: 'char@ms.com', rr: '父子' },
      { id: '1234567789', phone: '1234576788', name: '例三?', addr: '火星', rname: 'jack', rphone: '201808', remail: 'char@ms.com', rr: '父子' },
      { id: '1234567789', phone: '1234576788', name: '猪头?', addr: '火星', rname: 'jack', rphone: '201808', remail: 'char@ms.com', rr: '父子' },
    ];
    return this.data;
  }

  deleteClient = (id) => {
    // 删除主键为name的元组
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        this.data.splice(i, 1);
        this.sum--;
        break;
      }
    }
  }

  genCityList = () => {
    // 相当于一个查询，返回所有城市就行了
    return ['合肥', '上海', '天津', '太原', '武汉', '长沙', '成都', '重庆', '郑州', '香港', '台湾', '广州', '辽宁'];
  }

  genCountByCity = () => {
    return [30, 40, 45, 50, 49, 60, 70, 91, 40, 45, 50, 49];
  }

  getEmplyeeStatByCity = () => {
    // 统计不同城市的资产
    return {
      'option': {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: this.genCityList()
        }
      },
      'series': [
        {
          name: "职工数",
          data: this.genCountByCity()
        }
      ]
    }
  }

  getEmplyeeStatByPos = () => {
    return {
      series: [44, 55],
      labels: ['员工', '经理']
    }
  }
}

export default Client;