import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

import { Button, Container, Grid } from '@mui/material';
import Layout from '../components/Layout';
import Head from "next/head";

export default function REALForm() {
  const router = useRouter();
  const { ref } = router.query;

  return (
    <>
      <Head>
        <title>Formulare | Registrul Educațional Alternativ</title>
      </Head>
      <Layout>
        <Container>
          <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            <Grid item xs={12} sm={4} xl={4}>
              <Container variant="floating">
                <h2>Elevi</h2>
                <Link href={`/elevi${ref ? '?ref=' + ref : ''}`}>
                  <Button variant="contained">Începe formularul</Button>
                </Link>
              </Container>
            </Grid>
            <Grid item xs={12} sm={4} xl={4}>
              <Container variant="floating">
                <h2>Profesori</h2>
                <Link href={`/profesori${ref ? '?ref=' + ref : ''}`}>
                  <Button variant="contained">Începe formularul</Button>
                </Link>
              </Container>
            </Grid>
            <Grid item xs={12} sm={4} xl={4}>
              <Container variant="floating">
                <h2>Părinți</h2>
                <Link href={`/parinti${ref ? '?ref=' + ref : ''}`}>
                  <Button variant="contained">Începe formularul</Button>
                </Link>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  )
}
