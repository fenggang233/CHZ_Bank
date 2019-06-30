import { Form, Row, Col, Input, Button } from 'antd';
import React, { Component } from 'react';

const InputGroup = Input.Group;

class AdvancedSearchForm extends Component {
  state = {
    expand: false,
  };

  componentWillMount(){
    // API.GET('stat/city/', data => {
    //   this.setState({
    //     cityList: data
    //   })
    // });
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
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
          <InputGroup compact={true} onPressEnter={ e => { console.log(e) } }>
            {getFieldDecorator('name', {
            })(<Input style={{ width: '30%' }} placeholder="按名查找" />)}
            {getFieldDecorator('assets', {
            })(<Input style={{ width: '30%' }} placeholder="比资产查找" />)}
            {getFieldDecorator('branch', {
            })(<Input style={{ width: '40%' }} placeholder="支行名" />)}
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