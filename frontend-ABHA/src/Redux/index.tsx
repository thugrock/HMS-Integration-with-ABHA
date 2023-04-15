import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import dataReducer from "./Datas/reducer";
import bookingReducer from "./booking/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  booking: bookingReducer,
});
