import React, { Component } from "react";
import axios from "axios";
import { createContainer } from "@plume/flow";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rules: "",
    };
  }
  componentDidMount() {
    const { getRules } = this.props.actions;

    getRules && getRules();
  }

  upload = () => {
    const { value } = this.$rules;
    const { updateRules } = this.props.actions;

    updateRules && updateRules(value);
  };

  render() {
    const { state } = this.props;

    return (
      <div>
        Hello Settings Page.
        <textarea ref={el => (this.$rules = el)} defaultValue={state}></textarea>
        <button onClick={this.upload}>upload</button>
      </div>
    );
  }
}

export default createContainer(Settings, {
  namespace: "settings",
});
