import React, { useState, useEffect } from "react";

// material-ui

import { Box, Grid, Typography, useMediaQuery } from "@mui/material";

// third party
import * as Yup from "yup";
import { Form, Formik } from "formik";

import FormikField from "components/form";
import axios from "axios";

import CustomButton from "components/@extended/CustomButton";

// navigation
import { useNavigate } from "react-router";
import CustomSnackbar from "components/snackbar/CustomSnackbar";

const LoginPageForm = ({ ...others }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const initialValues = {
    userName: "",
    password: "",
  };
  


  const managerLogin = async (userData) => {
    await axios
      .post(
        "https://d6hv1f8eaf.execute-api.us-east-1.amazonaws.com/scp-project/auth",
        JSON.stringify({
          "operation": "authenticate",
          "payload": {
            "Key": {
              "username": userData.userName,
            },
            "password": userData.password,
          },
        }),
        {    
          headers: {
          'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        console.log(response)
        return setLoginData(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loginData?.errorMessage || loginData?.body === false) {
      setOpenSnackBar(true);
    }
    if (loginData !== null && loginData?.body) {
      navigate("/booking/all");
    }
  }, [loginData]);

  console.log(loginData);
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const userData = {
            userName: values.userName,
            password: values.password,
          };

          managerLogin(userData);
        }}
      >
        <Form className="d-flex flex-column">
          <FormikField
            variant="outlined"
            type="text"
            name="userName"
            label="User Name"
          />
          <FormikField
            sx={{ mt: 2 }}
            variant="outlined"
            type="password"
            name="password"
            label="Password"
          />

          <CustomButton fullWidth type="submit" title="Sign In" />
        </Form>
      </Formik>
      <CustomSnackbar
        open={openSnackBar}
        handleClose={handleClose}
        severity={
          loginData?.errorMessage || loginData?.body === false
            ? "error"
            : "success"
        }
        message={
          loginData?.errorMessage || loginData?.body === false
            ? "Invalid Credentials"
            : "You have successfully logged in"
        }
      />
    </>
  );
};

export default LoginPageForm;
