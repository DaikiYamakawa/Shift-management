import React from 'react'
import { render } from 'react-dom'
import DemoApp from './DemoApp'
import Submit_Shift from './Submit_Shift'
import Make_Shift from './Make_Shift'
import Register_Person from './Register_Person'
import Register_Skill from './Register_Skill'
import Register_Time from './Register_Time'
import Register_Store from './Register_Store'
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
          <Route path="/submit-shift" component={Submit_Shift} />
          <Route path="/make-shift" component={Make_Shift} />
          <Route path="/register-person" component={Register_Person} />
          <Route path="/register-skill" component={Register_Skill} />
          <Route path="/register-time" component={Register_Time} />
          <Route path="/register-store" component={Register_Store} />
        </Switch>
      </MuiThemeProvider>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
