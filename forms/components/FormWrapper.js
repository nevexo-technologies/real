import { Grid, Stack, Button } from "@mui/material";

export default function FormWrapper({ children, onSubmit, onPrevious }) {
    return (
        <Grid container component="form" rowSpacing={3} columnSpacing={2} onSubmit={onSubmit}>
            {children}
            <Grid item xs={12}>
                <Stack direction="row" spacing={2} sx={{mt:2}}>
                    {onPrevious && <Button variant="outlined" onClick={onPrevious}>Anterior</Button>}
                    <Button variant="contained" type="submit">Următorul</Button>
                </Stack>
            </Grid>
        </Grid>
    );
}