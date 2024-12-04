import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import API_URL from "../Utils/ApiURL";
import axios from "axios";

const DashboardStats = ({ userStats }) => {
  const [stats, setStats] = useState(userStats || null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  // Fetch user stats
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!userStats) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${API_URL}/users/user-stats/${user._id}`
          );

          // Log response data
          console.log(response.data);

          // Check if response status is not successful
          if (response.status !== 200) {
            throw new Error("Failed to fetch user stats");
          }

          // Set stats with response data
          setStats(response.data);
        } catch (error) {
          console.error("Error fetching stats:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserStats();
  }, [userStats]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
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
        User Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Created Events Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: "primary.main",
              color: "common.white",
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontFamily: "Parkinsans", mb: 1 }}
              >
                Total Events Created
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats?.totalCreatedEvents || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Joined Events Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: "secondary.main",
              color: "common.white",
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontFamily: "Parkinsans", mb: 1 }}
              >
                Total Events Joined
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats?.totalJoinedEvents || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Created Events Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: "info.main",
              color: "common.white",
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontFamily: "Parkinsans", mb: 1 }}
              >
                Upcoming Created Events
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats?.upcomingCreatedEvents || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Joined Events Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: "warning.main",
              color: "common.white",
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontFamily: "Parkinsans", mb: 1 }}
              >
                Upcoming Joined Events
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats?.upcomingJoinedEvents || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardStats;
