import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_UI_GOOGLE
} from "../types";

const initialState = {
  loading: false,
  loadingGoogle: false,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        loadingGoogle: false,
        errors: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case LOADING_UI_GOOGLE:
      return {
        ...state,
        loadingGoogle: true
      };
    default:
      return state;
  }
}
