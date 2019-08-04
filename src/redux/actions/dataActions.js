import {
  SET_PROJECTS,
  LOADING_DATA,
  DELETE_PROJECT,
  LOADING_UI,
  CREATE_PROJECT,
  SET_ERRORS,
  CLEAR_ERRORS,
  GET_OBSERVERS
} from "../types";
import axios from "axios";

//Get all projects
export const getProjects = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/projects")
    .then(response => {
      dispatch({
        type: SET_PROJECTS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_PROJECTS,
        payload: []
      });
    });
};

//Delete one project
export const deleteProject = projectId => dispatch => {
  axios
    .delete(`/project/${projectId}`)
    .then(() => {
      dispatch({ type: DELETE_PROJECT, payload: projectId });
    })
    .catch(err => {
      console.log(err);
    });
};

//Create one Project
export const createProject = newProject => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/project", newProject)
    .then(response => {
      dispatch({
        type: CREATE_PROJECT,
        payload: response.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      console.log(err);
    });
};

//Get observers
export const getObservers = () => dispatch => {
  axios
    .get("/observers")
    .then(response => {
      dispatch({
        type: GET_OBSERVERS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_OBSERVERS,
        payload: []
      });
    });
};

//Clear errors
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
