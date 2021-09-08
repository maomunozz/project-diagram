import React from "react";
//Icons
import { Close, Check } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  ...theme.formTheme,
  buttonRoot: {
    display: "flex",
    padding: 0
  },
  buttonIcon: {
    padding: 0
  }
});


class AttributeComponent extends React.PureComponent {
  state = {
    open: false,
    errors: {}
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      errors: {}
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = { attribute: this.state.attribute, value: this.state.value };

    const { valid, errors } = this.validateData(data);

    if (!valid) {
      this.setState({
        errors: errors
      });
    } else {
      this.props.setName({
        id: this.props.model.id,
        name: `${this.state.attribute}: ${this.state.value}`
      });
      this.setState({
        open: false,
        errors: {}
      });
    }
  };

  validateData = data => {
    let errors = {};
    if (data.attribute === "") errors.attribute = "Must not be empty";
    if (data.value === "") errors.value = "Must not be empty";
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  render() {
    const { classes } = this.props;
    return (
        <Dialog open={this.props.open} maxWidth="xs" onClose={this.props.handleClose}>
          <DialogTitle>Editar atributo</DialogTitle>
          <DialogContent>
            <form onSubmit={this.props.handleClick}>
              <TextField
                name="attribute"
                type="text"
                label="Nombre"
                placeholder="Nombre del atributo"
                className={classes.textField}
                onChange={this.props.handleChange}
                fullWidth
                variant="outlined"
                error={this.state.errors.attribute ? true : false}
                helperText={this.state.errors.attribute}
              />
              <TextField
                name="value"
                type="text"
                label="Valor"
                placeholder="Valor"
                className={classes.textField}
                onChange={this.props.handleChange}
                fullWidth
                variant="outlined"
                error={this.state.errors.value ? true : false}
                helperText={this.state.errors.value}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Fab onClick={this.props.handleClose} color="secondary" size="small">
              <Close />
            </Fab>
            <Fab onClick={this.props.handleClick} color="primary" size="small">
              <Check />
            </Fab>
          </DialogActions>
        </Dialog>
    );
  }
}

export default withStyles(styles)(AttributeComponent);
