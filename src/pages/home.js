import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/biscuaIcono.svg";
import { Link } from "react-router-dom";
//MUI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    marginTop: "1rem",
    textAlign: "left",
    alignItems: "center"
  },
  button: {
    position: "relative",
    margin: "10px auto 10px auto"
  },
  form: {
    margin: "0 auto",
    padding: 20,
    backgroundColor: "white"
  },
  image: {
    margin: "10px auto 10px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  biscuaIcon: {
    height: "200px"
  }
});

class home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.form}
          item
          xs={12}
          sm={10}
          lg={10}
        >
          <img src={AppIcon} alt="Icon" className={classes.biscuaIcon} />
          <Typography
            variant="h4"
            className={classes.pageTitle}
            color="primary"
          >
            ARQUITECTURA DE INFORMACIÓN
          </Typography>
          <Typography variant="body1">
            La arquitectura de información es un proceso que permite definir y
            caracterizar todos los elementos que componen una interfaz, Bisqua
            es una herramienta de software que soporta su construcción de forma
            colaborativa entre todos los miembros del equipo de trabajo.
          </Typography>
          <Grid container spacing={1} className={classes.container}>
            <Grid item xs={6}>
              <Typography variant="body1">
                Si tienes una cuenta de gmail o ya te registraste puedes
                comenzar a usar Bisqua ingresando en el siguiente enlace.
              </Typography>
              <Link to="/login">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Iniciar Sesión
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                Si no tienes una cuenta puedes registrarte en Bisqua llenando el
                formulario que se encuentra en el siguiente enlace.
              </Typography>
              <Link to="/signup">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Registrate
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(home);
