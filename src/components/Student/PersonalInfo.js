import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import FormWrapper from '../FormWrapper';
import getValidationSchema from "./ValidationSchema";

export default function PersonalInfo({ formValues, nextStep }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});
    const [localization, setLocalization] = useState({});

    useEffect(() => {
        fetch('/data/localization.json')
            .then(data => data.json())
            .then(data => setLocalization(data))
            .catch(err => setLocalization({ "A aparut o eroare, te rugam reincearca": ["A aparut o eroare, te rugam reincearca"] }));
    }, [])

    const handleChange = (event, selectId) => {
        if (selectId) setFields((values) => ({ ...values, [selectId]: event.target.value }))
        else setFields((values) => ({ ...values, [event.target.id]: event.target.value }))
    }

    const handleDependentChange = (event, selectId, child) => {
        setFields((values) => ({ ...values, [selectId]: event.target.value, [child]: null }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationSchema = await getValidationSchema();
        let schema = validationSchema.pick(['email', 'age', 'location', 'hs', 'class', 'letter', 'eth', 'eth_full'])

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
                    <Select labelId='location-label' id="location" defaultValue={fields.location ? fields.location : ''} label="În ce localitate înveți?" onChange={(e) => handleDependentChange(e, "location", "hs")}>
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
                    <Select labelId='hs-label' id="hs" defaultValue={fields.hs ? fields.hs : ''} label="La ce liceu înveți?" onChange={(e) => handleChange(e, "hs")}>
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
                    <Select labelId='class-label' id="class" defaultValue={fields.class ? fields.class : ''} label="În ce clasă ești?" onChange={(e) => handleChange(e, "class")}>
                        <MenuItem value="9">Clasa a 9-a</MenuItem>
                        <MenuItem value="10">Clasa a 10-a</MenuItem>
                        <MenuItem value="11">Clasa a 11-a</MenuItem>
                        <MenuItem value="12">Clasa a 12-a</MenuItem>
                    </Select>
                    <FormHelperText error>{errors.class}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField required id="letter" fullWidth defaultValue={fields.letter} label="Care este litera clasei tale?" inputProps={{ maxLength: 5 }} onChange={handleChange} />
                <FormHelperText error>{errors.letter}</FormHelperText>
            </Grid>

            <Grid item xs={12} sm={12}>
                <FormControl required fullWidth>
                    <InputLabel id="eth-label">Care este etnia ta?</InputLabel>
                    <Select labelId='eth-label' id="eth" defaultValue={fields.eth ? fields.eth : ''} label="Care este etnia ta?" onChange={(e) => handleChange(e, "eth")}>
                        <MenuItem value="RO">Român</MenuItem>
                        <MenuItem value="MGH">Maghiar</MenuItem>
                        <MenuItem value="ROM">Rom</MenuItem>
                        <MenuItem value="ALTA">Altă etnie</MenuItem>
                        <MenuItem value="NR">Nu doresc să raspund</MenuItem>
                    </Select>
                    <FormHelperText error>{errors.eth}</FormHelperText>
                </FormControl>
            </Grid>

            {fields.eth == "ALTA" && (
                <Grid item xs={12} sm={12}>
                    <TextField required id="eth-full" defaultValue={fields.eth_full} fullWidth label="Scrie etnia ta" type="text" onChange={handleChange} />
                    <FormHelperText error>{errors.eth_full}</FormHelperText>
                </Grid>
            )}
        </FormWrapper>
    )
}