import React from 'react'
import { render } from 'react-dom'
import DemoApp from './DemoApp'
import submitShift from './submitShift'
import makeShift from './makeShift'
import registerPerson from './registerPerson'
import registerSkill from './registerSkill'
import registerTime from './registerTime'
import registerStore from './registerStore'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './materialui/theme'
import MenuAppBar from './MenuAppBar'
import PersistentDrawerLeft from './PersistentDrawerLeft'
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom"

render(
  <BrowserRouter>
    <div>
      <MuiThemeProvider theme={theme}>
        <PersistentDrawerLeft></PersistentDrawerLeft>
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
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
