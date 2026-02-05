// import { useContext } from "react";
// import Provider, { TheFatherContext } from "@/context/app";

// // Meh...buttons component
// const ButtonsComponent = () => {
//   const { dispatch, state } = useContext(TheFatherContext);

//   return (
//     <div>
//       <p>Value: {state}</p>
//       <button onClick={() => dispatch("increment")}>Plus 2</button>
//       <button onClick={() => dispatch("decrement")}>Minus 3</button>
//       <button onClick={() => dispatch("reset")}>Reset</button>
//     </div>
//   );
// };

// // Default Index3 component to be exported...
// export const Index3 = () => {
//   return (
//     <Provider>
//       <ButtonsComponent />
//     </Provider>
//   );
// };

// export default Index3;

import { useContext } from "react";
import Provider, { TheFatherContext } from "@/context/app";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";

// Mock Components for your request
const HeaderComponent = () => (
  <header style={{ borderBottom: "2px solid red", padding: "10px" }}>
    <button>← Back</button> <button>☰ Menu</button>
    <span> (Host Header)</span>
  </header>
);

const ButtonsComponent = () => {
  const { dispatch, state } = useContext(TheFatherContext);

  // Logical check: are they a host?
  const isHost = state.role === "host";

  return (
    <div style={{ padding: "20px" }}>
      {/* 1. Only show Header if User is Host */}
      {isHost && <HeaderComponent />}

      <h2>Current View: {state.role.toUpperCase()}</h2>
      <p>
        Status:{" "}
        {isHost ? "You have full access." : "Access restricted to Guest view."}
      </p>

      <div style={{ margin: "20px 0" }}>
        <button
          onClick={() => dispatch({ type: "SET_ROLE", payload: "guest" })}
        >
          Switch to Guest
        </button>
        <button onClick={() => dispatch({ type: "SET_ROLE", payload: "host" })}>
          Switch to Host
        </button>
      </div>

      <hr />
      <p>Counter: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Add 1</button>

      {/* 2. Only show Bottom Nav if User is Host */}
      {isHost && <DashboardBottomNav />}
    </div>
  );
};

export const Index3 = () => {
  return (
    <Provider>
      <ButtonsComponent />
    </Provider>
  );
};

export default Index3;
