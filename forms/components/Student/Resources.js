import { Button, FormHelperText, Grid, InputLabel, Select, MenuItem, Typography, Box, FormControl, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';
import FormWrapper from '../FormWrapper';
import RadioGroupResponsive from '../RadioGroupResponsive';
import { validationSchema } from './ValidationSchema';

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

    const handleSubmit = (e) => {
        e.preventDefault();

        let schema = validationSchema.pick(["e12", "e12b", "e12c", "e12d", "e13", "e13b", "e13c", "e14"])

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
                    label="În acest an școlar ai participat la ore în incinta școlii?"
                    helper="Dacă ai participat și la ore online și fizice, selectează da la această întrebare"
                    id="e12"
                    defaultValue={fields.e12}
                    errors={errors.e12}
                    onChange={(e) => handleMultipleDependentChange(e, "e12", ["e12b","e12c","e12d"])}
                />
            </Grid>

            {fields.e12 == 1 && (
                <Grid item xs={12} sm={12}>
                    <RadioGroupResponsive
                        type="quality"
                        label="Cât de bun este nivelul dotărilor ce ți-au fost puse la dispoziție în liceu?"
                        helper="De exemplu: scaune și bănci, laboratoare, materiale didactice, calculatoare etc."
                        id="e12b"
                        defaultValue={fields.e12b}
                        errors={errors.e12b}
                        onChange={(e) => handleChange(e, "e12b")}
                        inLine={1}
                    />
                </Grid>
            )}

            {fields.e12 == 1 && (
                <Grid item xs={12} sm={12}>
                    <RadioGroupResponsive
                        type="quality"
                        label="Cât de îngrijit ți se pare liceul tău?"
                        helper="De exemplu: igiena băilor, a sălilor de clasă, prezența dezinfectantului, săpunului, hârtiei igienice, starea clădirilor etc."
                        id="e12c"
                        defaultValue={fields.e12c}
                        errors={errors.e12c}
                        onChange={(e) => handleChange(e, "e12c")}
                        inLine={1}
                    />
                </Grid>
            )}

            {fields.e12 == 1 && (
                <Grid item xs={12} sm={12}>
                    <RadioGroupResponsive
                        type="ternary"
                        label="Există în cadrul liceului căi de acces pentru persoane cu dizabilități?"
                        helper="De exemplu: lifturi, rampe, etc."
                        id="e12d"
                        defaultValue={fields.e12d}
                        errors={errors.e12d}
                        onChange={(e) => handleChange(e, "e12d")}
                    />
                </Grid>
            )}

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="boolean"
                    label="În acest an școlar ai participat la ore online?"
                    helper="Dacă ai participat și la ore online și fizice, selectează da la această întrebare"
                    id="e13"
                    defaultValue={fields.e13}
                    errors={errors.e13}
                    onChange={(e) => handleMultipleDependentChange(e, "e13", ["e13b","e13c"])}
                />
            </Grid>

            {fields.e13 == 1 && (
                <Grid item xs={12} sm={12}>
                    <RadioGroupResponsive
                        type="custom"
                        label="Ți-au fost puse la dispoziție de către liceu dotările necesare pentru a face orele online în condiții bune?"
                        helper="De exemplu: calculator, telefon, tabletă,  etc."
                        id="e13b"
                        defaultValue={fields.e13b}
                        errors={errors.e13b}
                        onChange={(e) => handleChange(e, "e13b")}
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
                                label: 'Nu am avut nevoie'
                            }
                        ]}
                    />
                </Grid>
            )}

            {fields.e13 == 1 && (
                <Grid item xs={12} sm={12}>
                    <RadioGroupResponsive
                        type="quality"
                        label="Cât de bun este nivelul dotărilor profesorilor?"
                        helper="De exemplu: materiale didactice, calculatoare, tablete, camere video etc."
                        id="e13c"
                        defaultValue={fields.e13c}
                        errors={errors.e13c}
                        onChange={(e) => handleChange(e, "e13c")}
                        inLine={1}
                    />
                </Grid>
            )}

            <Grid item xs={12} sm={12}>
                <Typography id="e14-label" sx={{ mb: 1 }}>Câte sesiuni de meditații ai pe săptămână?</Typography>
                <FormControl required fullWidth>
                    <InputLabel id="e14-label">Numărul orelor de meditații</InputLabel>
                    <Select labelId='e14-label' defaultValue={fields.e14} label="Numărul orelor de meditații" onChange={(e) => handleChange(e, "e14")}>
                        <MenuItem value="0">Nu fac meditații</MenuItem>
                        <MenuItem value="1">O oră</MenuItem>
                        <MenuItem value="2">Două ore</MenuItem>
                        <MenuItem value="3">Trei ore</MenuItem>
                        <MenuItem value="4">Mai mult de trei ore</MenuItem>
                    </Select>
                    <FormHelperText error>{errors.e14}</FormHelperText>
                </FormControl>
            </Grid>
        </FormWrapper>
    )
}