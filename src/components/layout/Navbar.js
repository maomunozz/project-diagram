import React, { Component } from "react";
import PropTypes from "prop-types";
//Components
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
//MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
//Redux
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.formTheme,
  buttonEdit: {
    position: "relative",
    left: "70%",
    marginTop: 20
  },
  button: {
    float: "right"
  },
  containerNav: {
    margin: "auto"
  },
  colorIcon: {
    color: "#fff"
  },
  root: {
    flexGrow: 1,
    marginBottom: 80
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

class Navbar extends Component {
  render() {
    const { authenticated, classes } = this.props;
    const links = authenticated ? (
      <>
        <SignedInLinks />
      </>
    ) : (
      <>
        <SignedOutLinks />
      </>
    );
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Proyecto Diagramas
            </Typography>
            <div color="inherit">{links}</div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
