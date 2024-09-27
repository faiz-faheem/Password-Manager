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
  const { password, title, username } = req.body;
  const hashedPassword = encrypt(password);
  db.query(
    "INSERT INTO passwords (password, title, iv, username) VALUES (?,?,?,?)",
    [hashedPassword.password, title, hashedPassword.iv, username],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.put("/editpassword/:id", (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;
  const hashedPassword = encrypt(password);
  db.query(
    "UPDATE passwords SET username = ?, password = ?, iv = ? WHERE id = ?",
    [username, hashedPassword.password, hashedPassword.iv, id],
    (err, result) => {
      if (err) {
        console.error("Error updating password: ", err);
        return res.status(500).send("Error updating password");
      }
      res.send("Password entry updated successfully!");
    }
  );
});

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  try {
    const decryptedPassword = decrypt(req.body);
    res.json(decryptedPassword);
  } catch (error) {
    console.error("Decryption error:", error);
    res.status(500).send("Decryption failed");
  }
});

app.delete("/deletepassword/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM passwords WHERE id = ?";

  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.error("Error deleting password: ", err);
      return res.status(500).send("Error deleting password");
    }
    res.send("Password entry deleted successfully!");
  });
});

app.get("/getusername/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = "SELECT username FROM passwords WHERE id = ?";

  db.query(sqlQuery, id, (err, result) => {
    if (err) {
      console.error("Error fetching username: ", err);
      return res.status(500).send("Error fetching username");
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send("Username not found");
    }
  });
});

app.listen(PORT, () => {
  console.log("Server is running");
});
