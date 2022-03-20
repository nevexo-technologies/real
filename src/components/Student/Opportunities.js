import { Button, FormHelperText, Grid, Slider, Typography, Box, FormControl, Stack, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
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
        let schema = validationSchema.pick(["e09", "e10", "e11"]);

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
                    type="frequency"
                    label="Cât de des au fost promovate în liceu activități desfășurate în afara liceului?"
                    helper="De exemplu: voluntariate, tabere, conferințe, ateliere etc."
                    id="e09"
                    defaultValue={fields.e09}
                    errors={errors.e09}
                    onChange={(e) => handleChange(e, "e09")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="frequency"
                    label="Cât de des au fost promovate în liceu activități desfășurate în cadrul liceului?"
                    helper="De exemplu: club de lectură, club de fotografie, cor etc."
                    id="e10"
                    defaultValue={fields.e10}
                    errors={errors.e10}
                    onChange={(e) => handleChange(e, "e10")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult ai acces la ore suplimentare de pregătire?"
                    helper="De exemplu: sesiuni de pregătire în afara orelor pentru concursuri, olimpiade, examene, imbunătățirea situației școlare etc."
                    id="e11"
                    defaultValue={fields.e11}
                    errors={errors.e11}
                    onChange={(e) => handleChange(e, "e11")}
                    inLine={1}
                />
            </Grid>
        </FormWrapper>
    )
}