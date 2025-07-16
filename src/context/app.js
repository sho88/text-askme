import { createContext, useReducer } from "react"

export const AppContext = createContext()

export const ACTION_TYPES = {
  UPDATE_USERS: 'UPDATE_USERS',
  ADD_USER: 'ADD_USER',
  DELETE_USER: 'DELETE_USER',
  SHOW_MODAL: 'SHOW_MODAL',
}

const initialState = {
  title: '',
  users: [],
}

export const Provider = ({ children }) => {

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ACTION_TYPES.ADD_USER:
        return { ...state, users: [...state.users, { __id: state.users.length, ...action.payload } ]}

      case ACTION_TYPES.UPDATE_USERS:
        return { ...state, users: action.users };

      case ACTION_TYPES.DELETE_USER:
        return { ...state, users: state.users.filter(user => user !== action.payload.id) }

      default:
        return state;
    }
  }, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      { children }
    </AppContext.Provider>
  )
}
