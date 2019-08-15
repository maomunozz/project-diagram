import Action from "./action/component";
import actionIcon from "./action/icon";
import ObjectHardware from "./object-hardware/component";
import objectHardwareIcon from "./object-hardware/icon";
import ObjectPassive from "./object-passive/component";
import objectPassiveIcon from "./object-passive/icon";
import ObjectMultimedia from "./object-multimedia/component";
import objectMultimediaIcon from "./object-multimedia/icon";
import ObjectSoftware from "./object-software/component";
import objectSoftwareIcon from "./object-software/icon";
import Attribute from "./attribute/component";
import attributeIcon from "./attribute/icon";

const config = {
  entityTypes: {
    Attribute: {
      width: 110,
      height: 80
    },
    Action: {
      width: 110,
      height: 40
    },
    ObjectHardware: {
      width: 75,
      height: 75
    },
    ObjectPassive: {
      width: 75,
      height: 75
    },
    ObjectMultimedia: {
      width: 75,
      height: 75
    },
    ObjectSoftware: {
      width: 75,
      height: 75
    }
  },
  gridSize: 10
};

const customEntities = {
  Attribute: {
    component: Attribute,
    icon: attributeIcon
  },
  Action: {
    component: Action,
    icon: actionIcon
  },
  ObjectHardware: {
    component: ObjectHardware,
    icon: objectHardwareIcon
  },
  ObjectPassive: {
    component: ObjectPassive,
    icon: objectPassiveIcon
  },
  ObjectMultimedia: {
    component: ObjectMultimedia,
    icon: objectMultimediaIcon
  },
  ObjectSoftware: {
    component: ObjectSoftware,
    icon: objectSoftwareIcon
  }
};

export { config, customEntities };
