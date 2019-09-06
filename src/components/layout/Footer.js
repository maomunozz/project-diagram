import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.formTheme,
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: "10px 0",
    marginTop: 16,
    width: "100%",
    position: "fixed",
    bottom: 0,
    color: theme.palette.primary.contrastText
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <footer className={classes.footer}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Typography variant="caption">
              Desarrollado por:{" "}
              <a
                href="https://www.linkedin.com/in/maomunozz18/"
                id="linkMaoz"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span role="img" aria-label="rocket">
                  🚀
                </span>{" "}
                Mauricio Muñoz{" "}
              </a>
              -{" "}
              <a
                href="http://eisc.univalle.edu.co/index.php/grupos-investigacion/camaleon"
                id="linkMaoz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Camaleón
              </a>
            </Typography>
          </Grid>
        </footer>
      </>
    );
  }
}

export default withStyles(styles)(Footer);
