import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ModalComponent } from "../modal";

// define the EventData interface to represent the structure of event data
export interface EventData {
  id?: string;
  title?: string;
  [key: string]: unknown;
}


export const DashboardBottomNav = () => {
  // invoke the useRouter hook to get the router object
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  // add an event listener to close the modal when the escape key is pressed
  useEffect(() => {
    window.addEventListener("keyup" , (event) => 
      (event.key === "Escape" && setShowModal(false))
    );

    return () => window.removeEventListener("keyup", (event) => 
      (event.key === "Escape" && setShowModal(false))
    );
  }, []);

  // event handlers...
  const handleAddClick = () => setShowModal(true);
  const handleModalClose = (newEventData: EventData | null) => {
    setShowModal(false);

    if (newEventData) {
      console.log('[DashboardBottomNav]: New Data - ', newEventData);
      router.refresh();
    }
  };
  const handleClickHome = () => router.push("/dashboard");
  const handleClickLogout = () => router.push("/");

  // render the component
  return (
    <>
      {showModal && <ModalComponent onModalClose={handleModalClose} />}

      <div className="message">
        <div className="dashboard-nav-container">
          <button
            aria-label="Home" 
            className="dashboard-bottom-nav-buttons"
            type="button"
            onClick={handleClickHome}
          >
            <Image
              src="/images/fn-home-5.png"
              alt="Home icon"
              height="25"
              width="25"
            />
          </button>

          <button
            aria-label="Add Event"
            className="dashboard-bottom-nav-buttons"
            type="button"
            onClick={handleAddClick}
          >
            <Image
              src="/images/fn-plus-5.png"
              alt="Plus icon"
              height="25"
              width="25"
            />
          </button>

          <button
            aria-label="Logout"
            className="dashboard-bottom-nav-buttons"
            type="button"
            onClick={handleClickLogout}
          >
            <Image
              src="/images/fn-user-5.png"
              alt="User logout icon"
              height="25"
              width="25"
            />
          </button>
        </div>
      </div>
    </>
  );
};
