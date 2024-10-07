import React, { useState } from "react";

const Signupuser = () => {
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email", email, pass);
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass }),
    });
    const data = await res.json();
    if (data) {
      alert(data.message);
      setEmail("");
      setpass("");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>signup</p>
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
        <button type="submit">signup</button>
      </form>
    </div>
  );
};

export default Signupuser;
