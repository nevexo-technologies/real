import Layout from "@components/Layout";
import { Alert, Avatar, Box, Card, CardContent, Chip, CircularProgress, CircularProgressProps, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { HsProcessed } from "helpers/getHsMetrics";
import { useRouter } from "next/router";
import useSWR from "swr";
import NumbersIcon from '@mui/icons-material/Numbers';
import MetricCard from "@components/MetricCard";

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Head from "next/head";

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Avatar src="/logo.png" />
                <Typography
                    variant="h6"
                    color="text.secondary"
                ><b>{(props.value / 10).toFixed(2)}</b></Typography>
            </Box>
        </Box>
    );
}

export default function HighschoolPage() {
    const { highschool } = useRouter().query;
    const { data, error } = useSWR<{ highschool: string, records: number } & HsProcessed>(highschool ? `/api/hs/${highschool}` : null);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    
    const facilitiesArray = ["Bănci", "Scaune", "Catedră", "Spații de depozitare", "Tablă", "Aer condiționat", "Calculatoare",
        "Laboratoare", "Automat cu mâncare", "Cretă/Markere", "Săpun", "Hârtie igienică", "Dezinfectant", "Burete pentru tablă",
        "Consumabile pentru laboratoare (de exemplu, reactivi pentru laboratorul de chimie etc.)"]

    if (!data && !error) {
        return (
            <Layout>
                <Head>
                    <title>Rezultate {highschool} | Registrul Educațional Alternativ</title>
                </Head>
                <Container sx={{ py: 10, display:"flex", justifyContent: "center" }} maxWidth="lg">
                    <CircularProgress />
                </Container>
            </Layout>
        )
    }

    if (error) return (
        <Layout>
            <Head>
                <title>Rezultate {highschool} | Registrul Educațional Alternativ</title>
            </Head>
            <Container>
                <Alert severity="error" sx={{ my: 4 }}>Eroare la încărcarea datelor - vă rugăm reîncercați</Alert>
            </Container>
        </Layout>
    )

    return (
        <Layout>
            <Head>
                <title>Rezultate {highschool} | Registrul Educațional Alternativ</title>
            </Head>
            <Box sx={{ backgroundImage: (prefersDarkMode ? "url(/background-dark.png)" : "url(/background-light.png)") }}>
                <Container>
                    <Grid sx={{ py: 5, alignItems: "center" }} container>
                        <Grid item xs={8}>
                            <Typography variant="h5" sx={{ fontWeight: 500 }}>{highschool}</Typography>
                            {data?.records && <Chip color="default" sx={{ marginTop: 2 }} label={data.records == 1 ? `Un respondent` : `${data.records} respondenți`} icon={<NumbersIcon />} />}
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: "center" }}>
                            <CircularProgressWithLabel
                                color="secondary"
                                size={120}
                                variant="determinate"
                                value={(data?.scores.real ?? 0) * 10}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Container sx={{ my: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <MetricCard title="Oportunitati" score={data?.scores.opportunities ?? 0} />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <MetricCard title="Resurse" score={data?.scores.resources ?? 0} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <MetricCard title="Comunitate" score={data?.scores.studentCommunity ?? 0} />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <MetricCard title="Comunitatea de profesori" score={data?.scores.teacherCommunity ?? 0} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <MetricCard title="Inclusivitate" score={data?.scores.inclusivity ?? 0} />
                    </Grid>

                    <Grid item xs={12}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: 2 }}>Facilități</Typography>
                                <Grid container spacing={2} sx={{ textOverflow: "ellipsis", overflow: "auto" }}>
                                    {facilitiesArray.map((facility, index) => {
                                        if (data?.facilities.includes(facility)) {
                                            return (
                                                <Grid key={index} item>
                                                    <Chip
                                                        key={index}
                                                        label={facility}
                                                        color="success"
                                                        variant="outlined"
                                                        icon={<CheckIcon />}
                                                    />
                                                </Grid>
                                            )
                                        }
                                        else {
                                            return (
                                                <Grid key={index} item>
                                                    <Chip
                                                        key={index}
                                                        label={facility}
                                                        variant="outlined"
                                                        color="error"
                                                        icon={<CloseIcon />}
                                                    />
                                                </Grid>
                                            )
                                        }

                                    })}
                                </Grid>
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}