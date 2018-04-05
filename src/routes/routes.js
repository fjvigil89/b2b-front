import React from "react";
import { Modal, Router, Scene } from "react-native-router-flux";

import Dashboard from "@components/dashboard/Dashboard";
import SalasInfo from "@components/salas_info/SalasInfo";
import SalasInfoDetailAction from "@components/salas_info/salas_info_detal_action/SalasInfoDetailAction";

const Index = (
  <Router>
    <Modal>
      <Scene key="root" hideNavBar>
        <Scene
          key="dashboard"
          component={Dashboard}
          title="Dashboard"
          initial
        />
        <Scene key="salasInfo" component={SalasInfo} title="SalasInfo" />
      </Scene>

      <Scene
        hideNavBar
        key="salasInfoDetailAction"
        component={SalasInfoDetailAction}
        title="SalasInfoDetailAction"
      />
    </Modal>
  </Router>
);

export default Index;
