import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Row, DatePicker } from 'antd';

import './index.css';
import locale from 'antd/lib/date-picker/locale/zh_CN';

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
        for(var key in values){
          if (values[key] !== undefined){
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
            {getFieldDecorator('name', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={ oldInfo.name }
              />,
            )}
            {getFieldDecorator('id', {
            })(
              <Input style={{ width: "60%" }} disabled={true}
                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={ oldInfo.id }
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
                placeholder={ oldInfo.phone }
              />,
            )}
            {getFieldDecorator('date', {
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
              placeholder={ oldInfo.addr }
            />,
          )}
        </Row>
        <Row gutter={24} style={{ marginTop: 20 }}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('manager', {
            })(
              <Input style={{ width: "40%" }}
                prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={ oldInfo.manager }
              />,
            )}
            {getFieldDecorator('mid', {
            })(
              <Input style={{ width: "60%" }}
                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={ oldInfo.mid }
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