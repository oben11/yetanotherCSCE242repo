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

let houses = [
  {
    _id: 1,
    name: "Farmhouse",
    size: 2000,
    bedrooms: 3,
    bathrooms: 2.5,
    features: ["wrap around porch", "attached garage"],
    main_image: "farm.webp",
  },
  {
    _id: 2,
    name: "Mountain House",
    size: 1700,
    bedrooms: 3,
    bathrooms: 2,
    features: ["grand porch", "covered deck"],
    main_image: "mountain-house.webp",
  },
  {
    _id: 3,
    name: "Lake House",
    size: 3000,
    bedrooms: 4,
    bathrooms: 3,
    features: ["covered deck", "outdoor kitchen", "pool house"],
    main_image: "farm.webp",
  },
];

//listen for incoming requests
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/api/houses", (req, res) => {
  console.log("GET request received for /api/houses");
  res.send(houses);
});

app.get("/api/houses/:id", (req, res) => {
  console.log("GET request received for /api/houses/:id");
  const id = parseInt(req.params.id);
  const house = houses.find((h) => h._id === id); // find 
  if (!house) {
    res.status(404).send("House not found");
  } else {
    res.send(house);
  }
});