import { createContext, useReducer } from "react";

export const TheFatherContext = createContext(null);

const initialState = {
  count: 0,
  role: "host",
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
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
