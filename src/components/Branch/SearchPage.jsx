import { Form, Row, Col, Input, Button, Select } from 'antd';
import React, { Component } from 'react';

import Branch from '../../util/Branch'; 

const InputGroup = Input.Group;
const { Option } = Select;
const branch = new Branch();

class AdvancedSearchForm extends Component {
  state = {
    expand: false,
    cityList: branch.genCityList()
  };

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
            {getFieldDecorator('date', {
            })(<Select style={{ width: '40%' }} placeholder="或选择城市">
              {
                this.state.cityList.map((city, i) => {
                  return(
                    <Option key={i} value={city}>{city}</Option>
                  )
                })
              }
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