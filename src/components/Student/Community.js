import { Button, FormHelperText, Grid, Slider, Typography, Box, FormControl, Stack, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import { useState } from 'react';
import FormWrapper from '../FormWrapper';
import RadioGroupResponsive from '../RadioGroupResponsive';
import { validationSchema } from "./ValidationSchema";

export default function Community({ formValues, nextStep, previousStep }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event, qId) => {
        setFields((values) => ({ ...values, [qId]: event.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let schema = validationSchema.pick(['e15','e16','e17','e18','e19','e20','e21']);
        
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
        <FormWrapper onSubmit={handleSubmit} onPrevious={handlePrevious}>
            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quality"
                    label="Cât de bună este relația ta cu profesorii?"
                    helper="Întrebarea se referă la: respectul reciproc, susținerea acordată etc."
                    id="e15"
                    defaultValue={fields.e15}
                    errors={errors.e15}
                    onChange={(e) => handleChange(e, "e15")}
                    inLine={1}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quality"
                    label="Cât de bună este relația ta cu dirigintele?"
                    helper="Întrebarea se referă la: desfășurarea orelor de dirigenție, atenția acordată problemelor personale etc."
                    id="e16"
                    defaultValue={fields.e16}
                    errors={errors.e16}
                    onChange={(e) => handleChange(e, "e16")}
                    inLine={1}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="frequency"
                    label="Cât de des aveți discuții libere în timpul orelor?"
                    id="e17"
                    defaultValue={fields.e17}
                    errors={errors.e17}
                    onChange={(e) => handleChange(e, "e17")}
                    inLine={1}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult consideri că profesorii își dau interesul în timpul orelor?"
                    helper="De exemplu: pregătirea pentru oră, ascultarea sugestiilor din partea elevilor, entuziasmul cu care predau etc."
                    id="e18"
                    defaultValue={fields.e18}
                    errors={errors.e18}
                    onChange={(e) => handleChange(e, "e18")}
                    inLine={1}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quality"
                    label="Cât de bine consideri că se descurcă profesorii cu dispozitivele electronice în timpul orelor?"
                    helper="De exemplu: utilizarea în timpul orelor a calculatorului, aplicațiilor, proiectorului, tablei inteligente etc."
                    id="e19"
                    defaultValue={fields.e19}
                    errors={errors.e19}
                    onChange={(e) => handleChange(e, "e19")}
                    inLine={1}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult consideri că profesorii pun accentul pe efort în afara orelor?"
                    helper="Prin efort în afara orelor ne referim la teme pentru acasă, proiecte etc."
                    id="e20"
                    defaultValue={fields.e20}
                    errors={errors.e20}
                    onChange={(e) => handleChange(e, "e20")}
                    inLine={1}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                    <RadioGroupResponsive
                        type="custom"
                        label="Ai apelat la serviciile consilierilor școlari?"
                        helper="Prin consilieri ne referim la psihologi, consilieri educaționali etc."
                        id="e21"
                        defaultValue={fields.e21}
                        errors={errors.e21}
                        onChange={(e) => handleChange(e, "e21")}
                        customOptions={[
                            {
                                value: 2,
                                label: 'Da'
                            },
                            {
                                value: 0,
                                label: 'Nu'
                            },
                            {
                                value: 1,
                                label: 'Nu am știut de existența lor'
                            }
                        ]}
                    />
                </Grid>
        </FormWrapper>
    )
}