import React, { Component } from "react";
import PropTypes from "prop-types";
//MUI
import Grid from "@material-ui/core/Grid";
//Components
import Project from "../components/Project";
import Profile from "../components/Profile";
//Redux
import { connect } from "react-redux";
import { getProjects } from "../redux/actions/dataActions";

class dashboard extends Component {
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { projects, loading } = this.props.data;
    let recentProjectsMarkup = !loading ? (
      projects.map(project => (
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
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { getProjects }
)(dashboard);
