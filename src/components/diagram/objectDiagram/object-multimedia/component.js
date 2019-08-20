import React from "react";
import style from "styled-components";
import type { DiagComponentProps } from "react-flow-diagram";
//MUI
import Tooltip from "@material-ui/core/Tooltip";

/*
 * Presentational
 * ==================================== */

const ObjectMultimediaStyle = style.div`
  background-color: #ffb74d;
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: .5em;
  justify-content: center;
  font-size: .5rem;
  transform: rotate(45deg) translateY(3em);
  border: 4px solid #000;
`;

const Name = style.span`
  position: absolute;
  top: 100%;
  width: 200%;
  padding: .5em;
  font-size: .8rem;
  font-weight: bold;
  transform: rotate(-45deg) translateY(3em) translateX(3em);
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
  transform: rotate(-45deg) translateY(3em) translateX(3em);
`;

export type ObjectMultimediaProps = DiagComponentProps & {
  name: string,
  isEditing: boolean,
  toggleEdit: boolean => void,
  refreshName: (SyntheticObjectMultimedia<HTMLTextAreaElement>) => void,
  handleKeyPress: (
    SyntheticKeyboardObjectMultimedia<HTMLTextAreaElement>
  ) => void,
  handleRef: HTMLTextAreaElement => void
};
const ObjectMultimedia = (props: ObjectMultimediaProps) => (
  <Tooltip title="Objeto Multimedia" placement="top">
    <ObjectMultimediaStyle
      width={props.model.width}
      height={props.model.height}
    >
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
    </ObjectMultimediaStyle>
  </Tooltip>
);

/*
 * Container
 * ==================================== */

type ObjectMultimediaComponentProps = DiagComponentProps;
type ObjectMultimediaComponentState = {
  isEditing: boolean,
  name: string
};
class ObjectMultimediaComponent extends React.PureComponent<
  ObjectMultimediaComponentProps,
  ObjectMultimediaComponentState
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

  refreshName = (ev: SyntheticObjectMultimedia<HTMLTextAreaElement>) => {
    this.setState({ name: ev.currentTarget.value });
  };

  handleKeyPress = (
    ev: SyntheticKeyboardObjectMultimedia<HTMLTextAreaElement>
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
      <ObjectMultimedia
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

export default ObjectMultimediaComponent;
