import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Row, DatePicker, Select } from 'antd';

import './index.css';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const InputGroup = Input.Group;
const { Option } = Select;

// eslint-disable-next-line no-extend-native
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
        (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

class AddForm extends Component {
  state = {
    loading: false,
    logVisible: false,
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
      if (!err) {
        console.log('Received values of form: ', values);
        values['openDate'] = values['openDate'].format("YYYY-MM-DD");
        values['latestDate'] = values['latestDate'].format("YYYY-MM-DD");
        this.props.onUpdate(values);
        message.success('录入成功');
      } else {
        message.error('录入失败！');
      }
    });
    this.props.form.resetFields();
  };

  //   { id: '1234567789', branch: '1234576788', aid: 'F996ICU', overdraft: '1333', balance: '13343', openDate: '2018-08-09', latestDate: '2019-08-09' },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('aid', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="account-book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="账号"
              />,
            )}
            {getFieldDecorator('id', {
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="身份证号"
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('branch', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="支行"
              />,
            )}
            {getFieldDecorator('rate', {
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="stock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="利率"
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('balance', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="余额"
              />,
            )}
            {getFieldDecorator('type', {
            })(<Select style={{ width: '60%' }} placeholder="币种">
              <Option value="USD">USD</Option>
              <Option value="RMB">RMB</Option>
            </Select>)}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('openDate', {
            })(
              <DatePicker
                locale={locale}
                style={{ width: "50%" }}
                dateRender={current => {
                  const style = {};
                  if (current.date() === 1) {
                    style.border = '1px solid #1890ff';
                    style.borderRadius = '50%';
                  }
                  return (
                    <div className="ant-calendar-date" style={style}>
                      {current.date()}
                    </div>
                  );
                }}
              />,
            )}
            {getFieldDecorator('latestDate', {
            })(
              <DatePicker
                locale={locale}
                style={{ width: "50%" }}
                dateRender={current => {
                  const style = {};
                  if (current.date() === 1) {
                    style.border = '1px solid #1890ff';
                    style.borderRadius = '50%';
                  }
                  return (
                    <div className="ant-calendar-date" style={style}>
                      {current.date()}
                    </div>
                  );
                }}
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20, marginBottom: 20 }}>
          <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">
            添加储蓄账户
          </Button>
        </Row>
      </Form>
    );
  }
}

const WrappedAddForm = Form.create({ name: 'normal_login' })(AddForm);

export default WrappedAddForm;