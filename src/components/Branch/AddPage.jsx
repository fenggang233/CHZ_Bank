import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Select } from 'antd';

import './index.css';

const { Option } = Select;

class PriceInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }

  handleNumberChange = e => {
    // const number = parseInt(e.target.value || 0, 10);
    // if (Number.isNaN(number)) {
    //   return;
    // }
    // if (!('value' in this.props)) {
    //   this.setState({ number });
    // }
    // this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    // do sth
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          prefix={<Icon type="property-safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="资产"
          size={size}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={state.currency}
          size={size}
          style={{ width: '32%', }}
          onChange={this.handleCurrencyChange}
        >
          <Option style={{ color: 'rgba(0,0,0,.25)' }}  value="rmb">RMB</Option>
          <Option style={{ color: 'rgba(0,0,0,.25)' }}  value="dollar">USD</Option>
        </Select>
      </span>
    );
  }
}


class NormalLoginForm extends Component {
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
        if (values.username === 'charley' && values.password === 'root') {
          message.success('录入成功!');
        } else {
          message.error('录入失败！');
        }
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
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="支行名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('city', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="城市"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('assets', {
            initialValue: { number: 0, currency: 'rmb' },
            rules: [{ validator: this.checkPrice }],
          })(<PriceInput />)}
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;