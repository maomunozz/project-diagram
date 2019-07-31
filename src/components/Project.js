import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import locale from "dayjs/locale/es";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
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
        objective,
        createdAt,
        userImage,
        description,
        projectId,
        commentCount
      }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography variant="body1" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Project);
