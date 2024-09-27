import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import PasswordStrength from "./PasswordStrength";
import PasswordGenerator from "./PasswordGenerator";
import clipboardIcon from "./assets/copy-black.jpg";
import deleteIcon from "./assets/delete.png";
import editIcon from "./assets/edit.png";

function App() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const [expandedPasswordId, setExpandedPasswordId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isAddPasswordOpen, setIsAddPasswordOpen] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const startEditing = (id, username, password) => {
    setEditingId(id);
    setEditUsername(username);
    setEditPassword(password);
  };

  const addPassword = () => {
    if (!password && !title && !username) {
      alert("Username, Password and title fields are empty!");
      return;
    }
    if (!password) {
      alert("Password is missing!");
      return;
    }
    if (!title) {
      alert("Title is missing!");
      return;
    }
    if (!username) {
      alert("Username is missing!");
      return;
    }

    Axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
      username: username,
    }).then(() => {
      setPassword("");
      setTitle("");
      setUsername(""); // Clear title field after adding
      fetchPasswords(); // Fetch updated list after adding
      setIsAddPasswordOpen(false); // Close the pop-up
    });
  };

  const fetchPasswords = () => {
    Axios.get("http://localhost:3001/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  };

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    })
      .then((response) => {
        setPasswordList((prevList) =>
          prevList.map((val) =>
            val.id === encryption.id
              ? { ...val, password: response.data || val.password }
              : val
          )
        );
        setExpandedPasswordId(encryption.id); // Set the expanded password ID
      })
      .catch((error) => {
        console.error("Error decrypting password:", error);
      });
  };

  const handlePasswordGenerated = (generatedPassword) => {
    setGeneratedPassword(generatedPassword);
  };

  const saveEdit = (id) => {
    Axios.put(`http://localhost:3001/editpassword/${id}`, {
      username: editUsername,
      password: editPassword,
    })
      .then((response) => {
        setPasswordList((prevList) =>
          prevList.map((val) =>
            val.id === id
              ? { ...val, username: editUsername, password: editPassword }
              : val
          )
        );
        setEditingId(null);
        fetchPasswords();
        alert("Password entry updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating password:", error);
      });
  };

  const copyPasswordToClipboard = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy password: ", error);
      });
  };

  const deletePassword = (id) => {
    Axios.delete(`http://localhost:3001/deletepassword/${id}`)
      .then(() => {
        setPasswordList((prevList) => prevList.filter((val) => val.id !== id));
        alert("Password entry deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting password:", error);
      });
  };

  return (
    <div className="App">
      <button
        className="btn-main"
        onClick={() => setIsAddPasswordOpen(!isAddPasswordOpen)}>
        {isAddPasswordOpen ? "Close Form" : "Add Credentials"}
      </button>

      {isAddPasswordOpen && (
        <div className="AddingPassword">
          <div className="right-section">
            <input
              type="text"
              placeholder="Website"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <PasswordStrength password={password} setPassword={setPassword} />
            <PasswordGenerator onPasswordGenerated={handlePasswordGenerated} />
            <button onClick={addPassword}>Save</button>
          </div>
        </div>
      )}

      <div className="Passwords">
        {passwordList.map((val) => {
          const isExpanded = expandedPasswordId === val.id;
          return (
            <div className="main-display" key={val.id}>
              <div className="website">{val.title}</div>
              <div
                className="password"
                onClick={() =>
                  decryptPassword({
                    password: val.password,
                    iv: val.iv,
                    id: val.id,
                  })
                }
                style={{ display: "flex", alignItems: "center" }}>
                {editingId === val.id ? (
                  <>
                    <input
                      className="edit-holder"
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      placeholder="Username"
                    />
                    <input
                      className="edit-holder"
                      type="text"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <button
                      className="edit-btn"
                      onClick={() => saveEdit(val.id)}>
                      Save
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h3 onClick={(e) => e.stopPropagation()}>
                      {isExpanded ? val.password : val.username}
                    </h3>
                    {isExpanded && (
                      <div>
                        <button
                          className="btn-ignore"
                          onClick={() => copyPasswordToClipboard(val.password)}>
                          <img
                            className="copy-main"
                            src={clipboardIcon}
                            alt="Copy"
                          />
                        </button>
                      </div>
                    )}
                    <button
                      className="btn-ignore"
                      onClick={() =>
                        startEditing(val.id, val.username, val.password)
                      }>
                      <img className="edit-main" src={editIcon} alt="edit" />
                    </button>
                    <button
                      className="btn-ignore"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePassword(val.id);
                      }}>
                      <img
                        className="delete-main"
                        src={deleteIcon}
                        alt="Delete"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
