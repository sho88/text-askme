import Image from "next/image";
import { ModalComponent } from "../modal";
import { useState } from "react";

export const DashboardBottomNav = () => {
  // states go here...
  const [showModal, setShowModal] = useState(false);

  // events go here...
  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && <ModalComponent onModalClose={handleModalClose} />}

      <div className="message">
        <div className="dashboard-nav-container">
          <button className="dashboard-bottom-nav-buttons" type="">
            <Image src="/images/fn-home.png" alt="" height="25" width="25" />
          </button>

          <button
            className="dashboard-bottom-nav-buttons"
            type=""
            onClick={handleAddClick}
          >
            <Image src="/images/fn-add.png" alt="" height="25" width="25" />
          </button>

          <button className="dashboard-bottom-nav-buttons" type="">
            <Image src="/images/fn-user.png" alt="" height="25" width="25" />
          </button>
        </div>
      </div>
    </>
  );
};
