// @flow
import React, { Component } from "react";
import { Button, Icon, Input, Switch, Tabs } from "antd";
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

type State = {
  activeKey: string,
  searchQuery: string
};

export default class FiltersTab extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      activeKey: "films",
      searchQuery: ""
    };
  }

  componentDidMount() {
    this.props.getCollectionInfo("films");
    this.setState({ activeKey: "films" });
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
        <Input.Group>
          <Input
            addonAfter={
              <Button
                onClick={() => this.setState({ searchQuery: "" })}
                disabled={this.state.searchQuery === ""}
                type="primary"
                shape="circle"
                icon="close"
                size="small"
              />
            }
            className="search"
            placeholder="Search"
            onChange={e => this.setState({ searchQuery: e.target.value })}
            value={this.state.searchQuery}
          />
        </Input.Group>
        <Tabs
          activeKey={this.state.activeKey}
          onChange={collection => {
            this.props.getCollectionInfo(collection);
            this.setState({ activeKey: collection });
          }}
          tabPosition="left"
          style={{ height: "100%", overflowY: "auto", paddingTop: "20px" }}
        >
          {this.props.knownCollections.map((collectionName, i) => {
            return (
              <TabPane
                tab={capitilizeFirstLetter(collectionName)}
                key={collectionName}
              >
                {this.props.collections[collectionName] &&
                this.props.collections[collectionName].length ? (
                  this.props.collections[collectionName]
                    .filter(({ label }) => {
                      if (this.state.searchQuery !== "") {
                        return (
                          label
                            .toLowerCase()
                            .indexOf(this.state.searchQuery.toLowerCase()) >= 0
                        );
                      } else {
                        return true;
                      }
                    })
                    .sort(function(a, b) {
                      var labelA = a.label.toUpperCase(); // ignore upper and lowercase
                      var labelB = b.label.toUpperCase(); // ignore upper and lowercase
                      if (labelA < labelB) {
                        return -1;
                      }
                      if (labelA > labelB) {
                        return 1;
                      }

                      // labels must be equal
                      return 0;
                    })
                    .map(collectionInfo => (
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
