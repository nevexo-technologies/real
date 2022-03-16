import { useMemo, useState } from 'react';

import { CssBaseline, Step, StepLabel, Stepper, Typography, Box, useMediaQuery, Container, ThemeProvider, Chip } from '@mui/material';
import { whiteTheme, darkTheme } from '../components/MUITheme';

import PersonalInfo from '../components/Student/PersonalInfo';
import Opportunities from '../components/Student/Opportunities';
import Resources from '../components/Student/Resources';
import Community from '../components/Student/Community';


export default function StudentForm() {
  const [formStep, setFormStep] = useState(1);
  const stepsName = ['Despre tine', 'Oportunități', 'Resurse', 'Comunitate'];
  const [formValues, setFormValues] = useState({});
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const nextStep = (values) => {
    setFormValues(values);
    setFormStep((currentStep) => currentStep + 1);
  }

  const previousStep = () => {
    setFormStep((currentStep) => currentStep - 1);
  }

  // TODO: implementat functionalitate referral
  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : whiteTheme}>
      <CssBaseline />
      <Box sx={{backgroundImage: `url(https://images.unsplash.com/photo-1645258312950-0b1c10b714ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)`}}>
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

          </Container>
          <Typography variant="overline">Creat cu ❤️ de Registrul Educațional Alternativ</Typography>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
