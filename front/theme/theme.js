import { createTheme } from '@mui/material/styles';
import { blue, green, red, yellow } from '@mui/material/colors';


const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
      secondary: {
        main: blue[500],
      },
      text: {
        disabled: 'black'
      }
    },
  });

  export default theme