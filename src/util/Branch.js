import API from './Api';

var data = [
  { name: 'Branch1', city: '合肥', assets: 12000, type: 'RMB' },
  { name: 'Branch2', city: '北京', assets: 18000, type: 'RMB' },


  { name: 'CHZ Branch 魔都支行1', city: '上海', assets: 20000, type: 'USD' },
  { name: 'CHZ Branch 肥科支行2', city: '合肥', assets: 12000, type: 'RMB' },
  { name: 'CHZ Branch 皇城支行2', city: '北京', assets: 18000, type: 'RMB' },
  { name: 'CHZ Branch 魔都支行2', city: '上海', assets: 20000, type: 'USD' },
  { name: 'CHZ Branch 肥科支行3', city: '合肥', assets: 12000, type: 'RMB' },
  { name: 'CHZ Branch 皇城支行3', city: '北京', assets: 18000, type: 'RMB' },
  { name: 'CHZ Branch 魔都支行3', city: '上海', assets: 20000, type: 'USD' },
];

const cityList = [
  "合肥",
  "北京",
  "上海"];

  
class Branch{
  constructor(){
    this.data = data;
  }

  getBranches = () => {
    // 每次只顺序返回count个，count由程序员初始化时设置
    // 还应该返回各种错误：已经全部返回，数据库错误等
    API.GET('branch', ((data) => {this.data = data}));
    return this.data;
  }

  addBranch = (branches) => {
    // 输入：要添加的支行  list[obj]
    // 功能：添加元组到数据库，
    // 返回错误：数据库方面的错误
    this.data = [ branches ].concat(this.data);
    this.props.sum += 1;
  }

  changeBranch = (oldKey, newBranch) => {
    // 输入：修改多的新信息 obj
    // 操作：更新，首先检查key是不是新的
    for(var i = 0; i < this.data.length; i++){
      if (this.data[i].name === oldKey){
        this.data[i] = newBranch;
        break;
      }
    }
  }

  searchBranch = (name, assets, city) => {
    // 对数据进行查询，
    return [
      { name: '肥科支行3', city: '合肥', assets: 12000, type: 'RMB' },
      { name: '哈哈支行3', city: '北京', assets: 18000, type: 'RMB' },
      { name: '魔都支行3', city: '上海', assets: 20000, type: 'USD' },
    ]
  }

  deleteBranch = (name) => {
    // 删除主键为name的元组
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].name === name) {
        this.data.splice(i, 1);
        this.sum--;
        break;
      }
    }
  }

  genCityList = () => {
    // 相当于一个查询，返回所有城市就行了
    return cityList;
  }

  getAssetsStatByCity = () => {
    // 统计不同城市的资产
    return {
      series: [44, 55, 13, 33],
      labels: ['合肥', '北京', '上海', '深圳'],
      max: {city: '北京', assets: 55},
      min: {city: '上海', assets: 13},
      sum: 233
    }
  }
}

export default Branch;