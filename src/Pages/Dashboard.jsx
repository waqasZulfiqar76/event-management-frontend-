import { useEffect, useState } from "react";
import DashboardStats from "../Components/DashboardStats";
import axios from "axios";
import API_URL from "../Utils/ApiURL";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch user stats
  const fetchUserStats = async () => {
    {
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

  // fetch admin stats
  const fetchAdminStats = async () => {
    {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/admin/admin-stats`);

        if (response.status !== 200) {
          throw new Error("Failed to fetch user stats");
        }

        setStats(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    // Fetch stats based on user role
    if (user?.role === "admin") {
      fetchAdminStats();
    } else {
      fetchUserStats();
    }
  }, [user?.role]);
  return (
    <div>
      <DashboardStats
        heading={user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        stats={stats}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
