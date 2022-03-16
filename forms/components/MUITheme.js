import { useMediaQuery } from '@mui/material';
import { createTheme, experimental_sx as sx } from '@mui/material/styles';

let baseTheme = {
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "10px"
                }
            }
        },
    }
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#1e2227',
        },
    },
    components: {
        MuiContainer: {
            variants: [
                {
                    props: { variant: 'floating' },
                    style: sx({
                        my: 2,
                        py: 3,
                        boxShadow: 5,
                        borderRadius: 5,
                        backgroundColor: '#101010',
                    })
                }
            ],
        }
    }
});

const whiteTheme = createTheme({
    pallete: {
        mode: 'white'
    },
    components: {
        MuiContainer: {
            variants: [
                {
                    props: { variant: 'floating' },
                    style: sx({
                        my: 2,
                        py: 3,
                        boxShadow: 5,
                        borderRadius: 5,
                        backgroundColor: '#fff',
                    })
                }
            ],
        }
    }
}, baseTheme);

export {
    whiteTheme,
    darkTheme
}