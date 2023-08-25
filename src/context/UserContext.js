import { createContext } from "react";


const UserContext = createContext({
    loggedInUser: "Guest User"
})

export default UserContext;