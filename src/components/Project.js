import React, { Component } from "react";
import PropTypes from "prop-types";
//Components
import CustomButton from "../util/CustomButton";
import DeleteProject from "../components/DeleteProject";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import locale from "dayjs/locale/es";
//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
//Icons
import ChatIcon from "@material-ui/icons/Chat";
//Redux
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 100
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

class Project extends Component {
  render() {
    dayjs.locale(locale);
    dayjs.extend(relativeTime);
    const {
      classes,
      project: {
        title,
        //objective,
        createdAt,
        userImage,
        description,
        projectId,
        commentCount,
        projectUserId
      },
      user: {
        authenticated,
        credentials: { userId }
      }
    } = this.props;

    const deleteButton =
      authenticated && projectUserId === userId ? (
        <DeleteProject projectId={projectId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          {deleteButton}
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          <CustomButton tip="comentarios">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>{commentCount} comentarios</span>
        </CardContent>
      </Card>
    );
  }
}

Project.propTypes = {
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Project));
