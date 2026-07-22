import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = React.useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  }

  return (
    <div className="register-container">
      <h1>Create Account</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button>Sign Up</button>
      </form>
    </div>
  );
}
