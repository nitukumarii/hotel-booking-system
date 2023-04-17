import { Link } from "react-router-dom";

import { Stack, Grid, Typography } from "@mui/material";
import AuthWrapper from "pages/authentication/AuthWrapper";
import HotelBg from "assets/auth/hotel.jpg";
import BookingForm from "./bookingForm";

const DashboardDefault = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${HotelBg})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <AuthWrapper>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Fill out the form</Typography>
            <Typography
              component={Link}
              to="/login"
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              Click Here for Manager
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <BookingForm />
        </Grid>
      </AuthWrapper>
    </Grid>
  );
};

export default DashboardDefault;
