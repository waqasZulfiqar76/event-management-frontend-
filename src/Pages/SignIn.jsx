// import {
//     Avatar,
//     Button,
//     TextField,
//     Grid,
//     Box,
//     Typography,
//     Container,
//     Link,
//   } from '@mui/material';
//   import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//   import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ApiUrl from '../Utils/ApiURL'
// import toast from 'react-hot-toast';
// import { Toaster } from 'react-hot-toast';

//   function SignIn() {
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         console.log(ApiUrl)
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         const reqPacket = {
//           email: data.get('email'),
//           password: data.get('password'),
//         };

//         // API Call to authenticate the user
//         try {
//           const response = await axios.post(`${ApiUrl}/users/login`, reqPacket);
//       console.log(response.data)

//           if (response.data.token) {
//             // Store the user's authentication status and token in local storage

//             localStorage.setItem('authToken', response.data.token);
//             navigate('/dashboard');
//             toast.success(error?.response?.data?.message)

//           } else {
//             // Handle invalid credentials (e.g., alert the user)
//             alert('Invalid credentials');
//           }
//         } catch (error) {
//           console.error('Error during authentication', error);
//           // alert('Authentication failed, please try again');
//           toast.error(error?.response?.data?.message, )

//         }
//       };

//     return (
//       <Container component="main" maxWidth="xs">
//         <div><Toaster/></div>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign In
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//               Sign In
//             </Button>
//             <Grid item>
//               <Link href="/sign-up" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     );
//   }

//   export default SignIn;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Client-side validation
    let validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop the form submission if there are validation errors
    }

    // Reset errors
    setErrors({});

    const reqPacket = {
      email: formData.email,
      password: formData.password,
    };

    // API Call to authenticate the user
    try {
      const response = await axios.post(`${ApiUrl}/users/login`, reqPacket);

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
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        // height: '100vh',
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
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
          padding: 3,
          borderRadius: 10,
          border: "1px solid rgba(255, 255, 255, 0.18)", // Border style
          backdropFilter: "blur(1.5px)", // Apply blur to the background
          WebkitBackdropFilter: "blur(1.5px)", // For Safari compatibility
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", // Shadow effect
          opacity: 0.9, // Set opacity
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" fontFamily="Parkinsans">
          Sign In
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
            sx={{
              mt: 3,
              mb: 2,
              fontFamily: "Parkinsans",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Sign In
          </Button>
          <Grid item>
            <Link href="/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
