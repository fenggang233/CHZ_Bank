import { Form, Row, Col, Input, Button, Select } from 'antd';
import React, { Component } from 'react';

const InputGroup = Input.Group;
const { Option } = Select;

class AdvancedSearchForm extends Component {
  state = {
    expand: false,
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
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
          <InputGroup compact={true} onPressEnter={ e => { console.log(e) } }>
              {getFieldDecorator('text', {
              })(<Input style={{ width: '60%' }} placeholder="输入关键词" />)}
              {getFieldDecorator('date', {
              })(<Select style={{ width: '40%' }} placeholder="或选择城市">
                  <Option value="Home">合肥</Option>
                  <Option value="Company">北京</Option>
                </Select>)}
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