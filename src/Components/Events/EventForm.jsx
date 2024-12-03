import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../Utils/ApiURL";

const EventForm = () => {
  const { id } = useParams(); // Get id from URL
  const navigate = useNavigate(); // To navigate after submission
  console.log(id);
  // Initial form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    location: "",
    organizer: [""], // Assuming it's an array of IDs
  });

  // Fetch event data for updating, if id exists
  useEffect(() => {
    if (!id) return; // Exit if no ID is provided

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_URL}/events/get-event/${id}`);
        const eventData = response?.data?.event;
        console.log(eventData);
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

  // Handle organizer change (if it's an array of IDs)
  const handleOrganizerChange = (index, value) => {
    const newOrganizers = [...formData.organizer];
    newOrganizers[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      organizer: newOrganizers,
    }));
  };

  // Handle form submission (create or update event)
  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = id
      ? `/events/update-event/${id}`
      : "/events/create-event";
    const method = id ? "put" : "post";

    axios[method](apiEndpoint, formData)
      .then((response) => {
        console.log("Event saved successfully:", response.data);
        navigate("/events"); // Redirect after successful save
      })
      .catch((error) => {
        console.error("Error saving event:", error);
      });
  };

  return (
    <div>
      <h1>{id ? "Update Event" : "Create Event"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
  type="datetime-local"
  name="date"
  value={formData.date ? new Date(formData.date).toISOString().slice(0, -1) : ''} // Format the date properly
  onChange={handleChange}
  required
/>

        </div>
        <div>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Organizer</label>

          <input
            type="text"
            name="location"
            value={formData?.organizer?.name || ""}
            disabled={!!id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? "Update Event" : "Create Event"}</button>
      </form>
    </div>
  );
};

export default EventForm;
