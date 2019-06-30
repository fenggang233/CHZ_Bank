import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Row } from 'antd';

import './index.css';

const InputGroup = Input.Group;

class EditForm extends Component {
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
        const oldInfo = JSON.parse(this.props.oldInfo);
        for (var key in values) {
          if (values[key] !== undefined) {
            oldInfo[key] = values[key]
          }
        }
        this.props.onChange(oldInfo);
      } else {
        message.error('修改失败！');
      }
    });
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const oldInfo = JSON.parse(this.props.oldInfo);
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('lid', {
            })(
              <Input
                prefix={<Icon type="money-collect" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={oldInfo.lid}
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
                placeholder={oldInfo.branch}
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
                placeholder={oldInfo.time}
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
                placeholder={oldInfo.loan}
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

const WrappedEditForm = Form.create({ name: 'normal_login' })(EditForm);

export default WrappedEditForm;