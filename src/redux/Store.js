import {configureStore} from "@reduxjs/toolkit";
import { profileReducer,  userReducer } from "./reducers/userReducer";
 import { adminReducer } from "./reducers/adminReducer";
 
 

const store = configureStore({
    reducer:{
    user:userReducer,
    profile: profileReducer,
     admin: adminReducer,
 

    }
});
export default store;

export const server = 'https://nms9kp-4000.csb.app/api/v1';