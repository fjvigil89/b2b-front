import React from "react";
import {
  Stack,
  Scene,
  CardStackStyleInterpolator
} from "react-native-router-flux";

import Dashboard from "@components/dashboard/Dashboard";
import SalasInfo from "@components/salas_info/SalasInfo";
import SalasInfoDetailAction from "@components/salas_info/salas_info_detal_action/SalasInfoDetailAction";

const Index = (
  <Stack hideNavBar>
    <Scene key="dashboard" component={Dashboard} title="Dashboard" initial />
    <Scene
      key="salasInfo"
      component={SalasInfo}
      title="SalasInfo"
      direction="horizontal"
    />
    <Scene
      key="salasInfoDetailAction"
      component={SalasInfoDetailAction}
      title="SalasInfoDetailAction"
      transitionConfig={() => ({
        screenInterpolator: CardStackStyleInterpolator.forVertical
      })}
    />
  </Stack>
);

export default Index;
