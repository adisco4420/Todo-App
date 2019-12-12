import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import ListUsers from './user/List';
import { Layout, Menu } from 'antd';
import ListTaskForm from './tasks/List';
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
      <Router>
      <Layout className="layout">
      <Header className="content-layout">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><Link to="/">Todo App</Link> </Menu.Item>
           </Menu>
      </Header>
      <Content className="content-layout">
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        
          <Switch>
          <Route path="/user/:id" component={ListTaskForm} />
          <Route path="/">
          <ListUsers ref={this.child}/>
          </Route>
        </Switch>
      
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Todo App {new Date().getFullYear()} Created by Timilehin</Footer>
      </Layout>
      </Router>
    );
  }
}
 
export default App;