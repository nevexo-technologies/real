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
        let schema = validationSchema.pick(["e10", "e11", "e12", "e13", "e14", "e15", "e16", "e17", "e18"]);

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
                    label="Cât de des au fost promovate în liceu activități extracurriculare desfășurate în afara liceului?"
                    helper="De exemplu: voluntariate, tabere, conferințe, ateliere etc."
                    id="e10"
                    defaultValue={fields.e10}
                    errors={errors.e10}
                    onChange={(e) => handleChange(e, "e10")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="frequency"
                    label="Cât de des au fost promovate în liceu activități extracurriculare desfășurate în cadrul liceului?"
                    helper="De exemplu: club de lectură, club de fotografie, cor etc.."
                    id="e11"
                    defaultValue={fields.e11}
                    errors={errors.e11}
                    onChange={(e) => handleChange(e, "e11")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult ai acces la ore suplimentare de pregătire organizate gratuit de către școală?"
                    helper="De exemplu: sesiuni de pregătire în afara orelor pentru concursuri, olimpiade, examene, imbunătățirea situației școlare etc."
                    id="e12"
                    defaultValue={fields.e12}
                    errors={errors.e12}
                    onChange={(e) => handleChange(e, "e12")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult crezi că profesorii își desfășoară orele de la liceu luând în considerare nevoile fizice ale tuturor elevilor?"
                    helper="De exemplu: elevii cu probleme de vedere sunt așezați mai în față, stângacii sunt așezați în bănci în așa fel încât să aibă libertate de mișcare etc."
                    id="e13"
                    defaultValue={fields.e13}
                    errors={errors.e13}
                    onChange={(e) => handleChange(e, "e13")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult crezi că profesorii își schimbă stilul de predat în funcție de nevoile fiecărui elev?"
                    helper="De exemplu: pentru elevii care înțeleg mai greu lecțiile, pentru elevii care au rezultate slabe, pentru elevii cu probleme financiare, de sănătate etc.."
                    id="e14"
                    defaultValue={fields.e14}
                    errors={errors.e14}
                    onChange={(e) => handleChange(e, "e14")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult încurajează profesorii participarea tuturor elevilor la ore?"
                    id="e15"
                    defaultValue={fields.e15}
                    errors={errors.e15}
                    onChange={(e) => handleChange(e, "e15")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="boolean"
                    label="Crezi că liceul tău îi încurajează pe toți elevii să-și continue studiile?"
                    id="e16"
                    defaultValue={fields.e16}
                    errors={errors.e16}
                    onChange={(e) => handleChange(e, "e16")}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <Typography id={`e17-label`}>Ne poți povesti un exemplu de elev ce a fost ajutat să își continue studiile la liceu?</Typography>
                <FormHelperText>De exemplu: cazuri în care elevi au vrut să renunțe la școală și au fost ajutați să nu o facă</FormHelperText>
                <FormHelperText error>{errors.e17}</FormHelperText>
                <TextField
                    id="e17"
                    label="Introdu aici exemplul tău."
                    multiline
                    rows={4}
                    value={fields.e17}
                    fullWidth
                    onChange={(e) => handleChange(e, "e17")}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <Typography id="e18-label" sx={{ mb: 1 }}>Câte sesiuni de meditații contra cost ai pe săptămână?</Typography>
                <FormControl required fullWidth>
                    <InputLabel id="e18-label">Numărul orelor de meditații</InputLabel>
                    <Select labelId='e18-label' defaultValue={fields.e18} label="Numărul orelor de meditații" onChange={(e) => handleChange(e, "e18")}>
                        <MenuItem value="0">Nu fac meditații</MenuItem>
                        <MenuItem value="1">O oră</MenuItem>
                        <MenuItem value="2">Două ore</MenuItem>
                        <MenuItem value="3">Trei ore</MenuItem>
                        <MenuItem value="4">Mai mult de trei ore</MenuItem>
                    </Select>
                    <FormHelperText error>{errors.e18}</FormHelperText>
                </FormControl>
            </Grid>
        </FormWrapper>
    )
}