import React, { Component } from 'react';
import { Button, List, Avatar, Skeleton, Icon, Divider, Modal, Popconfirm } from 'antd';
import Chart from "react-apexcharts";

import SearchPage from './SearchPage';
import AddPage from './AddPage';
import EditPage from './EditPage';

import Branch from '../../util/Branch';

import './index.css';
import logo from "../../assets/logo.svg";
import logoNameB from "../../assets/logo-name-black.svg";

let colors = [
  '#ED6D79',
  '#F3BC5D',
  '#7CE2A9',
  '#579EF3',
  '#8577CF',
]

const Logo = (
  <div className="logo-mini">
    <img alt='logo' className="logo-svg-mini" src={logo} />
    <img alt='logo-name'
      className="logo-name-svg-mini"
      src={logoNameB} />
  </div>
);

const branch = new Branch();

class CollapsePage extends Component {
  state = {
    initLoading: true,
    loading: false,
    addVisible: false,
    editVisible: false,
    count: 3,
    list: [ ],
    searchResult: [],
    changedBranch: {},
    cityList: branch.genCityList(),
    donut_option: {
      chart: {
        type: 'donut'
      },
      series: [44],
      labels: ['合肥']
    },
    stat: {}
  };

  componentWillMount() {
    const stat = branch.getAssetsStatByCity(); 
    this.setState({
      list: branch.getBranches(),
      donut_option: {
        ...this.state.donut_option,
        series: stat.series,
        labels: stat.labels
      },
      stat: stat
    })
  }

  componentDidMount() {
    this.setState({
      initLoading: false
    })
  }

  onUpdate = (newBranch) => {
    branch.addBranch(newBranch);
    this.setState({
      list: this.state.list.concat(newBranch),
    })
  }

  onChange = (newInfo) => {
    var { list, changedBranch } = this.state;
    branch.changeBranch(changedBranch.name, newInfo);
    list[changedBranch.index] = newInfo;
    console.log(newInfo);
    this.setState({
      list: list
    })
  }

  onSearch = (keys) => {
    this.setState({
      searchResult: branch.searchBranch(keys)
    })
  }

  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  showEditModal = (name, index) => {
    this.setState({
      editVisible: true,
      changedBranch: {
        name: name,
        index: index
      }
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

  handleDeleteBranch = (name, index) => {
    var l = this.state.list;
    l.splice(index, 1);
    this.setState({
      list: l
    })
    branch.deleteBranch(name);
  }

  render() {
    const { initLoading, loading, list, addVisible, editVisible, searchResult } = this.state;
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
      <div id="branch-root-page" style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
        <List
          header={
            <h3>CHZ Bank 支行列表</h3>
          }
          className="branch-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item, i) => (
            <List.Item actions={[
              <Popconfirm placement="top" title={"确定编辑？"} 
                onConfirm={ this.showEditModal.bind(this, item.name, i) }
                okText="确定" cancelText="取消">
                <Icon className="func-icon" type="edit" />
              </Popconfirm>,
              <Popconfirm placement="top" title={"确定删除？"} 
                onConfirm={ this.handleDeleteBranch.bind(this, item.name, i) }
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
                  description={ item.city }
                />
                <div>{ item.assets }</div>
              </Skeleton>
            </List.Item>
          )}
        />
        <div>
          <div className="total-info">
            <Chart
              className="chart"
              options={this.state.donut_option}
              series={this.state.donut_option.series}
              type="donut"
              width="300"
            />
            <div style={{ marginLeft: 70 }}>
              <h3>CHZ Bank 支行资产统计</h3>    
              <Divider/>
              <p>总资产{this.state.stat.sum}</p>
              <p>{this.state.stat.max.city}资产最多，为{this.state.stat.max.assets}</p>
              <p>{this.state.stat.min.city}资产最少，为{this.state.stat.min.assets}</p>
            </div>
          </div>
          <List
            header={
              <div>
                <h3>CHZ Bank 支行查找</h3>
                <Divider/>
                <SearchPage onSearch={ this.onSearch } />
              </div>
            }
            className="branch-loan-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={searchResult}
            renderItem={(item, i) => (
              <List.Item actions={[
                <Popconfirm placement="top" title={"确定编辑？"}
                  onConfirm={this.showEditModal.bind(this, item.name, i)}
                  okText="确定" cancelText="取消">
                  <Icon className="func-icon" type="edit" />
                </Popconfirm>,
                <Popconfirm placement="top" title={"确定删除？"}
                  onConfirm={this.handleDeleteBranch.bind(this, item.name, i)}
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
                    description={item.city}
                  />
                  <div>{item.assets}</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
        <Modal
          visible={addVisible} title={Logo} footer={null}
          onCancel={this.handleAddCancel} style={{ position: "relative", zIndex: 9999 }} >
          <AddPage onUpdate={ this.onUpdate } />
        </Modal>
        <Modal
          visible={editVisible} title={Logo} footer={null}
          onCancel={this.handleEditCancel} style={{ position: "relative", zIndex: 9999 }} >
          <EditPage onChange={ this.onChange } />
        </Modal>
      </div>
    )
  }
}

export default CollapsePage;