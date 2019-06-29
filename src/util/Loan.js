import API from './Api';

var data = [
  { lid: 'K7', branch: '合肥东支行', loan: 12000, time: 6 },
  { lid: 'K8', branch: '合肥西支行', loan: 12000, time: 6 },
  { lid: 'K9', branch: '合肥南支行', loan: 12000, time: 6 },
  { lid: 'K6', branch: '合肥北支行', loan: 12000, time: 6 },
];

const cityList = [
  "合肥",
  "北京",
  "上海"];

class Branch {
  constructor() {
    this.data = data;
  }

  getLoan = () => {
    // 每次只顺序返回count个，count由程序员初始化时设置
    // 还应该返回各种错误：已经全部返回，数据库错误等
    return this.data;
  }

  addLoan = (branches) => {
    // 输入：要添加的支行  list[obj]
    // 功能：添加元组到数据库，
    // 返回错误：数据库方面的错误
    this.data = [branches].concat(this.data);
  }

  changeLoan = (oldKey, newBranch) => {
    // 输入：修改多的新信息 obj
    // 操作：更新，首先检查key是不是新的
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].tid === oldKey) {
        this.data[i] = newBranch;
        break;
      }
    }
  }

  searchLoan = (name, assets, city) => {
    // 对数据进行查询，
    return [
      { lid: 'K7', branch: '合肥东支行', loan: 12000, time: 6 },
      { lid: 'K8', branch: '合肥西支行', loan: 12000, time: 6 },
      { lid: 'K9', branch: '合肥南支行', loan: 12000, time: 6 },
      { lid: 'K6', branch: '合肥北支行', loan: 12000, time: 6 },
    ];
  }

  deleteLoan = (name) => {
    // 删除主键为name的元组
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].name === name) {
        this.data.splice(i, 1);
        this.sum--;
        break;
      }
    }
  }
}

export default Branch;