import { Button, FormHelperText, Grid, FormGroup, Checkbox, Typography, Box, TextField, FormControl, Stack, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import { useState } from 'react';
import FormWrapper from '../FormWrapper';
import RadioGroupResponsive from '../RadioGroupResponsive';
import CheckboxGroup from '../CheckboxGroup';
import getValidationSchema from "./ValidationSchema";

export default function Community({ formValues, nextStep, previousStep, setFormState }) {
    const [fields, setFields] = useState(formValues);
    const [errors, setErrors] = useState({});

    const handleChange = (event, qId) => {
        setFields((values) => ({ ...values, [qId]: event.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationSchema = await getValidationSchema();
        let schema = validationSchema.pick(["p15", "p16", "p17", "p18", "p19", "p20", "p21", "p22", "p23", "p24", "p25", "p26", "p26b"]);

        if (schema.isValidSync(fields, { abortEarly: false })) {
            setFormState({ loading: true, error: false, message: "Loading..." });
            await fetch(`/api/profesori`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            }).then(async res => {
                const data = await res.json();


                if (!res.ok)
                    return Promise.reject(data)

                setFormState({ loading: false, error: false, message: data.message });
                nextStep(fields);
                return data;
            }).catch(err => {
                setFormState({ loading: false, error: true, message: err.message });

                if (err.errors) {
                    setErrors(err.errors);
                }

                nextStep(fields);
                return err;
            });
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
                    label="Cât de divers este colectivul profesoral?"
                    helper="De exemplu: diversitate etnică, religioasă, de gen, de mentalitate, etc."
                    id="p15"
                    defaultValue={fields.p15}
                    errors={errors.p15}
                    onChange={(e) => handleChange(e, "p15")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Cât de ușor v-a fost să vă integrați în colectivul profesoral?"
                    id="p16"
                    defaultValue={fields.p16}
                    errors={errors.p16}
                    onChange={(e) => handleChange(e, "p16")}
                    inLine={1}
                    customOptions={[
                        {
                            value: 1,
                            label: "Foarte greu"
                        },
                        {
                            value: 2,
                            label: "Greu"
                        },
                        {
                            value: 3,
                            label: "Moderat"
                        },
                        {
                            value: 4,
                            label: "Ușor"
                        },
                        {
                            value: 5,
                            label: "Foarte ușor"
                        },
                    ]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de satisfăcut sunteți de relația cu elevii?"
                    helper="Întrebarea face referire la: respectul reciproc, devotamentul și susținerea acordată etc."
                    id="p17"
                    defaultValue={fields.p17}
                    errors={errors.p17}
                    onChange={(e) => handleChange(e, "p17")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de satisfăcut sunteți de relația cu conducerea instituției?"
                    helper="Întrebarea face referire la: respectul reciproc, deschiderea conducerii de a primi propuneri de la dumneavoastră, susținerea acordată etc."
                    id="p18"
                    defaultValue={fields.p18}
                    errors={errors.p18}
                    onChange={(e) => handleChange(e, "p18")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult puneți accentul pe efortul elevilor în afara orelor?"
                    helper="Prin efort în afara orelor ne referim la teme pentru acasă, proiecte etc."
                    id="p19"
                    defaultValue={fields.p19}
                    errors={errors.p19}
                    onChange={(e) => handleChange(e, "p19")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Cât de des vă evaluați elevii?"
                    helper="Prin evaluare ne referim la teste, ascultări suplimentare etc."
                    id="p20"
                    defaultValue={fields.p20}
                    errors={errors.p20}
                    onChange={(e) => handleChange(e, "p20")}
                    inLine={1}
                    customOptions={[
                        {
                            value: 5,
                            label: "Săptămânal"
                        },
                        {
                            value: 4,
                            label: "Lunar"
                        },
                        {
                            value: 3,
                            label: "Semestrial"
                        },
                        {
                            value: 2,
                            label: "Anual"
                        },
                        {
                            value: 1,
                            label: "Niciodată"
                        },
                    ]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <CheckboxGroup
                    label="Care sunt metodele de evaluare folosite de dumneavoastră?"
                    helper="Puteți alege mai multe variante, în funcție de metoda pe care ați folosit-o sau o folosiți."
                    id="p21"
                    defaultValue={fields.p21}
                    errors={errors.p21}
                    onChange={(e) => handleChange(e, "p21")}
                    options={["Proiect Individual",
                        "Proiect pe Grupe",
                        "Test Scris",
                        "Ascultare Orală",
                        "Exemporale Periodice",
                        "Note pe Teme",
                        "Atele",
                        "Nu știu/nu răspund"]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Cât de des folosiți materiale digitale la orele dumneavoastră?"
                    helper="De exemplu: prezentări PowerPoint, imagini, videoclipuri, aplicații, etc."
                    id="p22"
                    defaultValue={fields.p22}
                    errors={errors.p22}
                    onChange={(e) => handleChange(e, "p22")}
                    inLine={1}
                    customOptions={[
                        {
                            value: 5,
                            label: "Săptămânal"
                        },
                        {
                            value: 4,
                            label: "Lunar"
                        },
                        {
                            value: 3,
                            label: "Semestrial"
                        },
                        {
                            value: 2,
                            label: "Anual"
                        },
                        {
                            value: 1,
                            label: "Niciodată"
                        },
                    ]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="custom"
                    label="Cum ați descrie relațiile dintre profesorii liceului?"
                    id="p23"
                    defaultValue={fields.p23}
                    errors={errors.p23}
                    onChange={(e) => handleChange(e, "p23")}
                    inLine={1}
                    customOptions={[
                        {
                            value: 1,
                            label: "Foarte proaste"
                        },
                        {
                            value: 2,
                            label: "Proaste"
                        },
                        {
                            value: 3,
                            label: "Decente"
                        },
                        {
                            value: 4,
                            label: "Bune"
                        },
                        {
                            value: 5,
                            label: "Foarte bune"
                        },
                    ]}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de mult simțiți că sunteți respectat de către elevii dumneavoastră?"
                    id="p24"
                    defaultValue={fields.p24}
                    errors={errors.p24}
                    onChange={(e) => handleChange(e, "p24")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <RadioGroupResponsive
                    type="quantity"
                    label="Cât de dedicați considerați că sunt elevii la orele dumneavoastră?"
                    helper="Prin dedicare ne referim la: activitate în timpul orei, seriozitate în efectuarea temelor, interes afișat pentru materie în afara orelor etc."
                    id="p25"
                    defaultValue={fields.p25}
                    errors={errors.p25}
                    onChange={(e) => handleChange(e, "p25")}
                    inLine={1}
                />
            </Grid>

            <Grid item xs={12} sm={12}>
                <CheckboxGroup
                    label="Selectați cazurile care se potrivesc pentru liceul dumneavoastră:"
                    id="p26"
                    defaultValue={fields.p26}
                    errors={errors.p26}
                    onChange={(e) => handleChange(e, "p26")}
                    options={["Există comportament agresiv din partea profesorilor față de elevi",
                        "Există comportament agresiv din partea elevilor față de profesori",
                        "Există comportament agresiv din partea profesorilor față de profesori",
                        "Există comportament agresiv din partea elevilor față de elevi",
                        "Nu există comportament agresiv"]}
                />
            </Grid>

            {(fields.p26 && fields.p26.length > 0 && !fields.p26.includes("4")) && (
                <Grid item xs={12} sm={12}>
                    <Typography id={`p26b-label`}>Vă rugăm să ne povestiți un exemplu de comportament agresiv din liceul dumneavoastră.</Typography>
                    <FormHelperText error>{errors.p26b}</FormHelperText>
                    <TextField
                        id="p26b"
                        label="Introduceți aici exemplul dvs."
                        multiline
                        rows={4}
                        value={fields.p26b}
                        fullWidth
                        onChange={(e) => handleChange(e, "p26b")}
                    />
                </Grid>
            )}


        </FormWrapper >
    )
}