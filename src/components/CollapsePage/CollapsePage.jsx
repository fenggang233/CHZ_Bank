import React, { Component } from 'react';
import { Collapse, Icon } from 'antd';
import Chart from "react-apexcharts";

import './index.css';

const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

// const customPanelStyle = {
//   background: '#fff',
//   borderRadius: 5,
//   marginBottom: 10,
//   border: 'solid #D9D9D9 0.5px',
//   overflow: 'hidden',
// };

var mixed_option = {
  series: [67, 84, 97, 61],
  plotOptions: {
    radialBar: {
      dataLabels: {
        total: {
          show: true,
          label: 'TOTAL'
        }
      }
    }
  },
  labels: ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D']
};

class CollapsePage extends Component{
  render(){
    return(
      <div className="root-page">
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          <Panel header={(
            <div>
              <Icon type="heart" /> Charley Chai
            </div>
          )} key="1" >
              <div className="coll-content">
                <Chart
                  className="chart"
                  options={mixed_option}
                  series={mixed_option.series}
                  type="radialBar"
                  width="300"
                />
                <p>{ text }</p>
              </div>
          </Panel>
          <Panel header={(
            <div>
              <Icon type="meh" /> Charley Chai
            </div>
          )} key="2" >
            <div className="coll-content">
              <Chart
                className="chart"
                options={mixed_option}
                series={mixed_option.series}
                type="radialBar"
                width="300"
              />
              <p>{text}</p>
            </div>
          </Panel>
          <Panel header={(
            <div>
              <Icon type="meh" /> Charley Chai
            </div>
          )} key="3" >
            <div className="coll-content">
              <Chart
                className="chart"
                options={mixed_option}
                series={mixed_option.series}
                type="radialBar"
                width="300"
              />
              <p>{text}</p>
            </div>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

export default CollapsePage;