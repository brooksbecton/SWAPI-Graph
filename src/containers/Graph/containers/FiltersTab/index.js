// @flow

import React, { Component } from "react";
import { Icon, Switch, Tabs } from "antd";
import capitilizeFirstLetter from "./../../../../lib/capitilizeFirstLetter";
import "./index.css";

const TabPane = Tabs.TabPane;

type Props = {
  collections: {},
  knownCollections: string[],
  getCollectionInfo: (x: string) => null,
  setNodes: (collection: {}) => null,
  removeNodes: (collection: {}) => null
};

export default class FiltersTab extends Component<Props> {
  componentDidMount() {
    this.props.getCollectionInfo("films");
  }

  handleSwitchChange = (isSwitched: boolean, collection: {}) => {
    if (isSwitched) {
      this.props.setNodes(collection);
    } else {
      this.props.removeNodes(collection);
    }
  };

  render() {
    return (
      <div className="filterContainer">
        <Tabs
          defaultActiveKey="films"
          onChange={collection => this.props.getCollectionInfo(collection)}
          tabPosition="left"
          style={{ overflowY: "auto" }}
        >
          {this.props.knownCollections.map((collectionName, i) => {
            return (
              <TabPane
                tab={capitilizeFirstLetter(collectionName)}
                key={collectionName}
                style={{ overflowY: "auto" }}
              >
                {this.props.collections[collectionName] &&
                this.props.collections[collectionName].length ? (
                  this.props.collections[collectionName].map(collectionInfo => (
                    <Switch
                      key={collectionInfo.label}
                      checkedChildren={collectionInfo.label}
                      unCheckedChildren={collectionInfo.label}
                      onChange={isSwitched =>
                        this.handleSwitchChange(isSwitched, collectionInfo)
                      }
                    />
                  ))
                ) : (
                  <Icon type="loading" />
                )}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    );
  }
}
