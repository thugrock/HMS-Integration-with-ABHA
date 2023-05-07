import * as types from "./types";

const initialState = {
  loading: false,
  error: false,
  reports: [],
  beds: [],
  doctors: [],
  patients: [],
  frontdesks: [],
  dashboard: [],
  Appointments: [],
  carecontexts: [],
  consents: [],
};

export default function dataReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: payload,
      };
    case types.GET_ALLDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboard: payload,
      };
    case types.DISCHARGE_PATIENT_SUCCESS:
      let data = state.beds.map((ele) => {
        if (ele._id === payload.bed._id) {
          return payload.bed;
        }
        return ele;
      });
    case types.DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        Appointments: state.Appointments.filter((ele) => ele._id !== payload),
      };
    case types.GET_APPOINTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        Appointments: payload,
      };
    case types.ADD_CARE_CONTEXT:
      return {
        ...state,
        loading: false,
        carecontexts: payload,
      };
      case types.REQUEST_CONSENT_SUCCESS:
        return {
          ...state,
          loading: false,
          consents: payload,
        };
    default:
      return state;
  }
}
