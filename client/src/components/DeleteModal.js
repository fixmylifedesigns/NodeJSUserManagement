import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const style = {
  // display: "flex",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({ user, setSubmitting }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (!user) return;

  const handleDelete = () => {
    setSubmitting(true);
    axios
      .delete(`http://localhost:8080/users/${user.id}`)
      .then((res) => {
        console.log(res.data.message);
        setSubmitting(false);
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete {user.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            You are about to Delete a user.
          </Typography>
          <Stack
            style={{ display: "flex", justifyContent: "center" }}
            direction="row"
            spacing={2}
          >
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
