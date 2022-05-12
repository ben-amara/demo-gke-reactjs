import {combineReducers} from "redux";
import usersReducers from "./reducer";


const rootReducer = combineReducers({
    data_users: usersReducers
})


export default rootReducer;