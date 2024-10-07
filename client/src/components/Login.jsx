import React, { useState } from "react";
import Profile from "./Profile";

const Login = ({ handleshowprofile, showprofile }) => {
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  //   const [showprofile, setProfile] = useState(false);
  const [user, setUser] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email", email, pass);
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass }),
    });
    const data = await res.json();
    if (data) {
      console.log(data);
      console.log(data.status);
      if (data.status === true) {
        handleshowprofile(true);
        console.log(data.user, "this is ii");
        setUser(data.user);
      }
      alert(data.message);

      setEmail("");
      setpass("");
    }
  };
  return (
    <div>
      <div>
        {showprofile ? (
          <div>
            <p>Profile</p>

            <p>your profile email id {user.email}</p>
            <button
              onClick={() => {
                handleshowprofile(false);
              }}
            >
              logout
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <p>Login</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>

              <input
                type="text"
                value={pass}
                onChange={(e) => setpass(e.target.value)}
                required
              ></input>
              <button type="submit">Login</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
