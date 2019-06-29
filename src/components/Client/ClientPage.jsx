import React, { Component } from 'react';
import { Icon, Divider, List, Avatar, Popconfirm, Skeleton, Button, Tooltip, Modal } from 'antd';
import Chart from "react-apexcharts";

import './index.css';
import logo from "../../assets/logo.svg";
import logoNameB from "../../assets/logo-name-black.svg";

import Client from '../../util/Client';
import SearchPage from './SearchPage';
import AddPage from './AddPage';
import EditPage from './EditPage';

let colors = [
  '#ED6D79',
  '#F3BC5D',
  '#7CE2A9',
  '#579EF3',
  '#8577CF',
]

var options = {
  chart: {
    height: 350,
    type: 'bar',
    stacked: true,
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  series: [{
    name: 'Marine Sprite',
    data: [44, 55, 41, 37, 22, 43, 21]
  }, {
    name: 'Striking Calf',
    data: [53, 32, 33, 52, 13, 43, 32]
  }, {
    name: 'Tank Picture',
    data: [12, 17, 11, 9, 15, 11, 20]
  }, {
    name: 'Bucket Slope',
    data: [9, 7, 5, 8, 6, 9, 4]
  }, {
    name: 'Reborn Kid',
    data: [25, 12, 19, 32, 25, 24, 10]
  }],
  title: {
    text: ''
  },
  xaxis: {
    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
    labels: {
      formatter: function (val) {
        return val + "K"
      }
    }
  },
  yaxis: {
    title: {
      text: undefined
    },

  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + "K"
      }
    }
  },
  fill: {
    opacity: 1

  },

  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40
  }
}

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

const Logo = (
  <div className="logo-mini">
    <img alt='logo' className="logo-svg-mini" src={logo} />
    <img alt='logo-name'
      className="logo-name-svg-mini"
      src={logoNameB} />
  </div>
);

const client = new Client();

class ClientPage extends Component {
  state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003]
      }
    },
    series: [
      {
        name: "¥/$",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 40, 45, 50, 49]
      }
    ],
    initLoading: true,
    loading: false,
    addVisible: false,
    editVisible: false,
    count: 3,
    list: [],
  };

  componentDidMount() {
    this.setState({
      initLoading: false,
      list: client.getClient()
    })
  }

  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  handleAddCancel = () => {
    this.setState({
      addVisible: false
    });
  };

  handleEditCancel = () => {
    this.setState({
      editVisible: false,
    });
  };

  onUpdate = (newClient) => {
    client.addClient(newClient);
    this.setState({
      list: this.state.list.concat(newClient),
    })
  }

  onChange = (newInfo) => {
    var { list, oldIndex, oldId } = this.state;
    client.changeClient(oldId, newInfo);
    list[oldIndex] = newInfo;
    this.setState({
      list: list
    })
  }

  onSearch = (keys) => {
    this.setState({
      list: client.searchClient(keys)
    })
  }

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.list.concat([...new Array(this.state.count)].map(() => ({
        loading: true,
        name: {}
      }))),
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        list: this.state.list.slice(0,
          this.state.list.length - this.state.count)
          .concat(client.getEmplyee()),
      });
    }, 500);
  };

  handleEditCancel = () => {
    this.setState({
      editVisible: false,
    });
  };

  handleDelete = (item, index) => {
    var l = this.state.list;
    l.splice(index, 1);
    this.setState({
      list: l
    })
    client.deleteClient(item.id);
  }

  handleEdit = (item, index) => {
    console.log(item);
    this.setState({
      editVisible: true,
      oldInfo: JSON.stringify(item),
      oldIndex: index,
      oldId: item.id
    });
  };

  render() {
    const { initLoading, loading, list, addVisible, editVisible } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }} >
          <Button type="primary" onClick={this.showAddModal} icon="plus-circle" style={{ margin: 5 }}>
            添加
          </Button>
          <Button onClick={this.onLoadMore} icon="sync" style={{ margin: 5 }}>
            刷新
          </Button>
        </div>
      ) : null;

    return (
      <div className="root-page" id="client-page">
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
        <List
          header={
            <div>
              <h3>CHZ Bank 客户列表</h3>
              <Divider />
              <SearchPage onSearch={this.onSearch} />
            </div>
          }
          className="list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item, i) => (
            <List.Item actions={[
              <Popconfirm placement="top" title={"确定编辑？"}
                onConfirm={this.handleEdit.bind(this, item, i)}
                okText="确定" cancelText="取消">
                <Icon className="func-icon" type="edit" />
              </Popconfirm>,
              <Popconfirm placement="top" title={"确定删除？"}
                onConfirm={this.handleDelete.bind(this, item, i)}
                okText="确定" cancelText="取消">
                <Icon className="func-icon" type="delete" />
              </Popconfirm>,
            ]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ backgroundColor: '#f5f5f5' }}>
                      <Icon type="bank" style={{ fontSize: 18 }}
                        theme="twoTone"
                        twoToneColor={colors[i % 5]} />
                    </Avatar>
                  }
                  title={item.name}
                />
                <div style={{ display: 'flex' }}>
                  <div className="client-tab">
                    <Tooltip title="身份证">
                      <Icon type="idcard" theme="twoTone" className="client-tab-icon" />{item.id}
                    </Tooltip>
                  </div>
                  <div className="client-tab">
                    <Tooltip title="联系电话">
                      <Icon type="phone" theme="twoTone" className="client-tab-icon" />{item.phone}
                    </Tooltip>
                  </div>
                  <div className="client-tab">
                    <Tooltip title="家庭住址">
                      <Icon type="home" theme="twoTone" className="client-tab-icon" />{item.addr}
                    </Tooltip>
                  </div>
                  <div className="client-tab">
                    <Tooltip title={<div>
                      <div>
                        <Icon type="user" className="client-tab-icon" />{item.rname}
                      </div>
                      <div>
                        <Icon type="phone" className="client-tab-icon" />{item.rphone}
                      </div>
                      <div>
                        <Icon type="mail" className="client-tab-icon" />{item.remail}
                      </div>
                      <div>
                        <Icon type="usergroup-add" className="client-tab-icon" />{item.rr}
                      </div>
                    </div>}>
                      <Icon type="contacts" theme="twoTone" className="client-tab-icon" />联系人信息
                    </Tooltip>
                  </div>
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
        <Modal
          visible={addVisible} title={Logo} footer={null}
          onCancel={this.handleAddCancel} style={{ position: "relative", zIndex: 9999 }} >
          <AddPage onUpdate={this.onUpdate} />
        </Modal>
        <Modal
          visible={editVisible} title={Logo} footer={null}
          onCancel={this.handleEditCancel} style={{ position: "relative", zIndex: 9999 }} >
          <EditPage oldInfo={this.state.oldInfo} onChange={this.onChange} />
        </Modal>
      </div>
    )
  }
}

export default ClientPage;