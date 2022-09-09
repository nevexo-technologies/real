import { CssBaseline, Box, useMediaQuery, ThemeProvider } from '@mui/material';
import createMUITheme from './MUITheme';

export default function Layout({ children }) {
    const prefersDarkMode = useMediaQuery(' (prefers-color-scheme: dark) ');

    return (
        <ThemeProvider theme={createMUITheme(prefersDarkMode)}>
            <CssBaseline />
            <Box sx={{
                py: 3,
                minHeight: "100vh",
                height: "100%",
                backgroundImage: prefersDarkMode ? "url(/background-dark.png)" : "url(/background-light.png)",
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}