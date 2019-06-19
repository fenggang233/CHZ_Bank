var data = [
  { name: 'CHZ Branch 肥科支行1', city: '合肥', assets: 12000, type: 'RMB' },
  { name: 'CHZ Branch 皇城支行1', city: '北京', assets: 18000, type: 'RMB' },
  { name: 'CHZ Branch 魔都支行1', city: '上海', assets: 20000, type: 'USD' },
  { name: 'CHZ Branch 肥科支行2', city: '合肥', assets: 12000, type: 'RMB' },
  { name: 'CHZ Branch 皇城支行2', city: '北京', assets: 18000, type: 'RMB' },
  { name: 'CHZ Branch 魔都支行2', city: '上海', assets: 20000, type: 'USD' },
  { name: 'CHZ Branch 肥科支行3', city: '合肥', assets: 12000, type: 'RMB' },
  { name: 'CHZ Branch 皇城支行3', city: '北京', assets: 18000, type: 'RMB' },
  { name: 'CHZ Branch 魔都支行3', city: '上海', assets: 20000, type: 'USD' },
];

class Branch{
  constructor(props){
    if (props === null){
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

  getBranches = () => {
    // 每次只顺序返回count个，count由程序员初始化时设置
    // 还应该返回各种错误：已经全部返回，数据库错误等
    var data = this.data.slice(this.props.sum, this.props.sum + this.props.count);
    this.props.sum = this.props.sum + this.props.count;
    return data;
  }

  addBranch = (branches) => {
    // 输入：要添加的支行  list[obj]
    // 功能：添加元组到数据库，
    // 返回错误：数据库方面的错误
    this.data = branches.concat(this.data);
    this.props.sum += branches.lenght;
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

  searchBranch = (keys) => {
    // 对数据进行查询，
  }

}

export default Branch;