import React, { Component } from "react";
import axios from "axios";
import { CLIENT, CATEGOTE_SELECT } from "constants";
import { createContainer } from "@plume/flow";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = CLIENT;
  }

  componentDidMount() {}

  getTypeCmp = type => {
    return (
      <select id="run_type" name="run_type" defaultValue={type}>
        <option value="client">client</option>
        <option value="forward">forward</option>
        <option value="server">server</option>
      </select>
    );
  };

  getBasicCmp = type => {};

  render() {
    console.log("props", this.props);
    const { state } = this.props;
    const { type, basic, ssl, tcp, mysql } = state;

    return <div>{this.getTypeCmp(type)}</div>;
  }
}

export default createContainer(Home, {
  namespace: "config",
});
