import { useMemo, useState } from 'react';

import { CssBaseline, Step, StepLabel, Stepper, Typography, Box, useMediaQuery, Container, ThemeProvider, Chip } from '@mui/material';
import createMUITheme from '../components/MUITheme';

import PersonalInfo from '../components/Student/PersonalInfo';
import Opportunities from '../components/Student/Opportunities';
import Resources from '../components/Student/Resources';
import Community from '../components/Student/Community';
import FormSubmit from '../components/Student/FormSubmit';


export default function StudentForm() {
  const [formStep, setFormStep] = useState(0);
  const stepsName = ['Despre tine', 'Oportunități', 'Resurse', 'Comunitate'];
  const [formValues, setFormValues] = useState({});
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const nextStep = (values) => {
    setFormValues(values);
    setFormStep((currentStep) => currentStep + 1);
    window.scrollTo(0,0);
  }

  const previousStep = () => {
    setFormStep((currentStep) => currentStep - 1);
    window.scrollTo(0,0);
  }

  // TODO: implementat functionalitate referral
  return (
    <ThemeProvider theme={createMUITheme(prefersDarkMode)}>
      <CssBaseline />
      <Box sx={{
        py: 3,
        minHeight: "100vh",
        height: "100%",
        backgroundImage: prefersDarkMode ? "url(/background-dark.png)" : "url(/background-light.png)",
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}>
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
              <FormSubmit formValues={formValues} nextStep={nextStep} previousStep={previousStep} />
            )}
            {formStep == 5 && (
              <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>{`${JSON.stringify(formValues)}`}</pre>
            )}

          </Container>
          <Typography sx={{color:'white'}} variant="overline">Creat cu ❤️ de Registrul Educațional Alternativ</Typography>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
