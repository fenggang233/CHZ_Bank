import { Form, Row, Col, Input, Button, DatePicker } from 'antd';
import React, { Component } from 'react';

import Branch from '../../util/Branch';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const InputGroup = Input.Group;
const branch = new Branch();

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

class AdvancedSearchForm extends Component {
  state = {
    expand: false,
    cityList: branch.genCityList()
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values['openDate'] = values['openDate'].format("YYYY-MM-DD");
      values['latestDate'] = values['latestDate'].format("YYYY-MM-DD");
      console.log('Received values of form: ', values);
      // this.props.onSearch(values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>
          <InputGroup compact={true} onPressEnter={e => { console.log(e) }}>
            {getFieldDecorator('id', {
            })(<Input style={{ width: '16%' }} placeholder="身份证号" />)}
            {getFieldDecorator('aid', {
            })(<Input style={{ width: '14%' }} placeholder="账号" />)}
            {getFieldDecorator('branch', {
            })(<Input style={{ width: '12%' }} placeholder="支行" />)}
            {getFieldDecorator('rate', {
            })(<Input style={{ width: '12%' }} placeholder="利率" />)}
            {getFieldDecorator('type', {
            })(<Input style={{ width: '10%' }} placeholder="币种" />)}
            {getFieldDecorator('balance', {
            })(<Input style={{ width: '12%' }} placeholder="余额" />)}
            {getFieldDecorator('openDate', {
            })(
              <DatePicker
                locale={locale}
                style={{ width: "12%" }}
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
                style={{ width: "12%" }}
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
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginTop: 10 }}>
            <Button type="primary" htmlType="submit" icon="search" style={{ margin: 5 }}>
              查询
            </Button>
            <Button style={{ marginLeft: 5 }} onClick={this.handleReset} icon="delete" >
              清空
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
export default WrappedAdvancedSearchForm;