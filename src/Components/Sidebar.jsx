import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Avatar, Drawer, Menu, MenuItem, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import logo from "../assets/logo.png";
import routes from "../Routes/Routes";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  backgroundColor: "#f5f5f5", // Set AppBar background to white
  color: "#000000",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  // alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  backgroundColor: "#f5f5f5",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location (route)
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { text: "Dashboard", icon: <HomeOutlinedIcon />, path: "/dashboard" },
    { text: "Event", icon: <DateRangeOutlinedIcon />, path: "/event" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const isPublicRoute =
    location.pathname === "/" || location.pathname === "/sign-up";

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {/* Conditionally render AppBar and Drawer for public routes */}
      {!isPublicRoute && (
        <>
          <AppBar
            position="fixed"
            open={open}
            sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={[
                    { color: "#673ab7", mr: 2 },

                    open && { display: "none" },
                  ]}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    fontFamily: "Parkinsans",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: "black",
                  }}
                >
                  Event Management System
                </Typography>
              </Box>

              {/* Profile icon and menu */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>{user?.name}</Typography>

                <IconButton
                  size="xl"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="#673ab7"
                >
                  <AccountCircle
                    sx={{
                      color: "#673ab7",
                    }}
                  />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ede7f6",
                        color: "#673ab7",
                        transition: "background-color 0.3s ease",
                      },
                    }}
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ede7f6",
                        color: "#673ab7",
                        transition: "background-color 0.3s ease",
                      },
                    }}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>

          <Drawer
            sx={{
              color: "black",
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,

                backgroundColor: "white",
                color: "black",
                border: "0",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader
              sx={{
                backgroundColor: "white",
                color: "black",
                display: "flex", // Enable flexbox
                justifyContent: "space-between", // Align content to the end (right)
                alignItems: "center", // Center items vertically
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "70px",
                  height: "70px",
                  marginLeft: "10px",
                  objectFit: "contain", // Ensures the image fits well within its container
                  mixBlendMode: "darken", // Blend mode applied
                  display: "block", // Helps align in certain layouts
                }}
              />
              <IconButton
                onClick={handleDrawerClose}
                sx={{ color: "#673ab7", opacity: "100%" }}
              >
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon sx={{ color: "#673ab7" }} />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>

            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ede7f6",
                        color: "#673ab7",
                        transition: "background-color 0.3s ease",
                        borderRadius: "15px",
                      },
                    }}
                    component={Link}
                    to={item.path}
                  >
                    <ListItemIcon
                      sx={{ justifyContent: "center", fontSize: "medium" }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      )}

      <Main open={open}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Main>
    </Box>
  );
}
