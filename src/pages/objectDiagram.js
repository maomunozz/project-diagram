import React, { Component } from "react";
import PropTypes from "prop-types";
//Components
import Loader from "../util/Loader";
//MUI
import Grid from "@material-ui/core/Grid";
import ObjectDiagram from "../components/diagram/objectDiagram/index";
//Redux
import { getDiagramData } from "../redux/actions/dataActions";
import { connect } from "react-redux";

class objectDiagram extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.props.getDiagramData(this.props.match.params.diagramId);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const projectId = this.props.match.params.projectId;
    const diagramId = this.props.match.params.diagramId;
    const {
      diagram: { diagram, diagramUserId },
      loading
    } = this.props.data;
    let copyDiagram = [];
    if (diagram !== undefined) {
      copyDiagram = JSON.parse(diagram);
    }
    let viewDiagram = !loading ? (
      <ObjectDiagram
        projectId={projectId}
        diagramId={diagramId}
        diagram={copyDiagram}
        diagramUserId={diagramUserId}
      />
    ) : (
      <Loader />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={2} xs={12} />
        <Grid item sm={10} xs={12}>
          {viewDiagram}
        </Grid>
      </Grid>
    );
  }
}

objectDiagram.propTypes = {
  data: PropTypes.object.isRequired
};

const mapActionsToProps = {
  getDiagramData
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(objectDiagram);
