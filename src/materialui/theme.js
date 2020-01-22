import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#212121',
      main: '#484848',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#424242',
      main: '#6d6d6d',
      dark: '#1b1b1b',
      contrastText: '#ffffff',
    },
  },
})