import React, { useState, useEffect } from "react";
import axios from "axios";
import EventTable from "../Components/Events/EventsTable"; // Import the reusable table component
import API_URL from "../Utils/ApiURL";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
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
      <Box
        sx={{
          marginTop: "4.5rem",

          // height: "100vh",
          backgroundColor: "#eef2f6",
          borderRadius: "15px",
          padding: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            marginBottom: 3,
            textAlign: "start",
            fontFamily: "Parkinsans",
            color: "black",
            opacity: "70%",
            padding: "10px",
          }}
        >
          Events
        </Typography>
        <Box
          sx={{
            margin: "",
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
              width: "6.5rem",
              height: "2.5rem",
              color: "#5e35b1",
              outline: "#5e35b1",
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
      </Box>
    </>
  );
};

export default Events;
