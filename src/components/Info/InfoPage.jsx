import React,{ Component } from 'react';
import { Upload } from 'antd';

import './index.css';

const props = {
  defaultFileList: [
    {
      uid: '1',
      name: 'info1',
      status: 'done',
    },
    {
      uid: '2',
      name: 'info2',
      status: 'done',
    },
    {
      uid: '3',
      name: 'info3',
      status: 'error',
    },
  ],
};

class InfoPage extends Component{

  state = {
    infos: [
      { header: 'info 1', text: 'hello words' },
      { header: 'info 2', text: 'hello words' },
      { header: 'info 3', text: 'hello words' }
    ]
  }

  onDelete = e => {
    this.setState({
      infos: [ ...this.state.infos.splice(e.key - '0', 1) ]
    })
  }

  render(){
    return(
      <div style={{ width: 300, marginRight: 20 }}>
        <p style={{ fontSize: 14 }}>消息通知</p>
        <Upload {...props} />
      </div>
    )
  }
}

export default InfoPage;
