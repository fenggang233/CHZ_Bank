import React, { Component } from 'react';
import { Layout, Icon, Menu, Badge, Input, Tooltip, Drawer, Modal, Popconfirm } from 'antd';

import 'antd/dist/antd.css';
import './layouts.css';

import UserPage from '../components/User/UserPage';
import InfoPage from '../components/Info/InfoPage';

import BranchPage from '../containers/BranchPage';
import EmplyeePage from '../components/Emplyee/EmplyeePage';
import ClientPage from '../components/Client/ClientPage';
import AccountPage from '../components/Account/AccountPage';
import LoanPage from '../components/Loan/LoanPage';
import StatPage from '../components/Stat/StatPage';

import logo from "../assets/logo.svg";
import logoName from "../assets/logo-name.svg";
import logoNameB from "../assets/logo-name-black.svg";
import avatar from "../assets/avatar.jpg";
import inviUser from "../assets/invis-user.png";

const { Content, Sider, Header } = Layout;

class LayoutPage extends Component {
  state = {
    collapsed: false,
    which: '1',
    searchInput: false,
    moreVisible: false,
    user: {
      username: 'Charley Chai',
      avatar: avatar
    }
  };

  handleSelect = (tab) => {
    this.setState({
      which: tab.key
    });
  }

  showModal = () => {
    this.setState({
      logVisible: true,
    });
  };


  handleCancel = () => {
    this.setState({ 
      logVisible: false 
    });
  };

  searchInput = () => {
    this.setState({
      searchInput: !this.state.searchInput
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  showDrawer = () => {
    this.setState({
      moreVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      moreVisible: false,
    });
  };

  render() {
    const { userInfo, login, infoList } = this.props;

    return (
      <Layout style={{ height: "100%" }}>
        <Sider style={{ height: "100%" }} trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img alt='logo' className="logo-svg" src={logo} />
            <img alt='logo-name'
              className="logo-name-svg"
              src={logoName}
              style={{ display: this.state.collapsed ? 'none' : '' }} />
          </div>
          <Menu theme="dark" mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={[this.state.which]}
            onClick={this.handleSelect.bind(this)}>
            <Menu.Item key="1">
              <Icon type="bank" />
              <span>支行管理</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="solution" />
              <span>员工管理</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span>客户管理</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="account-book" />
              <span>账户管理</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="money-collect" />
              <span>贷款管理</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="line-chart" />
              <span>业务统计</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ height: "100%" }}>
          <Header style={{
            background: '#fff',
            padding: 0,
            boxShadow: '0px 5px 5px rgb(230,230,230)',
            position: 'relative',
            zIndex: 999
          }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div style={{ display: "flex", float: 'right' }}>
              <Input className="请输入" style={{ display: this.state.searchInput ? '' : 'none' }} placeholder="Search" />
              <Tooltip title="搜索">
                <Icon className="topBtn searchBtn" type="search" onClick={this.searchInput.bind(this)} />
              </Tooltip>
              <Tooltip title="截图保存">
                <Icon className="topBtn" type="camera" />
              </Tooltip>
              <Tooltip title="同步">
                <Icon className="topBtn" type="cloud-sync" />
              </Tooltip>
              <Tooltip title="消息">
                <Icon className="topBtn" type="bell" />
              </Tooltip>
              <div style={{ width: 0 }}>
                <Popconfirm placement="bottom" title={<InfoPage infoContent={ infoList } />} okText="已读" cancelText="关闭">
                  <Badge className="topBadge" count={ login ? infoList.length : 0 } overflowCount={99} />
                </Popconfirm>
              </div>
              <div style={{ display: "flex" }}>
                <img alt="avatar" className="avatar" src={
                  login ? avatar : inviUser
                }/>
                <Tooltip title="员工">
                  <p onClick={ this.showModal.bind(this) } className="username">
                    { login ? userInfo.username : "Log In" }
                  </p>
                </Tooltip>
              </div>
              <Tooltip placement="bottom" title="更多">
                <Icon onClick={this.showDrawer.bind(this)} className="topBtnEnd" type="more" />
              </Tooltip>
            </div>
          </Header>
          <Content
            style={{
              height: "100%",
              overflow: 'auto'
            }}
          >
            <div style={{ display: this.state.which === '1' ? '' : 'none' }}>
              <BranchPage />
            </div>
            <div style={{ display: this.state.which === '2' ? '' : 'none' }}>
              <EmplyeePage />
            </div>
            <div style={{ display: this.state.which === '3' ? '' : 'none' }}>
              <ClientPage />
            </div>
            <div style={{ display: this.state.which === '4' ? '' : 'none' }}>
              <AccountPage />
            </div>
            <div style={{ display: this.state.which === '5' ? '' : 'none' }}>
              <LoanPage />
            </div>
            <div style={{ display: this.state.which === '6' ? '' : 'none' }}>
              <StatPage />
            </div>
          </Content>
        </Layout>
        <Modal
          visible={ this.state.logVisible }
          title={(
            <div className="logo-mini">
              <img alt='logo' className="logo-svg-mini" src={logo} />
              <img alt='logo-name'
                className="logo-name-svg-mini"
                src={logoNameB} />
            </div>
          )}
          footer={null}
          onCancel={this.handleCancel}
          style={{ position: "relative", zIndex: 9999 }}
        >
          <UserPage onLogin={ this.props.onLogin }  />
        </Modal>
        <Drawer
          title="More Options"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.moreVisible}
          style={{ display: "relative", zIndex: 9999 }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </Layout>
    );
  }
}

export default LayoutPage;