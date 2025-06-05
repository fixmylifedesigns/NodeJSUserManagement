/*
Task name: User endpoints

Requirements
  1.  We need to create CRUD endpoints
  2.  The entries (users) can just be saved in a noSQL database (Bonus for using Firebase Realtime Database)
  3.  Each user should have the following data entries: 
        id, name, zip code, latitude, longitude, timezone
  4.  When creating a user, allow input for name and zip code.  
      (Fetch the latitude, longitude, and timezone - Documentation: https://openweathermap.org/current) 
  5.  When updating a user, Re-fetch the latitude, longitude, and timezone (if zip code changes)
  6.  Connect to a ReactJS front-end
  * feel free to add add something creative you'd like
*/

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const db = require("./firebase");
const { v4: uuidv4 } = require("uuid");
const app = express();

const usersRef = db.ref("users");
console.log(`Database name is ${process.env.FIREBASE_TYPE}`);
app.use(cors());
app.use(express.json());

const getGeo = async (zipCode) => {
  const geo = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=${process.env.OPENWEATHERMAP_API_KEY}`
  );
  console.log(geo);
  const { coord, timezone } = geo.data;
  return { coord, timezone };
};

app.get("/", (req, res) => {
  console.log('triggering  "/" endpoint...');

  let companyName = "RentRedi";
  console.log("companyName = ", companyName);

  res.send(`Welcome to the ${companyName} interview!`);
});

app.get("/users", async (req, res) => {
  try {
    const snapshot = await usersRef.once("value");
    const usersData = snapshot.val();

    if (!usersData) {
      return res.status(200).json([]);
    }

    const usersArray = Object.values(usersData);
    res.status(200).json(usersArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, zipCode } = req.body;

    const { coord, timezone } = await getGeo(zipCode);

    let { lat, lon } = coord;
    const id = uuidv4();
    const userRef = usersRef.child(id);

    await userRef.set({ id, name, zipCode, lat, lon, timezone });

    res.status(201).json({ id, name, zipCode, lat, lon, timezone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, zipCode } = req.body;

  try {
    const updates = {};

    if (name) updates.name = name;
    if (zipCode) {
      const { coord, timezone } = await getGeo(zipCode);
      updates.zipCode = zipCode;
      updates.lat = coord.lat;
      updates.lon = coord.lon;
      updates.timezone = timezone;
    }
    const userRef = usersRef.child(id);
    await userRef.update(updates);

    res.status(200).json({ id, ...updates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userRef = usersRef.child(id);
    await userRef.remove();

    res.status(200).json({ message: `User ${id} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080);
