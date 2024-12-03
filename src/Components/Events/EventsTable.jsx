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
  Button,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityUpdateGoodIcon from '@mui/icons-material/SecurityUpdateGood';const EventTable = ({
  events,
  totalCount,
  rowsPerPage,
  page,
  handlePageChange,
  handleRowsPerPageChange,
  handleDeleteEvent,
  handleUpdateEvent,
  handleDetail
}) => {
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
              {/* <TableCell sx={{ display: "flex" }}>
                <SecurityUpdateGoodIcon
                  onClick={() => handleUpdateEvent(event._id)}
                  color="primary"
                  style={{ marginRight: "10px" }}
                />

                <DeleteIcon
                 sx={{ color:"#f44336"}}
                  onClick={() => handleDeleteEvent(event._id)}
                />
              </TableCell> */}
              <TableCell>
              <VisibilityIcon 
              onClick={() => handleDetail(event._id)}
              />

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default EventTable;
