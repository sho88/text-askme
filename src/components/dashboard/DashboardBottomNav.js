import Image from "next/image";

export const DashboardBottomNav = () => {
  return (
    <div className="message">
      <div className="dashboard-nav-container">
        <button className="dashboard-bottom-nav-buttons" type="">
          <Image alt="" src="/images/fn-home.png" />
        </button>

        <button className="dashboard-bottom-nav-buttons" type="">
          <Image alt="" src="/images/fn-add.png" />
        </button>

        <button className="dashboard-bottom-nav-buttons" type="">
          <Image alt="" src="/images/fn-comment.png" />
        </button>

        <button className="dashboard-bottom-nav-buttons" type="">
          <Image alt="" src="/images/fn-user.png" />
        </button>
      </div>
    </div>
  );
};
