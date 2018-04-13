import React from "react";
import { Modal, Router, Scene } from "react-native-router-flux";

import Dashboard from "@components/dashboard/Dashboard";
import SalasInfo from "@components/salas_info/SalasInfo";
import SalasInfoDetailAction from "@components/salas_info/salas_info_detal_action/SalasInfoDetailAction";
import Menu from "@components/menu/Menu";

const Index = (
  <Router>
    <Modal>
      <Scene key="root" hideNavBar>
        <Scene key="salasInfo" component={SalasInfo} title="SalasInfo" />
        <Scene key="drawer" drawer contentComponent={Menu} initial>
          <Scene key="main" hideNavBar>
            <Scene
              key="dashboard"
              title="Dashboard"
              component={Dashboard}
              initial
            />
          </Scene>
        </Scene>
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
