import React, { Component } from "react";
import { CATEGOTE_SELECT, SERVER } from "constants";
import { createContainer } from "@plume/flow";

class Home extends Component {
  componentDidMount() {
    const { getConfig } = this.props.actions;

    /* eslint no-console:0 */
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

  getCmp = (data, name) => {
    const result = [];

    for (const key of Object.keys(data)) {
      let viewKey = key;
      const val = data[key];
      if (key === "password" && name === "mysql") {
        viewKey = "mysql_password";
      }

      result.push(
        <div key={`${viewKey}`}>
          <label htmlFor={viewKey}>{key}: </label>
          {this.isSelect(viewKey) ? (
            <>
              <select id={viewKey} name={viewKey} defaultValue={`${val}`}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </>
          ) : (
            <>
              <input id={viewKey} name={viewKey} defaultValue={val}></input>
            </>
          )}
        </div>,
      );
    }

    return result;
  };

  isSelect = key => CATEGOTE_SELECT.indexOf(key) >= 0;

  submit = e => {
    e.preventDefault();
  };

  save = () => {
    const config = new FormData(this.form);
    const { updateConfig } = this.props.actions;
    updateConfig(config);
  };

  start = () => {
    const { start } = this.props.actions;

    start && start();
  };

  render() {
    const { state } = this.props;
    const { type, basic, ssl, tcp, mysql } = state;
    console.log("state: ", state);
    return (
      <div>
        <form
          id="config"
          ref={el => (this.form = el)}
          onSubmit={this.submit}
          encType="multipart/form-data"
        >
          {this.getTypeCmp(type)}
          {this.getCmp(basic, "basic")}
          <h3>SSL</h3>
          {this.getCmp(ssl, "ssl")}
          <h3>TCP</h3>
          {this.getCmp(tcp, "tcp")}
          {type === SERVER ? (
            <>
              <h3>MYSQL</h3>
              {this.getCmp(mysql, "mysql")}
            </>
          ) : null}
        </form>
        <button onClick={this.start}>start</button>
        <button onClick={this.save}>save</button>
        <button form="config" type="reset">
          reset
        </button>
      </div>
    );
  }
}

export default createContainer(Home, {
  namespace: "config",
});
