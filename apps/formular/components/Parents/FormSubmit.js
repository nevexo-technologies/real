import { Box, Grid, Typography, MenuItem, Select, TextField, FormHelperText, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import FormWrapper from '../FormWrapper';
import getValidationSchema from "./ValidationSchema";

export default function FormSubmit({ formValues, nextStep, previousStep, startTime }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});
    const [isFormValid, setFormValid] = useState(-1);

    useEffect(() => {
        fetch(`/api/parinti`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fields),
        }).then(async res => {
            if (res.status === 200) {
                setFormValid(1);
                console.log(JSON.stringify(res));
            } else {
                setFormValid(0);
                const data = await res.json();
                setErrors(data.errors);
            }
        });
    }, []);

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

    return (
        <>
            {isFormValid == 1 && (
                <FormWrapper onSubmit={handleSubmit} onPrevious={handlePrevious}>
                    <Grid item xs={12} sm={12}>
                        <strong>
                            <h1 style={{ margin: 0 }}>Multumim! ❤️</h1>
                            <p style={{ margin: 0 }}>Ați parcurs cu succes tot formularul!</p>
                        </strong>
                        <small style={{ fontWeight: 300 }}>Daca doriți, mai puteți lăsa câteva recomandări comunității dvs.</small>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography id={`r1-label`}>Sfaturi adresate părinților care vor sa aibă copiii înscriși la instituția de învățământ respectivă</Typography>
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
                        <Typography id={`r2-label`}>Sfaturi adresate personalului administrativ pentru dezvoltarea instituției de învățământ</Typography>
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

                </FormWrapper>
            )}
            {isFormValid == 0 && (
                <FormWrapper onSubmit={handleSubmit} onPrevious={handlePrevious}>
                    <Grid item xs={12} sm={12}>
                        <strong>
                            <h1 style={{ margin: 0 }}>Ne pare rău! &#128577;</h1>
                            <p style={{ margin: 0 }}>Din păcate, informațiile trimise de dvs. nu au trecut testele noastre anti-spam.</p>
                        </strong>
                        <small style={{ fontWeight: 300 }}>Dacă doriți, puteți reîncerca.</small>
                    </Grid>
                </FormWrapper>
            )}
            {isFormValid == -1 && (
                <LinearProgress />
            )}
        </>
    )
}