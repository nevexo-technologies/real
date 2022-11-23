import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, Divider, InputBase, Box, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image";
import logo from "../public/logo.png";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#000", 0.05),
  '&:hover': {
    backgroundColor: alpha("#000", 0.10),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  return (
    <>
      <AppBar position="sticky" color="default">
        <Container maxWidth="xl">
          <Toolbar>
            <Image src={logo} alt="Logo" height={55} />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography sx={{ mx: 1.5, flexGrow: 1, textTransform: "uppercase", letterSpacing: "2px" }} color="inherit">
              Rezultate
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button>
                <Typography color={(theme)=>theme.palette.text.primary}>
                  Top licee
                </Typography>
              </Button>
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Căutare liceu..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
