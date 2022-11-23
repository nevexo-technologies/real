import Header from "@components/Header";
import Layout from "@components/Layout";
import { Box, Typography, Autocomplete, TextField, CircularProgress, Skeleton, Alert, useMediaQuery, styled, alpha, Chip, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import useSWR from "swr";

const StyledTextField = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
    '&:hover': {
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
    },
    '&.Mui-focused': {
      backgroundColor: alpha(theme.palette.background.paper, 1),
    },
  }
}));

export default function Rezultate() {
  const router = useRouter();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { data: availHs, error: hsError } = useSWR<{ name: string, records: number }[], any>("/api/hs");

  return (
    <Layout>
      <Container sx={{ backgroundImage: (prefersDarkMode ? "url(/background-dark.png)" : "url(/background-light.png)") }} maxWidth="xl">
        <Container sx={{ py: 10 }} maxWidth="lg">
          <Typography variant="h3">
            Caută rezultatele liceului tău!
            <Autocomplete
              freeSolo
              disableClearable
              options={availHs ? availHs.map(({ name }) => name) : []}
              sx={{ width: "70%", my: 2 }}
              onChange={(e, value) => router.push(`/${value}`)}
              renderInput={(params) => {

                if (!availHs && !hsError) return <Skeleton variant="rounded" height={50} />
                if (hsError) return <Alert severity="error">Eroare la încărcarea datelor - vă rugăm reîncercați</Alert>

                return (
                  <StyledTextField
                    {...params}
                    variant="filled"
                    label="Caută liceul..."
                    // sx={(theme) => { return { backgroundColor: theme.palette.background.paper } }}
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                );
              }}
            />
          </Typography>
        </Container>
      </Container>
      <Container sx={{ my: 5, textAlign: "center" }} maxWidth="lg">
        <Typography variant="h4" sx={{ my: 2 }}>Top licee</Typography>
        <Chip label="Coming soon..." />
        <Grid sx={{ my: 2 }} container spacing={2}>
          <Grid item xs={4}>
            <Skeleton variant="rounded" height={200} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton variant="rounded" height={200} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton variant="rounded" height={200} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}