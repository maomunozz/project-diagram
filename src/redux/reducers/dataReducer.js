import {
  SET_PROJECTS,
  SET_PROJECT,
  LOADING_DATA,
  DELETE_PROJECT,
  CREATE_PROJECT,
  CREATE_DIAGRAM,
  GET_OBSERVERS,
  DELETE_DIAGRAM,
  SAVE_DIAGRAM
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
      let indexProject = state.projects.findIndex(
        project => project.projectId === action.payload
      );
      state.projects.splice(indexProject, 1);
      return {
        ...state
      };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    case CREATE_DIAGRAM:
      return {
        ...state,
        project: {
          ...state.project,
          diagrams: [action.payload, ...state.project.diagrams]
        }
      };
    case DELETE_DIAGRAM:
      let indexDiagram = state.project.diagrams.findIndex(
        diagram => diagram.diagramId === action.payload
      );
      state.project.diagrams.splice(indexDiagram, 1);
      return {
        ...state
      };
    case SAVE_DIAGRAM:
      return {
        ...state
      };
    default:
      return state;
  }
}
