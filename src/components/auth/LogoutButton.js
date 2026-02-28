"use client";

export default function LogoutButton() {
  return (
    <button className="qa-button">
      <a href="/auth/logout" className="button logout">
        Host Logout
      </a>
    </button>
  );
}
