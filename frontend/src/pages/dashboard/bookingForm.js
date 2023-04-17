import { useState, useEffect } from "react";

// material-ui

import { Box, Button } from "@mui/material";

// third party
import * as Yup from "yup";
import { Form, Formik } from "formik";

// project imports

import axios from "axios";
import { useNavigate } from "react-router";

// assets
import FormikField from "components/form";
// date import
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomButton from "components/@extended/CustomButton";
import CustomSnackbar from "components/snackbar/CustomSnackbar";

const BookingForm = ({ ...others }) => {
  const navigate = useNavigate();

  // states
  const [showData, setShowData] = useState(null);
  const [date, setDate] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  const initialValues = {
    firstName: "",
    surName: "",
    email: "",
    phone: "",
    noOfNights: "",
    noOfGuests: "",
    notes: "",
  };

  const onCreateBooking = async (userData) => {
    const options = {
      headers: { "content-type": "application/json" },
    };
    await axios
      .post("api/v1/booking/submit", userData, options)
      .then((response) => {
        if (response.data.success) {
          onEmailSend(userData);
        }
        return setShowData(response.data);
      })
      .catch((err) => console.log(err));
  };
  const onEmailSend = async (userData) => {
    console.log(userData)
    await axios.post(
      "https://lraxg2db82.execute-api.us-east-1.amazonaws.com/sendEmail",
      userData
    );
  };

  useEffect(() => {
    if (showData?.errorMessage || showData?.success || !showData?.success) {
      setOpenSnackBar(true);
    }
    if (showData !== null && showData?.success) {
      navigate("/home");
    }
  }, [showData]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const userData = {
            firstName: values.firstName,
            surName: values.surName,
            email: values.email,
            phone: values.phone,
            arrivalDate: date,
            numOfNights: values.numOfNights,
            numOfGuests: values.numOfGuests,
            notes: values.notes,
          };

          setShowData(userData);
          onCreateBooking(userData);
        }}
      >
        <Form className="d-flex flex-column">
          <FormikField
            sx={{ mt: 2 }}
            variant="outlined"
            type="text"
            name="firstName"
            label="First Name"
          />
          <FormikField
            sx={{ mt: 2 }}
            variant="outlined"
            type="text"
            name="surName"
            label="Sur Name"
          />

          <FormikField
            sx={{ mt: 2 }}
            variant="outlined"
            type="email"
            name="email"
            label="Email"
          />

          <FormikField
            sx={{ mt: 2 }}
            variant="outlined"
            type="phone"
            name="phone"
            label="Phone"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ mt: 2, width: "100%" }}
              value={date}
              onChange={(newValue) => setDate(newValue)}
              label="Arrival Date"
              inputFormat="MM/dd/yyyy"
              name="arrivalDate"
            />
          </LocalizationProvider>

          <FormikField
            sx={{ mt: 2 }}
            variant="outlined"
            type="number"
            name="numOfNights"
            label="Number of Nights"
          />

          <FormikField
            sx={{ mt: 2 }}
            variant="outlined"
            type="number"
            name="numOfGuests"
            label="Number Of Guests"
          />

          <FormikField
            sx={{ mt: 2 }}
            variant="outlined"
            type="text"
            textArea
            name="notes"
            label="Notes"
          />

          <CustomButton fullWidth type="submit" title="Submit" />
        </Form>
      </Formik>

      {showData !== null && (
        <CustomSnackbar
          open={openSnackBar}
          handleClose={handleClose}
          severity={
            showData?.errorMessage || showData?.success === false
              ? "error"
              : "success"
          }
          message={
            showData?.errorMessage || showData?.success === false
              ? "Something went wrong"
              : "Thank you, We have got the booking details and will contact you soon!"
          }
        />
      )}
    </>
  );
};

export default BookingForm;
