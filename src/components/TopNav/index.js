import { Icon, Menu } from "antd";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class TopNav extends Component {
  state = {
    current: ""
  };

  componentDidMount() {
    const currentPage = this.props.location.pathname.slice(
      1,
      this.props.location.pathname.length
    );
    this.setState({
      current: currentPage.length > 0 ? currentPage : "home"
    });
  }

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="graph">
          <Link to="/graph">Graph</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item style={{ float: "right" }}>
          <a
            aria-label="Brooks Becton Github Profile"
            href="https://github.com/brooksbecton/SWAPI-Graph"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon style={{ marginRight: 0, fontSize: "1.5em" }} type="github" />
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(TopNav);
