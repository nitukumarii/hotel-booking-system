import { useState, useEffect } from "react";
// material-ui

import { Grid, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

// project imports

import axios from "axios";
import moment from "moment";

import CustomButton from "components/@extended/CustomButton";

// navigation
import { useNavigate } from "react-router";
import CustomTable from "components/table/CustomTable";

const AllBooking = ({ ...others }) => {
  const navigate = useNavigate();

  // states
  const [showData, setShowData] = useState(null);

  const getAllBookings = async () => {
    const options = {
      headers: { "content-type": "application/json" },
    };
    await axios
      .get("/api/v1/booking/getAll", options)
      .then((response) => {
        console.log(response)
        return setShowData(response.data);
      })
      .catch((err) => console.log(err));
  };
  const DateAppointView = (date) => {
    const isoDate = date;
    const newDate = moment.utc(isoDate).format("lll");
    return newDate;
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const columns = [
    { id: "id", label: "ID", minWidth: 120 },
    { id: "firstName", label: "First Name", minWidth: 170, align: "center" },
    { id: "surName", label: "Sur Name", minWidth: 170, align: "center" },

    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "phone",
      label: "Phone",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "arrivalDate",
      label: "Arrival Date",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "numOfNights",
      label: "No Of Nights",
      minWidth: 170,
      align: "center",
      //   format: (value) => console.log(value),
    },

    {
      id: "numOfGuests",
      label: "No Of Guests",
      minWidth: 170,
      align: "center",
      //   format: (value) => console.log(value),
    },
    {
      id: "notes",
      label: "Notes",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];
  function createData(
    id,
    firstName,
    surName,
    email,
    phone,
    arrivalDate,
    numOfNights,
    numOfGuests,
    notes
  ) {
    return {
      id,
      firstName,
      surName,
      email,
      phone,
      arrivalDate,
      numOfNights,
      numOfGuests,
      notes,
    };
  }
  const rowData = showData?.data?.map((item, index) => {
    return createData(
      index,
      item.firstName,
      item.surName,
      item.email,
      item.phone,
      DateAppointView(item.arrivalDate),
      item.numOfNights,
      item.numOfGuests,
      item.notes
    );
  });
  console.log(showData?.data);
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ marginTop: 5 }}
      >
        <Grid item xs={10}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">All Bookings</Typography>
            <Typography
              component={Link}
              to="/home"
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              Log Out
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={10}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {showData?.data && <CustomTable columns={columns} rows={rowData} />}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AllBooking;
