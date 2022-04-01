import { Button, FormHelperText, Grid, FormGroup, Checkbox, MenuItem, Typography, Box, FormControl, Stack, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';
import FormWrapper from '../FormWrapper';
import RadioGroupResponsive from '../RadioGroupResponsive';
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
        let schema = validationSchema.pick(["e19", "e20", "e21", "e22", "e23", "e24", "e24b", "e25", "e25b"])

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
                <FormGroup
                    onChange={(e) => handleChange(e, "e19")}>
                    <Typography id={`e19-label`}>Selectează, din următoarea listă, dotările care sunt puse la dispoziție în liceu:</Typography>
                    <FormHelperText error>{errors.e19}</FormHelperText>
                    <FormControlLabel control={<Checkbox />} label="Bănci" />
                    <FormControlLabel control={<Checkbox />} label="Scaune" />
                    <FormControlLabel control={<Checkbox />} label="Catedră" />
                    <FormControlLabel control={<Checkbox />} label="Spații de depozitare" />
                    <FormControlLabel control={<Checkbox />} label="Tablă" />
                    <FormControlLabel control={<Checkbox />} label="Aer condiționat" />
                    <FormControlLabel control={<Checkbox />} label="Calculatoare" />
                    <FormControlLabel control={<Checkbox />} label="Laboratoare" />
                    <FormControlLabel control={<Checkbox />} label="Automat cu mâncare" />
                </FormGroup>
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quality"
                    label="Cât de bun este nivelul dotărilor ce îți sunt puse la dispoziție în liceu?"
                    helper="De exemplu: scaune și bănci, laboratoare, materiale didactice, calculatoare etc."
                    id="e20"
                    defaultValue={fields.e20}
                    errors={errors.e20}
                    onChange={(e) => handleChange(e, "e20")}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <FormGroup
                    onChange={(e) => handleChange(e, "e21")}>
                    <Typography id={`e21-label`}>Selectează, din următoarea listă, obiectele care îți sunt puse mereu la dispoziție de către liceu:</Typography>
                    <FormHelperText error>{errors.e21}</FormHelperText>
                    <FormControlLabel control={<Checkbox />} label="Cretă/Markere" />
                    <FormControlLabel control={<Checkbox />} label="Săpun" />
                    <FormControlLabel control={<Checkbox />} label="Hârtie igienică" />
                    <FormControlLabel control={<Checkbox />} label="Dezinfectant" />
                    <FormControlLabel control={<Checkbox />} label="Burete pentru tablă" />
                    <FormControlLabel control={<Checkbox />} label="Consumabile pentru laboratoare (de exemplu, reactivi pentru laboratorul de chimie etc.)" />
                </FormGroup>
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de curat și îngrijit ți se pare liceul tău?"
                    helper="De exemplu: igiena băilor, a sălilor de clasă, prezența dezinfectantului, săpunului, hârtiei igienice, starea clădirilor etc."
                    id="e22"
                    defaultValue={fields.e22}
                    errors={errors.e22}
                    onChange={(e) => handleChange(e, "e22")}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="ternary"
                    label="Există în cadrul liceului căi de acces pentru persoane cu dizabilități?"
                    helper="De exemplu: lifturi, rampe, etc."
                    id="e23"
                    defaultValue={fields.e23}
                    errors={errors.e23}
                    onChange={(e) => handleChange(e, "e23")}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Ai apelat la serviciile consilierilor școlari?"
                    helper="Prin consilieri ne referim la psihologi, consilieri educaționali etc."
                    id="e21"
                    defaultValue={fields.e24}
                    errors={errors.e24}
                    onChange={(e) => handleChange(e, "e24")}
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

            {fields.e24 == 2 && (
                <Grid item xs={12} sm={12}>
                    <RadioGroupResponsive
                        type="quantity"
                        label="Cât de mult te-au ajutat consilierii școlari?"
                        helper="De exemplu: lifturi, rampe, etc."
                        id="e24b"
                        defaultValue={fields.e24b}
                        errors={errors.e24b}
                        onChange={(e) => handleChange(e, "e24b")}
                    />
                </Grid>
            )}

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Ai apelat la serviciile cabinetului medical școlar?"
                    id="e25"
                    defaultValue={fields.e25}
                    errors={errors.e25}
                    onChange={(e) => handleChange(e, "e25")}
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

            {fields.e25 == 2 && (
                <Grid item xs={12} sm={12}>
                    <RadioGroupResponsive
                        type="quantity"
                        label="Cât de mult te-au ajutat medicii din cabinetul școlar?"
                        id="e25b"
                        defaultValue={fields.e25b}
                        errors={errors.e25b}
                        onChange={(e) => handleChange(e, "e25b")}
                    />
                </Grid>
            )}

        </FormWrapper>
    )
}