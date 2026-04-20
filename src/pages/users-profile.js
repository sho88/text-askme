import mainStyle from "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

// This page is for testing Auth0 integration. It will display the user's profile if logged in, or a login button if not.

import { auth0 } from "@/lib/auth0";
import HeaderComponent from "@/components/header";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  try {
    const session = await auth0.getSession(req, res);
    return {
      props: { session: session || null },
    };
  } catch (err) {
    console.error(err, "Error fetching the session");
  }
};

export default function UserProfile({ session }) {
  const [user, setUser] = useState(session?.user || null);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  return (
    <div>
      <HeaderComponent />
      <DashboardBottomNav />
      <div className="event">
        <div className="event__container">
          {user ? (
            <div>
              Signed in with email:
              <h2 className="event__header">{user.name}</h2>
              <Image
                src={
                  user.picture ||
                  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2363b3ed'/%3E%3Cpath d='M50 45c7.5 0 13.64-6.14 13.64-13.64S57.5 17.72 50 17.72s-13.64 6.14-13.64 13.64S42.5 45 50 45zm0 6.82c-9.09 0-27.28 4.56-27.28 13.64v3.41c0 1.88 1.53 3.41 3.41 3.41h47.74c1.88 0 3.41-1.53 3.41-3.41v-3.41c0-9.08-18.19-13.64-27.28-13.64z' fill='%23fff'/%3E%3C/svg%3E`
                }
                alt={user.name || "User profile"}
                height={70}
                width={70}
                style={{ borderRadius: "50px", marginTop: "10px" }}
              />
            </div>
          ) : (
            <>
              {/* WORK HERE - MESSAGE SAME AS DASHBOARD FOR GUESTS */}
              <p>Welcome! Please log in to access your account.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
