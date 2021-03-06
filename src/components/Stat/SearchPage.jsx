import { Form, Row, Col, Input, Button } from 'antd';
import React, { Component } from 'react';

import Branch from '../../util/Branch';

const InputGroup = Input.Group;
const branch = new Branch();

class AdvancedSearchForm extends Component {
  state = {
    expand: false,
    cityList: branch.genCityList()
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.onUpdate(values.branch);
    });
  };

  handleU = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.onU(values.branch);
    });
  }

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
            {getFieldDecorator('branch', {
            })(<Input style={{ width: '30%' }} placeholder="支行名" />)}
          </InputGroup>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right', marginTop: 10 }}>
            <Button type="primary" htmlType="submit" icon="search" style={{ margin: 5 }}>
              查询
            </Button>
            <Button style={{ marginLeft: 5 }} type="primary" onClick={this.handleU} icon="fast-forward" >
              下一个
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