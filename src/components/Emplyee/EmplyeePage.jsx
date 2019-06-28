import React, { Component } from 'react';
import { Icon, Divider, List, Avatar, Popconfirm, Skeleton, Button } from 'antd';
import Chart from "react-apexcharts";

import './index.css';

import SearchPage from '../Branch/SearchPage';

let colors = [
  '#ED6D79',
  '#F3BC5D',
  '#7CE2A9',
  '#579EF3',
  '#8577CF',
]

const donut_option = {
  chart: {
    type: 'donut'
  },
  series: [44, 55],
  labels: ['员工', '经理']
}

class CollapsePage extends Component {
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
      initLoading: false
    })
  }

  render() {
    const { initLoading, loading, list } = this.state;
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
      <div className="root-page" id="emplyee-page">
        <div className="emplyee-top-card">
          <div className="emplyee-card" style={{ width: "66%", display: "flex" }}>
            <Chart
              style={{ marginLeft: -10 }}
              className="chart"
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
              height="200"
            />
            <div style={{ marginLeft: 20, marginTop: 15 }}>
              <h3>CHZ Bank 员工分布</h3>
              <Divider />
              <p>共有员工多少</p>
              <p>某某支行员工最多，为233人</p>
              <p>某某支行员工最少，为0人</p>
            </div>
          </div>
          <div className="emplyee-card" style={{ width: "32%" }}>
            <Chart
              className="chart"
              options={donut_option}
              series={donut_option.series}
              type="donut"
              width="300"
            />
          </div>
        </div>
        <List
          header={
            <div>
              <h3>CHZ Bank 员工列表</h3>
              <Divider />
              <SearchPage />
            </div>
          }
          className="emplyee-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item, i) => (
            <List.Item actions={[
              <Popconfirm placement="top" title={"确定编辑？"}
                onConfirm={this.showEditModal}
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
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.city}
                />
                <div>{item.assets}</div>
              </Skeleton>
            </List.Item>
          )}
        />
        </div>
    )
  }
}

export default CollapsePage;