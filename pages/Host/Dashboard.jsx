import React from "react";
import { getCurrentUser } from "../../api";

export default function Dashboard() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    async function fetchUser() {
      const data = await getCurrentUser();

      if (data.isLoggedIn) {
        setUser(data.user);
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome {user?.name} 👋</h1>

      <p>Manage your vans, track your earnings, and view your activity.</p>

      <div className="dashboard-card">
        <h2>Host Dashboard</h2>
        <p>
          Use the navigation above to manage your vans and view your income and
          reviews.
        </p>
      </div>
    </div>
  );
}
