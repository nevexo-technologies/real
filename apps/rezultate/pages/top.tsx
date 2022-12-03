import HsCard from "@components/HsCard";
import Layout from "@components/Layout";
import { Alert, Grid, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import useSWR from "swr";

export default function TopHsPage() {
    const { data: topHs, error: topError } = useSWR<{ hs: string, real: number, records: number }[], any>("/api/hs?filterBy=real");

    return (
        <Layout>
            <Container>
                <Typography variant="h3" sx={{ my: 5 }}>Top licee</Typography>
                {topError && <Alert severity="error">Eroare la încărcarea datelor - vă rugăm reîncercați</Alert>}
                {(!topHs && !topError) && (
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
                )}
                {topHs && (
                    <Grid container spacing={2}>
                        {topHs.map(({ hs, real, records }, idx) => (
                            <Grid key={idx} item xs={4}>
                                <HsCard hs={hs} real={real} pos={idx + 1} records={records} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}