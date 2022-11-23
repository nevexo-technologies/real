// Creates MUI Theme for use in ThemeProvider

import { createTheme } from '@mui/material/styles';

export default function createMUITheme(prefersDarkMode: boolean) {
    return createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            primary: {
                main: "#FDAF4B",
            },
            secondary: {
                main: "#FC7C3F",
            },
        },
        typography: {
            fontFamily: "Montserrat, sans-serif",
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: `
                @font-face {
                  font-family: 'Raleway';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 400;
                }
              `,
            },
        },
    });
}

