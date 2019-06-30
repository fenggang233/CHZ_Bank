import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Row } from 'antd';

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
            {getFieldDecorator('id', {
            })(
              <Input
                prefix={<Icon type="money-collect" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="贷款号"
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('branch', {
            })(
              <Input
                prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="支行名"
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('time', {
            })(
              <Input 
                prefix={<Icon type="history" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="贷款次数"
              />,
            )}
          </InputGroup>
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('loan', {
            })(
              <Input 
                prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="贷款金额"
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