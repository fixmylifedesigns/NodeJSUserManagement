import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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

export default function EditModal({ user, setSubmitting, setError }) {
  const [open, setOpen] = React.useState(false);
  const [updateUserForm, setUpdateUserForm] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  if (!user) return;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setError(false);
    if (updateUserForm?.name || updateUserForm?.zipCode) {
      setSubmitting(true);
      axios
        .put(`http://localhost:8080/users/${user.id}`, {
          name: updateUserForm?.name,
          zipCode: updateUserForm?.zipCode,
        })
        .catch((error) => {
          setError(true);
          console.error("Error creating user:", error);
        });
      setOpen(false);
    }
  };

  return (
    <div>
      <IconButton aria-label="edit" onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit {user.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            You are about to Delete a user.
          </Typography>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <TextField
              required
              //   id="outlined-required"
              name="name"
              label="Name"
              defaultValue={user.name}
              onChange={handleOnChange}
            />
            <TextField
              //   required
              //   id="outlined-required"
              name="zipCode"
              label="Zip Code"
              defaultValue={user.zipCode}
              onChange={handleOnChange}
            />
          </div>
          <Stack
            style={{ display: "flex", justifyContent: "center" }}
            direction="row"
            spacing={2}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={(e) => handleUpdate(e)}
              disabled={!updateUserForm}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
