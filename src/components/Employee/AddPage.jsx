import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Row, DatePicker } from 'antd';

import './index.css';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const InputGroup = Input.Group;

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
        values['date'] = values['date'].format("YYYY-MM-DD");
        this.props.onUpdate(values);
      } else {
        message.error('录入失败！');
      }
    });
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名字！' }],
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="姓名"
              />,
            )}
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '请输入身份证号！' }],
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)'}} />}
                placeholder="身份证号"
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入电话！' }],
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="电话"
              />,
            )}
            {getFieldDecorator('date', {
              rules: [{ required: true, message: '请选择日期！' }],
            })(
              <DatePicker
                locale={locale}
                style={{ width: "60%" }}
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
        <Row gutter={24} style={{ marginTop: 20 }}>
          {getFieldDecorator('addr', {
          })(
            <Input 
              prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="家庭地址"
            />,
          )}
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('branch', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="支行名"
              />,
            )}
            {getFieldDecorator('mid', {
              rules: [{ required: true, message: '请输入身份证号！' }],
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="经理身份证号"
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20, marginBottom: 20 }}>
          <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">
            录入
          </Button>
        </Row>
      </Form>
    );
  }
}

const WrappedAddForm = Form.create({ name: 'normal_login' })(AddForm);

export default WrappedAddForm;