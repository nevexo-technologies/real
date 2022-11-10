import { Box, Grid, Typography, MenuItem, Select, TextField, FormHelperText, LinearProgress, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import FormWrapper from '../FormWrapper';
import getValidationSchema from "./ValidationSchema";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/FacebookRounded';
import WebIcon from '@mui/icons-material/Language';

export default function FormSubmit({ formValues, nextStep, previousStep, formState }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event, selectId) => {
        if (selectId) setFields((values) => ({ ...values, [selectId]: event.target.value }))
        else setFields((values) => ({ ...values, [event.target.id]: event.target.value }))
    }

    const handleDependentChange = (event, selectId, child) => {
        setFields((values) => ({ ...values, [selectId]: event.target.value, [child]: null }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationSchema = await getValidationSchema();
        let schema = validationSchema.pick(['r1', 'r2', 'r3'])

        if (schema.isValidSync(fields, { abortEarly: false })) {
            nextStep(fields);
        } else {
            schema.validate(fields, { abortEarly: false }).catch(err => {
                let errors = err.inner.reduce((acc, error) => {
                    return {
                        [error.path]: error.errors,
                        ...acc
                    }
                }, {})

                setErrors((values) => ({ ...errors }))
            })
        }
    }

    const handlePrevious = (e) => {
        previousStep();
    }

    if (!formState || formState.loading) return <LinearProgress />

    return (
        <>
            {!formState.error ? (
                <FormWrapper>
                    <Grid item xs={12} sm={12}>
                        <strong>
                            <h1 style={{ margin: 0 }}>Mulțumim! ❤️</h1>
                            <p style={{ margin: 0 }}>Ați parcurs cu succes tot formularul!</p>
                        </strong>
                        <small style={{ fontWeight: 300 }}>Puteți închide această pagină în siguranță.</small>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <p>Urmarește-ne pe:</p> 
                        <Link href="https://www.instagram.com/estereal.ro" >
                            <InstagramIcon sx={{mr:1}}/>
                        </Link>
                        <Link href="http://fb.com/registruleducationalalternativ">
                            <FacebookIcon sx={{mx:1}}/>
                        </Link>
                        <Link href="https://estereal.ro">
                            <WebIcon sx={{mx:1}}/>
                        </Link>
                    </Grid>
                    {/* <Grid item xs={12} sm={12}>
                        <Typography id={`r1-label`}>Ce recomandări ați oferi elevilor din liceul în care predați?</Typography>
                        <FormHelperText error>{errors.r1}</FormHelperText>
                        <TextField
                            id="r1"
                            label="Introdu aici exemplul tău."
                            multiline
                            rows={4}
                            value={fields.r1}
                            fullWidth
                            onChange={(e) => handleChange(e, "r1")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Typography id={`r2-label`}>Ce recomandări ați oferi viitorilor profesori care ar dori să se angajeze în liceul în care predați?</Typography>
                        <FormHelperText error>{errors.r2}</FormHelperText>
                        <TextField
                            id="r2"
                            label="Introdu aici exemplul tău."
                            multiline
                            rows={4}
                            value={fields.r2}
                            fullWidth
                            onChange={(e) => handleChange(e, "r2")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Typography id={`r3-label`}>Ce recomandări ați oferi personalului administrativ pentru a îmbunătăți liceul în care predați?</Typography>
                        <FormHelperText error>{errors.r2}</FormHelperText>
                        <TextField
                            id="r3"
                            label="Introdu aici exemplul tău."
                            multiline
                            rows={4}
                            value={fields.r3}
                            fullWidth
                            onChange={(e) => handleChange(e, "r3")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Typography id={`r4-label`}>Ce recomandări ați oferi factorilor decizionali?</Typography>
                        <FormHelperText>Factorii decizionali includ: Guvernul, Ministerul Educației etc.</FormHelperText>
                        <FormHelperText error>{errors.r2}</FormHelperText>
                        <TextField
                            id="r4"
                            label="Introdu aici exemplul tău."
                            multiline
                            rows={4}
                            value={fields.r4}
                            fullWidth
                            onChange={(e) => handleChange(e, "r4")}
                        />
                    </Grid> */}

                </FormWrapper>
            ) : (
                <FormWrapper onPrevious={handlePrevious}>
                    <Grid item xs={12} sm={12}>
                        <strong>
                            <h1 style={{ margin: 0 }}>Ne pare rău! &#128577;</h1>
                            <p style={{ margin: 0 }}>Din păcate, informațiile trimise de dvs. nu au fost trimise cu succes.</p>
                        </strong>
                        <small><i><b>Mesaj eroare</b>: {formState.message}</i></small><br /><br />
                        <small style={{ fontWeight: 300 }}>Dacă doriți, puteți reîncerca sau modifica informatiile existente.</small>
                    </Grid>
                </FormWrapper>
            )}
        </>
    )
}