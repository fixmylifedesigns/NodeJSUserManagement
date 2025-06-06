import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import UsersTable from './components/UsersTable.js'

function App() {
  const [allUsers, getAllUsers] = useState([]);
  const [addUserForm, setAddUserForm] = useState({ name: "", zipCode: "" });
  const [updateUserForm, setUpdateUserForm] = useState(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
        console.error("Error fetching users:", error);
      });
  }, [submitting]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setAddUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
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
        console.error("Error creating user:", error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { id, name, zipCode } = updateUserForm;
    if ((id && name) || zipCode) {
      axios
        .put(`http://localhost:8080/users/${updateUserForm.id}`, {
          name: name,
          zipCode: zipCode,
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };

  const handleDelete = (id) => {
    setSubmitting(true);
    axios
      .delete(`http://localhost:8080/users/${id}`)
      .then((res) => {
        console.log(res.data.message);
        setSubmitting(false);
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };

  return (
    <div className="App App-header">
      <header className="">{message} </header>
      
      <form onSubmit={handleSubmit}>
        <input name="name" value={addUserForm.name} onChange={handleOnChange} />
        <input
          name="zipCode"
          value={addUserForm.zipCode}
          onChange={handleOnChange}
        />
        <button type="submit">Submit</button>
      </form>
      <UsersTable users={allUsers} setSubmitting={setSubmitting}/>
      {/* <ui>
        {allUsers.length &&
          allUsers.map(({ name, id, lat, lon, timezone, zipCode }) => {
            return (
              <li id={id}>
                {updateUserForm?.id === id ? (
                  <form onSubmit={handleUpdate}>
                    <input
                      name="name"
                      value={updateUserForm.name}
                      onChange={handleOnUpdate}
                    />
                    <input
                      name="zipCode"
                      value={updateUserForm.zipCode}
                      onChange={handleOnUpdate}
                    />
                    <button type="submit">Update</button>
                    <button onClick={() => setUpdateUserForm(null)}>
                      cancel
                    </button>
                  </form>
                ) : (
                  <div>
                    {name}
                    {lat}
                    {lon}
                    {timezone}
                    {zipCode}
                    <button
                      // style={{ background: "black" }}
                      onClick={() => setUpdateUserForm({ id })}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(id)}>delete</button>
                  </div>
                )}
              </li>
            );
          })}
      </ui> */}
    </div>
  );
}

export default App;
