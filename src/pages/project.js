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
import ProjectDetails from "../components/project/ProjectDetails";
//Redux
import { connect } from "react-redux";
import { getProject } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.formTheme,
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class project extends Component {
  state = { activeIndex: 0 };

  handleChange = (_, activeIndex) => this.setState({ activeIndex });

  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    this.props.getProject(projectId);
  }
  render() {
    const { activeIndex } = this.state;
    const { classes } = this.props;
    const { loading, project, observers } = this.props.data;
    const listObservers = [];
    const listIdsObservers = [];
    const listDataObservers = [];
    Object.assign(listObservers, observers);
    Object.assign(listIdsObservers, project.observers);

    listObservers.map(observer => {
      return listIdsObservers.find(id => {
        if (id === observer.userId) {
          return listDataObservers.push(observer);
        } else {
          return null;
        }
      });
    });

    //const { userId } = this.props.credentials;
    return (
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <ProjectDetails
            project={project}
            listDataObservers={listDataObservers}
          />
        </Grid>
        <Grid item sm={8} xs={12}>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={activeIndex} onChange={this.handleChange}>
                <Tab label="Objetos" />
                <Tab label="Interrelaciones y reacciones" />
                <Tab label="Interacciones" />
              </Tabs>
            </AppBar>
            {activeIndex === 0 && <TabPanel />}
            {activeIndex === 1 && <TabPanel />}
            {activeIndex === 2 && <TabPanel />}
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

project.propTypes = {
  getProject: PropTypes.func.isRequired,
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
  { getProject }
)(withStyles(styles)(project));
