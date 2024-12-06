import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const UnauthorizedPage = () => {
  // Handle redirection to home or login page
  const handleGoHome = () => {
    history.push("/"); // Redirects to the homepage
  };

  const handleGoLogin = () => {
    history.push("/login"); // Redirects to the login page
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1">
          You do not have permission to view this page. Please contact your
          administrator if you believe this is an error.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleGoHome}>
            Go to Home
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleGoLogin}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
