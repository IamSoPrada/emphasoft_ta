import { combineReducers } from "redux"

import appAuth from "./auth"
import appUsers from "./users"
import appFind from "./find"


export default combineReducers({
    appAuth,
    appUsers,
    appFind
})