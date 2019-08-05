import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import locale from "dayjs/locale/es";
//Components
import EditDetails from "./EditDetails";
import CustomButton from "../util/CustomButton";
//MUI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import Email from "@material-ui/icons/Email";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.profileTheme
});

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    dayjs.locale(locale);
    const {
      classes,
      user: {
        credentials: {
          firstName,
          lastName,
          createdAt,
          imageUrl,
          email,
          profession,
          userId,
          bio,
          location
        },
        authenticated,
        loading
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <CustomButton
                tip="Editar foto de perfil"
                onClick={this.handleEditPicture}
                btnClassName="button"
                placement="top"
              >
                <EditIcon color="primary" />
              </CustomButton>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${userId}`}
                color="primary"
                variant="h6"
              >
                {firstName} {lastName}
              </MuiLink>
              <hr />
              {profession && (
                <Typography variant="body2">{profession}</Typography>
              )}
              <hr />
              {bio && <Typography variant="body2">{bio}</Typography>}
              <hr />
              {location && (
                <>
                  <LocationOn color="primary" /> <span>{location}</span>
                  <hr />
                </>
              )}
              {email && (
                <>
                  <Email color="primary" /> <span>{email}</span>
                  <hr />
                </>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Se unió en {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            <Link to="/">
              <CustomButton
                tip="Logout"
                onClick={this.handleLogout}
                placement="top"
              >
                <KeyboardReturn color="primary" />
              </CustomButton>
            </Link>
            <EditDetails />
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No se encontro el perfil, por favor ingrese nuevamente
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  logoutUser,
  uploadImage
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
