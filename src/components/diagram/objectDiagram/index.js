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
      diagram: []
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

  handleShow = e => {
    const x = document.getElementsByClassName("list-diagrams");
    for (let i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "transparent";
    }

    const y = document.getElementsByClassName("sc-ifAKCX");
    y[0].style.display = "block";

    const diagramId = e.target.id;

    const div = document.getElementById(diagramId);
    div.style.backgroundColor = "#c5cae9";

    const diagrams_copy = [];
    Object.assign(diagrams_copy, this.props.diagrams);
    const result = diagrams_copy.filter(diagram => diagram.id === diagramId);
    const view_diagram = JSON.parse(result[0].diagram);
    diagramStore.dispatch(setEntities(view_diagram));

    this.setState({
      diagramId: diagramId
    });
  };

  componentDidMount() {
    diagramOn("anyChange", entityState => {
      this.setState({
        diagram: entityState
      });
    });
    diagramStore.dispatch(setEntities(this.state.diagram));
  }

  componentWillMount() {
    diagramStore.dispatch(setConfig(config));
  }

  render() {
    const { classes } = this.props;
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
