import { Button, FormHelperText, Grid, FormGroup, Checkbox, Typography, Box, TextField, FormControl, Stack, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import { useState } from 'react';
import FormWrapper from '../FormWrapper';
import RadioGroupResponsive from '../RadioGroupResponsive';
import CheckboxGroup from '../CheckboxGroup';
import getValidationSchema from "./ValidationSchema";

export default function Community({ formValues, nextStep, previousStep }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event, qId) => {
        setFields((values) => ({ ...values, [qId]: event.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationSchema = await getValidationSchema();
        let schema = validationSchema.pick(["t16", "t17", "t18", "t19", "t19b", "t20", "t20b"]);

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
        console.log(fields);
        previousStep();
    }

    return (
        <FormWrapper onSubmit={handleSubmit} onPrevious={handlePrevious}>
            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de satisfăcut sunteți de relația cu profesorii copilului dumneavoastră?"
                    helper="Întrebarea face referire la: respectul reciproc, devotamentul și susținerea acordată etc."
                    id="t16"
                    defaultValue={fields.t16}
                    errors={errors.t16}
                    onChange={(e) => handleChange(e, "t16")}
                    inLine={1}
                />
            </Grid>


            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de satisfăcut sunteți de relația cu dirigintele / diriginta copilului dumneavoastră?"
                    helper="Întrebarea face referire la: respectul reciproc, devotamentul și susținerea acordată etc."
                    id="t17"
                    defaultValue={fields.t17}
                    errors={errors.t17}
                    onChange={(e) => handleChange(e, "t17")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de satisfăcut sunteți de relația cu personalul administrativ al liceului la care învață copilul dumneavoastră?"
                    helper="Întrebarea face referire la: respectul reciproc, deschiderea conducerii de a primi propuneri de la dumneavoastră, susținerea acordată etc."
                    id="t18"
                    defaultValue={fields.t18}
                    errors={errors.t18}
                    onChange={(e) => handleChange(e, "t18")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="boolean"
                    label="Credeți că familia dumneavoastră este tratată corect de către personalul liceului?"
                    helper="De exemplu: sunteți tratat cu respect, aveți aceleași oportunități, nu sunteți discriminați din cauza etniei, religiei, situației financiare, etc."
                    id="t19"
                    defaultValue={fields.t19}
                    errors={errors.t19}
                    onChange={(e) => handleChange(e, "t19")}
                />
            </Grid>


            {fields.t19 == 0 && (
                <Grid item xs={12} sm={12}>
                    <Typography id={`t19b-label`}>Vă rugăm sa ne dați un exemplu de tratament incorect din partea personalului liceului.</Typography>
                    <FormHelperText error>{errors.t19b}</FormHelperText>
                    <TextField
                        id="t19b"
                        label="Introduceți aici exemplul dvs."
                        multiline
                        rows={4}
                        value={fields.t19b}
                        fullWidth
                        onChange={(e) => handleChange(e, "t19b")}
                    />
                </Grid>
            )}

            <Grid item xs={12} sm={12}>
                <CheckboxGroup
                    label="Selectați cazurile care se potrivesc pentru liceul dumneavoastră:"
                    id="t20"
                    defaultValue={fields.t20}
                    errors={errors.t20}
                    onChange={(e) => handleChange(e, "t20")}
                    options={["Există comportament agresiv din partea profesorilor față de elevi",
                        "Există comportament agresiv din partea elevilor față de profesori",
                        "Există comportament agresiv din partea profesorilor față de profesori",
                        "Există comportament agresiv din partea elevilor față de elevi",
                        "Nu există comportament agresiv"]}
                />
            </Grid>


            {(fields.t20 && fields.t20.length > 0 && !fields.t20.includes("4")) && (
                <Grid item xs={12} sm={12}>
                    <Typography id={`t20b-label`}>Vă rugăm să ne povestiți un exemplu de comportament agresiv din liceul copilului dumneavoastră.</Typography>
                    <FormHelperText error>{errors.t20b}</FormHelperText>
                    <TextField
                        id="t20b"
                        label="Introduceți aici exemplul dvs."
                        multiline
                        rows={4}
                        value={fields.t20b}
                        fullWidth
                        onChange={(e) => handleChange(e, "t20b")}
                    />
                </Grid>
            )}

        </FormWrapper >
    )
}