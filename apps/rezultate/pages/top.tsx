import HsCard from "@components/HsCard";
import Layout from "@components/Layout";
import { Alert, Grid, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import useSWR from "swr";

export default function TopHsPage() {
    const { data: topHs, error: topError } = useSWR<{ hs: string, real: number, records: number }[], any>("/api/hs?filterBy=real");

    return (
        <Layout>
            <Head>
                <title>Topul liceelor | Registrul Educațional Alternativ</title>
            </Head>
            <Container>
                <Typography variant="h3" sx={{ mt: 5 }}>Top licee</Typography>
                <Typography variant="body1" sx={{ mb: 5 }}>Topul este calculat atât prin scorul REAL (75% din poziție), cât și prin numărul de respondenți (25% din poziție).</Typography>
                {topError && <Alert severity="error">Eroare la încărcarea datelor - vă rugăm reîncercați</Alert>}
                {(!topHs && !topError) && (
                    <Grid sx={{ my: 2 }} container spacing={2}>
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <Grid key={idx} item md={4} xs={12}>
                            <Skeleton variant="rounded" height={200} />
                        </Grid>
                        ))}
                    </Grid>
                )}
                {topHs && (
                    <Grid container spacing={2}>
                        {topHs.map(({ hs, real, records }, idx) => (
                            <Grid key={idx} item md={4} xs={12} sx={{ display: "flex" }}>
                                <HsCard hs={hs} real={real} pos={idx + 1} records={records} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}