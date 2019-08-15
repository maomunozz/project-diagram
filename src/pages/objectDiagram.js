import React, { Component } from "react";
//MUI
import Grid from "@material-ui/core/Grid";
import ObjectDiagram from "../components/diagram/objectDiagram/index";

class objectDiagram extends Component {
  render() {
    const projectId = this.props.match.params.projectId;
    const diagramId = this.props.match.params.diagramId;
    return (
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12} />
        <Grid item sm={9} xs={12}>
          <ObjectDiagram projectId={projectId} diagramId={diagramId} />
        </Grid>
      </Grid>
    );
  }
}

export default objectDiagram;
