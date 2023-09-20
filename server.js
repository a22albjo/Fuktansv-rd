import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const port = 3001; // You can choose a port

// Use the cors middleware to enable CORS
app.use(cors());

// Create a connection to the SQLite database
const db = new sqlite3.Database("data.sqlite"); // Update with your database file path

// Define a route to fetch data from the database
app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM dataPoint"; // Replace with your table name
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
