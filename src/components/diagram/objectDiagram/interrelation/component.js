import React from "react";
import style from "styled-components";
import InterrelationIcon from "./InterrelationIcon";
import ChipIconInterrelation from "../chipIconsInterrelation";
//Icons
import { ChevronDown, Close } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Chip from "@material-ui/core/Chip";

import type { DiagComponentProps } from "react-flow-diagram";

const styles = theme => ({
  buttonRoot: {
    display: "flex",
    padding: 0
  },
  buttonIcon: {
    padding: 0
  },
  chip: {
    margin: theme.spacing(1)
  }
});

const InterrelationStyle = style.div`
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: .5rem;
  border-style: solid dashed;
`;

const Name = style.span`
  flex: auto;
  padding-top: 0.25rem;
`;

export type InterrelationProps = DiagComponentProps & {
  name: string
};

const Interrelation = (props: InterrelationProps) => (
  <InterrelationStyle width={props.model.width} height={props.model.height}>
    <Name>
      <InterrelationIcon pathIcon={props.model.name} />
    </Name>
  </InterrelationStyle>
);

/*
 * Container
 * ==================================== */

type InterrelationComponentProps = DiagComponentProps;
type InterrelationComponentState = {
  name: string
};
class InterrelationComponent extends React.PureComponent<
  InterrelationComponentProps,
  InterrelationComponentState
> {
  state = {
    name: this.props.model.name,
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = event => {
    this.props.setName({
      id: this.props.model.id,
      name: event.currentTarget.id
    });
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    const interrelations = [
      "comunicación multidireccional",
      "comunicación bidireccional",
      "comunicación digital",
      "choque",
      "roce",
      "toque",
      "encaje",
      "dependencia"
    ];
    return (
      <>
        <Interrelation
          {...this.props}
          name={this.state.name}
          tooltip={this.state.type}
        />
        <div className={classes.buttonRoot}>
          <IconButton className={classes.buttonIcon} onClick={this.handleOpen}>
            <ChevronDown />
          </IconButton>
        </div>
        <Dialog open={this.state.open} maxWidth="xs" onClose={this.handleClose}>
          <DialogActions>
            <IconButton className={classes.button} onClick={this.handleClose}>
              <Close />
            </IconButton>
          </DialogActions>
          <DialogContent>
            {interrelations.map(interrelation => {
              return (
                <Chip
                  key={interrelation}
                  id={interrelation}
                  avatar={<ChipIconInterrelation pathIcon={interrelation} />}
                  label={interrelation}
                  onClick={this.handleClick}
                  className={classes.chip}
                />
              );
            })}
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(InterrelationComponent);
