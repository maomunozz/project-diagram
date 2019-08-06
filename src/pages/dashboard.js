import React, { Component } from "react";
import PropTypes from "prop-types";
//MUI
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
//Components
import Project from "../components/Project";
import Profile from "../components/Profile";
//Redux
import { connect } from "react-redux";
import { getProjects } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.formTheme,
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class dashboard extends Component {
  state = { activeIndex: 0 };

  handleChange = (_, activeIndex) => this.setState({ activeIndex });

  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { activeIndex } = this.state;
    const { classes } = this.props;
    const { projects, loading } = this.props.data;
    console.log(projects);
    const { userId } = this.props.credentials;
    let projectsCoordinated = !loading ? (
      projects.map(project =>
        project.projectUserId === userId ? (
          <Project
            project={project}
            key={project.projectId}
            isCoordinated={false}
          />
        ) : null
      )
    ) : (
      <p>Loading...</p>
    );

    let projectsObserved = !loading ? (
      projects.map(project =>
        project.observers.includes(userId) ? (
          <Project
            project={project}
            key={project.projectId}
            isCoordinated={true}
          />
        ) : null
      )
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={8} xs={12}>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={activeIndex} onChange={this.handleChange}>
                <Tab label="Coordinados" />
                <Tab label="Observados" />
              </Tabs>
            </AppBar>
            {activeIndex === 0 && <TabPanel>{projectsCoordinated}</TabPanel>}
            {activeIndex === 1 && <TabPanel>{projectsObserved}</TabPanel>}
          </div>
        </Grid>
      </Grid>
    );
  }
}

function TabPanel(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 24 }}>
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

const mapStateToProps = state => ({
  data: state.data,
  authenticated: state.user.authenticated,
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { getProjects }
)(withStyles(styles)(dashboard));
