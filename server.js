import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const port = 3001; // You can choose a port

app.use(express.json()); // Make sure it comes back as json
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

app.post("/api/newData", (req, res) => {
  const { luftfuktighet, temperatur, kommentar } = req.body;
  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // Example usage:
  let yourDate = new Date();
  const date = formatDateTime(yourDate);

  const query =
    "insert into dataPoint (date, temperatur, luftfuktighet, kommentar) values (?, ?, ?, ?)";
  db.run(query, [date, temperatur, luftfuktighet, kommentar], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
