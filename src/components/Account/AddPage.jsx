import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Row, Divider } from 'antd';

import './index.css';

const InputGroup = Input.Group;

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
        this.props.onUpdate(values);
        message.success('录入成功');
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
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="名字"
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
            {getFieldDecorator('phone', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="电话"
              />,
            )}
            {getFieldDecorator('addr', {
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="地址"
              />,
            )}
          </InputGroup>
        </Row>
        <Divider />
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('rname', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="联系人姓名"
              />,
            )}
            {getFieldDecorator('rphone', {
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="联系人电话"
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('remail', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="联系人邮箱"
              />,
            )}
            {getFieldDecorator('rr', {
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="联系人关系"
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20, marginBottom: 20 }}>
          <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">
            修改
          </Button>
        </Row>
      </Form>
    );
  }
}

const WrappedAddForm = Form.create({ name: 'normal_login' })(AddForm);

export default WrappedAddForm;