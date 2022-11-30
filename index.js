const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const uri =
  "mongodb+srv://dhivyas2424:I0lgU9NVHtBkrb1s@cluster0.12rbf6y.mongodb.net/api?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Set up GridFS storage engine
const storage = new GridFsStorage({
  url: uri,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});
const upload = multer({ storage });

app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// File upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  res.status(200).json({ message: "File uploaded successfully" });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    await client.connect();
    const db = client.db();
    const user = await db.collection("signup").findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ error: "Invalid email or password" });
      } else {
        return res.status(200).json({ message: "Success" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    await client.connect();
    const db = client.db();
    const users = await db.collection("signup").find().toArray();
    res.json(users);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/users", async (req, res) => {
  try {
    await client.connect();
    const db = client.db();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await db.collection("signup").insertOne({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log("MongoDB insert result:", result);
    if (result.insertedCount !== 1) {
      throw new Error("Unable to add user");
    }
    res.status(200).json(result.ops[0]);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const PORT = process.env.PORT || 5000; // choose a port number

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
