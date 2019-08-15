import React from "react";
import style from "styled-components";

import type { DiagComponentProps } from "react-flow-diagram";

/*
 * Presentational
 * ==================================== */

const ObjectPassiveStyle = style.div`
  background-color: #64b5f6;
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: .5em;
  justify-content: center;
  font-size: .5rem;
  border: 4px solid #000;
`;

const Name = style.span`
  position: absolute;
  top: 100%;
  width: 200%;
  padding: .5em;
  font-size: .8rem;
  font-weight: bold;
`;

const EditName = style.textarea`
  position: absolute;
  top: 100%;
  width: 200%;
  padding: .5em;
  border: none;
  font-size: .8rem;
  text-align: center;
  border-radius: .1rem;
  resize: none;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
`;

export type ObjectPassiveProps = DiagComponentProps & {
  name: string,
  isEditing: boolean,
  toggleEdit: boolean => void,
  refreshName: (SyntheticObjectPassive<HTMLTextAreaElement>) => void,
  handleKeyPress: (SyntheticKeyboardObjectPassive<HTMLTextAreaElement>) => void,
  handleRef: HTMLTextAreaElement => void
};
const ObjectPassive = (props: ObjectPassiveProps) => (
  <ObjectPassiveStyle width={props.model.width} height={props.model.height}>
    <EditName
      value={props.name}
      onChange={props.refreshName}
      onKeyDown={props.handleKeyPress}
      innerRef={textarea => props.handleRef(textarea)}
      style={{ display: props.isEditing ? "block" : "none" }}
    />
    <Name
      onDoubleClick={() => props.toggleEdit(true)}
      style={{ display: !props.isEditing ? "block" : "none" }}
    >
      {props.model.name}
    </Name>
  </ObjectPassiveStyle>
);

/*
 * Container
 * ==================================== */

type ObjectPassiveComponentProps = DiagComponentProps;
type ObjectPassiveComponentState = {
  isEditing: boolean,
  name: string
};
class ObjectPassiveComponent extends React.PureComponent<
  ObjectPassiveComponentProps,
  ObjectPassiveComponentState
> {
  textarea: ?HTMLTextAreaElement;

  state = {
    isEditing: false,
    name: this.props.model.name
  };

  componentWillUnmount() {
    this.textarea = null;
  }

  handleRef = (textarea: HTMLTextAreaElement) => {
    if (!this.textarea) {
      this.textarea = textarea;
    }
  };

  toggleEdit = (isEditing: boolean) => {
    const { textarea } = this;
    if (isEditing && textarea) {
      setTimeout(() => textarea.focus(), 16 * 4);
    }
    this.setState({ isEditing });
  };

  refreshName = (ev: SyntheticObjectPassive<HTMLTextAreaElement>) => {
    this.setState({ name: ev.currentTarget.value });
  };

  handleKeyPress = (
    ev: SyntheticKeyboardObjectPassive<HTMLTextAreaElement>
  ) => {
    switch (ev.key) {
      case "Enter":
        this.toggleEdit(false);
        this.props.setName({ id: this.props.model.id, name: this.state.name });
        break;
      case "Escape":
        this.toggleEdit(false);
        this.setState({ name: this.props.model.name });
        break;
      // no default
    }
  };

  render() {
    return (
      <ObjectPassive
        {...this.props}
        isEditing={this.state.isEditing}
        name={this.state.name}
        toggleEdit={this.toggleEdit}
        refreshName={this.refreshName}
        handleKeyPress={this.handleKeyPress}
        handleRef={this.handleRef}
      />
    );
  }
}

export default ObjectPassiveComponent;
