import { useMediaQuery } from '@mui/material';
import { createTheme, experimental_sx as sx } from '@mui/material/styles';
import { create } from 'yup/lib/Reference';

export default function createMUITheme(isDarkMode) {
    const theme = {
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            background: {
                default: '#1e2227',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "10px"
                    }
                }
            },
            MuiContainer: {
                variants: [
                    {
                        props: { variant: 'floating' },
                        style: sx({
                            marginBottom: 2,
                            py: 3,
                            boxShadow: 5,
                            borderRadius: 5,
                            backgroundColor: isDarkMode ? '#101010' : '#fff',
                        })
                    }
                ],
            }
        }
    }

    return createTheme(theme);
}
