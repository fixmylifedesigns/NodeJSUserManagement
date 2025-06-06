import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function AddNewUserForm({ setSubmitting, setError }) {
  const [addUserForm, setAddUserForm] = useState({ name: "", zipCode: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setError(false);
    e.preventDefault();
    setSubmitting(true);
    axios
      .post("http://localhost:8080/users", addUserForm)
      .then((response) => {
        console.log("User created:", response.data);
        setAddUserForm({ name: "", zipCode: "" });
        setSubmitting(false);
      })
      .catch((error) => {
        setError(true);
        console.error("Error creating user:", error);
      });
  };
  return (
    <Box
      component="form"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <TextField
          required
          id="outlined-required"
          label="Required"
          name="name"
          placeholder="Name"
          value={addUserForm.name}
          onChange={handleOnChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          name="zipCode"
          placeholder="Zip Code"
          value={addUserForm.zipCode}
          onChange={handleOnChange}
        />
      </div>

      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleSubmit}
        style={{ alignSelf: "center" }}
        disabled={!addUserForm.name || !addUserForm.zipCode}
      >
        Add User
      </Button>
    </Box>
  );
}
