import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import locale from "dayjs/locale/es";
//Components
import Observer from "./Observer";
import EditDetailsProject from "./EditDetailsProject";
//MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//Icons
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
  ...theme.profileTheme,
  paperObservers: {
    display: "flex",
    flexWrap: "wrap",
    padding: "0.2rem",
    margin: "10px auto 10px auto"
  },
  chip: {
    margin: theme.spacing(1)
  }
});

class ProjectDetails extends Component {
  render() {
    dayjs.locale(locale);
    dayjs.extend(relativeTime);
    const {
      classes,
      loading,
      project: {
        firstNameUser,
        lastNameUser,
        createdAt,
        title,
        description,
        objective
      },
      listDataObservers
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
            <Typography variant="body1">Objetivo: {objective}</Typography>
            <hr />
            <Typography variant="body2">
              Creado por: {firstNameUser} {lastNameUser}
            </Typography>
            <hr />
            <Typography variant="body2" color="primary">
              Observadores
            </Typography>
            <div>
              {listDataObservers &&
                listDataObservers.map(observer => {
                  return (
                    <Observer
                      key={observer.userId}
                      email={observer.email}
                      imageUrl={observer.imageUrl}
                      chipClassName={classes.chip}
                      color="primary"
                      size="small"
                    />
                  );
                })}
            </div>
            <hr />
            <CalendarToday color="primary" />{" "}
            <span>Creado {dayjs(createdAt).fromNow()}</span>
            <hr />
            <EditDetailsProject />
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
