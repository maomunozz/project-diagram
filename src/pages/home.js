import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

//Components
import Project from "../components/Project";

class home extends Component {
  state = {
    projects: null
  };
  componentDidMount() {
    axios
      .get("/projects")
      .then(response => {
        console.log(response.data);
        this.setState({
          projects: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let recentProjectsMarkup = this.state.projects ? (
      this.state.projects.map(project => (
        <Project project={project} key={project.projectId} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentProjectsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
