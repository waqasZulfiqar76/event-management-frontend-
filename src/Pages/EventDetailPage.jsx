import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Paper, Box, Button, Card, CardContent, CardMedia } from '@mui/material';
import API_URL from '../Utils/ApiURL';
import { useParams } from 'react-router-dom';
import eventImage from '../assets/event.jpg';

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId= user._id
    console.log(userId)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/events/get-event/${id}`);
        setEvent(response.data.event);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the event data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h6" align="center" color="primary">Loading...</Typography>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container>
        <Typography variant="h6" align="center" color="error">Event not found.</Typography>
      </Container>
    );
  }

    // Register user for the event
    const handleRegister = async () => {
console.log(id, "event id")
console.log(userId, "user id")
        try {
          const response = await axios.post(`${API_URL}/events/join-event/${id}/user/${userId}`);
         console.log(response.data)
          setSuccessMessage('You have successfully registered for the event!');
          setIsSnackbarOpen(true);
        } catch (error) {
       
          console.error(error);
        }
      };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
        <Grid container spacing={4}>
          {/* Left side (Event Details) */}
          <Grid item xs={12} sm={7}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {event.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {event.category} | {new Date(event.date).toLocaleString()}
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              {event.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Location: {event.location}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Organized by: {event.organizer.name} ({event.organizer.email})
            </Typography>

            {/* Optional: Add action button */}
            <Button onClick={handleRegister} variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
              Register Now
            </Button>
          </Grid>

          {/* Right side (Image or Placeholder) */}
          <Grid item xs={12} sm={5}>
            <Card sx={{ maxWidth: 345 }}>
              {/* Placeholder image or actual event image */}
              <CardMedia
                component="img"
                height="200"
                image={event.imageUrl || eventImage}
                alt="Event Image"
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Event Highlights
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {/* Add short summary or event highlights */}
                  {event.highlights || 'More details coming soon...'}
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
