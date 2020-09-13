import React from "react";
import { render } from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import DemoApp from "./components/DemoApp";
import submitShift from "./components/submitShift";
import makeShift from "./components/makeShift";
import registerPerson from "./components/registerPerson";
import registerSkill from "./components/registerSkill";
import registerTime from "./components/registerTime";
import registerStore from "./components/registerStore";
import { theme } from "./materialui/theme";
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";
import store from "./stores/";

render(
  <Router>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <PersistentDrawerLeft />
        <Switch>
          <Route exact path="/" component={DemoApp} />
          <Route path="/submit-shift" component={submitShift} />
          <Route path="/make-shift" component={makeShift} />
          <Route path="/register-person" component={registerPerson} />
          <Route path="/register-skill" component={registerSkill} />
          <Route path="/register-time" component={registerTime} />
          <Route path="/register-store" component={registerStore} />
        </Switch>
      </MuiThemeProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);
