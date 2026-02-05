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

// import { createContext, useReducer } from "react";

// export const TheFatherContext = createContext(null);

// const initialState = 0;

// const reducer = (state, action) => {
//   switch (action) {
//     case "increment":
//       return state + 2;
//     case "decrement":
//       return state - 3;
//     case "reset":
//       return initialState;
//     default:
//       return state;
//   }
// };

// export const Provider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const values = {
//     state,
//     dispatch,
//   };

//   return <TheFatherContext.Provider value={values}>{children}</TheFatherContext.Provider>;
// };

// export default Provider;

import { createContext, useReducer } from "react";

export const TheFatherContext = createContext(null);

const initialState = {
  count: 0,
  role: "guest", // Default is 'guest'
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "increment":
      return { ...state, count: state.count + 1 };
    case "reset":
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TheFatherContext.Provider value={{ state, dispatch }}>
      {children}
    </TheFatherContext.Provider>
  );
};

export default Provider;
