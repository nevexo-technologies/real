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
        let schema = validationSchema.pick(["p13","p14"])

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
                    type="quantity"
                    label="În ce măsură credeți că liceul vă oferă dotările necesare desfășurării orelor?"
                    helper="De exemplu: scaune și bănci, laboratoare, materiale didactice, calculatoare, tablete etc."
                    id="p13"
                    defaultValue={fields.p13}
                    errors={errors.p13}
                    onChange={(e) => handleChange(e, "p13")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de îngrijit considerați că este liceul?"
                    helper="De exemplu: igiena băilor, a sălilor de clasă, prezența dezinfectantului, săpunului, hârtiei igienice, starea clădirilor etc."
                    id="p14"
                    defaultValue={fields.p14}
                    errors={errors.p14}
                    onChange={(e) => handleChange(e, "p14")}
                    inLine={1}
                />
            </Grid>

            
        </FormWrapper>
    )
}