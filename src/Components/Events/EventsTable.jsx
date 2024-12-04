import React from "react";
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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";

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
  console.log(events, "join event ");
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Organizer</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell> {/* New column for actions */}
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

              {/* Conditional rendering of actions */}
              <TableCell>
                {isUserEvents ? (
                  <Box sx={{ display: "flex", gap: "0.3rem" }}>
                    <SecurityUpdateGoodIcon
                      onClick={() => handleUpdateEvent(event._id)}
                      color="primary"
                    />
                    <DeleteIcon
                      sx={{ color: "#f44336" }}
                      onClick={() => handleDeleteEvent(event._id)}
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

      {/* Conditionally hide pagination if events are user-specific */}
      {!isUserEvents && (
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
  );
};

export default EventTable;
