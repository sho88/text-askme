import { Image } from 'next/image';
import { TextAreaInput } from "./../live/index.js";

export const DashboardSearch = () => {
  return (
    <div className="dashboard-message">
      <div className="dashboard-search-container">
        <button className="dashboard-message-attatch-button">
          <Image alt="" src="/images/fn-search2.png" />
        </button>
        <TextAreaInput />
      </div>
    </div>
  );
};
