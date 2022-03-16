import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, FormHelperText } from '@mui/material';
import { useState } from 'react';
import localization from '../../public/data/localization.json'
import FormWrapper from '../FormWrapper';
import { validationSchema } from "./ValidationSchema";

export default function PersonalInfo({ formValues, nextStep }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event, selectId) => {
        if (selectId) setFields((values) => ({ ...values, [selectId]: event.target.value }))
        else setFields((values) => ({ ...values, [event.target.id]: event.target.value }))
    }

    const handleDependentChange = (event, selectId, child) => {
        setFields((values) => ({ ...values, [selectId]: event.target.value, [child]: null }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let schema = validationSchema.pick(['email', 'age', 'location', 'hs', 'class', 'letter'])

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

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <Grid item xs={12} sm={6}>
                <TextField required id="email" defaultValue={fields.email} fullWidth label="Emailul tău" type="email" onChange={handleChange} />
                <FormHelperText error>{errors.email}</FormHelperText>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField required id="age" fullWidth defaultValue={fields.age} label="Vârsta ta" type="number" onChange={handleChange} />
                <FormHelperText error>{errors.age}</FormHelperText>
            </Grid>

            <Grid item xs={12}>
                <FormControl required fullWidth>
                    <InputLabel id="location-label">În ce localitate înveți?</InputLabel>
                    <Select labelId='location-label' id="location" defaultValue={fields.location} label="În ce localitate înveți?" onChange={(e) => handleDependentChange(e, "location", "hs")}>
                        {'' || Object.keys(localization).map((locality, i) => {
                            return <MenuItem key={i} value={locality}>{locality}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText error>{errors.location}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl required fullWidth disabled={fields.location == null}>
                    <InputLabel id="hs-label">La ce liceu înveți? {fields.location == null ? '(Selectează o localitate mai întâi.)' : ''}</InputLabel>
                    <Select labelId='hs-label' id="hs" defaultValue={fields.hs} label="La ce liceu înveți?" onChange={(e) => handleChange(e, "hs")}>
                        {(fields.location != null && Object.keys(localization).includes(fields.location)) && localization[fields.location].map((hs, i) => {
                            return <MenuItem key={i} value={hs}>{hs}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText error>{errors.hs}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                    <InputLabel id="class-label">În ce clasă ești?</InputLabel>
                    <Select labelId='class-label' id="class" defaultValue={fields.class} label="În ce clasă ești?" onChange={(e) => handleChange(e, "class")}>
                        <MenuItem value="9">Clasa a-9 a</MenuItem>
                        <MenuItem value="10">Clasa a-10 a</MenuItem>
                        <MenuItem value="11">Clasa a-11 a</MenuItem>
                        <MenuItem value="12">Clasa a-12 a</MenuItem>
                    </Select>
                    <FormHelperText error>{errors.class}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}> {/* POSIBIL SA AVEM NEVOIE DE MAI MULTE LITERE PT LITERA CLASEI */}
                <TextField required id="letter" fullWidth defaultValue={fields.letter} label="Care este litera clasei tale?" inputProps={{ maxLength: 1 }} onChange={handleChange} />
                <FormHelperText error>{errors.letter}</FormHelperText>
            </Grid>
        </FormWrapper>
    )
}