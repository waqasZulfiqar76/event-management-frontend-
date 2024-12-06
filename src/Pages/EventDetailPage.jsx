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
  const [userData, setUserData] = useState(null);
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
        console.log(response.data, "event data ");
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
      // Update the local event state to reflect registration
      setEvent((prevEvent) => ({
        ...prevEvent,
        attendees: [...prevEvent.attendees, { _id: userId, name: user.name }],
      }));
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

  // Check if the user has already joined the event
  const isRegistered = event.attendees.some(
    (attendee) => attendee._id === userId
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "4rem",
        minWidth: "100%",

        backgroundColor: "#eef2f6",
        borderRadius: "15px",
        padding: 3,
      }}
    >
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
                textAlign: "start",
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
              sx={{ mb: 2, textAlign: "start" }}
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
            <Typography variant="body1" sx={{ textAlign: "start" }} paragraph>
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
              {isRegistered ? (
                <Button
                  disabled
                  size="large"
                  sx={{
                    backgroundColor: "#ede7f6",
                    color: "black",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  Registered
                </Button>
              ) : (
                <Button
                  onClick={handleRegister}
                  size="large"
                  sx={{
                    backgroundColor: "#673ab7",
                    color: "black",

                    padding: "10px 20px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  Register Now
                </Button>
              )}
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
