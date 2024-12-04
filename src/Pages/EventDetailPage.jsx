import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import API_URL from "../Utils/ApiURL";
import { useParams } from "react-router-dom";
import eventImage from "../assets/event.jpg";
import toast, { Toaster } from "react-hot-toast";

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // Fetching specific event
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/events/get-event/${id}`);
        setEvent(response.data.event);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  const handleRegister = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/events/join-event/${id}/user/${userId}`
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
      console.error("Error registering for event:", error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Event not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Toaster />
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Grid container spacing={4}>
          {/* Left side (Event Details) */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontFamily: "Parkinsans",
                color: "black",
                opacity: "70%",
              }}
            >
              {event.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              sx={{ mb: 2 }}
            >
              <strong>Category:</strong> {event.category} |
              <strong>Date:</strong>
              {new Date(event.date).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography variant="body1" paragraph>
              {event.description}
            </Typography>
            <Box sx={{ mt: 8 }}>
              <Typography variant="body2" color="textSecondary">
                <strong>Location:</strong> {event.location}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                <strong>Organizer:</strong> {event.organizer.name} (
                {event.organizer.email})
              </Typography>
              <Button
                onClick={handleRegister}
                variant="contained"
                color="dark"
                size="large"
              >
                Register Now
              </Button>
            </Box>
          </Grid>

          {/* Right side (Image and Highlights) */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={event.imageUrl || eventImage}
                alt="Event Image"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: "dark" }}
                >
                  Event Highlights
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.highlights || "More details coming soon..."}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EventDetailPage;

// code to be used
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
// } from "@mui/material";
// import API_URL from "../Utils/ApiURL";
// import { useParams } from "react-router-dom";
// import eventImage from "../assets/event.jpg";
// import toast, { Toaster } from "react-hot-toast";

// const EventDetailPage = () => {
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user._id;

//   // fetching specific event
//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_URL}/events/get-event/${id}`);
//         setEvent(response.data.event);
//         setLoading(false);
//       } catch (error) {
//         console.error("There was an error fetching the event data:", error);
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchEventData();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <Container>
//         <Typography variant="h6" align="center" color="primary">
//           Loading...
//         </Typography>
//       </Container>
//     );
//   }

//   if (!event) {
//     return (
//       <Container>
//         <Typography variant="h6" align="center" color="error">
//           Event not found.
//         </Typography>
//       </Container>
//     );
//   }

//   // Register user for the event
//   const handleRegister = async () => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/events/join-event/${id}/user/${userId}`
//       );

//       toast.success(response.data.message);
//       setSuccessMessage("You have successfully registered for the event!");
//       setIsSnackbarOpen(true);
//     } catch (error) {
//       toast.error(error.response.data.message);

//       console.error(error);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 5 }}>
//       <Toaster />
//       <Paper elevation={3} sx={{ p: 2, bgcolor: "background.paper" }}>
//         <Grid container spacing={4}>
//           {/* Left side (Event Details) */}
//           <Grid item xs={12} sm={7}>
//             <Typography
//               sx={{
//                 fontWeight: "bold",
//                 fontSize: "1.5rem",

//                 fontFamily: "Parkinsans",
//                 backgroundColor: "#1976d2",
//                 color: "white",
//                 backgroundColor: "black",
//                 opacity: "70%",
//                 padding: "10px",
//                 // clipPath: "polygon(0 0, 91% 0, 100% 100%, 8% 100%)",
//               }}
//             >
//               {event.title}
//             </Typography>
//             <Typography color="textSecondary" gutterBottom>
//               Category: {event.category} | Date:{" "}
//               {new Date(event.date).toLocaleString()}
//             </Typography>
//             <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
//               Description: {event.description}
//             </Typography>
//             <Box sx={{ marginTop: "4rem" }}>
//               <Typography variant="body2" color="textSecondary">
//                 Location: {event.location}
//               </Typography>
//               <Typography variant="body2" color="textSecondary" paragraph>
//                 Organized by: {event.organizer.name} ({event.organizer.email})
//               </Typography>

//               {/* Optional: Add action button */}
//               <Button
//                 onClick={handleRegister}
//                 variant="outlined"
//                 color="dark"
//                 size="large"
//               >
//                 Register Now
//               </Button>
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={5}>
//             <Card sx={{ maxWidth: 345 }}>
//               {/* Placeholder image or actual event image */}
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={event.imageUrl || eventImage}
//                 alt="Event Image"
//               />
//               <CardContent>
//                 <Typography variant="h6" component="div">
//                   Event Highlights
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {/* Add short summary or event highlights */}
//                   {event.highlights || "More details coming soon..."}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default EventDetailPage;
