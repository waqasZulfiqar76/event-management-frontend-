import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiUrl from "../Utils/ApiURL"; // Ensure ApiUrl is correct
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState, useCallback } from "react";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To handle the submission state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Handle input change efficiently
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear the error as soon as the user starts typing in the field
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  }, []);

  // Enhanced validation function
  const validate = (data) => {
    let validationErrors = {};

    if (!data.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!data.password) {
      validationErrors.password = "Password is required";
    }

    return validationErrors;
  };

  // Submit form function with validation
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Reset errors if validation passed

    if (isSubmitting) return;

    setIsSubmitting(true); // Set submitting state to true

    try {
      const response = await axios.post(`${ApiUrl}/users/login`, formData);

      if (response.data.token) {
        // Store the user's authentication status and token in local storage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Sign In successful");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during authentication", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false); // Reset submitting state after the request is finished
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Toaster />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: 3,
          borderRadius: 10,
          border: "1px solid rgba(255, 255, 255, 0.18)",
          backdropFilter: "blur(1.5px)",
          WebkitBackdropFilter: "blur(1.5px)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          opacity: 0.9,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#673ab7" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          fontFamily="Parkinsans"
          color="#673ab7"
        >
          Hi, Welcome Back
        </Typography>
        <Typography fontFamily="Parkinsans" color="#697586">
          Enter your credentials to continue
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "black",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "black",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ color: "#673ab7" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              fontFamily: "Parkinsans",
              backgroundColor: "#673ab7",
              color: "white",
            }}
            disabled={isSubmitting}
          >
            Sign In
          </Button>
          <Grid item>
            <Link href="/sign-up" variant="body2" color="#697586">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
