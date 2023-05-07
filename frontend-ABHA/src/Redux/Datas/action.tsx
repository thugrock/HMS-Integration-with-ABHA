import * as types from "./types";
import axios from "axios";

// CreateReport
export const CreateReport = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REPORT_REQUEST });
    const res = await axios.post("http://0.0.0.0:13962/reports/create", data);
    console.log(res);
    return res.data;
    // dispatch({
    //   type: types.CREATE_REPORT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.CREATE_REPORT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};
export const SubmitReport = (data) => async (dispatch) => {
  try {
    console.log(data);
    dispatch({ type: types.CREATE_REPORT_REQUEST });
    const res = await axios.post(
      "http://0.0.0.0:13962/reports/submit-report",
      data
    );
    console.log(res);
    return res.data;
    // dispatch({
    //   type: types.CREATE_REPORT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.CREATE_REPORT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// GET DOCTOR DETAILS
export const GetDoctorDetails = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOCTOR_REQUEST });
    const res = await axios.get("http://0.0.0.0:13962/doctors");
    console.log(res);
    // dispatch({
    //   type: types.GET_DOCTOR_SUCCESS,
    //   payload: {
    //
    //   },
    // });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.GET_DOCTOR_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//ADD PATIENTS
export const AddPatients = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_PATIENT_REQUEST });
    const res = await axios.post(
      "http://0.0.0.0:13962/patients/register",
      data
    );
    console.log(data);
    return res.data;
    // dispatch({
    //   type: types.ADD_PATIENT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.ADD_PATIENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//create payment
export const CreatePayment = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_PAYMENT_REQUEST });
    const res = await axios.post("http://0.0.0.0:13962/payments/add", data);
    console.log(res.data);
    // dispatch({
    //   type: types.CREATE_PAYMENT_SUCCESS,
    //   payload: {
    //
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.CREATE_PAYMENT_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//CREATE BOOKING
export const CreateBooking = (data) => async (dispatch) => {
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

// DISCHARGE PATIENT
export const dischargePatient = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.DISCHARGE_PATIENT_REQUEST });
    const res = await axios.put(`http://0.0.0.0:13962/beds/discharge`, data);
    console.log(res);
    // return res.data;
    dispatch({
      type: types.DISCHARGE_PATIENT_SUCCESS,
      payload: {
        bed: res.data.bed,
      },
    });
  } catch (error) {
    // dispatch({
    // type: types.DISCHARGE_PATIENT_ERROR,
    //   payload: {
    //     message: error,
    //   },
    // });
    console.log(error);
  }
};

// GET ALL PATIENT
export const GetPatients = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PATIENT_REQUEST });
    const res = await axios.get(`http://0.0.0.0:13962/patients`);
    console.log(res.data);
    dispatch({
      type: types.GET_PATIENT_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// GET ALL DATA
export const GetAllData = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALLDATA_REQUEST });
    const res = await axios.get(`http://0.0.0.0:13962/hospitals`);
    console.log(res.data);
    dispatch({
      type: types.GET_ALLDATA_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL APPOINTMENT DETAILS
export const GetAllAppointment = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_APPOINTMENT_DETAILS_REQUEST });
    const res = await axios.get(`http://0.0.0.0:13962/appointments`);
    // console.log(res.data);
    // return res.data;
    dispatch({
      type: types.GET_APPOINTMENT_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE APPOINTMENTS
export const DeleteAppointment = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_APPOINTMENT_REQUEST });
    const res = await axios.delete(`http://0.0.0.0:13962/appointments/${id}`);
    console.log(res.data);
    // return res.data;
    dispatch({
      type: types.DELETE_APPOINTMENT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL REPORTS
export const GetAllReports = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_REPORTS_REQUEST });
    const res = await axios.get(`http://0.0.0.0:13962/reports`);
    console.log(res.data);
    return res.data;
    // dispatch({
    //   type: types.DELETE_APPOINTMENT_SUCCESS,
    //   payload: id,
    // });
  } catch (error) {
    console.log(error);
  }
};

export const AddCareContext = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://0.0.0.0:13962/carecontexts/addCareContext`,
      data
    );
    dispatch({ type: types.ADD_CARE_CONTEXT, payload: res.data });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(data);
    console.log(error);
    return "error";
  }
};

export const Registerviaabha = (data) => async (dispatch) => {
  try {
    console.log(data);
    const res = await axios.post(
      `http://0.0.0.0:13962/frontdesks/registerByAbha`,
      data
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(data);
    console.log(error);
    return "error";
  }
};

export const Registerviaabha_OTP = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`http://0.0.0.0:13962/otpConfirm`, data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(data);
    console.log(error);
    return "error";
  }
};

export const GetFiles = (data) => async (dispatch) => {
  try {
    const res = await axios.post("http://0.0.0.0:13962/reports/files", data);
    return res.data;
  } catch (error) {
    console.log(error);
    return "error";
  }
};
export const GetAllConsents = (data) => async(dispatch) => {
  try {
    const res = await axios.get(
      `http://0.0.0.0:13962/consents/getAllConsents`,
      data
    );
    console.log(res.data);
    dispatch({ type: types.REQUEST_CONSENT_SUCCESS, payload: res.data });
    return res.data;
  }catch(error){
    console.log(error);
    return "error in getAllConsents";
  }
};
export const RequestConsent = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://0.0.0.0:13962/consents/requestConsent`,
      data
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(data);
    console.log(error);
    return "error";
  }
};
