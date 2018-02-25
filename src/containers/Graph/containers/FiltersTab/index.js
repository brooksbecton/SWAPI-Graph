// @flow

import React, { Component } from "react";
import { Switch, Tabs } from "antd";
import capitilizeFirstLetter from "./../../../../lib/capitilizeFirstLetter";
import "./index.css";

const TabPane = Tabs.TabPane;
type Props = {
  collections: string[]
};

export default class FiltersTab extends Component<Props> {
  render() {
    return (
      <div className="filterContainer">
        {" "}
        <Tabs tabPosition="left">
          {this.props.collections.map((collection, i) => (
            <TabPane tab={capitilizeFirstLetter(collection)} key={i}>
              <Switch
                checkedChildren="A New Hope"
                unCheckedChildren="A New Hope"
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
