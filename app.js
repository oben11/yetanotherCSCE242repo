const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

// front end will be in public folder
app.use(express.static("public"));
// this allows us to parse json in the body of requests
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const locations = require("./json/locations.json");
const merchandise = require("./json/merchandise.json");

//listen for incoming requests
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/api/locations", (req, res) => {
  console.log("GET request received for /api/locations");
  res.send(locations);
});


app.get("/api/locations/:seed", (req, res) => {
  console.log("GET request received for /api/locations/:seed");
  const seed = req.params.seed;
  const location = locations.find((l) => l.seed === seed); // find
  if (!location) {
    res.status(404).send("Location not found");
  } else {
    res.send(location);
  }
});


app.get("/api/merchandise", (req, res) => {
  console.log("GET request received for /api/merchandise");
  res.send(merchandise);
});


app.get("/api/merchandise/:id", (req, res) => {
  console.log("GET request received for /api/merchandise/:id");
  const id = parseInt(req.params.id);
  const merch = merchandise.find((m) => m.id === id); // find
  if (!merch) {
    res.status(404).send("Merchandise item not found");
  } else {
    res.send(merch);
  }
});


