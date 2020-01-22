import React from 'react'
import { render } from 'react-dom'
import DemoApp from './DemoApp'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './materialui/theme'

render(
  <MuiThemeProvider theme={theme}>
    <DemoApp />
  </MuiThemeProvider>,
  document.getElementById('root')
)
