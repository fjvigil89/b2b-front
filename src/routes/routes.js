import React from "react";
import { Stack, Scene } from "react-native-router-flux";

import Dashboard from "@components/dashboard/Dashboard";
import SalasInfo from "@components/salas_info/SalasInfo";

const Index = (
  <Stack hideNavBar>
    <Scene key="dashboard" component={Dashboard} title="Dashboard" initial />
    <Scene key="salasInfo" component={SalasInfo} title="SalasInfo" />
  </Stack>
);

export default Index;
