import { ThemeProvider } from "@emotion/react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import createMUITheme from "helpers/createMUITheme";
import { AppProps } from "next/app";
import { FC } from "react";
import Header from "./Header";

export default function Layout({ children } : { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <ThemeProvider theme={createMUITheme(prefersDarkMode)}>
            <CssBaseline />
            <Header />
            {children}
        </ThemeProvider>
    )
}