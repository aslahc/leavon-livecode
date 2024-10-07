import logo from "./logo.svg";
import "./App.css";
import Signupuser from "./components/Signupuser";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [showprofile, setShowProfile] = useState(false);
  const handleshowprofile = (data) => {
    console.log(data);
    setShowProfile(data);
  };
  return (
    <div className="App">
      {!showprofile && <Signupuser />}

      <Login handleshowprofile={handleshowprofile} showprofile={showprofile} />
    </div>
  );
}

export default App;
