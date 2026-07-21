import React from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../api";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        const data = await res.json();

        setIsLoggedIn(data.isLoggedIn);
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
