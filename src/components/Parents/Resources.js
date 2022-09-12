import { Button, FormHelperText, Grid, FormGroup, Checkbox, MenuItem, Typography, Box, FormControl, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';
import FormWrapper from '../FormWrapper';
import RadioGroupResponsive from '../RadioGroupResponsive';
import CheckboxGroup from '../CheckboxGroup';
import getValidationSchema from "./ValidationSchema";

export default function Resources({ formValues, nextStep, previousStep }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event, qId) => {
        setFields((values) => ({ ...values, [qId]: event.target.value }))
    }

    const handleMultipleDependentChange = (event, selectId, child) => {
        child.forEach((element, idx) => {
            idx == 0 ? setFields((values) => ({ ...values, [selectId]: event.target.value, [element]: null })) : setFields((values) => ({ ...values, [element]: null }))
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationSchema = await getValidationSchema();
        let schema = validationSchema.pick(["t13", "t13b", "t14", "t15"])

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
                    type="boolean"
                    label="Copilul dumneavoastră face meditații?"
                    id="t13"
                    defaultValue={fields.t13}
                    errors={errors.t13}
                    onChange={(e) => handleChange(e, "t13")}
                />
            </Grid>

            {fields.t13 == 1 && (
                <Grid item xs={12} sm={12}>
                    <RadioGroupResponsive
                        type="custom"
                        label="Câți bani alocați săptămânal pentru ședințele de meditații?"
                        id="t13b"
                        defaultValue={fields.t13b}
                        errors={errors.t13b}
                        onChange={(e) => handleChange(e, "t13b")}
                        customOptions={[
                            {
                                value: 50,
                                label: "Între 0 și 100 lei"
                            },
                            {
                                value: 150,
                                label: "Între 101 și 200 lei"
                            },
                            {
                                value: 250,
                                label: "Între 201 și 300 lei"
                            },
                            {
                                value: 350,
                                label: "Între 301 și 400 lei"
                            },
                            {
                                value: 450,
                                label: "Între 401 și 500 lei"
                            },
                            {
                                value: 550,
                                label: "Între 501 și 1000 lei"
                            },
                            {
                                value: 1000,
                                label: "Peste 1000 lei"
                            },
                        ]}
                    />
                </Grid>
            )}

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Ce sumă de bani estimați că alocați anual pentru cumpărarea de rechizite și manuale?"
                    helper="De exemplu: caiete, pixuri, stilouri, gume de șters, manuale pentru diverse materii, cărți de pregătire pentru examene etc."
                    id="t14"
                    defaultValue={fields.t14}
                    errors={errors.t14}
                    onChange={(e) => handleChange(e, "t14")}
                    customOptions={[
                        {
                            value: 100,
                            label: "Între 0 și 200 lei"
                        },
                        {
                            value: 300,
                            label: "Între 201 și 400 lei"
                        },
                        {
                            value: 500,
                            label: "Între 401 și 600 lei"
                        },
                        {
                            value: 700,
                            label: "Între 601 și 800 lei"
                        },
                        {
                            value: 900,
                            label: "Între 801 și 1000 lei"
                        },
                        {
                            value: 1000,
                            label: "Peste 1000 lei"
                        },
                    ]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Ce sumă de bani estimați că alocați anual pentru cumpărarea de materiale folosite în comun în clasă?"
                    helper="De exemplu: cretă, burete pentru tablă, markere, cadouri pentru profesori etc."
                    id="t15"
                    defaultValue={fields.t15}
                    errors={errors.t15}
                    onChange={(e) => handleChange(e, "t15")}
                    customOptions={[
                        {
                            value: 50,
                            label: "Între 0 și 100 lei"
                        },
                        {
                            value: 150,
                            label: "Între 101 și 200 lei"
                        },
                        {
                            value: 250,
                            label: "Între 201 și 300 lei"
                        },
                        {
                            value: 350,
                            label: "Între 301 și 400 lei"
                        },
                        {
                            value: 450,
                            label: "Între 401 și 500 lei"
                        },
                        {
                            value: 550,
                            label: "Între 501 și 1000 lei"
                        },
                        {
                            value: 1000,
                            label: "Peste 1000 lei"
                        },
                    ]}
                />
            </Grid>

        </FormWrapper>
    )
}