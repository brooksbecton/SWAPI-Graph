import { Layout } from "antd";
import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";
import TopNav from "./../../components/TopNav";

const AsyncAbout = Loadable({
  loader: () => import("./../About"),
  loading() {
    return <div>Loading...</div>;
  }
});

const AsyncHome = Loadable({
  loader: () => import("./../Home"),
  loading() {
    return <div>Loading...</div>;
  }
});

const AsyncGraph = Loadable({
  loader: () => import("./../Graph"),
  loading() {
    return <div>Loading...</div>;
  }
});

const { Header, Content } = Layout;

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout>
        <Header className="topNav">
          <TopNav />
        </Header>
        <Content className="content">
          <Route exact path="/" component={AsyncHome} />
          <Route exact path="/about" component={AsyncAbout} />
          <Route exact path="/home" component={AsyncHome} />
          <Route exact path="/graph" component={AsyncGraph} />
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
