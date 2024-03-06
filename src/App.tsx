import logo from './logo.svg';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { DataModel, Menu } from './interfaces';
import { useForm, SubmitHandler } from "react-hook-form";
import { handlePostMethod } from './services/api';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { AlertColor } from '@mui/material';
function App() {

  const { register, formState: { errors }, handleSubmit, getValues } = useForm<DataModel>();
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertSeverity, setSeverity] = useState<AlertColor>("success");

  const onSubmit: SubmitHandler<DataModel> = (data) => {
    handlePostMethod(data).then((status) => {
      debugger
      if (status === "Success") {
        setAlertMessage("User account successfully created.");
        setSeverity("success");
      } else {
        setAlertMessage("There was an error creating the account");
        setSeverity("error");
      }
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
  const years = Array.from({ length: 100 }, (_, index) => { let item: Menu = { label: String(currentYear - index), value: currentYear - index }; return item; });
  const months = Array.from({ length: 12 }, (_, index) => { let item: Menu = { label: String(index + 1), value: index + 1 }; return item; });
  const days = Array.from({ length: 31 }, (_, index) => { let item: Menu = { label: String(index + 1), value: index + 1 }; return item; });

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
        <Toolbar className='test'>
          <img src={logo} className='image-layout' alt="logo" />
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
          open={isAlertOpen}
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


        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" >
              Create User Account
            </Typography>

            <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <form onSubmit={handleSubmit(onSubmit)} >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="full_name" className='input-label'>Full Name</InputLabel>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="full_name"
                      label="Full Name"
                      autoFocus
                      {...register("full_name", { required: true, pattern: { value: /^[a-zA-Z\s]+$/i, message: "Sorry. Name can not include special symbols. Please use alphabets only." }, validate: (value) => { return value.trim().length !== 0 || "Name has only whitespace" } })}
                      error={errors.full_name ? true : false}
                      helperText={errors.full_name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <InputLabel htmlFor="contact_number" className='input-label'>Contact Number</InputLabel>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="contact_number"
                      label="Contact Number"
                      placeholder='4383048998'
                      autoFocus
                      {...register("contact_number", { required: true, minLength: { value: 10, message: "Invalid number" }, maxLength: { value: 10, message: "Please enter your number without country code" }, pattern: { value: /^[0-9]+$/i, message: "Sorry. Please enter numbers only." } })}
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
                      renderInput={(params) => <TextField required {...params} label="Day" {...register("date_of_birth.day", { required: "This field required" })} error={errors.date_of_birth?.day ? true : false}
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
                      renderInput={(params) => <TextField required {...params} label="Month" {...register("date_of_birth.month", { required: "This field required" })} error={errors.date_of_birth?.month ? true : false}
                        helperText={errors.date_of_birth?.month?.message} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disablePortal
                      disableClearable
                      id="year"
                      options={years}
                      renderInput={(params) => <TextField required {...params} label="Year" {...register("date_of_birth.year", { required: "This field required" })} error={errors.date_of_birth?.year ? true : false}
                        helperText={errors.date_of_birth?.year?.message} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="email" className='input-label'>Email Address</InputLabel>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoFocus
                      {...register("email", { required: true, pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i, message: "Sorry, This email address is not valid. Please try again" } })}
                      error={errors.email ? true : false}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="password" className='input-label'>Password</InputLabel>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="password"
                      label="Create Password"
                      autoFocus
                      {...register("password", { required: true, minLength: 8, pattern: { value: /^[a-zA-Z0-9]+$/i, message: "Password can have alphabets and numbers only!" } })}
                      error={errors.password ? true : false}
                      helperText={errors.password?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="confirm_password" className='input-label'>Confirm Password</InputLabel>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="confirm_password"
                      label="Confirm Password"
                      autoFocus
                      {...register("confirm_password", {
                        required: true, minLength: 8, pattern: { value: /^[a-zA-Z0-9]+$/i, message: "Password can have alphabets and numbers only!" }, validate: (value) => {
                          return value === getValues("password") || "Password don't match, please check and try again!";
                        }
                      })}
                      error={errors.confirm_password ? true : false}
                      helperText={errors.confirm_password?.message}

                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ borderColor: '#127C95' }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid> */}
                </Grid>
              </form>
            </Paper >
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ borderColor: '#127C95' }}
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
        </Grid>
      </Container>
    </div >
  );
}

export default App;
