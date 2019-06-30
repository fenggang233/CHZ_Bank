import React, { Component } from 'react';
import { Icon, Divider, List, Avatar, Popconfirm, Skeleton, Button, Tooltip, Modal, message } from 'antd';

import './index.css';
import logo from "../../assets/logo.svg";
import logoNameB from "../../assets/logo-name-black.svg";

import API from '../../util/Api';
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

const Logo = (
  <div className="logo-mini">
    <img alt='logo' className="logo-svg-mini" src={logo} />
    <img alt='logo-name'
      className="logo-name-svg-mini"
      src={logoNameB} />
  </div>
);

class LoanPage extends Component {
  state = {
    initLoading: true,
    loading: false,
    addVisible: false,
    editVisible: false,
    list: [],
  };

  componentDidMount() {
    this.setState({
      initLoading: false,
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

  componentWillMount() {
    this.fresh();
  }

  fresh = () => {
    API.GET('loan/', (data) => {
      console.log(data);
      this.setState({
        list: data
      })
    })
  }

  onUpdate = (newLoan) => {
    API.POST('loan/', (data) => {
      if (!data.status) {
        message.info(data.msg);
      } else {
        this.fresh();
        message.info("添加成功！")
      }
    }, newLoan);
  }

  onChange = (newInfo) => {
    API.PATCH('loan/', data => {
      if (!data.status) {
        message.info(data.msg);
      } else {
        this.fresh();
      }
    }, newInfo);
  }

  onSearch = (keys) => {
    console.log(keys)
    API.GET('loan/', data => {
      this.setState({
        list: data
      })
    }, keys)
  }

  handleDelete = (item, index) => {
    API.DELETE('loan/', (data) => {
      if (!data.status) {
        alert('删除失败！');
      } else {
        this.fresh();
      }
    }, {
        lid: item.lid
    });
  }

  handleEditCancel = () => {
    this.setState({
      editVisible: false,
    });
  };

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
        <List
          header={
            <div>
              <h3>CHZ Bank 贷款列表</h3>
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
              <Icon className="func-icon" type="edit" />,
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
                      <Icon type="money-collect" style={{ fontSize: 18 }}
                        theme="twoTone"
                        twoToneColor={colors[i % 5]} />
                    </Avatar>
                  }
                  title={ item.id }
                  description={ item.branch }
                />
                <div style={{ display: 'flex' }}>
                  <div className="client-tab">
                    <Tooltip title="贷款金额">
                      <Icon type="pay-circle" className="client-tab-icon" />{item.loan}
                    </Tooltip>
                  </div>
                  <div className="client-tab">
                    <Tooltip title={"贷款次数，计划打款" + item.total_time + "次数"}>
                      <Icon type="history" className="client-tab-icon" />{item.time}
                    </Tooltip>
                  </div>
                  <div className="client-tab">
                    <Tooltip title="最近使用事件">
                      <Icon type="calendar" className="client-tab-icon" />{item.Date}
                    </Tooltip>
                  </div>
                  <div className="client-tab">
                    <Tooltip title={<div>
                      {
                        item.history.map((ii, i) => {
                          return(
                            <div key={i} >
                              <Icon type="calendar" className="client-tab-icon" />{i + " => "}{ii.Date}
                            </div>
                          )
                        })
                      }
                    </div>}>
                      <Icon type="contacts" theme="twoTone" className="client-tab-icon" />更多信息
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

export default LoanPage;