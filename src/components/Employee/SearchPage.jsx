import { Form, Row, Col, Input, Button, Select } from 'antd';
import React, { Component } from 'react';

const InputGroup = Input.Group;
const { Option } = Select;

class AdvancedSearchForm extends Component {
  state = {
    expand: false,
    cityList: []
  };

  componentWillMount() {
    // API.GET('stat/city/', data => {
    //   this.setState({
    //     cityList: data
    //   })
    // });
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      this.props.onSearch(values);
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
            })(<Input style={{ width: '20%' }} placeholder="身份证号" />)}
            {getFieldDecorator('city', {
            })(<Input style={{ width: '20%' }} placeholder="地点" />)}
            {getFieldDecorator('name', {
            })(<Input style={{ width: '20%' }} placeholder="姓名" />)}
            {getFieldDecorator('position', {
            })(<Select style={{ width: '20%' }} placeholder="职务">
              <Option value="员工">员工</Option>
              <Option value="经理">经理</Option>
            </Select>)}
            {getFieldDecorator('branch', {
            })(<Input style={{ width: '20%' }} placeholder="银行" />)}
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