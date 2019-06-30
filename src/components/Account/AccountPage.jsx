import React, { Component } from 'react';
import { Radio, Icon, Divider, List, Avatar, Popconfirm, Skeleton, Button, Tooltip, Modal } from 'antd';

import './index.css';
import logo from "../../assets/logo.svg";
import logoNameB from "../../assets/logo-name-black.svg";

import API from '../../util/Api';
import SearchPage0 from './SearchPage0';
import SearchPage1 from './SearchPage1';
import AddPage0 from './AddPage0';
import AddPage1 from './Addpage1';
import EditPage0 from './EditPage0';
import EditPage1 from './EditPage1';

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

class AccountPage extends Component {
  state = {
    initLoading: true,
    loading: false,
    addVisible: false,
    editVisible: false,
    count: 3,
    list0: [],
    list1: [],
    type: '0'
  };

  componentWillMount() {
    this.setState({
      initLoading: false,
    })
    this.fresh0();
    this.fresh1();
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

  fresh0 = () => {
    API.GET('account0/', (data) => {
      this.setState({
        list0: data
      })
    })
  }

  fresh1 = () => {
    API.GET('account1/', (data) => {
      this.setState({
        list1: data
      })
    })
  }

  onUpdate0 = (newBranch) => {
    API.POST('account0/', (data) => {
      if (!data.status) {
        alert('添加失败！');
      } else {
        this.fresh0();
      }
    }, newBranch);
  }

  onUpdate1 = (newBranch) => {
    API.POST('account1/', (data) => {
      if (!data.status) {
        alert('添加失败！');
      } else {
        this.fresh1();
      }
    }, newBranch);
  }

  onChange = (newInfo) => {
    var { type } = this.state;
    if (type === '0') {
      API.PATCH('account0/', data => {
        if (!data.status) {
          alert('修改失败！');
        } else {
          this.fresh0();
        }
      }, newInfo);
    } else {
      API.PATCH('account1/', data => {
        if (!data.status) {
          alert('修改失败！');
        } else {
          this.fresh1();
        }
      }, newInfo);
    }
  }

  onSearch = (keys) => {
    var { type } = this.state;
    if (type === '0') {
      API.GET('account0/', data => {
        this.setState({
          list0: data
        })
      }, keys);
    } else {
      API.GET('account1/', data => {
        this.setState({
          list1: data
        })
      }, keys);
    }
  }

  handleDelete = (item, index) => {
    if (this.state.type === '0') {
      API.DELETE('account0/', (data) => {
        if (!data.status) {
          alert('删除失败！');
        } else {
          this.fresh0();
        }
      }, {
          aid: item.aid
      });
    } else {
      API.DELETE('account1/', (data) => {
        if (!data.status) {
          alert('删除失败！');
        } else {
          this.fresh1();
        }
      }, {
          aid: item.aid
      });
    }
  }

  // onUpdate0 = (newClient) => {
  //   // account.addClient(newClient);
  //   this.setState({
  //     list0: this.state.list0.concat(newClient),
  //   })
  // }

  // onUpdate1 = (newClient) => {
  //   // account.addClient(newClient);
  //   this.setState({
  //     list1: this.state.list1.concat(newClient),
  //   })
  // }

  // onChange = (newInfo) => {
  //   var { list, oldIndex, oldId, type } = this.state;
  //   if (type === '0') {
  //     account.changeClient(oldId, newInfo, '0');
  //     list[oldIndex] = newInfo;
  //     this.setState({
  //       list0: list
  //     })
  //   } else {
  //     account.changeClient(oldId, newInfo, '1');
  //     list[oldIndex] = newInfo;
  //     this.setState({
  //       list1: list
  //     })
  //   }
  // }

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
      oldId: item.id,
    });
  };

  handleTypeChange = e => {
    if (e.target.value === '0') {
      this.setState({
        type: '0',
      });
      this.fresh0();
    } else {
      this.setState({
        type: '1',
      });
      this.fresh1();
    }
  };

  render() {
    const { initLoading, loading, addVisible, editVisible } = this.state;
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

    const { type } = this.state;

    return (
      <div className="root-page" id="client-page">
        <List
          header={
            <div>
              <h3>CHZ Bank 客户列表</h3>
              <Radio.Group value={type} style={{ marginTop: 10 }} onChange={this.handleTypeChange}>
                <Radio.Button value="0">储蓄账户</Radio.Button>
                <Radio.Button value="1">支票账户</Radio.Button>
              </Radio.Group>
              <Divider />
              <div style={{ display: this.state.type === '0' ? '' : 'none' }}>
                <SearchPage0 onSearch={this.onSearch} />
              </div>
              <div style={{ display: this.state.type === '1' ? '' : 'none' }}>
                <SearchPage1 onSearch={this.onSearch} />
              </div> 
            </div>
          }
          className="list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={this.state.type === '0' ? this.state.list0 : this.state.list1 }
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
                      <Icon type="account-book" style={{ fontSize: 18 }}
                        theme="twoTone"
                        twoToneColor={colors[i % 5]} />
                    </Avatar>
                  }
                  title={item.aid}
                  description={item.id}
                />
                
                <div style={{ display: this.state.type === '0' ? 'flex' : 'none' }}>
                  <div className="account0-tab">
                    <Tooltip title="开户支行">
                      <Icon type="bank" theme="twoTone" className="client-tab-icon" />{item.branch}
                    </Tooltip>
                  </div>
                  <div className="account0-tab">
                    <Tooltip title="余额">
                      <Icon type="pay-circle" className="client-tab-icon" />{item.balance}
                    </Tooltip>
                  </div>
                  <div className="account0-tab">
                    <Tooltip title="币种">
                      <Icon type="money-collect" className="client-tab-icon" />{item.type}
                    </Tooltip>
                  </div>
                  <div className="account0-tab">
                    <Tooltip title="利率">
                      <Icon type="stock" className="client-tab-icon" />{item.rate}
                    </Tooltip>
                  </div>
                  <div className="account0-tab">
                    <Tooltip title="开户时间">
                      <Icon type="calendar" theme="twoTone" className="client-tab-icon" />{item.openDate}
                    </Tooltip>
                  </div>
                  <div className="account0-tab">
                    <Tooltip title="最近访问时间">
                      <Icon type="calendar" theme="twoTone" className="client-tab-icon" />{item.latestDate}
                    </Tooltip>
                  </div>
                </div> 
                <div style={{ display: this.state.type === '1' ? 'flex' : 'none' }}>
                  <div className="account1-tab">
                    <Tooltip title="开户支行">
                      <Icon type="bank" theme="twoTone" className="client-tab-icon" />{item.branch}
                    </Tooltip>
                  </div>
                  <div className="account1-tab">
                    <Tooltip title="透支额">
                      <Icon type="pay-circle" className="client-tab-icon" />{item.overdraft}
                    </Tooltip>
                  </div>
                  <div className="account1-tab">
                    <Tooltip title="余额">
                      <Icon type="pay-circle" className="client-tab-icon" />{item.balance}
                    </Tooltip>
                  </div>
                  <div className="account1-tab">
                    <Tooltip title="开户时间">
                      <Icon type="calendar" theme="twoTone" className="client-tab-icon" />{item.openDate}
                    </Tooltip>
                  </div>
                  <div className="account1-tab">
                    <Tooltip title="最近访问时间">
                      <Icon type="calendar" theme="twoTone" className="client-tab-icon" />{item.latestDate}
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
          <div style={{ display: this.state.type === '0' ? '' : 'none' }}>
            <AddPage0 onUpdate={this.onUpdate0} />
          </div>
          <div style={{ display: this.state.type === '1' ? '' : 'none' }}>
            <AddPage1 onUpdate={this.onUpdate1} />
          </div>
        </Modal>
        <Modal
          visible={editVisible} title={Logo} footer={null}
          onCancel={this.handleEditCancel} style={{ position: "relative", zIndex: 9999 }} >
          <div style={{ display: this.state.type === '0' ? '' : 'none' }}>
            <EditPage0 oldInfo={this.state.oldInfo} onChange={this.onChange} />
          </div>
          <div style={{ display: this.state.type === '1' ? '' : 'none' }}>
            <EditPage1 oldInfo={this.state.oldInfo} onChange={this.onChange} />
          </div>
        </Modal>
      </div>
    )
  }
}

export default AccountPage;