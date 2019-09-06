import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/biscuaIcono.svg";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
//Icons
import { Google } from "mdi-material-ui";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
//Redux
import { connect } from "react-redux";
import { signupUser, signupUserWhitGoogle } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.formTheme,
  biscuaIcon: {
    height: "100px"
  }
});

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
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
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
    this.props.signupUser(newUserData, this.props.history);
  };

  responseGoogle = response => {
    const newUser = {
      idToken: response.accessToken,
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      imageUrl: response.profileObj.imageUrl
    };
    this.props.signupUserWhitGoogle(newUser, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      ui: { loading, loadingGoogle },
      authenticated
    } = this.props;
    if (authenticated) return <Redirect to="/dashboard" />;
    const { errors } = this.state;
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.form}
        item
        xs={12}
        sm={6}
        lg={4}
      >
        <img src={AppIcon} alt="Icon" className={classes.biscuaIcon} />
        <GoogleLogin
          clientId="731934267377-8krtcq68rcc51mamje4k2kgbhblv1912.apps.googleusercontent.com"
          buttonText="Ingresar con Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={renderProps => (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.googleButton}
              disabled={loadingGoogle}
              onClick={renderProps.onClick}
              fullWidth
              size="medium"
            >
              <Google className={classes.iconGoogle} /> Regístrate con Google
              {loadingGoogle && (
                <CircularProgress
                  size={30}
                  className={classes.progress}
                  color="secondary"
                />
              )}
            </Button>
          )}
        />
        <form noValidate onSubmit={this.handleSubmit}>
          <Divider variant="fullWidth" className={classes.divider} />
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            fullWidth
            size="medium"
          >
            Regístrate
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Ya tienes una cuenta? ingresa
            <Link to="/login" className={classes.link}>
              {" "}
              aquí
            </Link>
          </small>
        </form>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  signupUserWhitGoogle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {
  signupUser,
  signupUserWhitGoogle
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
