"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

// use getServerSideProps for auth login

export default function EmptyDashboard() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-text">Loading user profile...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-body-container">
      <div></div>
      <div className="event__header">
        <h1>Welcome {user.name || user.email} 👋</h1>
        <h1 style={{ fontSize: "17px", color: "#696969" }}>
          You currently have no topics to present...
        </h1>
      </div>
      <br />
      <br />
      <p style={{ fontSize: "14px", color: "#696969" }}>
        Tap the + button in the middle of the Nav Bar below to create your first
        topic!
      </p>
    </div>
  );
}
