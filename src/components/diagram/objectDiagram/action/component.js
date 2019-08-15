import React from "react";
import style from "styled-components";
import Dropdown from "react-dropdown-modal";
import "react-dropdown-modal/lib/dropdown.css";

import type { DiagComponentProps } from "react-flow-diagram";
/*
 * Presentational
 * ==================================== */

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
  padding: .5em;
  font-size: .8rem;
  font-weight: bold;
`;

export type ActionProps = DiagComponentProps & {
  name: string
};

const Action = (props: ActionProps) => (
  <ActionStyle width={props.model.width} height={props.model.height}>
    <Name>{props.model.name}</Name>
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
    return (
      <>
        <Action {...this.props} name={this.state.name} />
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
            "acción 1 ⛔": () => {
              this.props.setName({ id: this.props.model.id, name: "⛔" });
            }, // onClick of that button
            "acción 2 🈺": () => {
              this.props.setName({ id: this.props.model.id, name: "🈺" });
            },
            "acción 3 ⏺": () => {
              this.props.setName({ id: this.props.model.id, name: "⏺" });
            },
            "acción 4 ❎": () => {
              this.props.setName({ id: this.props.model.id, name: "❎" });
            }
          }}
          showArrow={true}
          arrowPosition={{ right: "0px" }}
          position={{
            right: "1182px", // State Mouse-positions are valid
            top: "60px" // State Mouse-positions are valid
          }}
        >
          <i className="material-icons diagram-icon-dropdown">
            arrow_drop_down
          </i>
        </Dropdown>
      </>
    );
  }
}

export default ActionComponent;
