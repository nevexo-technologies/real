import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Typography, useMediaQuery } from "@mui/material";
import createMUITheme from "helpers/createMUITheme";
import { AppProps } from "next/app";
import Link from "next/link";
import { FC } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <ThemeProvider theme={createMUITheme(prefersDarkMode)}>
            <CssBaseline />
            <Header />
            {children}
            <Container sx={{ my: 4 }}>
                <Link href="https://estereal.ro">
                    <Typography sx={{ position: "relative", bottom: 5 }} variant="overline">Creat cu ❤️ de Registrul Educațional Alternativ</Typography>
                </Link>
            </Container>
        </ThemeProvider>
    )
}