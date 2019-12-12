import React, { Component } from 'react';
import { Table, Divider, Icon, Modal, Input, 
    Spin, Button, Form , Select } from 'antd';
import axios from 'axios';
const api = 'https://agile-refuge-28120.herokuapp.com/api';
const {  Option } = Select

class ListTasks extends Component {

     state = { 
        visible: false,
        confirmLoading: false,
        value: null,
        actionType: 'Add',
        users: null,
        taskId: '',
        columns:  [
          {
              title: 'Id',
              dataIndex: 'id',
              key: 'id',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
          },
          {
            title: 'State',
            dataIndex: 'state',
            key: 'state'
          },
          {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at'
          },
          {
            title: 'Action',
            key: 'action',
            render: (task) => (
              <span>
                <span onClick={() => this.handleUpdate(task)} ><Icon type="edit" /></span>
              </span>
            ),
          },
        ]
      };
      componentDidMount() {
        const id = this.props.match.params.id
        this.fetchTasks(id);
      }
    
      fetchTasks = async (id) => {
          try {
            const res = await axios.get(api + `/user/${id}/tasks`);
            this.setState({users: res.data})
          } catch (error) {
            console.log(error.response);
          }
      }
      addTask = async () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({confirmLoading: true})
                console.log('Received values of form: ', values);
                this.handelAdd(values)
            }
          });
      }
      handelAdd = async (values) => {
        const id = this.props.match.params.id;
        const body = values
        try {
            await axios.post(api + `/userTask/${id}`, body);
            this.setState({visible: false,  confirmLoading: false, value: ''})
            Modal.success({content: 'Task Added Successfully'});
            this.fetchTasks(id);
          } catch (error) {
            console.log(error.response);
          }
      }
      updateTask = async () => {
        const body = this.props.form.getFieldsValue();
        this.setState({confirmLoading: true})
        try {
          await axios.put(api + `/userTask/${this.state.taskId}/update`, body);
          this.setState({visible: false,  confirmLoading: false})
          const id = this.props.match.params.id
          this.fetchTasks(id);
          Modal.success({content: 'Task Updated Successfully'});
        } catch (error) {
          console.log(error.response);
        }
      }
      handleUpdate = (task) => {
          
        this.setState({
          actionType: 'Edit', value: task.name, 
          taskId: task.id, visible: true});
          this.props.form.setFieldsValue({
              description: task.description,
              state: task.state
          });
      }
      showModal = () => {
        this.setState({
          visible: true,
          actionType: 'Add'
        });        
      };
    
    
      handleOk = e => {
        const { actionType } = this.state;
        if(actionType === 'Edit') {
          this.updateTask()
        } else {
          this.addTask()
        }
      };
    
        handleCancel = e => {
          this.setState({ visible: false, value: ''});
    
        };
        handleChange({ target }) {
          this.setState({value: target.value});
        }
        render() { 
            const { getFieldDecorator } = this.props.form;
            return (
              <React.Fragment>
                {
                  this.state.users ?
                <React.Fragment>
                <div >
                {/* <h2>Tasks</h2> */}
                <Button onClick={this.showModal}  type="primary">
                <Icon type="unordered-list" /> Add Task </Button>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.users} rowKey="id" />
                </React.Fragment>
                :
                <div style={{justifyContent: 'center', display: 'flex'}}>
                  <Spin size="large" />
                </div>
                }
                <Modal
                    title={this.state.actionType + ' Task'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                  >
      <Form  className="login-form">
        <Form.Item>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Task Description required' }],
          })(
            <Input
              placeholder="Description"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('state', {
            rules: [{ required: true, message: 'Task State required' }],
          })(
            <Select
            placeholder="State"
            onChange={this.handleSelectChange}
          >
            <Option value="to do">todo</Option>
            <Option value="done">done</Option>
          </Select>,
          )}
        </Form.Item>
      </Form>

              </Modal>
            </React.Fragment>
            );
        }
}
const ListTaskForm = Form.create({ name: 'list_task' })(ListTasks);
export default ListTaskForm;