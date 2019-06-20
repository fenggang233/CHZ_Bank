import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Select } from 'antd';

import './index.css';

const { Option } = Select;

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
        console.log('Received values of form: ', values);
        message.success('录入成功');
      } else {
        message.error('录入失败！');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('name', {
          })(
            <Input
              prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="新的支行名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('city', {
          })(
            <Input
              prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="新的城市"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <span>
            {getFieldDecorator('assets', {
            })(
              <Input
                prefix={<Icon type="property-safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="新的资产"
                style={{ width: '65%', marginRight: '3%' }}
              />
            )}
            {getFieldDecorator('type', {
            })(
              <Select
                defaultValue="rmb"
                style={{ width: '32%', }}
              >
                <Option style={{ color: 'rgba(0,0,0,.25)' }} value="rmb">RMB</Option>
                <Option style={{ color: 'rgba(0,0,0,.25)' }} value="dollar">USD</Option>
              </Select>
            )}
          </span>
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">
            修改
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'normal_login' })(EditForm);

export default WrappedEditForm;