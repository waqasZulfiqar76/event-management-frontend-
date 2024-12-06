// routes.js
import Dashboard from "../Pages/Dashboard";
import Events from "../Pages/Events";
import Profile from "../Pages/Profile";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import EventForm from "../Components/Events/EventForm";
import EventDetailPage from "../Pages/EventDetailPage";
import ProtectedRoute from "../Utils/ProtectedRoute";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon />,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/event",
    name: "Event",
    icon: <EventNoteIcon />,
    element: (
      <ProtectedRoute>
        <Events />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    name: "Profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/event-detail/:id",
    name: "Event Detail",
    element: (
      <ProtectedRoute>
        <EventDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/event-form/:id",
    name: "Edit Event",
    element: (
      <ProtectedRoute>
        <EventForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/event-form",
    name: "Add Event",
    element: (
      <ProtectedRoute>
        <EventForm />
      </ProtectedRoute>
    ),
  },
  { path: "/", name: "Sign In", element: <SignIn /> },
  { path: "/sign-up", name: "Sign Up", element: <SignUp /> },
];

export default routes;
