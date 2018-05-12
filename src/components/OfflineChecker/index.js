// @flow

/**
  Component monitors/handles network status and displays a toast when it detects an offline status. 
 */

import React, { Component } from "react";
import { message } from "antd";

type Props = {
  handleNetworkChange: ?(isOnline: boolean) => null
};

type State = {
  online: boolean
};

class OfflineChecker extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      online: true
    };
  }

  componentDidMount() {
    this.addOfflineListener();
  }

  componentWillUnmount() {
    this.removeNetworkListeners();
  }

  addOfflineListener = (): void => {
    window.addEventListener("offline", this.updateOnlineStatus);
  };
  removeNetworkListeners = (): void => {
    window.removeEventListener("offline", this.updateOnlineStatus);
  };

  updateOnlineStatus = (): void => {
    const isOnline: boolean = navigator.onLine;

    if (!isOnline) {
      if (this.props.handleNetworkChange) {
        this.props.handleNetworkChange(isOnline);
      }

      window.addEventListener("online", this.updateOnlineStatus);
    } else {
      window.removeEventListener("online", () => {});
    }

    this.setState({ online: isOnline });
  };

  render() {
    return (
      <div>{!this.state.online && message.warning("You are offline.")}</div>
    );
  }
}

export default OfflineChecker;
