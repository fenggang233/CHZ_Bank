import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Row, DatePicker, Select } from 'antd';

import './index.css';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const InputGroup = Input.Group;
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
        const oldInfo = JSON.parse(this.props.oldInfo);
        for (var key in values) {
          if (values[key] !== undefined) {
            oldInfo[key] = values[key]
          }
        }
        console.log('Received values of form: ', oldInfo);
        this.props.onChange(oldInfo);
        message.success('修改成功');
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
            {getFieldDecorator('aid', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="account-book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={oldInfo.aid}
              />,
            )}
            {getFieldDecorator('id', {
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={oldInfo.id}
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
                placeholder={oldInfo.branch}
              />,
            )}
            {getFieldDecorator('rate', {
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="stock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={oldInfo.rate}
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
                placeholder={oldInfo.balance}
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
            修改储蓄账户
          </Button>
        </Row>
      </Form>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'normal_login' })(EditForm);

export default WrappedEditForm;