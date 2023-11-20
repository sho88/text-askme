import { TextAreaInput } from "./../live/index.js";

export const DashboardSearch = () => {
  return (
    <div className="dashboard-message">
      <div className="dashboard-search-container">
        <button className="dashboard-message-attatch-button">
          <img src="/images/fn-search2.png"></img>
        </button>
        <TextAreaInput />
      </div>
    </div>
  );
};
