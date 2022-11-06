import { Button, FormHelperText, Grid, Select, Typography, InputLabel, FormControl, MenuItem, RadioGroup, FormControlLabel, Radio, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';
import FormWrapper from '../FormWrapper';
import RadioGroupResponsive from '../RadioGroupResponsive'
import getValidationSchema from "./ValidationSchema";

export default function Opportunities({ formValues, nextStep, previousStep }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event, qId) => {
        setFields((values) => ({ ...values, [qId]: event.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationSchema = await getValidationSchema();
        let schema = validationSchema.pick(["p10", "p11", "p12"]);

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
                    type="custom"
                    label="Cât de des vă implicați în organizarea de activități desfășurate în cadrul liceului?"
                    helper="De exemplu: club de lectură, club de fotografie, cor etc."
                    id="p10"
                    defaultValue={fields.p10}
                    errors={errors.p10}
                    onChange={(e) => handleChange(e, "p10")}
                    inLine={1}
                    customOptions={[
                        {
                            value: 5,
                            label: "Zilnic"
                        },
                        {
                            value: 4,
                            label: "Săptămânal"
                        },
                        {
                            value: 3,
                            label: "Lunar"
                        },
                        {
                            value: 2,
                            label: "Anual"
                        },
                        {
                            value: 1,
                            label: "Niciodată"
                        },

                    ]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Cât de des vă implicați în ore suplimentare de pregătire fără plată?"
                    helper="De exemplu: sesiuni de pregătire în afara orelor pentru concursuri, olimpiade, examene, îmbunătățirea situației școlare etc."
                    id="p11"
                    defaultValue={fields.p11}
                    errors={errors.p11}
                    onChange={(e) => handleChange(e, "p11")}
                    inLine={1}
                    customOptions={[
                        {
                            value: 5,
                            label: "Zilnic"
                        },
                        {
                            value: 4,
                            label: "Săptămânal"
                        },
                        {
                            value: 3,
                            label: "Lunar"
                        },
                        {
                            value: 2,
                            label: "Anual"
                        },
                        {
                            value: 1,
                            label: "Niciodată"
                        },
                    ]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Cât de des beneficiați de oportunități de dezvoltare profesională oferite de liceu?"
                    helper="De exemplu: formare continuă, cursuri de TIC etc."
                    id="p12"
                    defaultValue={fields.p12}
                    errors={errors.p12}
                    onChange={(e) => handleChange(e, "p12")}
                    inLine={1}
                    customOptions={[
                        {
                            value: 5,
                            label: "Săptămânal"
                        },
                        {
                            value: 4,
                            label: "Lunar"
                        },
                        {
                            value: 3,
                            label: "Semestrial"
                        },
                        {
                            value: 2,
                            label: "Anual"
                        },
                        {
                            value: 1,
                            label: "Niciodată"
                        },
                    ]}
                />
            </Grid>
        </FormWrapper>
    )
}