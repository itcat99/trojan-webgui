import React, { Component } from "react";
import { CATEGOTE_SELECT, SERVER } from "constants";
import { createContainer } from "@plume/flow";

class Home extends Component {
  componentDidMount() {
    const { getConfig } = this.props.actions;

    getConfig().then(() => {}, err => console.error(err));
  }

  changeType = e => {
    const type = e.target.value;
    const { changeType } = this.props.actions;

    changeType(type);
  };

  getTypeCmp = type => {
    return (
      <div>
        <label htmlFor="run_type">run_type: </label>
        <select id="run_type" name="run_type" defaultValue={type} onChange={this.changeType}>
          <option value="client">client</option>
          <option value="forward">forward</option>
          <option value="server">server</option>
        </select>
      </div>
    );
  };

  getCmp = data => {
    const result = [];

    for (const key of Object.keys(data)) {
      const val = data[key];

      result.push(
        <div key={`${key}`}>
          <label htmlFor={key}>{key}: </label>
          {this.isSelect(key) ? (
            <>
              <select id={key} name={key} defaultValue={`${val}`}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </>
          ) : (
            <>
              <input id={key} name={key} defaultValue={val}></input>
            </>
          )}
        </div>,
      );
    }

    return result;
  };

  isSelect = key => CATEGOTE_SELECT.indexOf(key) >= 0;

  render() {
    const { state } = this.props;
    const { type, basic, ssl, tcp, mysql } = state;

    console.log("props", type);
    return (
      <div>
        {this.getTypeCmp(type)}
        {this.getCmp(basic)}
        <h3>SSL</h3>
        {this.getCmp(ssl)}
        <h3>TCP</h3>
        {this.getCmp(tcp)}
        {type === SERVER ? (
          <>
            <h3>MYSQL</h3>
            {this.getCmp(mysql)}
          </>
        ) : null}
      </div>
    );
  }
}

export default createContainer(Home, {
  namespace: "config",
});
