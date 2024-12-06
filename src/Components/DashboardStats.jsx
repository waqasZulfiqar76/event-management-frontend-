import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import API_URL from "../Utils/ApiURL";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

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

          if (response.status !== 200) {
            throw new Error("Failed to fetch user stats");
          }

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

  const chartData = [
    { id: 0, value: stats?.totalCreatedEvents || 0, label: "Created Events" },
    { id: 1, value: stats?.totalJoinedEvents || 0, label: "Joined Events" },
    {
      id: 2,
      value: stats?.upcomingCreatedEvents || 0,
      label: "Upcoming Created",
    },
    // {
    //   id: 3,
    //   value: stats?.upcomingJoinedEvents || 0,
    //   label: "Upcoming Joined",
    // },
  ];

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
    <>
      <Box
        sx={{
          marginTop: "4rem",
          minWidth: "100%",

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
          User Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {/* Total Created Events Card */}
          <Card
            sx={{
              backgroundImage: `linear-gradient(to right, #11998e,#38ef7d )`,
              color: "common.white",
              boxShadow: 3,
              flex: "1 1 calc(25% - 16px)",
              maxWidth: "300px",
              minWidth: "200px",
              transition: "all 0.3s ease",
              transform: "scale(1)",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats?.totalCreatedEvents || 0}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "semiBold",
                  fontFamily: "Parkinsans",
                  mt: "1rem",
                  lineHeight: "20px",
                  textAlign: "center",
                }}
              >
                Total Events Created
              </Typography>
            </CardContent>
          </Card>

          {/* Total Joined Events Card */}
          <Card
            sx={{
              backgroundImage: `linear-gradient(to right, #4e54c8, #8f94fb)`,
              color: "common.white",
              boxShadow: 3,
              flex: "1 1 calc(25% - 16px)",
              maxWidth: "300px",
              minWidth: "200px",
              transition: "all 0.3s ease",
              transform: "scale(1)",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats?.totalJoinedEvents || 0}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "semiBold",
                  fontFamily: "Parkinsans",
                  mt: "1rem",
                  lineHeight: "20px",
                  textAlign: "center",
                }}
              >
                Total Events Joined
              </Typography>
            </CardContent>
          </Card>

          {/* Upcoming Created Events Card */}
          <Card
            sx={{
              backgroundImage: `linear-gradient(to right, #c471f2, #f76cc6)`,
              color: "common.white",
              boxShadow: 3,
              flex: "1 1 calc(25% - 16px)",
              maxWidth: "300px",
              minWidth: "200px",
              transition: "all 0.3s ease",
              transform: "scale(1)",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats?.upcomingCreatedEvents || 0}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "semiBold",
                  fontFamily: "Parkinsans",
                  mt: "1rem",
                  lineHeight: "20px",
                  textAlign: "center",
                }}
              >
                Upcoming Created Events
              </Typography>
            </CardContent>
          </Card>

          {/* Upcoming Joined Events Card */}
          {/* <Card
            sx={{
              backgroundImage: "linear-gradient(to right, #FF8C00, #FFA500)", // Gradient colors
              color: "common.white",
              boxShadow: 3,
              flex: "1 1 calc(25% - 16px)",
              maxWidth: "300px",
              minWidth: "200px",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats?.upcomingJoinedEvents || 0}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "semiBold",
                  fontFamily: "Parkinsans",
                  mt: "1rem",
                  lineHeight: "20px",
                }}
              >
                Upcoming Joined Events
              </Typography>
            </CardContent>
          </Card> */}
          {/* <Card
            sx={{
              backgroundImage: "linear-gradient(to right, #FF8C00, #FFA500)", // Gradient
              color: "common.white",
              boxShadow: 3,
              flex: "1 1 calc(25% - 16px)",
              maxWidth: "300px",
              minWidth: "200px",
              borderRadius: "12px", // Optional: Rounded corners
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
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {stats?.upcomingJoinedEvents || 0}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "semiBold",
                  fontFamily: "Parkinsans",
                  mt: "1rem",
                  lineHeight: "20px",
                }}
              >
                Upcoming Joined Events
              </Typography>
            </CardContent>
          </Card> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
            padding: 2,
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            boxShadow: 1,
            maxWidth: "100",
            marginLeft: "auto",
            marginRight: "auto", // Center horizontally
          }}
        >
          <PieChart
            series={[
              {
                data: chartData,
              },
            ]}
            width={600}
            height={300}
          />
        </Box>
      </Box>
    </>
  );
};

export default DashboardStats;
