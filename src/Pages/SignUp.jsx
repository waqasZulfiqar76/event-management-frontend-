import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiUrl from "../Utils/ApiURL"; // Ensure ApiUrl is correct
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
// submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    let validationErrors = {};

    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!formData.password) validationErrors.password = "Password is required";
    else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop the form submission if there are validation errors
    }

    // Reset errors
    setErrors({});

    const reqPacket = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    // API Call to register the user
    try {
      const response = await axios.post(`${ApiUrl}/users/signup`, reqPacket);

      if (response.data.token) {
        // Store the user's authentication status and token in local storage
        localStorage.setItem("authToken", response.data.token);
        toast.success("Sign Up successful");
        navigate("/dashboard");
      } else {
        toast.error("Sign Up failed");
      }
    } catch (error) {
      console.error("Error during sign up", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Toaster />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Add semi-transparent background
          padding: 3,
          borderRadius: 10,
          border: "1px solid rgba(255, 255, 255, 0.18)", // Border style
          backdropFilter: "blur(1.5px)", // Apply blur to the background
          WebkitBackdropFilter: "blur(1.5px)", // For Safari
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", // Add shadow
          opacity: 0.9, // Set opacity
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" fontFamily="Parkinsans">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 ,fontFamily:"Parkinsans", backgroundColor:"black", color:"white"}}

          >
            Sign Up
          </Button>
          <Grid item>
            <Link href="/" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
