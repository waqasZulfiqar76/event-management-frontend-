import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import EventTable from "../Components/Events/EventsTable"; // Assuming this is the correct path
import axios from "axios";
import API_URL from "../Utils/ApiURL"; // Assuming this is your API base URL
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [joineventData, setJoinEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // fetching user events
  const fetchUserEvents = async () => {
    try {
      setLoading(true);

      // Assuming that user._id is the dynamic part you need in the URL
      const response = await axios.get(
        `${API_URL}/users/created-events/${user._id}`
      );
      console.log(response.data, "response here");
      // If the response structure contains an 'events' field
      setEventData(response?.data?.createdEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  // fetching user join events
  const fetchUserJoinedEvents = async () => {
    try {
      setLoading(true);

      // Assuming that user._id is the dynamic part you need in the URL
      const response = await axios.get(
        `${API_URL}/users/joined-events/${user._id}`
      );
      console.log(response.data, "response joined here");
      // If the response structure contains an 'events' field
      setJoinEventData(response?.data?.joinedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events data
  useEffect(() => {
    if (user) {
      fetchUserEvents();
      fetchUserJoinedEvents();
    }
  }, [user]);

  // Handle delete event
  const handleDeleteEvent = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${API_URL}/events/delete-event/${id}`);

      setEventData(eventData.filter((event) => event._id !== id));

      setTotalCount((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  //handle update event
  const handleUpdateEvent = (id) => {
    console.log("Updating event with ID:", id);
    navigate(`/event-form/${id}`);
  };
  //handle detail event
  const handleDetail = (id) => {
    console.log("detail event with ID:", id);
    navigate(`/event-detail/${id}`);
  };

  return (
    <Box sx={{ padding: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* User Profile Section */}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                fontWeight: "bold",
                marginBottom: 3,
                marginTop: 5,
                fontFamily: "Parkinsans", // Font you want to apply

                color: "Black",

                opacity: "70%",
                padding: "10px",
                clipPath: "polygon(0 0, 91% 0, 100% 100%, 8% 100%)",
              }}
            >
              User Profile
            </Typography>
            {user ? (
              <Box>
                <Typography variant="body1" fontFamily="Parkinsans">
                  <strong>Name:</strong> {user.name}
                </Typography>
                <Typography variant="body1" fontFamily="Parkinsans">
                  <strong>Email:</strong> {user.email}
                </Typography>
                {/* Add other user details here */}
              </Box>
            ) : (
              <CircularProgress />
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Events Table Section */}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                fontWeight: "bold",
                marginBottom: 3,
                marginTop: 5,
                fontFamily: "Parkinsans",
                backgroundColor: "#1976d2",
                color: "white",
                backgroundColor: "black",
                opacity: "70%",
                padding: "10px",
                clipPath: "polygon(0 0, 91% 0, 100% 100%, 8% 100%)",
              }}
            >
              My Events
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : eventData?.length > 0 ? (
              <EventTable
                events={eventData}
                handleDeleteEvent={handleDeleteEvent}
                handleUpdateEvent={handleUpdateEvent}
                isUserEvents={true}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No events found for this user.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
      {/*joined Events Table Section */}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Card>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                fontWeight: "bold",
                marginBottom: 3,
                marginTop: 5,
                fontFamily: "Parkinsans",
                backgroundColor: "#1976d2",
                color: "white",
                backgroundColor: "black",
                opacity: "70%",
                padding: "10px",
                clipPath: "polygon(0 0, 91% 0, 100% 100%, 8% 100%)",
              }}
            >
              Joined Events
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : joineventData?.length > 0 ? (
              <EventTable
                events={joineventData}
                handleDetail={handleDetail}
                isUserEvents={false}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No events found for this user.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Profile;
