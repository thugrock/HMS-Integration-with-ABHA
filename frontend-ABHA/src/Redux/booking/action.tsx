import * as types from "./types";
import axios from "axios";

// create booking
export const createBooking = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_BOOKING_REQUEST });
    const res = await axios.post(
      `http://0.0.0.0:13962/appointments/create`,
      data
    );
    console.log(res);
    // dispatch({ type: types.CREATE_BOOKING_SUCCESS, payload: res.data.postData });
  } catch (error) {
    console.log(error);
  }
};
// create patient
export const createPatient = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://0.0.0.0:13962/patients/register`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// get post
// export const getPost = () => async (dispatch) => {
//   try {
//     dispatch({ type: types.GET_POST_REQUEST });
//     const res = await axios.get(
//       `http://0.0.0.0:13962/appointments`
//     );
//     dispatch({ type: types.GET_POST_SUCCESS, payload: res.data.post });
//   } catch (error) {
//     console.log(error);
//   }
// };
