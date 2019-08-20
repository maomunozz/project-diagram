import React from "react";
import style from "styled-components";
import type { DiagComponentProps } from "react-flow-diagram";
//MUI
import Tooltip from "@material-ui/core/Tooltip";

/*
 * Presentational
 * ==================================== */

const ObjectSoftwareStyle = style.div`
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  justify-content: center;
  font-size: .5rem;
  border-radius: .5em;
  transform: skew(20deg) translateX(-2em);
  background: #4db6ac;
  border: 4px solid #000;
`;

const Name = style.span`
  position: absolute;
  top: 100%;
  width: 200%;
  padding: .5em;
  font-size: .8rem;
  font-weight: bold;
  transform: skew(-20deg) translateX(-1em);
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
  transform: skew(-20deg) translateX(-1em);
`;

export type ObjectSoftwareProps = DiagComponentProps & {
  name: string,
  isEditing: boolean,
  toggleEdit: boolean => void,
  refreshName: (SyntheticObjectSoftware<HTMLTextAreaElement>) => void,
  handleKeyPress: (
    SyntheticKeyboardObjectSoftware<HTMLTextAreaElement>
  ) => void,
  handleRef: HTMLTextAreaElement => void
};
const ObjectSoftware = (props: ObjectSoftwareProps) => (
  <Tooltip title="Objeto Software" placement="top">
    <ObjectSoftwareStyle width={props.model.width} height={props.model.height}>
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
    </ObjectSoftwareStyle>
  </Tooltip>
);

/*
 * Container
 * ==================================== */

type ObjectSoftwareComponentProps = DiagComponentProps;
type ObjectSoftwareComponentState = {
  isEditing: boolean,
  name: string
};
class ObjectSoftwareComponent extends React.PureComponent<
  ObjectSoftwareComponentProps,
  ObjectSoftwareComponentState
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

  refreshName = (ev: SyntheticObjectSoftware<HTMLTextAreaElement>) => {
    this.setState({ name: ev.currentTarget.value });
  };

  handleKeyPress = (
    ev: SyntheticKeyboardObjectSoftware<HTMLTextAreaElement>
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
      <ObjectSoftware
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

export default ObjectSoftwareComponent;
