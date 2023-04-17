import { Box } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import AnimateButton from "./AnimateButton";

const CustomButton = ({ fullWidth, type, title, loading }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <AnimateButton>
        <LoadingButton
          fullWidth={fullWidth}
          loadingPosition="center"
          disableElevation
          size="large"
          type={type}
          variant="contained"
        >
          {title}
        </LoadingButton>
      </AnimateButton>
    </Box>
  );
};

export default CustomButton;
