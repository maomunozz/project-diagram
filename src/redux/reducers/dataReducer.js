import {
  SET_PROJECTS,
  SET_PROJECT,
  LOADING_DATA,
  DELETE_PROJECT,
  CREATE_PROJECT,
  GET_OBSERVERS
} from "../types";

const initialState = {
  observers: [],
  projects: [],
  project: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      };
    case SET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      };
    case GET_OBSERVERS:
      return {
        ...state,
        observers: action.payload
      };
    case DELETE_PROJECT:
      let index = state.projects.findIndex(
        project => project.projectId === action.payload
      );
      state.projects.splice(index, 1);
      return {
        ...state
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    default:
      return state;
  }
}
