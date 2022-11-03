import { createContext, useContext, useReducer } from "react";
import {reducer, initialState} from '.././reducers/userReducer'

const authContext = createContext();

export function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (

        <authContext.Provider value={{ state, dispatch }}>
            {children}
        </authContext.Provider>

    )
}

export function useAuthContext() {
    return useContext(authContext)
}