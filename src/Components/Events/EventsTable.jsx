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
  console.log(events, "join event");
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto", // Enable horizontal scrolling for small screens
      }}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650, // Ensures the table doesn't collapse on small screens
            "@media (max-width: 600px)": {
              minWidth: "100%", // Adjust for extra small screens
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Organizer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
    </Box>
  );
};

export default EventTable;

// import React from "react";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableRow,
//   TablePagination,
//   TableContainer,
//   Paper,
//   Box,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";

// const EventTable = ({
//   events,
//   totalCount,
//   rowsPerPage,
//   page,
//   handlePageChange,
//   handleRowsPerPageChange,
//   handleDeleteEvent,
//   handleUpdateEvent,
//   handleDetail,
//   isUserEvents,
// }) => {
//   console.log(events, "join event ");
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Title</TableCell>
//             <TableCell>Organizer</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell>Location</TableCell>
//             <TableCell>Actions</TableCell> {/* New column for actions */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {events.map((event) => (
//             <TableRow key={event?._id}>
//               <TableCell>{event?.title}</TableCell>
//               <TableCell>{event?.organizer?.name}</TableCell>
//               <TableCell>{event?.description}</TableCell>
//               <TableCell>{new Date(event?.date).toLocaleString()}</TableCell>
//               <TableCell>{event?.location}</TableCell>

//               {/* Conditional rendering of actions */}
//               <TableCell>
//                 {isUserEvents ? (
//                   <Box sx={{ display: "flex", gap: "0.3rem" }}>
//                     <SecurityUpdateGoodIcon
//                       onClick={() => handleUpdateEvent(event._id)}
//                       color="primary"
//                     />
//                     <DeleteIcon
//                       sx={{ color: "#f44336" }}
//                       onClick={() => handleDeleteEvent(event._id)}
//                     />
//                   </Box>
//                 ) : (
//                   <VisibilityIcon onClick={() => handleDetail(event._id)} />
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Conditionally hide pagination if events are user-specific */}
//       {!isUserEvents && (
//         <TablePagination
//           rowsPerPageOptions={[10, 20, 30]}
//           component="div"
//           count={totalCount}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       )}
//     </TableContainer>
//   );
// };

// export default EventTable;
