import React from "react";
import style from "styled-components";
import InteractionIcon from "./InteractionIcon";
import ChipIconInteraction from "../chipIconsInteraction";
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

const InteractionStyle = style.div`
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 77rem;
  border-style: dashed solid;
`;

const Name = style.span`
  flex: auto;
  padding-top: 0.25rem;
`;

export type InteractionProps = DiagComponentProps & {
  name: string
};

const Interaction = (props: InteractionProps) => (
  <InteractionStyle width={props.model.width} height={props.model.height}>
    <Name>
      <InteractionIcon pathIcon={props.model.name} />
    </Name>
  </InteractionStyle>
);

/*
 * Container
 * ==================================== */

type InteractionComponentProps = DiagComponentProps;
type InteractionComponentState = {
  name: string
};
class InteractionComponent extends React.PureComponent<
  InteractionComponentProps,
  InteractionComponentState
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
    const interactions = [
      "conectar",
      "presionar",
      "introducir",
      "empujar",
      "doblar",
      "cortar",
      "parar",
      "esperar",
      "encender",
      "agarrar",
      "soltar",
      "sacar",
      "quitar",
      "levantar",
      "girar",
      "mover",
      "comenzar",
      "finalizar",
      "accionar",
      "apagar",
      "bajar",
      "subir",
      "salir",
      "abrir",
      "poner"
    ];
    return (
      <>
        <Interaction
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
            {interactions.map(interaction => {
              return (
                <Chip
                  key={interaction}
                  id={interaction}
                  avatar={<ChipIconInteraction pathIcon={interaction} />}
                  label={interaction}
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

export default withStyles(styles)(InteractionComponent);
