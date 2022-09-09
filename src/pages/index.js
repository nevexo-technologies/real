import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

import { Button, Container, Grid } from '@mui/material';
import Layout from '../components/Layout';

export default function REALForm() {
  const router = useRouter();
  const { ref } = router.query;

  return (
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
                <Button variant="contained" type="submit">Începe formularul</Button>
              </Link>
            </Container>
          </Grid>
          <Grid item xs={12} sm={4} xl={4}>
            <Container variant="floating">
              <h2>Profesori</h2>
              <Button variant="contained" type="submit">Începe formularul</Button>
            </Container>
          </Grid>
          <Grid item xs={12} sm={4} xl={4}>
            <Container variant="floating">
              <h2>Părinți</h2>
              <Button variant="contained" type="submit">Începe formularul</Button>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}
