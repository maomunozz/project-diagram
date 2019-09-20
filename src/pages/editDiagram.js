import React, { Component } from "react";
import PropTypes from "prop-types";
//Components
import SkeletonComments from "../skeleton/SkeletonComments";
import SkeletonDiagram from "../skeleton/SkeletonDiagram";
import SkeletonName from "../skeleton/SkeletonName";
import ObjectDiagram from "../components/diagram/objectDiagram/index";
import Comments from "../components/diagram/Comments";
import CommentForm from "../components/diagram/CommentForm";
//MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
//Redux
import { getDiagramData } from "../redux/actions/dataActions";
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.profileTheme,
  paperComments: {
    padding: 10
  },
  nameDiagram: {
    color: theme.palette.primary.main
  },
  typeDiagram: {
    color: theme.palette.primary.main
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
      diagram: { diagram, diagramUserId, comments, type, diagramName },
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
    let tipo = "";
    switch (type) {
      case "1":
        tipo = "Objeto/Acciones";
        break;
      case "3":
        tipo = "Interacciones/Intra-acciones";
        break;
      case "2":
        tipo = "Interrelaciones/reacciones";
        break;
      default:
        tipo = "Diagrama";
        break;
    }
    let nameComments = !loading ? (
      <>
        <Typography variant="h6">
          <span className={classes.nameDiagram}>Nombre:</span> {diagramName}
        </Typography>
        <Typography variant="body1">
          <span className={classes.typeDiagram}>Tipo:</span> {tipo}
        </Typography>
      </>
    ) : (
      <SkeletonName />
    );

    return (
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Paper className={classes.paperComments}>
            {nameComments}
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
