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
    display: "flex",
    height: "100%",
    width: "100%",
    minHeight: "48rem",
    maxHeight: "48rem"
  },
  buttonSave: {
    position: "absolute",
    bottom: "2.5rem",
    right: "3rem"
  }
});

class ObjectDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagram: this.props.diagram
    };
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

  handleShow = () => {
    //const diagrams_copy = [];
    //Object.assign(diagrams_copy, this.props.data.diagram.diagram);
    //const view_diagram = JSON.parse(this.props.data.diagram.diagram);
    //console.log(view_diagram);
    //diagramStore.dispatch(setEntities(this.props.diagram));
  };

  // componentDidMount() {
  //   diagramOn("anyChange", entityState => {
  //     this.setState({
  //       diagram: entityState
  //     });
  //   });
  //   diagramStore.dispatch(setEntities(this.state.diagram));
  // }

  componentDidMount() {
    diagramStore.dispatch(setConfig(config));
    diagramStore.dispatch(setEntities(this.state.diagram));
    diagramOn("anyChange", entityState => {
      this.setState({
        diagram: entityState
      });
    });
  }

  render() {
    const { classes, diagram } = this.props;
    console.log(diagram);
    return (
      <>
        <div className={classes.diagram}>
          <CssBaseline />
          <div className={classes.diagramContainer}>
            <Diagram customEntities={customEntities} />
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
          </div>
        </div>
      </>
    );
  }
}

ObjectDiagram.propTypes = {
  saveDiagram: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { saveDiagram }
)(withStyles(styles)(ObjectDiagram));
