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
        let schema = validationSchema.pick(["t10", "t11", "t12"]);

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
                    label="Cât de des credeți că au fost promovate în liceu activități desfășurate în afara liceului?"
                    helper="De exemplu: voluntariate, tabere, conferințe, ateliere etc."
                    id="t10"
                    defaultValue={fields.t10}
                    errors={errors.t10}
                    onChange={(e) => handleChange(e, "t10")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="frequency"
                    label="Cât de des credeți că au fost promovate în liceu activități desfășurate în cadrul liceului?"
                    helper="De exemplu: club de lectură, club de fotografie, cor etc."
                    id="t11"
                    defaultValue={fields.t11}
                    errors={errors.t11}
                    onChange={(e) => handleChange(e, "t11")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult au elevii acces la ore suplimentare de pregătire?"
                    helper="De exemplu: sesiuni de pregătire în afara orelor pentru concursuri, olimpiade, examene, îmbunătățirea situației școlare etc."
                    id="t12"
                    defaultValue={fields.t12}
                    errors={errors.t12}
                    onChange={(e) => handleChange(e, "t12")}
                    inLine={1}
                />
            </Grid>
        </FormWrapper>
    )
}