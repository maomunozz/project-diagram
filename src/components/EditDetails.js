import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//Components
import CustomButton from "../util/CustomButton";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
//Icons
import EditIcon from "@material-ui/icons/Edit";
//Redux
import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.formTheme,
  button: {
    float: "right"
  }
});

class EditDetails extends Component {
  state = {
    bio: "",
    location: "",
    profession: "",
    open: false
  };
  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      location: credentials.location ? credentials.location : "",
      profession: credentials.profession ? credentials.profession : ""
    });
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleCLose = () => {
    this.setState({
      open: false
    });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    const userDetails = {
      bio: this.state.bio,
      profession: this.state.profession,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleCLose();
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <CustomButton
          tip="Editar información"
          onClick={this.handleOpen}
          btnClassName={classes.button}
          placement="top"
        >
          <EditIcon color="primary" />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleCLose}
          fullWidth
          //maxWith="sm"
        >
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="profession"
                type="text"
                label="Profesión"
                placeholder="Ingresa tu profesión"
                className={classes.textField}
                value={this.state.profession}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                name="location"
                type="text"
                label="Ubicación"
                placeholder="Ingresa tu ubicación actual"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                name="bio"
                type="text"
                label="Biografia"
                multiline
                rows="2"
                placeholder="Algo corto acerca de tí"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
                variant="outlined"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCLose}
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
            >
              Cancelar
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
