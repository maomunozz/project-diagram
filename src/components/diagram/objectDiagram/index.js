import React, { Component } from "react";
import PropTypes from "prop-types";
//React flow diagram
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig,
  diagramOn
} from "react-flow-diagram";
//Components
import { config, customEntities } from "./config-diagram";
//MUI
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab";
//Icons
import SaveIcon from "@material-ui/icons/Save";
//Redux
import { saveDiagram } from "../../../redux/actions/dataActions";
import { connect } from "react-redux";

const styles = theme => ({
  diagram: {
    flexGrow: 1
  },
  diagramContainer: {
    "@media (min-width: 1200px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "48rem",
      maxHeight: "48rem",
      minWidth: "62rem",
      maxWidth: "62rem"
    },
    "@media (min-width: 1600px)": {
      display: "flex",
      height: "100%",
      width: "100%",
      minHeight: "41rem",
      maxHeight: "41rem",
      minWidth: "72.5rem",
      maxWidth: "72.5rem"
    }
  },
  buttonSave: {
    "@media (min-width: 1200px)": {
      position: "absolute",
      bottom: "2.8rem",
      right: "3.8rem"
    },
    "@media (min-width: 1600px)": {
      position: "absolute",
      bottom: "2rem",
      right: "7rem"
    }
  }
});

class ObjectDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagram: this.props.diagram
    };
    this._isMounted = false;
  }

  handleSubmit = e => {
    e.preventDefault();
    const updateDiagram = JSON.stringify(this.state.diagram);
    const diagram = {
      diagram: updateDiagram
    };
    const projectId = this.props.projectId;
    const diagramId = this.props.diagramId;
    this.props.saveDiagram(diagram, diagramId, projectId);
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && diagramStore.dispatch(setConfig(config));
    this._isMounted && diagramStore.dispatch(setEntities(this.state.diagram));
    this._isMounted &&
      diagramOn("anyChange", entityState => {
        this.setState({
          diagram: entityState
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      classes,
      user: {
        authenticated,
        credentials: { userId }
      },
      diagramUserId
    } = this.props;

    return (
      <>
        <div className={classes.diagram}>
          <CssBaseline />
          <div className={classes.diagramContainer}>
            <Diagram customEntities={customEntities} />
            {authenticated && diagramUserId === userId ? (
              <Fab
                title="guardar diagrama"
                color="primary"
                aria-label="Save"
                size="medium"
                onClick={this.handleSubmit}
                className={classes.buttonSave}
              >
                <SaveIcon />
              </Fab>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

ObjectDiagram.propTypes = {
  saveDiagram: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { saveDiagram }
)(withStyles(styles)(ObjectDiagram));
