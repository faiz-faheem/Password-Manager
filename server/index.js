const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001;

const { encrypt, decrypt } = require("./EncryptionHandler");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Project@2024", //change
  database: "passwordmanager", //change
});

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  const hashedPassword = encrypt(password);
  db.query(
    "INSERT INTO passwords (password, title, iv) VALUES (?,?,?)",
    [hashedPassword.password, title, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  try {
    const decryptedPassword = decrypt(req.body);
    res.json(decryptedPassword); // Send the decrypted password
  } catch (error) {
    console.error("Decryption error:", error);
    res.status(500).send("Decryption failed");
  }
});

app.listen(PORT, () => {
  console.log("Server is running");
});
