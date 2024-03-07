import logo from './logo.svg';
import './App.css';
import { AppBar, Toolbar } from '@mui/material';
import { Container, Paper, Grid, CssBaseline } from '@mui/material';
import { TextField, InputLabel, Autocomplete, Button, Typography } from '@mui/material';
import { DataModel, Menu } from './interfaces';
import { useForm, SubmitHandler } from "react-hook-form";
import { handlePostMethod } from './services/api';
import { Alert, Snackbar, AlertColor, useMediaQuery, SnackbarOrigin } from '@mui/material';
import { useState } from 'react';

const MONTHS_LOCALE_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {

  const { register, reset, formState: { errors }, handleSubmit, getValues } = useForm<DataModel>();
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setSeverity] = useState<AlertColor>("success");
  const isMobileScreen = useMediaQuery('(max-width: 600px)');

  const mobileAnchorOrigin: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  };

  const defaultAnchorOrigin: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'right',
  };

  const anchorOrigin = isMobileScreen ? mobileAnchorOrigin : defaultAnchorOrigin;

  const onSubmit: SubmitHandler<DataModel> = (data) => {
    handlePostMethod(data).then((data) => {
      if (data.title === "Success") {
        setSeverity("success");
      } else {
        setSeverity("error");
      }
      setAlertMessage(data.description);
      setAlertOpen(true);
    }).catch(() => {
      setAlertMessage("There was an error creating the account");
      setSeverity("error");
      setAlertOpen(true);
    })
  }

  const handleCloseAlert = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => { let item = { label: String(currentYear - index) }; return item; });
  const months = MONTHS_LOCALE_EN.map((month, index) => ({ label: month, value: index + 1 }));
  const days = Array.from({ length: 31 }, (_, index) => { let item = { label: String(index + 1) }; return item; });

  return (
    <div className="App">
      <CssBaseline />

      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar className='tool-bar'>
          <img src={logo} className='image-layout' alt="logo" />
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        {/* Common Alert publisher */}
        <Snackbar
          anchorOrigin={anchorOrigin}
          open={isAlertOpen}
          sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
          className={isMobileScreen ? 'align-notification' : ''}
          autoHideDuration={5000}  // Auto hide after 5 seconds
          onClose={handleCloseAlert}
        >
          <Alert
            variant="filled"
            severity={alertSeverity}
            sx={{ position: 'absolute', top: 50, right: 25 }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>

        {/* Sign up form starts here */}
        <Grid container spacing={1} sx={{ mt: '20px' }}>
          <form onSubmit={handleSubmit(onSubmit)} >
            <Grid item xs={12} >
              <Typography variant="h6" textAlign={'left'} pb={'16px'} >
                Create User Account
              </Typography>
              <Paper sx={{ mb: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="full_name" className='input-label'>Full Name</InputLabel>
                    <TextField
                      variant="outlined"
                      // required disabling default required feature to be more consistent with other validations
                      fullWidth
                      id="full_name"
                      label="Full Name*"
                      // autoFocus not required for time being
                      {...register("full_name", { required: "Thsi field is required", pattern: { value: /^[a-zA-Z\s]+$/i, message: "Sorry. Name can not include special symbols. Please use alphabets only." }, validate: (value) => { return value.trim().length !== 0 || "Name has only whitespace" } })}
                      error={errors.full_name ? true : false}
                      helperText={errors.full_name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <InputLabel htmlFor="contact_number" className='input-label'>Contact Number</InputLabel>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="contact_number"
                      label="Contact Number*"
                      placeholder='4383048998'
                      {...register("contact_number", { required: "Thsi field is required", minLength: { value: 10, message: "Invalid number" }, maxLength: { value: 10, message: "Please enter your number without country code" }, pattern: { value: /^[0-9]+$/i, message: "Sorry. Please enter numbers only." } })}
                      error={errors.contact_number ? true : false}
                      helperText={errors.contact_number?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel htmlFor="date_of_birth" className='input-label' style={{ marginBottom: 0 }} >Birthdate</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      id="day"
                      options={days}
                      renderInput={(params) => <TextField  {...params} label="Day*" {...register("date_of_birth.day", {
                        required: "This field required", validate: (day) => {
                          if (getValues("date_of_birth.month") !== '' && getValues("date_of_birth.year") !== '' && getValues("date_of_birth.day") !== '') {
                            //validate the date
                            const monthIndex = MONTHS_LOCALE_EN.findIndex(x => x === getValues("date_of_birth.month"));
                            const date = new Date(parseInt(getValues("date_of_birth.year")), monthIndex, parseInt(getValues("date_of_birth.day")));
                            return (date.getMonth() === monthIndex)
                              && date.getFullYear() === parseInt(getValues("date_of_birth.year"))
                              && date.getDate() === parseInt(getValues("date_of_birth.day"))
                              || "Please enter a valid date!"
                          }
                          return true;
                        }
                      })}
                        error={errors.date_of_birth?.day ? true : false}
                        helperText={errors.date_of_birth?.day?.message} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      id="month"
                      options={months}
                      // sx={{ width: 300 }}
                      renderInput={(params) => <TextField  {...params} label="Month*" {...register("date_of_birth.month", { required: "This field required" })} error={errors.date_of_birth?.month ? true : false}
                        helperText={errors.date_of_birth?.month?.message} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      id="year"
                      options={years}
                      renderInput={(params) => <TextField  {...params} label="Year*" {...register("date_of_birth.year", { required: "This field required" })} error={errors.date_of_birth?.year ? true : false}
                        helperText={errors.date_of_birth?.year?.message} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="email" className='input-label'>Email Address</InputLabel>
                    <TextField
                      variant="outlined"
                      // required
                      fullWidth
                      id="email"
                      label="Email Address*"
                      {...register("email", { required: "Thsi field is required", pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i, message: "Sorry, This email address is not valid. Please try again" } })}
                      error={errors.email ? true : false}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="password" className='input-label'>Password</InputLabel>
                    <TextField
                      variant="outlined"
                      // required
                      fullWidth
                      id="password"
                      label="Create Password*"
                      {...register("password", { required: "Thsi field is required", minLength: { value: 8, message: "Please enter a password that is atleast 8 characters" }, pattern: { value: /^[a-zA-Z0-9]+$/i, message: "Password can have alphabets and numbers only!" } })}
                      error={errors.password ? true : false}
                      helperText={errors.password?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="confirm_password" className='input-label'>Confirm Password</InputLabel>
                    <TextField
                      variant="outlined"
                      // required
                      fullWidth
                      id="confirm_password"
                      label="Confirm Password*"
                      {...register("confirm_password", {
                        required: "Thsi field is required", minLength: { value: 8, message: "Please enter a password that is atleast 8 characters" }, pattern: { value: /^[a-zA-Z0-9]+$/i, message: "Password can have alphabets and numbers only!" }, validate: (value) => {
                          return value === getValues("password") || "Password don't match, please check and try again!";
                        }
                      })}
                      error={errors.confirm_password ? true : false}
                      helperText={errors.confirm_password?.message}

                    />
                  </Grid>
                </Grid>

              </Paper >
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Button
                    type="submit"
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ borderColor: '#127C95' }}
                    onClick={() => reset()}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </div >
  );
}

export default App;
