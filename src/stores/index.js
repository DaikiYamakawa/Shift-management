import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import membersReducer from "./members";
import skillsReducer from "./skills"

const reducer = combineReducers({
  members: membersReducer,
  skills: skillsReducer,
});

const store = configureStore({ reducer });

export default store;
