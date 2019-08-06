import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import locale from "dayjs/locale/es";
//Components
import CustomButton from "../util/CustomButton";
//MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { CameraPlus } from "mdi-material-ui";
//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.profileTheme
});

class ProjectDetails extends Component {
  render() {
    dayjs.locale(locale);
    dayjs.extend(relativeTime);
    const {
      classes,
      loading,
      project: { firstNameUser, lastNameUser, createdAt, title, description }
    } = this.props;

    let dataProject = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-details">
            <Typography color="primary" variant="h6">
              Título: {title}
            </Typography>
            <hr />
            <Typography variant="body1">Descripción: {description}</Typography>
            <hr />
            <Typography variant="body2">
              Creado por: {firstNameUser} {lastNameUser}
            </Typography>
            <hr />
            <CalendarToday color="primary" />{" "}
            <span>Creado {dayjs(createdAt).fromNow()}</span>
          </div>
        </div>
      </Paper>
    ) : (
      <p>loading...</p>
    );

    return dataProject;
  }
}

ProjectDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectDetails);
