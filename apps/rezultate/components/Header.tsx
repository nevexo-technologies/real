import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, Divider, InputBase, Box, Button, TextField, listItemSecondaryActionClasses, Alert, Autocomplete, Skeleton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image";
import logo from "../public/logo.png";
import Link from 'next/link';
import router from 'next/router';
import useSWR from 'swr';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    backgroundColor: alpha(theme.palette.background.paper, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.background.paper, 0.1),
    },
  }
}));

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha("#000", 0.05),
//   '&:hover': {
//     backgroundColor: alpha("#000", 0.10),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '14ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

export default function Header() {
  const { data: availHs, error: hsError } = useSWR<{ hs: string, records: number }[], any>("/api/hs");

  // const handleChange = (value: string) => {
  //   if (availHs) {
  //     const filteredHs = availHs.filter((hs) => hs.hs.toLowerCase().includes(value.toLowerCase()));
  //     if (filteredHs.length === 1) {
  //       router.push(`/${filteredHs[0].hs}`);
  //     }
  //   }
  // }

  return (
    <>
      <AppBar position="sticky" color="default">
        <Container maxWidth="xl">
          <Toolbar>
            <Link href="/" passHref>
              <Image src={logo} alt="Logo" height={55} />
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography sx={{ mx: 1.5, flexGrow: 1, textTransform: "uppercase", letterSpacing: "2px", display: { xs: 'none', sm: 'block' } }} color="inherit">
              Rezultate
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button href="/top">
                <Typography color={(theme) => theme.palette.text.primary}>
                  Top licee
                </Typography>
              </Button>
            </Box>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Căutare liceu..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleChange(e.target.value)}
              />
            </Search> */}
            <Autocomplete
              disableClearable
              options={availHs ? availHs.map(({ hs }) => hs) : []}
              sx={{ width: { md: "20%", sm: "50%", xs: "100%" }, my: 2, mx: 2 }}
              onChange={(e, value) => router.push(`/${value}`)}
              renderInput={(params) => {

                if (!availHs && !hsError) return <Skeleton variant="rounded" height={50} />
                if (hsError) return <Alert severity="error">Eroare la încărcarea datelor - vă rugăm reîncercați</Alert>

                return (
                  <StyledTextField
                    {...params}
                    label="Caută liceul..."
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                );
              }}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
