import React, { Component } from "react";
import PropTypes from "prop-types";
//Components
import CustomButton from "../util/CustomButton";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
//Icons
import DeleteIcon from "@material-ui/icons/Delete";
//Redux
import { connect } from "react-redux";
import { deleteProject } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
};

class DeleteProject extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  deleteProject = () => {
    this.props.deleteProject(this.props.projectId);
    this.setState({
      open: false
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <CustomButton
          tip="Eliminar proyecto"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteIcon color="secondary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Estas seguro de que quieres eliminar este proyecto ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.deleteProject} color="secondary">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

DeleteProject.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteProject }
)(withStyles(styles)(DeleteProject));
