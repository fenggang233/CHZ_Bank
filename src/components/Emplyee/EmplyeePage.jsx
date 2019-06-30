import React, { Component } from 'react';
import { Icon, Divider, List, Avatar, Popconfirm, Skeleton, Button, Tooltip, Modal } from 'antd';

import API from '../../util/Api';
import Emplyee from '../../util/Emplyees';
import SearchPage from './SearchPage';
import AddPage from './AddPage';
import EditPage from './EditPage';

import './index.css';
import logo from "../../assets/logo.svg";
import logoNameB from "../../assets/logo-name-black.svg";

const emplyee = new Emplyee();

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

const option1 = emplyee.getEmplyeeStatByCity();

class CollapsePage extends Component {
  state = {
    options: option1.option,
    series: option1.series,
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

  componentWillMount(){
    this.fresh();
  }

  fresh = () => {
    API.GET('emplyee', (data) => {
      this.setState({
        list: data
      })
    })
  }

  onUpdate = (newBranch) => {
    API.POST('emplyee', (data) => {
      if (!data.status) {
        alert('添加失败！');
      } else {
        this.fresh();
      }
    }, newBranch);

      /**
    * emplyee.addEmplyee(newEmplyee);
    this.setState({
    list: this.state.list.concat(newEmplyee),
    })
    * */
  }

  onChange = (newInfo) => {
    API.PATCH('emplyee', data => {
      if (!data.status) {
        alert('修改失败！');
      } else {
        this.fresh();
      }
    }, newInfo);

        // var { list, oldIndex, oldId } = this.state;
    // emplyee.changeEmplyee(oldId, newInfo);
    // list[oldIndex] = newInfo;
    // this.setState({
    //   list: list
    // })
  }

  onSearch = (keys) => {
    API.GET('emplyee', data => {
      this.setState({
        searchResult: data
      })
    }, keys)

    // this.setState({
    //   list: emplyee.searchEmplyee(keys)
    // })
  }

  handleDelete = (item, index) => {
    API.DELETE('emplyee', (data) => {
      if (!data.status) {
        alert('删除失败！');
      } else {
        this.fresh();
      }
    }, {
      id: item.id
    });

    // var l = this.state.list;
    // l.splice(index, 1);
    // this.setState({
    //   list: l
    // })
    // emplyee.deleteEmplyee(item.id);
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
          .concat(emplyee.getEmplyee()),
      });
    }, 500);
  };

  handleEditCancel = () => {
    this.setState({
      editVisible: false,
    });
  };

  handleEdit = (item, index) => {
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
      <div className="root-page" id="emplyee-page">
        <List
          header={
            <div>
              <h3>CHZ Bank 员工列表</h3>
              <Divider />
              <SearchPage onSearch={ this.onSearch } />
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
                      <Icon type="smile" style={{ fontSize: 18, marginTop: 7 }}
                        theme="twoTone"
                        twoToneColor={colors[i % 5]} />
                    </Avatar>
                  }
                  title={item.name}
                  description={item.branch}
                />
                <div style={{ display: 'flex' }}>
                  <div className="emplyee-tab">
                    <Tooltip title="身份证">
                      <Icon type="idcard" theme="twoTone" className="emplyee-tab-icon" />{item.id}
                    </Tooltip>
                  </div>
                  <div className="emplyee-tab">
                    <Tooltip title="联系电话">
                      <Icon type="phone" theme="twoTone" className="emplyee-tab-icon" />{item.phone}
                    </Tooltip>
                  </div>
                  <div className="emplyee-tab">
                    <Tooltip title="家庭住址">
                      <Icon type="home" theme="twoTone" className="emplyee-tab-icon" />{item.addr}
                    </Tooltip>
                  </div>
                  <div className="emplyee-tab">
                    <Tooltip title="入职日期，已入职8年">
                      <Icon type="calendar" theme="twoTone" className="emplyee-tab-icon" />{item.date}
                    </Tooltip>
                  </div>
                  <div className="emplyee-tab">
                    <Tooltip title={"经理，ID: " + item.mid}>
                      <Icon type="contacts" theme="twoTone" className="emplyee-tab-icon" />{item.manager}
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
          <EditPage onChange={this.onChange} oldInfo={ this.state.oldInfo } />
        </Modal>
      </div>
    )
  }
}

export default CollapsePage;