import { SET_PROJECTS, LOADING_DATA, DELETE_PROJECT } from "../types";

const initialState = {
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
    case DELETE_PROJECT:
      let index = state.projects.findIndex(
        project => project.projectId === action.payload
      );
      state.projects.splice(index, 1);
      return {
        ...state
      };
    default:
      return state;
  }
}
