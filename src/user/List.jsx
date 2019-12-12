import React, { Component } from 'react';
import { Table, Divider, Icon, Modal } from 'antd';
const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <span><a href=""><Icon type="eye" /> </a></span>
          <Divider type="vertical" />
          <span onClick={() => console.log(record)} ><Icon type="edit" /></span>
          <Divider type="vertical" />
          <span><Icon type="delete" /></span>
        </span>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      id: 32,
    },
    {
      key: '2',
      name: 'Jim Green',
      id: 42,
    },
    {
      key: '3',
      name: 'Joe Black',
      id: 32,
    },
  ];
class ListUsers extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

    handleClick() {
      console.log('click');
    }
    render() { 
        return (
          <React.Fragment>
            <Table columns={columns} dataSource={data} />
            <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </React.Fragment>
        );
    }
}
 
export default ListUsers;



