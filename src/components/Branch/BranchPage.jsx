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

const donut_option = {
  chart: {
    type: 'donut'
  },
  series: [44, 55, 13, 33],
  labels: ['合肥', '北京', '上海', '深圳']
}

const branch = new Branch();

class CollapsePage extends Component {
  state = {
    initLoading: true,
    loading: false,
    addVisible: false,
    editVisible: false,
    count: 3,
    list: [ ],
  };

  componentWillMount() {
    this.setState({
      list: branch.getBranches()
    })
  }

  componentDidMount() {
    this.setState({
      initLoading: false
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
    setTimeout(()=>{
      this.setState({
        loading: false,
        list: this.state.list.slice(0, 
          this.state.list.length - this.state.count)
          .concat(branch.getBranches()),
      });
    }, 500);
  };

  onUpdate = (branch) => {
    this.setState({
      list: this.state.list.concat(branch),      
    })
  }

  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  showEditModal = () => {
    this.setState({
      editVisible: true,
    });
  };

  handleAddCancel = () => {
    this.setState({
      addVisible: false
    });
  };

  handleEditCancel = () => {
    this.setState({
      editVisible: false
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
    const { initLoading, loading, list, loan, addVisible, editVisible } = this.state;
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
                onConfirm={ this.showEditModal }
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
                  title={<a href="https://ant.design">{item.name}</a>}
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
              options={donut_option}
              series={donut_option.series}
              type="donut"
              width="300"
            />
            <div style={{ marginLeft: 70 }}>
              <h3>CHZ Bank 支行资产统计</h3>    
              <Divider/>
              <p>总资产多少</p>
              <p>某某支行资产最多，占比34%</p>
              <p>某某支行资产最少，占比14%</p>
            </div>
          </div>
          <List
            header={
              <div>
                <h3>CHZ Bank 支行查找</h3>
                <Divider/>
                <SearchPage />
              </div>
            }
            className="branch-loan-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={loan}
            renderItem={(item, i) => (
            <List.Item actions={[<a href="www" >edit</a>, <a href="w">more</a>]}>
              <List.Item.Meta
                avatar={
                  <Avatar style={{ backgroundColor: '#f5f5f5' }}>
                    <Icon type="property-safety" style={{ fontSize: 18, paddingTop: 7 }}
                    theme="twoTone"
                    twoToneColor={colors[(i + 3) % 5]} />
                  </Avatar>
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.time}
              />                  
              <div>{item.assets}</div>
              </List.Item>
            )}
          />
        </div>
        <Modal
          visible={addVisible} title={Logo} footer={null}
          onCancel={this.handleAddCancel} style={{ position: "relative", zIndex: 9999 }} >
          <AddPage onAdd={ this.props.onAdd } onUpdate={ this.onUpdate } />
        </Modal>
        <Modal
          visible={editVisible} title={Logo} footer={null}
          onCancel={this.handleEditCancel} style={{ position: "relative", zIndex: 9999 }} >
          <EditPage />
        </Modal>
      </div>
    )
  }
}

export default CollapsePage;