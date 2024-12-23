import React, { useState, useEffect } from "react";
import axios from "axios";
import EventTable from "../Components/Events/EventsTable"; // Import the reusable table component
import API_URL from "../Utils/ApiURL";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/events/get-events/`, {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            title: searchTitle,
          },
        });

        setEvents(response.data.events);
        setTotalCount(response.data.pagination.totalCount);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [page, rowsPerPage, searchTitle]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTitle(event.target.value);
  };

  // Handle delete event
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${API_URL}/events/delete-event/${id}`);

      setEvents(events.filter((event) => event._id !== id));

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
    <>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
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
        Events
      </Typography>
      <Box
        sx={{
          margin: "1rem 0",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <TextField
          variant="standard"
          type="text"
          value={searchTitle}
          onChange={handleSearchChange}
          placeholder="Search Event"
          style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
        />
        <Button
          onClick={() => navigate("/event-form")}
          sx={{
            padding: "5px",
            width: "6rem",
            height: "2.5rem",
            color: "black",
            outline: "black",
          }}
          variant="outlined"
        >
          Add Event
        </Button>
      </Box>
      <EventTable
        events={events}
        totalCount={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        handlePageChange={handleChangePage}
        handleRowsPerPageChange={handleChangeRowsPerPage}
        handleDeleteEvent={handleDeleteEvent}
        handleUpdateEvent={handleUpdateEvent}
        handleDetail={handleDetail}
      />
    </>
  );
};

export default Events;
