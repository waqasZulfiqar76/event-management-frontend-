import React, { useState, useEffect } from "react";
import axios from "axios";
import EventTable from "../Components/Events/EventsTable"; // Import the reusable table component
import API_URL from "../Utils/ApiURL";
import { Box, Button, Tabs, Tab, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EventFormModal from "../Components/Events/EventFormModel";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const [tabValue, setTabValue] = useState(0); // For tab navigation
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchEventsByStatus = async (status) => {
    try {
      const response = await axios.get(`${API_URL}/events/get-events`, {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          title: searchTitle,
          approvalStatus: status,
        },
      });
      if (status === "pending") {
        setPendingEvents(response.data.events);
      } else if (status === "approved") {
        setApprovedEvents(response.data.events);
      }
      setTotalCount(response.data.pagination.totalCount);
    } catch (error) {
      console.error(`Error fetching ${status} events:`, error);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchEventsByStatus("pending");
      fetchEventsByStatus("approved");
    } else {
      fetchEventsByStatus("approved");
    }
  }, [user?.role, page, rowsPerPage, searchTitle]);

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

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${API_URL}/events/delete-event/${id}`);
      setPendingEvents((prev) => prev.filter((event) => event._id !== id));
      setApprovedEvents((prev) => prev.filter((event) => event._id !== id));
      setTotalCount((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateEvent = (id) => {
    navigate(`/event-form/${id}`);
  };

  const handleDetail = (id) => {
    navigate(`/event-detail/${id}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0); // Reset page when switching tabs
  };

  return (
    <Box
      sx={{
        marginTop: "4.5rem",
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
          justifyContent: "space-between",
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
        <EventFormModal heading="Add Event" eventId={null} />
      </Box>

      {user?.role === "admin" ? (
        <>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              marginBottom: "1rem",
              "& .MuiTab-root": {
                color: "black",
              },
              "& .Mui-selected": {
                color: "#673ab7",
                fontWeight: "bold",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#673ab7",
              },
            }}
          >
            <Tab label="Pending Events" />
            <Tab label="Approved Events" />
          </Tabs>
          <Box>
            {tabValue === 0 && (
              <EventTable
                events={pendingEvents}
                totalCount={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                handlePageChange={handleChangePage}
                handleRowsPerPageChange={handleChangeRowsPerPage}
                handleDeleteEvent={handleDeleteEvent}
                handleUpdateEvent={handleUpdateEvent}
                handleDetail={handleDetail}
                isUserEvents={false}
              />
            )}
            {tabValue === 1 && (
              <EventTable
                events={approvedEvents}
                totalCount={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                handlePageChange={handleChangePage}
                handleRowsPerPageChange={handleChangeRowsPerPage}
                handleDeleteEvent={handleDeleteEvent}
                handleUpdateEvent={handleUpdateEvent}
                handleDetail={handleDetail}
                isUserEvents={false}
              />
            )}
          </Box>
        </>
      ) : (
        <EventTable
          events={approvedEvents}
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          handlePageChange={handleChangePage}
          handleRowsPerPageChange={handleChangeRowsPerPage}
          handleDeleteEvent={handleDeleteEvent}
          handleUpdateEvent={handleUpdateEvent}
          handleDetail={handleDetail}
          isUserEvents={false}
        />
      )}
    </Box>
  );
};

export default Events;
