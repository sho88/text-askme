import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { useRooms } from "@/hooks/rooms";
import RoomsList from "@/components/rooms/RoomsList";
import HeaderComponent from "@/components/header";

import { auth0 } from "@/lib/auth0";
import { asyncify } from "@/utils";
import GuestHeader from "@/components/header/GuestHeader";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "@/components/auth/LogoutButton";
import LogoutButtonInMenu from "@/components/auth/LogoutButtonInMenu";

export const getServerSideProps = async (context) => {
  const [error, session] = await asyncify(
    auth0.getSession(context.req, context.res)
  );

  if (error) {
    console.error("Error fetching session:", error);
    return {
      props: { session: null },
    };
  }

  return {
    props: { session: session || null },
  };
};

export default function DashboardPageComponent({ session }) {
  const [user, setUser] = useState(session?.user || null);

  useEffect(() => {
    setUser(session?.user || null);
  }, [session]);

  // hooks go here...
  const router = useRouter();
  const { eventId } = router.query; // Grabs the eventId passed from the PIN page

  // Pass eventId to the hook to fetch only the room matching the PIN result
  const { rooms } = useRooms(eventId);
  const [term, setTerm] = useState("");

  // the equivalent to computed properties...for expensive calculations...
  const filteredRooms = useMemo(() => {
    // no need to make another const, as rooms is already an array. we made sure of this in the custom hook itself.
    const reverseOrder = rooms.reverse();

    if (term.trim().length < 1) {
      return reverseOrder;
    } else {
      const filtered = reverseOrder.filter((callBack) => {
        return (
          callBack.description
            ?.toLocaleLowerCase()
            .includes(term.toLocaleLowerCase()) ||
          callBack.title?.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        );
      });
      return filtered;
    }
  }, [rooms, term]);

  // events go here...
  const handleInput = (input) => {
    setTerm(input);
  };

  const handleRoomClick = (id) => {
    return router.push(`/events/${id}`);
  };

  // return the renderer...
  return (
    <div>
      <div>
        {user ? (
          <div>
            <HeaderComponent />
            <DashboardSearch whenInput={handleInput} />
            {/* Updated: Added onNewDataCreated prop only */}
            <RoomsList
              rooms={filteredRooms}
              whenRoomClick={handleRoomClick}
              // onNewDataCreated={refreshRooms}
            />

            <DashboardBottomNav />
          </div>
        ) : (
          <div>
            <GuestHeader />
            <div className="dashboard-message"></div>
            <div className="dashboard-body-container">
              <div className="event__header">
                <h1>Woah... ⛔✋</h1>
              </div>
              <br />
              <p>
                You will need to be signed in to get full access to Text QA.
              </p>
              <br />
              <p>
                Text QA Offers vdsbcdsv dsvdmsn vdsmv bdsmv nbds vmdsbv dsmvb
                dsmv bdsmbv mdsb vdsmvmds bcs vcsj vcjm.
              </p>
              <br />
              <button>
                <b>
                  <u>
                    {" "}
                    <a href="/auth/login?returnTo=/dashboard">
                      Login or sign up here
                    </a>
                  </u>
                </b>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
