import { useEffect, useState } from "react";
import Image from "next/image";

import { auth0 } from "@/lib/auth0";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import ProfileComponent from "@/components/auth/Profile";
import { asyncify } from "@/utils";

// This page is for testing Auth0 integration. It will display the user's profile if logged in, or a login button if not.
export const getServerSideProps = async (context) => {
  const [error, session] = await asyncify(auth0.getSession(context.req, context.res));

  if (error) {
    console.error("Error fetching session:", error);
    return {
      props: { session: null },
    };
  }

  return {
    props: { session: session || null }
  };
};

// The main component that renders the test page
export default function TestComponent({ session }) {
  const [user, setUser] = useState(session?.user || null);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  return (
    <div className="app-container">
      <div className="main-card-wrapper">
        <Image
          src="https://cdn.auth0.com/quantum-assets/dist/latest/logos/auth0/auth0-lockup-en-ondark.png"
          alt="Auth0 Logo"
          className="auth0-logo"
          height={200}
          width={200}
        />
        <h1 className="main-title">Next.js + Auth0</h1>
        
        <div className="action-card">
          {user ? (
            <div className="logged-in-section">
              <p className="logged-in-message">✅ Successfully logged in!</p>
              <ProfileComponent />
              <LogoutButton />
            </div>
          ) : (
            <>
              <p className="action-text">
                Welcome! Please log in to access your protected content.
              </p>
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}