// import { createContext, useReducer } from "react";

// export const AppContext = createContext();

// export const ACTION_TYPES = {
//   UPDATE_USERS: "UPDATE_USERS",
//   ADD_USER: "ADD_USER",
//   DELETE_USER: "DELETE_USER",
//   SHOW_MODAL: "SHOW_MODAL",
// };

// const initialState = {
//   title: "",
//   users: [],
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case ACTION_TYPES.ADD_USER:
//       return {
//         ...state,
//         users: [
//           ...state.users,
//           { __id: state.users.length, ...action.payload },
//         ],
//       };

//     case ACTION_TYPES.UPDATE_USERS:
//       return { ...state, users: action.users };

//     case ACTION_TYPES.DELETE_USER:
//       return {
//         ...state,
//         users: state.users.filter((user) => user !== action.payload.id),
//       };

//     default:
//       return state;
//   }
// };

// export const Provider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

import { createContext, useReducer } from "react";

const theFather = createContext();

const initialState = 0;

const reducer = (state, action) => {
  switch (action) {
    case "increment":
      return state + 2;
    case "decrement":
      return state - 3;
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export const Provider2 = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePlus = () => {
    dispatch("increment");
  };

  const handleMinus = () => {
    dispatch("decrement");
  };

  const handleReset = () => {
    dispatch("reset");
  };

  const values = {
    state,
    dispatch,
  };

  return <theFather.Provider value={values}>{children}</theFather.Provider>;
};

export default Provider2;
