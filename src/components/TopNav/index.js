import React, { Component } from "react";
import { Menu, Icon } from "antd";

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
        <Menu.Item>Home</Menu.Item>
        <Menu.Item>Graph</Menu.Item>
        <Menu.Item>About</Menu.Item>
      </Menu>
    );
  }
}

export default TopNav;
