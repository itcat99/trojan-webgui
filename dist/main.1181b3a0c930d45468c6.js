(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{0:function(e,t,n){e.exports=n(5)(0)},10:function(e,t,n){e.exports=n(5)(1)},104:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(33),c=n.n(o),s=n(1),u=n.n(s),i=n(4),p=n.n(i),f=n(51),l=n.n(f),d=n(52),m=n.n(d),v=n(2),S=n(6),h=n.n(S),g=function(e){return Object.prototype.toString.call(e).indexOf("Object")>=0},x={namespace:"config",state:{started:!1,type:"client",basic:{},ssl:{},tcp:{},mysql:{},proxyMode:"pac"},reducer:{updateState:function(e,t){return Object.assign({},e,t)},started:function(e,t){return Object.assign({},e,{started:!!t})},update:function(e,t){var n=t.run_type,r=t.ssl,a=t.tcp,o=t.mysql,c=m()(t,["run_type","ssl","tcp","mysql"]);return function e(t,n){var r=Object.assign({},t);for(var a in n)g(t[a])&&n[a]?r[a]=e(t[a],n[a]):r[a]=n[a];return r}(Object.assign({},e),{basic:Object.assign({},v.BASIC.common,v.BASIC[n],c),ssl:Object.assign({},v.SSL.common,v.SSL[n],r),tcp:Object.assign({},v.TCP.common,v.TCP[n],a),mysql:Object.assign({},v.MYSQL.common,v.MYSQL[n],o)})},changeType:function(e,t){var n=function e(t,n){var r=Object.assign({},t);for(var a in t)g(t[a])&&n[a]?r[a]=e(t[a],n[a]):r[a]=n[a];return r}({basic:Object.assign({},v.BASIC.common,v.BASIC[t]),ssl:Object.assign({},v.SSL.common,v.SSL[t]),tcp:Object.assign({},v.TCP.common,v.TCP[t]),mysql:Object.assign({},v.MYSQL.common,v.MYSQL[t])},e);return l()({type:t},n)}},effect:{getStatus:function(){var e=p()(u.a.mark(function e(t,n){var r,a,o,c;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get("/api/status");case 2:r=e.sent,a=r.data,o=a.start,c=a.proxyMode,n.config.updateState({started:o,proxyMode:c});case 6:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),start:function(){var e=p()(u.a.mark(function e(t,n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.post("/api/start");case 2:n.config.started(!0);case 3:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),stop:function(){var e=p()(u.a.mark(function e(t,n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.post("/api/stop");case 2:n.config.started(!1);case 3:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),exit:function(){var e=p()(u.a.mark(function e(t,n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.post("/api/exit");case 2:n.config.updateState({started:!1});case 3:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),usePac:function(){var e=p()(u.a.mark(function e(t,n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.post("/api/pacon");case 3:n.config.updateState({proxyMode:"pac"}),e.next=9;break;case 6:throw e.prev=6,e.t0=e.catch(0),new Error(e.t0);case 9:case"end":return e.stop()}},e,null,[[0,6]])}));return function(t,n){return e.apply(this,arguments)}}(),useGlob:function(){var e=p()(u.a.mark(function e(t,n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.post("/api/globon");case 3:n.config.updateState({proxyMode:"global"}),e.next=9;break;case 6:throw e.prev=6,e.t0=e.catch(0),new Error(e.t0);case 9:case"end":return e.stop()}},e,null,[[0,6]])}));return function(t,n){return e.apply(this,arguments)}}(),updatePacFile:function(){var e=p()(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.post("/api/updatePac");case 2:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),getConfig:function(){var e=p()(u.a.mark(function e(t,n){var r,a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.get("/api/getConfig");case 2:r=e.sent,a=r.data.msg,n.config.update(a);case 5:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),updateConfig:function(){var e=p()(u.a.mark(function e(t,n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.post("/api/updateConfig",t);case 3:return e.next=5,n.config.getConfig();case 5:e.next=10;break;case 7:throw e.prev=7,e.t0=e.catch(0),new Error(e.t0);case 10:case"end":return e.stop()}},e,null,[[0,7]])}));return function(t,n){return e.apply(this,arguments)}}()}},E=n(6),y=[x,{namespace:"settings",state:"",reducer:{update:function(e,t){return t}},effect:{getRules:function(){var e=p()(u.a.mark(function e(t,n){var r,a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.get("/api/customRules");case 3:r=e.sent,a=r.data.msg,n.settings.update(a),e.next=11;break;case 8:throw e.prev=8,e.t0=e.catch(0),new Error(e.t0);case 11:case"end":return e.stop()}},e,null,[[0,8]])}));return function(t,n){return e.apply(this,arguments)}}(),updateRules:function(){var e=p()(u.a.mark(function e(t){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.post("/api/updateRules",{rules:t});case 3:e.next=8;break;case 5:throw e.prev=5,e.t0=e.catch(0),new Error(e.t0);case 8:case"end":return e.stop()}},e,null,[[0,5]])}));return function(t){return e.apply(this,arguments)}}()}}],w=n(15),A=n.n(w),C=n(16),_=n.n(C),b=n(17),H=n.n(b),k=n(18),O=n.n(k),j=n(19),R=n.n(j),L=n(7),M=n(32),D=n.n(M),P=n(53),T=function(e){var t=e.error;if(t)throw new Error(t);return e.pastDelay?a.a.createElement("div",null,"Loading..."):null},G=function(e){return e.map(function(e,t){var r=e.path,o=function(e){var t=e.path,r=e.component,o=e.author,c=e.layout,s=e.children,u={};return r&&(u.Cmp=function(){return n(27)("./pages".concat(r))}),o&&(u.Author=function(){return n(27)("./pages".concat(o))}),c&&(u.Layout=function(){return n(27)("./pages".concat(c))}),D.a.Map({loader:u,render:function(e,n){var o=e.Author?e.Author.default:null,c=e.Layout?e.Layout.default:null,u=e.Cmp?e.Cmp.default:null,i={history:n.history,location:n.location,match:n.match,staticContext:n.staticContext},p=null;return u&&(p=a.a.createElement(u,n)),s&&(p=a.a.createElement(L.Switch,null,G(s),G([{path:"/"===t?t:"".concat(t,"/"),component:r}]))),c&&(p=a.a.createElement(c,n,p)),o&&(p=a.a.createElement(o,i,p)),p},loading:T,delay:200})}(e);return a.a.createElement(L.Route,{path:r,key:"".concat(r,"_").concat(t),component:Object(L.withRouter)(o)})})},B=function(e){function t(){return A()(this,t),H()(this,O()(t).apply(this,arguments))}return R()(t,e),_()(t,[{key:"render",value:function(){return a.a.createElement(L.Switch,null,G(P),a.a.createElement(L.Route,{component:D()({loader:function(){return n.e(5).then(n.bind(null,106))},loading:function(){return a.a.createElement("div",null,"Loading...")},delay:300})}))}}]),t}(r.PureComponent),I=function(e){return"true"===e?a.a.createElement(L.HashRouter,null,a.a.createElement(B,null)):a.a.createElement(L.BrowserRouter,null,a.a.createElement(B,null))},Y=function(e){function t(){return A()(this,t),H()(this,O()(t).apply(this,arguments))}return R()(t,e),_()(t,[{key:"render",value:function(){return I("true")}},{key:"componentDidMount",value:function(){setTimeout(function(){var e=document.getElementById("loader");e&&e.remove()},200)}}]),t}(r.PureComponent);new c.a({target:"root",entry:a.a.createElement(Y,null),models:y}).run()},11:function(e,t,n){e.exports=n(5)(6)},13:function(e,t,n){e.exports=n(5)(7)},2:function(e,t){e.exports={CATEGOTE_SELECT:["run_type","verify","verify_hostname","prefer_server_cipher","reuse_session","session_ticket","prefer_ipv4","no_delay","keep_alive","fast_open","enabled"],CLIENT:"client",FORWARD:"forward",SERVER:"server",BASIC:{common:{local_addr:"127.0.0.1",local_port:1080,remote_addr:"",remote_port:443,password:[],log_level:1},client:{},forward:{udp_timeout:60,target_addr:"127.0.0.1",target_port:5901},server:{}},SSL:{common:{cert:"",cipher:"ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305-SHA256:ECDHE-RSA-CHACHA20-POLY1305-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:RSA-AES128-GCM-SHA256:RSA-AES256-GCM-SHA384:RSA-AES128-SHA:RSA-AES256-SHA:RSA-3DES-EDE-SHA",sni:"",alpn:["http/1.1"],reuse_session:!0,session_ticket:!1,curves:""},client:{verify:!0,verify_hostname:!0},forward:{verify:!0,verify_hostname:!0},server:{key:"",key_password:"",prefer_server_cipher:!0,session_timeout:600,plain_http_response:"",dhparam:""}},TCP:{common:{no_delay:!0,keep_alive:!0,fast_open:!1,fast_open_qlen:20},client:{},forward:{},server:{prefer_ipv4:!1}},MYSQL:{common:{},client:{},forward:{},server:{enabled:!1,server_addr:"127.0.0.1",server_port:3306,database:"trojan",username:"trojan",password:""}}}},21:function(e,t,n){e.exports=n(5)(4)},27:function(e,t,n){var r={"./pages/Home":[22,0,1],"./pages/Home/":[22,0,1],"./pages/Home/index":[22,0,1],"./pages/Home/index.jsx":[22,0,1],"./pages/Settings":[23,2],"./pages/Settings/":[23,2],"./pages/Settings/index":[23,2],"./pages/Settings/index.jsx":[23,2]};function a(e){if(!n.o(r,e))return Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=r[e],a=t[0];return Promise.all(t.slice(1).map(n.e)).then(function(){return n(a)})}a.keys=function(){return Object.keys(r)},a.id=27,e.exports=a},30:function(e,t,n){e.exports=n(5)(16)},32:function(e,t,n){e.exports=n(5)(30)},49:function(e,t,n){e.exports=n(5)(13)},5:function(e,t){e.exports=vendor_6ce7d231319947f1754f},53:function(e){e.exports=[{path:"/Settings",component:"/Settings/index.jsx"},{path:"/",component:"/Home/index.jsx"}]},56:function(e,t,n){e.exports=n(5)(21)},57:function(e,t,n){e.exports=n(5)(12)},7:function(e,t,n){e.exports=n(5)(25)}},[[104,4,0]]]);