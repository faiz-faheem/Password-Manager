import React, { useState, useEffect } from "react";
import "./App.css";

const PasswordStrength = ({ password, setPassword }) => {
  const [strength, setStrength] = useState(0);
  const [color, setColor] = useState("");
  const [text, setText] = useState("");
  const [showStrength, setShowStrength] = useState(false);

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  // Function to check the strength of the password
  const checkPasswordStrength = (value) => {
    if (!value) return clearStrength();

    // Checking invalid characters or length constraints first
    if (/\s/.test(value))
      return setStrengthAndFeedback("red", "White space is not allowed", 0);
    if (/[<>]/.test(value))
      return setStrengthAndFeedback("red", "< > characters are not allowed", 0);
    if (value.length > 30)
      return setStrengthAndFeedback("red", "Password greater than 30 char.", 0);

    // Assessing strength based on length and complexity
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[\!\~\@\&\#\$\%\^\&\*\(\)\{\}\?\-\_\+\=]/.test(value);
    const strengthLevels = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    if (value.length < 7) {
      setStrengthAndFeedback("red", "Too short", 20);
    } else if (strengthLevels === 1) {
      setStrengthAndFeedback("red", "Weak", 40);
    } else if (strengthLevels === 2) {
      setStrengthAndFeedback("orange", "Medium", 60);
    } else if (strengthLevels === 3) {
      setStrengthAndFeedback("#088f08", "Strong", 80);
    } else {
      setStrengthAndFeedback("green", "Very Strong", 100);
    }
  };

  // Function to set strength and feedback message
  const setStrengthAndFeedback = (color, text, value) => {
    setColor(color);
    setText(text);
    setStrength(value);
  };

  // Function to clear the strength feedback
  const clearStrength = () => {
    setStrength(0);
    setColor("");
    setText("");
  };

  return (
    <div className="password-container">
      <input
        type="text"
        placeholder="Password"
        name="password"
        id="password-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => setShowStrength(true)}
        onBlur={() => setShowStrength(false)}
      />

      {showStrength && (
        <div className="strength-container">
          <p className="title">
            Password strength: <span className="strength-text">{text}</span>
          </p>

          <div className="strength-bar-wrapper">
            <div
              id="strength-bar"
              style={{
                width: `${strength}%`,
                backgroundColor: color,
                height: "4px",
                borderRadius: "3px",
              }}></div>
          </div>

          <p className="strength-description">
            Passwords should be at least <i>7</i> characters long and max{" "}
            <i>30</i>. <br />
            Try using <strong>lowercase</strong> and <strong>uppercase</strong>,{" "}
            <strong>numbers</strong>, and <strong>symbols</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;