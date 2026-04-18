import Image from "next/image";
import { ModalComponent } from "../modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DashboardBottomNav = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleModalClose = (newEventData) => {
    setShowModal(false);

    console.clear();
    console.log(`New Data`);
    console.log(newEventData);
  };

  const handleClickHome = () => {
    return router.push("/dashboard");
  };

  const handleClickLogout = () => {
    return router.push("/");
  };

  return (
    <>
      {showModal && <ModalComponent onModalClose={handleModalClose} />}

      <div className="message">
        <div className="dashboard-nav-container">
          <button className="dashboard-bottom-nav-buttons" type="">
            <Image
              onClick={handleClickHome}
              src="/images/fn-home-5.png"
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
            <Image src="/images/fn-plus-5.png" alt="" height="25" width="25" />
          </button>

          <button className="dashboard-bottom-nav-buttons" type="">
            <Image
              src="/images/fn-user-5.png"
              alt=""
              height="25"
              width="25"
              onClick={handleClickLogout}
            />
          </button>
        </div>
      </div>
    </>
  );
};
