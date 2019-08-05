import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/favicon.ico";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux
import { connect } from "react-redux";
import { loginUser, signupUserWhitGoogle } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.formTheme,
  link: {
    color: "#00bcd4"
  }
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  responseGoogle = response => {
    const newUser = {
      idToken: response.accessToken,
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      imageUrl: response.profileObj.imageUrl
    };
    console.log(newUser.idToken);
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
      >
        <img src={AppIcon} alt="Icon" className={classes.image} />
        <Typography variant="h4" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
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
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            No tienes una cuenta? registrate
            <Link to="/signup" className={classes.link}>
              {" "}
              aqui
            </Link>
          </small>
        </form>
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
              color="primary"
              className={classes.button}
              disabled={loadingGoogle}
              onClick={renderProps.onClick}
            >
              Ingresar con Google
              {loadingGoogle && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          )}
        />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  signupUserWhitGoogle: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {
  loginUser,
  signupUserWhitGoogle
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
