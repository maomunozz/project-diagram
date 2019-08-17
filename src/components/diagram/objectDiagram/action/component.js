import React from "react";
import style from "styled-components";
import Dropdown from "react-dropdown-modal";
import "react-dropdown-modal/lib/dropdown.css";
import TestIcon from "./icons/TestIcon";
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
  background-color: #cfd8dc;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: .5rem;
  border: 4px dotted #000;
`;

const Name = style.span`
  flex: 1 0;
  margin: auto;
`;

export type ActionProps = DiagComponentProps & {
  name: string
};

const Action = (props: ActionProps) => (
  <ActionStyle width={props.model.width} height={props.model.height}>
    <Name>
      <TestIcon pathIcon={props.model.name} />
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
            console.log("Mouse", e.screenX, e.screenY); // You can use Mouse-positions in state
            this.setState({ visible: true });
          }}
          onClose={() => {
            this.setState({ visible: false });
          }}
          modalButtons={{
            "acción 1": () => {
              this.props.setName({
                id: this.props.model.id,
                name: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
              });
            }, // onClick of that button
            "acción 2": () => {
              this.props.setName({
                id: this.props.model.id,
                name:
                  "M16.958 3.143c-1.651-1.924-4.099-3.143-6.833-3.143-4.971 0-9 4.029-9 9s4.029 9 9 9c2.734 0 5.183-1.219 6.833-3.143l-5.708-5.857 5.708-5.857zM12.375 2.12c0.693 0 1.255 0.562 1.255 1.255s-0.562 1.255-1.255 1.255-1.255-0.562-1.255-1.255c0-0.693 0.562-1.255 1.255-1.255z"
              });
            },
            "acción 3": () => {
              this.props.setName({
                id: this.props.model.id,
                name:
                  "M16.875 0h1.125v12.938c0 1.553-1.763 2.813-3.938 2.813s-3.938-1.259-3.938-2.813c0-1.553 1.763-2.813 3.938-2.813 1.102 0 2.098 0.323 2.813 0.844v-6.469l-9 2v8.687c0 1.553-1.763 2.813-3.938 2.813s-3.938-1.259-3.938-2.813c0-1.553 1.763-2.813 3.938-2.813 1.102 0 2.098 0.323 2.813 0.844v-10.969l10.125-2.25z"
              });
            },
            "acción 4": () => {
              this.props.setName({
                id: this.props.model.id,
                name: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
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
