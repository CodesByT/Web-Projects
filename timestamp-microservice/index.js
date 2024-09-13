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

// Function to check if a string is a valid Unix timestamp
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

  let date;

  // Check if dateParam is a valid Unix timestamp
  if (isUnixTimestamp(dateParam)) {
    date = new Date(Number(dateParam));
  } else {
    // Parse dateParam as a date string using new Date()
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the valid date in Unix and UTC format
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// API endpoint to return the current date in Unix and UTC formats
app.get("/api/", function (req, res) {
  const currentDate = new Date();
  res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
