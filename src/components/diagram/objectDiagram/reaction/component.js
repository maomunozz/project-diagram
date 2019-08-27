import React from "react";
import style from "styled-components";
import type { DiagComponentProps } from "react-flow-diagram";
//MUI
import Tooltip from "@material-ui/core/Tooltip";

const ReactionStyle = style.div`
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  align-items: ${props => (props.isEditing ? "stretch" : "center")};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-bottom-right-radius: 3rem;
  border-bottom-left-radius: 3rem;
  border: 3px solid #000;
`;

const Name = style.span`
  flex: 1 0;
  padding: .5em;
  font-size: .8rem;
  font-weight: bold;
`;

const EditName = style.textarea`
  padding: .5em;
  font-size: .8rem;
  text-align: center;
  resize: none;
  border: none;
  border-radius: .5rem;
`;

export type ReactionProps = DiagComponentProps & {
  name: string,
  isEditing: boolean,
  toggleEdit: boolean => void,
  refreshName: (SyntheticEvent<HTMLTextAreaElement>) => void,
  handleKeyPress: (SyntheticKeyboardEvent<HTMLTextAreaElement>) => void,
  handleRef: HTMLTextAreaElement => void
};
const Reaction = (props: ReactionProps) => (
  <Tooltip title="Reacción" placement="top">
    <ReactionStyle
      width={props.model.width}
      height={props.model.height}
      isEditing={props.isEditing}
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
    </ReactionStyle>
  </Tooltip>
);

/*
 * Container
 * ==================================== */

type ReactionComponentProps = DiagComponentProps;
type ReactionComponentState = {
  isEditing: boolean,
  name: string
};
class ReactionComponent extends React.PureComponent<
  ReactionComponentProps,
  ReactionComponentState
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

  refreshName = (ev: SyntheticEvent<HTMLTextAreaElement>) => {
    this.setState({ name: ev.currentTarget.value });
  };

  handleKeyPress = (ev: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {
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
      <Reaction
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

export default ReactionComponent;
