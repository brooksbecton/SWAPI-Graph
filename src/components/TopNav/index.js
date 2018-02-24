import { Menu } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class TopNav extends Component {
  state = {
    current: "mail"
  };
  handleClick = e => {
    console.log("click ", e);
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
        <Menu.Item>
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/graph">Graph</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/about">About</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default TopNav;
