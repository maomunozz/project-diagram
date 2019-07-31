import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/favicon.ico";
import axios from "axios";
import { Link } from "react-router-dom";
import themeFile from "../util/themeForm";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = themeFile;

class signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      profession: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      errors: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      profession: this.state.profession,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    axios
      .post("/signup", newUserData)
      .then(response => {
        console.log(response.data);
        localStorage.setItem("FBIdToken", `Bearer ${response.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="Icon" className={classes.image} />
          <Typography variant="h4" className={classes.pageTitle}>
            Regístrate
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="firstName"
              name="firstName"
              type="text"
              label="Nombre Completo"
              helperText={errors.firstName}
              error={errors.firstName ? true : false}
              className={classes.textField}
              value={this.state.firstName}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="lastName"
              name="lastName"
              type="text"
              label="Apellidos"
              helperText={errors.lastName}
              error={errors.lastName ? true : false}
              className={classes.textField}
              value={this.state.lastName}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="profession"
              name="profession"
              type="text"
              label="Profesión"
              helperText={errors.profession}
              error={errors.profession ? true : false}
              className={classes.textField}
              value={this.state.profession}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="confirmar Password"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Registrarse
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Ya tienes una cuenta? ingresa<Link to="/login"> aqui</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(signup);
