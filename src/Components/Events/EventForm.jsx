// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import API_URL from "../../Utils/ApiURL";
// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";

// const EventForm = ({ eventId, closeModal }) => {
//   const { id } = useParams(); // Get id from URL
//   const navigate = useNavigate(); // To navigate after submission

//   // Initial form state
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     date: "",
//     category: "",
//     location: "",
//     organizer: "",
//   });
//   console.log(formData.organizer.id);
//   // Fetch event data for updating, if id exists
//   useEffect(() => {
//     if (!id) return; // Exit if no ID is provided

//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/events/get-event/${id}`);
//         const eventData = response?.data?.event;
//         setFormData({
//           title: eventData?.title || "",
//           description: eventData?.description || "",
//           date: eventData?.date
//             ? new Date(eventData.date).toISOString().slice(0, 10)
//             : "", // Format date for input fields
//           category: eventData?.category || "",
//           location: eventData?.location || "",
//           organizer: eventData?.organizer || [""], // Ensure it's an array or default to an empty array
//         });
//       } catch (error) {
//         console.error("Error fetching event data:", error);
//       }
//     };

//     fetchEvent();
//   }, [id, setFormData]);

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Retrieve organizer data from local storage
//   useEffect(() => {
//     const storedOrganizer = JSON.parse(localStorage.getItem("user"));
//     console.log(storedOrganizer);

//     if (storedOrganizer) {
//       setFormData((prevData) => ({
//         ...prevData,
//         organizer: storedOrganizer, // it's an object with the user's data
//       }));
//     }
//   }, []);

//   // Handle organizer change (if it's an array of IDs)
//   const handleOrganizerChange = (index, value) => {
//     const newOrganizers = [...formData.organizer];
//     newOrganizers[index] = value._id;
//     setFormData((prevData) => ({
//       ...prevData,
//       organizer: newOrganizers,
//     }));
//   };

//   // Handle form submission (create or update event)
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const apiEndpoint = id
//       ? `${API_URL}/events/update-event/${id}`
//       : `${API_URL}/events/create-event`;
//     const method = id ? "put" : "post";
//     // req packet data to be submitted
//     const reqPacket = {
//       title: formData.title,
//       description: formData.description,
//       date: formData.date,
//       category: formData.category,
//       location: formData.location,
//       organizer: formData.organizer._id,
//     };

//     axios[method](apiEndpoint, reqPacket)
//       .then((response) => {
//         console.log("Event saved successfully:", response.data);
//         toast.success(response.data.message);
//         closeModal();
//         navigate("/event");
//       })
//       .catch((error) => {
//         toast.error(error?.response?.data?.message || "Error");
//         console.error("Error saving event:", error);
//       });
//   };

//   const currentDate = new Date().toISOString().slice(0, 16);
//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         marginTop: "1rem",
//         minWidth: "100%",

//         backgroundColor: "#eef2f6",
//         borderRadius: "15px",
//         padding: 3,
//       }}
//     >
//       <Toaster />
//       <Typography
//         variant="h4"
//         marginTop="2rem"
//         gutterBottom
//         sx={{
//           fontWeight: "bold",
//           marginBottom: 3,
//           marginTop: 5,
//           fontFamily: "Parkinsans",
//           // backgroundColor: "#673ab7",

//           color: "black",

//           opacity: "70%",
//           padding: "10px",
//         }}
//       >
//         {id ? "Update Event" : "Create Event"}
//       </Typography>
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
//       >
//         {/* Title */}

//         <TextField
//           label="Title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           fullWidth
//           required
//         />

//         {/* Description */}

//         <TextField
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           multiline
//           rows={4}
//           fullWidth
//           required
//         />

//         {/* Date */}

//         <TextField
//           type="datetime-local"
//           name="date"
//           value={
//             formData.date
//               ? new Date(formData.date).toISOString().slice(0, -1)
//               : ""
//           }
//           onChange={handleChange}
//           fullWidth
//           required
//           inputProps={{ min: currentDate }}
//         />

//         {/* Category */}

//         <FormControl fullWidth required>
//           <InputLabel>Category</InputLabel>
//           <Select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             label="Category"
//           >
//             <MenuItem value="Conference">Conference</MenuItem>
//             <MenuItem value="Workshop">Workshop</MenuItem>
//             <MenuItem value="Seminar">Seminar</MenuItem>
//             {/* Add more categories as needed */}
//           </Select>
//         </FormControl>

//         {/* Location */}
//         <TextField
//           label="Location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           fullWidth
//           required
//         />

//         {/* Organizer */}
//         <TextField
//           label="Organizer"
//           name="organizer"
//           value={formData?.organizer?.name || ""}
//           onChange={(e) => handleOrganizerChange(0, e.target.value)}
//           fullWidth
//           required
//           disabled={
//             !!id &&
//             formData?.organizer?.id !==
//               JSON.parse(localStorage.getItem("user"))?.id
//           } // Disable if updating and it's not the logged-in user
//         />

//         {/* Submit Button */}

//         <Button
//           type="submit"
//           variant="contained"
//           sx={{ backgroundColor: "#673ab7" }}
//           fullWidth
//         >
//           {id ? "Update Event" : "Create Event"}
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default EventForm;

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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";

const EventForm = ({ eventId, closeModal }) => {
  const navigate = useNavigate(); // To navigate after submission
  const id = eventId;
  console.log(id, eventId);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: null, // Use `null` for compatibility with DateTimePicker
    category: "",
    location: "",
    organizer: "",
  });

  // Fetch event data for updating
  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/events/get-event/${id}`);
        const eventData = response?.data?.event;
        setFormData({
          title: eventData?.title || "",
          description: eventData?.description || "",
          date: eventData?.date ? dayjs(eventData.date) : null, // Use `dayjs` for date parsing
          category: eventData?.category || "",
          location: eventData?.location || "",
          organizer: eventData?.organizer || "",
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [id]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      date: newDate,
    }));
  };

  // Retrieve organizer data from local storage
  useEffect(() => {
    const storedOrganizer = JSON.parse(localStorage.getItem("user"));
    if (storedOrganizer) {
      setFormData((prevData) => ({
        ...prevData,
        organizer: storedOrganizer,
      }));
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = id
      ? `${API_URL}/events/update-event/${id}`
      : `${API_URL}/events/create-event`;
    const method = id ? "put" : "post";

    const reqPacket = {
      title: formData.title,
      description: formData.description,
      date: formData.date ? formData.date.toISOString() : "", // Convert dayjs object to ISO string
      category: formData.category,
      location: formData.location,
      organizer: formData.organizer._id,
    };

    axios[method](apiEndpoint, reqPacket)
      .then((response) => {
        toast.success(response.data.message);
        closeModal();
        navigate("/event");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error");
        console.error("Error saving event:", error);
      });
  };
  const currentDate = dayjs(); // Get the current date and time using dayjs

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "1rem",
        backgroundColor: "#eef2f6",
        borderRadius: "15px",
        padding: 3,
      }}
    >
      <Toaster />
      <Typography
        variant="h4"
        marginTop="2rem"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          fontFamily: "Parkinsans",
          color: "black",
          opacity: "70%",
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Date & Time"
            value={formData.date}
            onChange={handleDateChange}
            minDate={currentDate} // Set the minimum selectable date
            renderInput={(props) => <TextField {...props} fullWidth required />}
          />
        </LocalizationProvider>

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
          onChange={(e) => handleChange(e)}
          fullWidth
          required
          disabled
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#673ab7" }}
          fullWidth
        >
          {id ? "Update Event" : "Create Event"}
        </Button>
      </form>
    </Container>
  );
};

export default EventForm;
