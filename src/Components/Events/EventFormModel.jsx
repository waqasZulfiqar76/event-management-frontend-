import React, { useState } from "react";
import { Button, Modal, Box, Backdrop, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EventForm from "./EventForm"; // Import the EventForm component
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "16px",
  p: 2,
  maxHeight: "90vh",
  overflowY: "auto",
  /* Hide scrollbar but allow scrolling */
  "&::-webkit-scrollbar": {
    display: "none", // For Chrome, Safari, and Edge
  },
  "&": {
    scrollbarWidth: "none", // For Firefox
  },
};

const EventFormModal = ({ eventId, heading }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Button to open modal */}

      {eventId ? (
        // Display the EditOutlinedIcon when id is present
        <EditOutlinedIcon
          sx={{
            color: "#5e35b1",

            cursor: "pointer",
          }}
          onClick={handleOpen}
        />
      ) : (
        // Display the button otherwise
        <Button
          onClick={handleOpen}
          sx={{
            padding: "5px",
            width: "6.5rem",
            height: "2.5rem",
            color: "#5e35b1",
            outline: "#5e35b1",
          }}
          variant="outlined"
        >
          {heading}
        </Button>
      )}

      {/* Modal containing the EventForm */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            {console.log(eventId)}
            <EventForm eventId={eventId} closeModal={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EventFormModal;
