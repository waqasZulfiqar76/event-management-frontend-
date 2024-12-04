import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../Utils/ApiURL";
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const EventForm = () => {
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate(); // To navigate after submission

  // Initial form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    location: "",
    organizer: "",
  });
  console.log(formData.organizer.id);
  // Fetch event data for updating, if id exists
  useEffect(() => {
    if (!id) return; // Exit if no ID is provided

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/events/get-event/${id}`);
        const eventData = response?.data?.event;
        setFormData({
          title: eventData?.title || "",
          description: eventData?.description || "",
          date: eventData?.date
            ? new Date(eventData.date).toISOString().slice(0, 10)
            : "", // Format date for input fields
          category: eventData?.category || "",
          location: eventData?.location || "",
          organizer: eventData?.organizer || [""], // Ensure it's an array or default to an empty array
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [id, setFormData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Retrieve organizer data from local storage
  useEffect(() => {
    const storedOrganizer = JSON.parse(localStorage.getItem("user"));
    console.log(storedOrganizer);

    if (storedOrganizer) {
      setFormData((prevData) => ({
        ...prevData,
        organizer: storedOrganizer, // it's an object with the user's data
      }));
    }
  }, []);

  // Handle organizer change (if it's an array of IDs)
  const handleOrganizerChange = (index, value) => {
    const newOrganizers = [...formData.organizer];
    newOrganizers[index] = value._id;
    setFormData((prevData) => ({
      ...prevData,
      organizer: newOrganizers,
    }));
  };

  // Handle form submission (create or update event)
  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = id
      ? `${API_URL}/events/update-event/${id}`
      : `${API_URL}/events/create-event`;
    const method = id ? "put" : "post";
    // req packet data to be submitted
    const reqPacket = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      category: formData.category,
      location: formData.location,
      organizer: formData.organizer._id,
    };

    axios[method](apiEndpoint, reqPacket)
      .then((response) => {
        console.log("Event saved successfully:", response.data);
        toast.success(response.data.message);
        navigate("/event");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error");
        console.error("Error saving event:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Toaster />
      <Typography
        variant="h4"
        marginTop="2rem"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          marginTop: 5,
          fontFamily: "Parkinsans", // Font you want to apply
          backgroundColor: "#1976d2",
          color: "white",
          backgroundColor: "black",
          opacity: "70%",
          padding: "10px",
          clipPath: "polygon(0 0, 91% 0, 100% 100%, 8% 100%)",
        }}
      >
        {id ? "Update Event" : "Create Event"}
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* Title */}

        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* Description */}

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
        />

        {/* Date */}

        <TextField
          type="datetime-local"
          name="date"
          value={
            formData.date
              ? new Date(formData.date).toISOString().slice(0, -1)
              : ""
          }
          onChange={handleChange}
          fullWidth
          required
        />

        {/* Category */}

        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="Conference">Conference</MenuItem>
            <MenuItem value="Workshop">Workshop</MenuItem>
            <MenuItem value="Seminar">Seminar</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>

        {/* Location */}
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* Organizer */}
        <TextField
          label="Organizer"
          name="organizer"
          value={formData?.organizer?.name || ""}
          onChange={(e) => handleOrganizerChange(0, e.target.value)}
          fullWidth
          required
          disabled={
            !!id &&
            formData?.organizer?.id !==
              JSON.parse(localStorage.getItem("user"))?.id
          } // Disable if updating and it's not the logged-in user
        />

        {/* Submit Button */}

        <Button type="submit" variant="contained" color="dark" fullWidth>
          {id ? "Update Event" : "Create Event"}
        </Button>
      </form>
    </Container>
  );
};

export default EventForm;
