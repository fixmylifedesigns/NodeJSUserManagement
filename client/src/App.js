import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Alert from "@mui/material/Alert";
import UsersTable from "./components/UsersTable.js";
import AddUserForm from "./components/AddNewUserForm.js";

function App() {
  const [allUsers, getAllUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((response) => {
        console.log(response);
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        console.log("Fetched users:", response.data);
        getAllUsers(response.data);
      })
      .catch((error) => {
        // setError(true);
        console.error("Error fetching users:", error);
      });
  }, [submitting]);

  return (
    <div className="App">
      <header className="">{message} </header>
      <AddUserForm setSubmitting={setSubmitting} setError={setError} />
      {error && <Alert severity="error">Error Submitting your request</Alert>}
      {allUsers.length ? (
        <UsersTable
          users={allUsers}
          setSubmitting={setSubmitting}
          setError={setError}
        />
      ) : (
        <div>Add Users</div>
      )}
    </div>
  );
}

export default App;
