import React from "react";
import style from "styled-components";
import Dropdown from "react-dropdown-modal";
import "react-dropdown-modal/lib/dropdown.css";
import ActionIcon from "./ActionIcon";
//Icons
import { ChevronDown } from "mdi-material-ui";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";

import type { DiagComponentProps } from "react-flow-diagram";

const styles = theme => ({
  dropdown: {
    paddingRight: "5rem",
    paddingTop: "0.1rem"
  }
});

const ActionStyle = style.div`
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: .5rem;
  border: 4px dotted #000;
`;

const Name = style.span`
  flex: auto;
  padding-top: 0.25rem;
`;

export type ActionProps = DiagComponentProps & {
  name: string
};

const Action = (props: ActionProps) => (
  <ActionStyle width={props.model.width} height={props.model.height}>
    <Name>
      <ActionIcon pathIcon={props.model.name} />
    </Name>
  </ActionStyle>
);

/*
 * Container
 * ==================================== */

type ActionComponentProps = DiagComponentProps;
type ActionComponentState = {
  name: string
};
class ActionComponent extends React.PureComponent<
  ActionComponentProps,
  ActionComponentState
> {
  state = {
    name: this.props.model.name,
    visible: false
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Action
          {...this.props}
          name={this.state.name}
          tooltip={this.state.type}
        />
        <Dropdown
          visible={this.state.visible}
          onButtonClick={e => {
            this.setState({ visible: true });
          }}
          onClose={() => {
            this.setState({ visible: false });
          }}
          modalButtons={{
            Desplazar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "desplazar"
              });
            },
            Agarrar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "agarrar"
              });
            }, // onClick of that button
            Lanzar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "lanzar"
              });
            },
            Levantar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "levantar"
              });
            },
            Presionar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "presionar"
              });
            },
            Gestualizar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "gestualizar"
              });
            }, // onClick of that button
            Soltar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "soltar"
              });
            },
            Leer: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "leer"
              });
            },
            Girar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "girar"
              });
            },
            Introducir: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "introducir"
              });
            },
            Adherir: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "adherir"
              });
            },
            Arrastrar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "arrastrar"
              });
            },
            Retroalimentar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "retroalimentar"
              });
            }, // onClick of that button
            Ajustar: () => {
              this.props.setName({
                id: this.props.model.id,
                name: "ajustar"
              });
            }
          }}
          showArrow={false}
          arrowPosition={{}}
          position={{}}
        >
          <i className={classes.dropdown}>
            <ChevronDown />
          </i>
        </Dropdown>
      </>
    );
  }
}

export default withStyles(styles)(ActionComponent);
