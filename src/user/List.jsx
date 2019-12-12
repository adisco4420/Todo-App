import React, { Component } from 'react';
import { Table, Divider, Icon, Modal, Input, Spin } from 'antd';
import axios from 'axios';
const api = 'https://agile-refuge-28120.herokuapp.com/api';

  
class ListUsers extends Component {
  state = { 
    visible: false,
    confirmLoading: false,
    value: null,
    actionType: 'Add',
    users: null,
    userId: '',
    columns:  [
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
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <span><a href=""><Icon type="eye" /> </a></span>
            <Divider type="vertical" />
            <span onClick={() => this.handleUpdate(text)} ><Icon type="edit" /></span>
            <Divider type="vertical" />
            <span onClick={() => this.handleDelete(text)}><Icon type="delete" /></span>
          </span>
        ),
      },
    ]
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
      try {
        const res = await axios.get(api + '/user');
        this.setState({users: res.data})
      } catch (error) {
        console.log(error.response);
      }
  }
  addUser = async () => {
    try {
      const user = {name: this.state.value}
      await axios.post(api + '/user', user);
      this.setState({visible: false,  confirmLoading: false, value: ''})
      Modal.success({content: 'User Added Successfully'});
      this.fetchUsers();
    } catch (error) {
      console.log(error.response);
    }
  }
  updateUser = async () => {
    try {
      await axios.put(api + `/user/${this.state.userId}`, {name: this.state.value});
      this.setState({visible: false,  confirmLoading: false})
      this.fetchUsers();
      Modal.success({content: 'User Updated Successfully'});
    } catch (error) {
      console.log(error.response);
    }
  }
  deleteUser = async () => {
    try {
      await axios.delete(api + `/user/${this.state.userId}`)
      this.setState({visible: false,  confirmLoading: false, value: ''})
      this.fetchUsers();
      Modal.success({content: 'User Deleted Successfully'});
    } catch (error) {
      console.log(error.response);
    }
  }
  handleDelete = (user) => {
    this.setState({
      visible: true, actionType: 'Delete', 
      value: user.name, userId: user.id})
  }
  handleUpdate = (user) => {
    this.setState({
      actionType: 'Edit', value: user.name, 
      userId: user.id, visible: true});
  }
  showModal = () => {
    this.setState({
      visible: true,
      actionType: 'Add'
    });
  };


  handleOk = e => {
    this.setState({confirmLoading: true})
    const { actionType } = this.state;
    if(actionType === 'Edit') {
      this.updateUser()
    } else if(actionType === 'Delete') {
      this.deleteUser();
    } else {
      this.addUser()
    }
  };

    handleCancel = e => {
      this.setState({ visible: false, value: ''});

    };
    handleChange({ target }) {
      this.setState({value: target.value});
    }
    render() { 
        return (
          <React.Fragment>
            {
              this.state.users ?
            <Table columns={this.state.columns} dataSource={this.state.users} rowKey="id" />
            :
            <div style={{justifyContent: 'center', display: 'flex'}}>
              <Spin size="large" />
            </div>
            }
            <Modal
                title={this.state.actionType + ' User'}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                confirmLoading={this.state.confirmLoading}
              >
          {this.state.actionType !== 'Delete' ? 
          <Input placeholder="Full Name" onChange={value => this.handleChange(value)} value={this.state.value} />
          : <p>Are You Sure You want to Delete <b>{this.state.value}</b> </p>
          }
          </Modal>
        </React.Fragment>
        );
    }
}
 
export default ListUsers;



