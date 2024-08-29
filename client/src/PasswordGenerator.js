import React, { useState } from "react";
import "./App.css";
import clipboardIcon from "./assets/copy.png";

const PasswordGenerator = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Function to copy the password to the clipboard and close the window
  const copyToClipboard = () => {
    if (!password) {
      alert("Password field is empty! Please generate a password first.");
      return; // Exit the function if the password is empty
    }

    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
      onClose(); // Close the window or modal
    });
  };

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  // Password generation function
  const generatePassword = () => {
    let generatedPassword = "";
    const typesCount =
      includeLower + includeUpper + includeNumbers + includeSymbols;
    const typesArr = [
      { lower: includeLower },
      { upper: includeUpper },
      { number: includeNumbers },
      { symbol: includeSymbols },
    ].filter((item) => Object.values(item)[0]);

    if (typesCount === 0) return "";

    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    setPassword(generatedPassword.slice(0, length));
  };

  // Random character generators
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  // Don't render anything if the component is not open
  if (!isOpen) return null;

  return (
    <div className="container">
      <h2>Password Generator</h2>
      <div className="result-container">
        <span id="result">{password}</span>
        <copy className="btn" onClick={copyToClipboard}>
          <i className="clipboard">
            {" "}
            <img src={clipboardIcon} alt="Copy" />
          </i>
        </copy>
      </div>

      <div className="settings">
        <div className="setting">
          <label>Password length</label>
          <input
            className="pl"
            type="number"
            min="4"
            max="30"
            value={length}
            onChange={(e) => setLength(+e.target.value)}
          />
        </div>
        <div className="setting-row">
          <div className="setting">
            <label>Uppercase letters</label>
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper(!includeUpper)}
            />
          </div>
          <div className="setting">
            <label>Lowercase letters</label>
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower(!includeLower)}
            />
          </div>
        </div>
        <div className="setting-row">
          <div className="setting">
            <label>Numbers</label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
          </div>
          <div className="setting">
            <label>Symbols</label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
          </div>
        </div>
      </div>

      <button
        /*<button className="btn btn-large" onClick={generatePassword}>
        Generate password
      </button> this should be here*/ className="btn-large"
        onClick={generatePassword}>
        Generate password
      </button>
    </div>
  );
};

export default PasswordGenerator;
