// theme.js
import { mode } from '@chakra-ui/theme-tools';
// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'



// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,

}

// 3. extend the theme
const theme = extendTheme({
  config
/*
  styles: {
    global: {
      // styles for the `body`
      div: {
        bg: 'green.700',
      },
    },
  },*/

})

export default theme