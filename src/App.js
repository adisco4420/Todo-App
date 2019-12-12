import React, { Component } from 'react';
import './App.css';
import ListUsers from './user/List';
import { Layout, Menu, Button, Icon } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
  }
  state = {  }
  handleClick = () => {
    this.child.current.showModal();
  }
  render() { 
    return (
      <Layout className="layout">
      <Header className="content-layout">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">Enye Test</Menu.Item>
          <React.Fragment>
          <Button onClick={this.handleClick} style={{float: 'right', marginTop: '10px'}} type="primary">
          <Icon type="user-add" /> Add User</Button>
          </React.Fragment>
           </Menu>
      </Header>
      <Content className="content-layout">
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <ListUsers ref={this.child}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Enye {new Date().getFullYear()} Created by Alabi Sodiq</Footer>
      </Layout>
    );
  }
}
 
export default App;