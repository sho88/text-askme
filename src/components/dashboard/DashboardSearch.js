import Image from "next/image";
import InputField from "../input/InputField.js";

export const DashboardSearch = ({ whenInput = () => {} } = {}) => {
  return (
    <div className="dashboard-message">
      <div className="dashboard-search-container">
        <button className="dashboard-message-attatch-button">
          <Image src="/images/fn-search3.png" alt="" height="25" width="25" />
        </button>

        <InputField whenInput={whenInput} />
      </div>
    </div>
  );
};
