// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Function to validate date strings in YYYY-MM-DD format
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateString.match(regex)) return false;

  const date = new Date(dateString);
  const [year, month, day] = dateString.split("-");

  return (
    date.getUTCFullYear() == year &&
    date.getUTCMonth() + 1 == month &&
    date.getUTCDate() == day
  );
}

// Function to format a valid date string to UTC string
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toUTCString();
}

// Function to check if a date string is a Unix timestamp
function isUnixTimestamp(dateString) {
  const timestamp = Number(dateString);
  return !isNaN(timestamp) && isFinite(timestamp);
}

// Function to convert Unix timestamp to UTC string
function unixToUTC(unixTimestamp) {
  const timestamp =
    unixTimestamp.toString().length === 10
      ? unixTimestamp * 1000
      : unixTimestamp;
  const date = new Date(Number(timestamp));
  return date.toUTCString();
}

// API endpoint to handle both date string and Unix timestamp
app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date;

  // Check if dateParam is a valid Unix timestamp
  if (isUnixTimestamp(dateParam)) {
    const unixTimestamp = Number(dateParam);
    const utcDate = unixToUTC(unixTimestamp);
    return res.json({ unix: unixTimestamp, utc: utcDate });
  }

  // Check if dateParam is a valid date string (YYYY-MM-DD)
  if (!isValidDate(dateParam)) {
    return res.json({ error: "Invalid Date" });
  }

  // Handle valid date string
  const date = formatDate(dateParam);
  res.json({ unix: new Date(dateParam).getTime(), utc: date });
});

// API endpoint to return the current date in Unix and UTC formats
app.get("/api/", function (req, res) {
  const currentDate = new Date();
  const formattedDate = currentDate.toUTCString();
  res.json({ unix: currentDate.getTime(), utc: formattedDate });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
