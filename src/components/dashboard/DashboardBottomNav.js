import Image from "next/image";
import { ModalComponent } from "../modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DashboardBottomNav = () => {
  const router = useRouter();

  // states go here...
  const [showModal, setShowModal] = useState(false);

  // events go here...
  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = (newEventData) => {
    setShowModal(false);

    console.clear();
    console.log(`New Data`);
    console.log(newEventData);
  };

  const handleClick = () => {
    return router.push("/dashboard");
  };

  return (
    <>
      {showModal && <ModalComponent onModalClose={handleModalClose} />}

      <div className="message">
        <div className="dashboard-nav-container">
          <button className="dashboard-bottom-nav-buttons" type="">
            <Image
              onClick={handleClick}
              src="/images/fn-home-4.png"
              alt=""
              height="25"
              width="25"
            />
          </button>

          <button
            className="dashboard-bottom-nav-buttons"
            type=""
            onClick={handleAddClick}
          >
            <Image src="/images/fn-plus-4.png" alt="" height="25" width="25" />
          </button>

          <button className="dashboard-bottom-nav-buttons" type="">
            <Image src="/images/fn-user-4.png" alt="" height="25" width="25" />
          </button>
        </div>
      </div>
    </>
  );
};
