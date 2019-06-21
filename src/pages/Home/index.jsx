import React, { Component } from "react";
import { CATEGOTE_SELECT, SERVER } from "constants";
import { createContainer } from "@plume/flow";

class Home extends Component {
  componentDidMount() {
    const { getConfig, getStatus } = this.props.actions;

    /* eslint no-console:0 */
    console.log("did mount");
    getConfig().then(() => {}, err => console.error(err));
    getStatus().then(() => {}, err => console.error(err));
  }

  changeType = e => {
    const type = e.target.value;
    const { changeType } = this.props.actions;

    changeType(type);
  };

  usePac = () => {
    const { usePac } = this.props.actions;

    usePac &&
      usePac()
        .then(() => console.log("Used Pac"))
        .catch(err => console.error(err));
  };

  useGlob = () => {
    const { useGlob } = this.props.actions;

    useGlob &&
      useGlob()
        .then(() => console.log("Used Glob"))
        .catch(err => console.error(err));
  };

  updatePacFile = () => {
    const { updatePacFile } = this.props.actions;
    updatePacFile &&
      updatePacFile()
        .then(() => console.log("update Pac file successed!"))
        .catch(err => console.error(err));
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

  stop = () => {
    const { stop } = this.props.actions;

    stop && stop();
  };

  exit = () => {
    const { exit } = this.props.actions;

    exit && exit();
  };

  getStatus = () => {
    const { getStatus } = this.props.actions;

    getStatus && getStatus();
  };

  render() {
    const { state } = this.props;
    const { type, basic, ssl, tcp, mysql, proxyMode, started } = state;
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
        {/* <div>Proxy Mode: {proxyMode}</div> */}
        <button
          style={started ? { background: "rgb(100,200,100)", color: "#fff" } : null}
          onClick={this.start}
        >
          start
        </button>
        <button
          style={!started ? { background: "rgb(100,200,100)", color: "#fff" } : null}
          onClick={this.stop}
        >
          stop
        </button>
        <button onClick={this.getStatus}>get status</button>
        <button
          style={proxyMode === "pac" ? { background: "rgb(100,200,100)", color: "#fff" } : null}
          onClick={this.usePac}
        >
          use pac
        </button>
        <button
          style={proxyMode === "pac" ? null : { background: "rgb(100,200,100)", color: "#fff" }}
          onClick={this.useGlob}
        >
          use global
        </button>
        <button onClick={this.updatePacFile}>update pac file</button>
        <button onClick={this.save}>save</button>
        <button form="config" type="reset">
          reset
        </button>
        <button onClick={this.exit}>Exit</button>
      </div>
    );
  }
}

export default createContainer(Home, {
  namespace: "config",
});
