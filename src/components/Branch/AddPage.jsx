import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Select } from 'antd';

import './index.css';

const { Option } = Select;

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
        this.props.onAdd(values);
        this.props.onUpdate(values);
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
            rules: [{ required: true, message: '请输入名字！' }],
          })(
            <Input
              prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="支行名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('city', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="城市"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <span>
            {getFieldDecorator('assets', {
              rules: [{ required: true, message: '请输入资产！' }],
            })(
              <Input
                prefix={<Icon type="property-safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="资产"
                style={{ width: '65%', marginRight: '3%' }}
              />
            )}
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择币种！' }],
            })(
              <Select
                style={{ width: '32%', }}
              >
                <Option style={{ color: 'rgba(0,0,0,.25)' }} value="RMB">RMB</Option>
                <Option style={{ color: 'rgba(0,0,0,.25)' }} value="USD">USD</Option>
              </Select>
            )}
          </span>    
        </Form.Item>
        <Form.Item>
          <Button type="primary" loading={ this.state.loading } htmlType="submit" className="login-form-button">
            录入
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedAddForm = Form.create({ name: 'normal_login' })(AddForm);

export default WrappedAddForm;