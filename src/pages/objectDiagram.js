import React, { Component } from "react";
import PropTypes from "prop-types";
//Components
import SkeletonComments from "../skeleton/SkeletonComments";
import SkeletonDiagram from "../skeleton/SkeletonDiagram";
import ObjectDiagram from "../components/diagram/objectDiagram/index";
import Comments from "../components/diagram/Comments";
import CommentForm from "../components/diagram/CommentForm";
//MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
//Redux
import { getDiagramData } from "../redux/actions/dataActions";
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.profileTheme,
  paperComments: {
    padding: 10
  }
});

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
      diagram: { diagram, diagramUserId, comments, type },
      loading
    } = this.props.data;
    const { classes } = this.props;
    let copyDiagram = [];
    let copyType = "";
    if (diagram !== undefined) {
      copyDiagram = JSON.parse(diagram);
    }
    if (type !== undefined) {
      copyType = type;
    }
    let viewDiagram = !loading ? (
      <ObjectDiagram
        projectId={projectId}
        diagramId={diagramId}
        diagram={copyDiagram}
        diagramUserId={diagramUserId}
        type={copyType}
      />
    ) : (
      <SkeletonDiagram />
    );

    let viewComments = !loading ? (
      <Comments comments={comments} />
    ) : (
      <>
        <SkeletonComments />
        <SkeletonComments />
        <SkeletonComments />
        <SkeletonComments />
      </>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Paper className={classes.paperComments}>
            <CommentForm diagramId={diagramId} projectId={projectId} />
            {viewComments}
          </Paper>
        </Grid>
        <Grid item sm={9} xs={12}>
          {viewDiagram}
        </Grid>
      </Grid>
    );
  }
}

objectDiagram.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
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
)(withStyles(styles)(objectDiagram));
