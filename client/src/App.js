import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import PasswordStrength from "./PasswordStrength";
import PasswordGenerator from "./PasswordGenerator";
import clipboardIcon from "./assets/copy-black.jpg";

function App() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const [expandedPasswordId, setExpandedPasswordId] = useState(null); // Track expanded password

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false); // State to control the visibility of PasswordGenerator

  useEffect(() => {
    Axios.get("http://localhost:3001/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const addPassword = () => {
    if (!password && !title) {
      alert("Password and title fields are empty!");
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

    Axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
    }).then(() => {
      setPassword("");
      setTitle(""); // Clear title field after adding
    });
  };

  const decryptPassword = (encryption) => {
    console.log("Decrypting:", encryption); // Log payload
    Axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.password,
      iv: encryption.iv,
    })
      .then((response) => {
        console.log("Decrypted Response:", response.data); // Log response
        setPasswordList((prevList) =>
          prevList.map((val) =>
            val.id === encryption.id
              ? {
                  id: val.id,
                  password: response.data || val.password, // Update with decrypted password
                  title: val.title,
                  iv: val.iv,
                }
              : val
          )
        );
        setExpandedPasswordId(encryption.id); // Set the expanded password ID
      })
      .catch((error) => {
        console.error("Error decrypting password:", error);
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

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          type="text"
          placeholder="Website"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <PasswordStrength password={password} setPassword={setPassword} />
        <button onClick={addPassword}>Add Password</button>

        <div>
          <button
            className="open-generator-btn"
            onClick={() => setIsGeneratorOpen(!isGeneratorOpen)}>
            {isGeneratorOpen
              ? "Close Password Generator"
              : "Password Generator"}
          </button>

          {isGeneratorOpen && (
            <PasswordGenerator
              isOpen={isGeneratorOpen}
              onClose={() => setIsGeneratorOpen(false)}
            />
          )}
        </div>
      </div>

      <div className="Passwords">
        {passwordList.map((val) => {
          const isExpanded = expandedPasswordId === val.id;
          return (
            <div
              className="password"
              onClick={() =>
                decryptPassword({
                  password: val.password,
                  iv: val.iv,
                  id: val.id,
                })
              }
              key={val.id}>
              <h3>{isExpanded ? val.password : val.title}</h3>
              {isExpanded && (
                <div>
                  <button
                    className="btn-ignore"
                    onClick={() => copyPasswordToClipboard(val.password)}>
                    <img className="copy-main" src={clipboardIcon} alt="Copy" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
