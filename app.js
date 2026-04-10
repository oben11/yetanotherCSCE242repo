const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const Joi = require("joi");
const path = require("path");


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

// Serve a all locations
app.get("/api/locations", (req, res) => {
  console.log("GET request received for /api/locations");
  res.send(locations);
});

// Serve a single Location
app.get("/api/locations/:id", (req, res) => {
  console.log("GET request received for /api/locations/:id");
  const id = parseInt(req.params.id);
  const location = locations.find((l) => l.id === id); // find
  if (!location) {
    res.status(404).send("Location not found");
  } else {
    res.send(location);
  }
});

// Serve Location images
app.get("/api/locations/:id/image", (req, res) => {
  const id = parseInt(req.params.id);
  const location = locations.find((l) => l.id === id);

  if (!location) {
    return res.status(404).send("Location not found");
  }

  const imagePath = path.join(__dirname, "public", location.img);

  res.sendFile(imagePath);
});



//today

app.post("/api/locations", upload.single("img"), (req, res) => {
  console.log("POST request received for /api/locations");
  const result = validateLocation(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  console.log("passed validation");

  const location = {
    id: locations.length + 1,
    img: `/location/${req.file.originalname}`,
    alt: req.body.alt,
    name: req.body.name,
    address: req.body.address,
    hours: req.body.hours,
    phone: req.body.phone,
  };
  
  locations.push(location);
  res.send(location);
});

const validateLocation = (location) => {
  const schema = Joi.object({
    id: Joi.allow(""),
    img: `/images/${req.file.originalname}`,
    alt: Joi.string().min(3).required(),
    name: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
    hours: Joi.string().min(3).required(),
    phone: Joi.string().min(3).required(),
  });
  return schema.validate(location);
};

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


