(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{19:function(e,t,n){"use strict";n.r(t);var a=n(28),r=n.n(a),c=n(29),o=n.n(c),l=n(30),i=n.n(l),s=n(31),u=n.n(s),p=n(55),f=n.n(p),m=n(32),h=n.n(m),d=n(54),g=n.n(d),E=n(0),v=n.n(E),b=n(2),y=n(33),C=n(105),k=n.n(C),w=function(e){function t(e){var n;return r()(this,t),n=i()(this,u()(t).call(this,e)),g()(f()(n),"changeType",function(e){var t=e.target.value;(0,n.props.actions.changeType)(t)}),g()(f()(n),"usePac",function(){var e=n.props.actions.usePac;e&&e().then(function(){}).catch(function(e){})}),g()(f()(n),"useGlob",function(){var e=n.props.actions.useGlob;e&&e().then(function(){}).catch(function(e){})}),g()(f()(n),"updatePacFile",function(){var e=n.props.actions.updatePacFile;e&&e().then(function(){}).catch(function(e){})}),g()(f()(n),"getTypeCmp",function(e){return v.a.createElement("div",null,v.a.createElement("label",{htmlFor:"run_type"},"run_type: "),v.a.createElement("select",{id:"run_type",name:"run_type",defaultValue:e,onChange:n.changeType},v.a.createElement("option",{value:"client"},"client"),v.a.createElement("option",{value:"forward"},"forward"),v.a.createElement("option",{value:"server"},"server")))}),g()(f()(n),"getCmp",function(e,t){for(var a=[],r=0,c=Object.keys(e);r<c.length;r++){var o=c[r],l=o,i=e[o];"password"===o&&"mysql"===t&&(l="mysql_password"),a.push(v.a.createElement("div",{key:"".concat(l)},v.a.createElement("label",{htmlFor:l},o,": "),n.isSelect(l)?v.a.createElement(v.a.Fragment,null,v.a.createElement("select",{id:l,name:l,defaultValue:"".concat(i)},v.a.createElement("option",{value:"true"},"true"),v.a.createElement("option",{value:"false"},"false"))):v.a.createElement(v.a.Fragment,null,v.a.createElement("input",{id:l,name:l,defaultValue:i}))))}return a}),g()(f()(n),"isSelect",function(e){return b.CATEGOTE_SELECT.indexOf(e)>=0}),g()(f()(n),"submit",function(e){e.preventDefault()}),g()(f()(n),"save",function(){var e=new FormData(n.form);(0,n.props.actions.updateConfig)(e)}),g()(f()(n),"start",function(){var e=n.props.actions.start;e&&e()}),g()(f()(n),"stop",function(){var e=n.props.actions.stop;e&&e()}),g()(f()(n),"exit",function(){var e=n.props.actions.exit;e&&e()}),g()(f()(n),"getQrcode",function(){var e=n.props.state,t=e.basic,a=e.ssl,r=e.tcp,c=e.mysql,o=e.type,l=Object.assign({},t,{type:o,ssl:a,tcp:r});"server"===o&&(l.mysql=c),k.a.toString(JSON.stringify(l,null,2),{type:"svg"},function(e,t){if(e)throw new Error(e);n.setState({qrcode:t})})}),n.state={qrcode:""},n}return h()(t,e),o()(t,[{key:"componentDidMount",value:function(){var e=this.props.actions,t=e.getConfig,n=e.getStatus;t().then(function(){},function(e){}),n().then(function(){},function(e){})}},{key:"render",value:function(){var e=this,t=this.state.qrcode,n=this.props.state,a=n.type,r=n.basic,c=n.ssl,o=n.tcp,l=n.mysql,i=n.proxyMode,s=n.started;return v.a.createElement("div",null,v.a.createElement("form",{id:"config",ref:function(t){return e.form=t},onSubmit:this.submit,encType:"multipart/form-data"},this.getTypeCmp(a),this.getCmp(r,"basic"),v.a.createElement("h3",null,"SSL"),this.getCmp(c,"ssl"),v.a.createElement("h3",null,"TCP"),this.getCmp(o,"tcp"),a===b.SERVER?v.a.createElement(v.a.Fragment,null,v.a.createElement("h3",null,"MYSQL"),this.getCmp(l,"mysql")):null),v.a.createElement("button",{style:s?{background:"rgb(100,200,100)",color:"#fff"}:null,onClick:this.start},"start"),v.a.createElement("button",{style:s?null:{background:"rgb(100,200,100)",color:"#fff"},onClick:this.stop},"stop"),v.a.createElement("button",{style:"pac"===i?{background:"rgb(100,200,100)",color:"#fff"}:null,onClick:this.usePac},"use pac"),v.a.createElement("button",{style:"pac"===i?null:{background:"rgb(100,200,100)",color:"#fff"},onClick:this.useGlob},"use global"),v.a.createElement("button",{onClick:this.updatePacFile},"update pac file"),v.a.createElement("button",{onClick:this.save},"save"),v.a.createElement("button",{form:"config",type:"reset"},"reset"),v.a.createElement("button",{onClick:this.exit},"Exit"),v.a.createElement("button",{onClick:this.getQrcode},"get qrcode"),t?v.a.createElement("div",{style:{width:"200px",height:"200px"},dangerouslySetInnerHTML:{__html:t}}):null)}}]),t}(E.Component);t.default=Object(y.createContainer)(w,{namespace:"config"})}}]);