import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";

export default function Header() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function getCurrentUser() {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.isLoggedIn) {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    }

    getCurrentUser();
  }, []);
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink
          to="/host"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Vans
        </NavLink>

        <NavLink
          to="/favorites"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Favs
        </NavLink>
        <NavLink
          to="/my-rentals"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          My Rentals
        </NavLink>
        {user ? (
          <NavLink to="/host" className="login-link">
            <FaRegCircleUser />
            <span>{user.name}</span>
          </NavLink>
        ) : (
          <NavLink to="/login" className="login-link">
            <FaRegCircleUser />
            <span>Login</span>
          </NavLink>
        )}
      </nav>
    </header>
  );
}
