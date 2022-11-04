import { useState } from 'react';
import { useRouter } from 'next/router';

import { Step, StepLabel, Stepper, Typography, Box, Container, Chip } from '@mui/material';

import PersonalInfo from '../components/Parents/PersonalInfo';
import Opportunities from '../components/Parents/Opportunities';
import Resources from '../components/Parents/Resources';
import Community from '../components/Parents/Community';
import FormSubmit from '../components/Parents/FormSubmit';
import Layout from '../components/Layout';

export default function StudentForm() {
    const router = useRouter();
    const { ref } = router.query;

    const startTime = Date.now();

    const [formStep, setFormStep] = useState(0);
    const stepsName = ['Despre dvs.', 'Oportunități', 'Resurse', 'Comunitate'];
    const [formValues, setFormValues] = useState({ ref: ref, startTime: startTime });

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
                        <Community formValues={formValues} nextStep={nextStep} previousStep={previousStep} />
                    )}
                    {formStep == 4 && (
                        <FormSubmit formValues={formValues} nextStep={nextStep} previousStep={previousStep} startTime={startTime} />
                    )}

                </Container>
                <Typography sx={{ color: 'white' }} variant="overline">Creat cu ❤️ de Registrul Educațional Alternativ</Typography>
            </Container>
        </Layout>
    )
}
