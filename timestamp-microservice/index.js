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
function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toUTCString();
}
function isUnixTimestamp(dateString) {
  const timestamp = Number(dateString);

  if (!isNaN(timestamp) && isFinite(timestamp)) {
    return dateString.length === 10 || dateString.length === 13;
  }

  return false;
}
function unixToUTC(unixTimestamp) {
  const timestamp =
    unixTimestamp.length === 10 ? unixTimestamp * 1000 : unixTimestamp;

  const date = new Date(Number(timestamp));

  return date.toUTCString();
}
app.get("/api/:date", async function (req, res) {
  //
  if (isUnixTimestamp(req.params.date)) {
    const utc_date = unixToUTC(req.params.date);

    return res.json({ unix: req.params.date, utc: utc_date });
  }
  if (!isValidDate(req.params.date)) {
    return res.json({ error: "Invalid Date" }); // Return to stop further execution
  }
  const date = formatDate(req.params.date);

  res.json({ unix: new Date(req.params.date).getTime(), utc: date });
});

app.get("/api/", function (req, res) {
  const currentDate = new Date();
  const formattedDate = currentDate.toUTCString();
  res.json({ unix: currentDate.getTime(), utc: formattedDate });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
