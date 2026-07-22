import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../api";

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(res.status);
      console.log(data);

      if (!res.ok) {
        alert(data.message);
        return;
      }

      navigate("/host");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="login-container">
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit}>
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

        <button disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Log in"}
        </button>
      </form>
      <p className="auth-link">
        Don't have an account?
        <Link to="/register"> Sign up</Link>
      </p>
    </section>
  );
}
