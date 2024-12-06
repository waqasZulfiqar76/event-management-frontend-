import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  TableContainer,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import { Delete } from "@mui/icons-material";

const EventTable = ({
  events,
  totalCount,
  rowsPerPage,
  page,
  handlePageChange,
  handleRowsPerPageChange,
  handleDeleteEvent,
  handleUpdateEvent,
  handleDetail,
  isUserEvents,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleOpenDialog = (id) => {
    setSelectedEventId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEventId(null);
  };

  const handleConfirmDelete = () => {
    handleDeleteEvent(selectedEventId);

    handleCloseDialog();
  };

  // Check if pagination should be shown
  const shouldShowPagination = !isUserEvents && totalCount > rowsPerPage;

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
      }}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            "@media (max-width: 600px)": {
              minWidth: "100%", // Adjust for extra small screens
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#673ab7",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#673ab7",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Organizer
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#673ab7",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#673ab7",
                  color: "white",
                  backgroundColor: "#673ab7",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#673ab7",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Location
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#673ab7",
                  color: "white",
                  backgroundColor: "#673ab7",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event?._id}>
                <TableCell>{event?.title}</TableCell>
                <TableCell>{event?.organizer?.name}</TableCell>
                <TableCell>{event?.description}</TableCell>
                <TableCell>{new Date(event?.date).toLocaleString()}</TableCell>
                <TableCell>{event?.location}</TableCell>
                <TableCell>
                  {isUserEvents ? (
                    <Box sx={{ display: "flex", gap: "0.5rem" }}>
                      <SecurityUpdateGoodIcon
                        onClick={() => handleUpdateEvent(event._id)}
                        color="primary"
                      />
                      <DeleteIcon
                        sx={{ color: "#f44336" }}
                        onClick={() => handleOpenDialog(event._id)}
                      />
                    </Box>
                  ) : (
                    <VisibilityIcon onClick={() => handleDetail(event._id)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {shouldShowPagination && (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </TableContainer>
      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "8px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#D32F2F",
            fontSize: "1.2rem",
            display: "flex",

            alignItems: "center",
          }}
        >
          <Delete sx={{ fontSize: "1.5rem", marginRight: "8px" }} />
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              backgroundColor: "#673ab7",
              color: "white",
              "&:hover": {
                backgroundColor: "#512da8",
              },
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventTable;
