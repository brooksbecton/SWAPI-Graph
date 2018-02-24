import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";

import "./index.css";

import About from "./../About";
import Graph from "./../Graph";
import Home from "./../Home";

import TopNav from "./../../components/TopNav";

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header className="topNav">
          <TopNav />
        </Header>
        <Content className="content">
          <Route exact path="/about" component={About} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Route exact path="/graph" component={Graph} />
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
