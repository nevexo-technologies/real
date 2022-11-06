import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Step, StepLabel, Stepper, Typography, Box, Container, Chip } from '@mui/material';

import PersonalInfo from '../components/Students/PersonalInfo';
import Opportunities from '../components/Students/Opportunities';
import Resources from '../components/Students/Resources';
import Community from '../components/Students/Community';
import FormSubmit from '../components/Students/FormSubmit';
import Layout from '../components/Layout';

import Head from "next/head";

export default function StudentForm() {
    const router = useRouter();
    const { ref } = router.query;

    const startTime = Date.now();

    const [formStep, setFormStep] = useState(0);
    const stepsName = ['Despre tine', 'Oportunități', 'Resurse', 'Comunitate'];
    const [formValues, setFormValues] = useState({ ref: ref, startTime: startTime });
    const [formState, setFormState] = useState({});

    const nextStep = (values) => {
        setFormValues(values);
        setFormStep((currentStep) => currentStep + 1);
        window.scrollTo(0, 0);
    }

    const previousStep = () => {
        setFormStep((currentStep) => currentStep - 1);
        window.scrollTo(0, 0);
    }

    return (
        <>
            <Head>
                <title>Formular elevi | Registrul Educațional Alternativ</title>
            </Head>
            <Layout>
                <Container maxWidth="sm">
                    <Container variant="floating" sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                        <Stepper activeStep={formStep} alternativeLabel>
                            {stepsName.map((value, idx) => {
                                return (
                                    <Step key={idx}>
                                        <StepLabel>{value}</StepLabel>
                                    </Step>
                                )
                            })}
                        </Stepper>
                    </Container>
                    <Container variant="floating">
                        <Box textAlign="left" sx={{ mb: 2, display: { xs: 'block', sm: 'block', md: 'none' } }}>
                            <Chip label={formStep + 1} color="primary" />&nbsp;<Typography variant='overline'>{stepsName[formStep]}</Typography>
                        </Box>

                        {formStep == 0 && (
                            <PersonalInfo formValues={formValues} nextStep={nextStep} />
                        )}
                        {formStep == 1 && (
                            <Opportunities formValues={formValues} nextStep={nextStep} previousStep={previousStep} />
                        )}
                        {formStep == 2 && (
                            <Resources formValues={formValues} nextStep={nextStep} previousStep={previousStep} />
                        )}
                        {formStep == 3 && (
                            <Community formValues={formValues} nextStep={nextStep} previousStep={previousStep} setFormState={setFormState} />
                        )}
                        {formStep == 4 && (
                            <FormSubmit formValues={formValues} nextStep={nextStep} previousStep={previousStep} formState={formState} />
                        )}

                    </Container>
                    <Typography sx={{ color: 'white' }} variant="overline">Creat cu ❤️ de Registrul Educațional Alternativ</Typography>
                </Container>
            </Layout>
        </>
    )
}
