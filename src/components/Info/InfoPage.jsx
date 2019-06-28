import React,{ Component } from 'react';
import { Upload } from 'antd';

import './index.css';


class InfoPage extends Component{
  render(){
    const props = {
      defaultFileList: this.props.infoContent
    };

    return(
      <div style={{ width: 300, marginRight: 20 }}>
        <p style={{ fontSize: 14 }}>消息通知</p>
        <Upload {...props} />
      </div>
    )
  }
}

export default InfoPage;
