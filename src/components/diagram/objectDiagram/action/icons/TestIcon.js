import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";

export default function TestIcon(props) {
  let path = "";
  if (props.pathIcon !== "test") {
    path = props.pathIcon;
  }
  let tooltip = "selecciona una acción";
  if (props.pathIcon === "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z") {
    tooltip = "casa";
  }
  return (
    <Tooltip title={tooltip} placement="top">
      <div>
        <SvgIcon>
          <path d={path} />
        </SvgIcon>
      </div>
    </Tooltip>
  );
}
