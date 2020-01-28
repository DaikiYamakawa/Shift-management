import React from 'react'
import { render } from 'react-dom'
import DemoApp from './DemoApp'
import Sample from './sample'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './materialui/theme'
import MenuAppBar from './MenuAppBar'
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom"

render(
  <BrowserRouter>
    <div>
      <MuiThemeProvider theme={theme}>
        <MenuAppBar></MenuAppBar>
        <Switch>
          <Route exact path="/" component={DemoApp} />
          <Route path="/shift" component={Sample} />
        </Switch>
      </MuiThemeProvider>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
