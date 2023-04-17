import { useState, useEffect } from "react";

// material-ui

import { Box, Grid, Typography } from "@mui/material";

// third party
import * as Yup from "yup";
import { Form, Formik } from "formik";

import axios from "axios";
import { useNavigate } from "react-router";

// assets
import FormikField from "components/form";
import CustomButton from "components/@extended/CustomButton";
import CustomSnackbar from "components/snackbar/CustomSnackbar";

const RegisterPageForm = ({ ...others }) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClose = () => {
    setOpenSnackBar(false);
  };
  const initialValues = {
    userName: "",
    password: "",
  };


  const onRegisterManager = async (userData) => {
    await axios
      .post(
        "https://d6hv1f8eaf.execute-api.us-east-1.amazonaws.com/scp-project/auth",
        JSON.stringify({
          "operation": "create_user",
          "payload": {
            "Item": {
              "username": userData.userName,
              "password": userData.password
            }
          }
      }),
      {    
        headers: {
        'Content-Type': 'application/json'
        }
      }
      )
      .then((response) => {
        console.log(response)
        return setRegisterData(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (registerData?.errorMessage || registerData?.body === false) {
      setOpenSnackBar(true);
    }
    if (registerData !== null && registerData?.body) {
      console.log("Success login",  registerData?.body)
      navigate("/login");
    }
  }, [registerData]);

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
              Sign Up with Email address
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

          onRegisterManager(userData);
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

          <CustomButton fullWidth type="submit" title="Sign Up" />
        </Form>
      </Formik>

      <CustomSnackbar
        open={openSnackBar}
        handleClose={handleClose}
        severity={
          registerData?.errorMessage || registerData?.body == false
            ? "error"
            : "success"
        }
        message={
          registerData?.errorMessage || registerData?.body == false
            ? "Something went wrong"
            : "You have been registered successfully "
        }
      />
    </>
  );
};

export default RegisterPageForm;
