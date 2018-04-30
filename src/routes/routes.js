import React from "react";
import { Modal, Router, Scene } from "react-native-router-flux";

import Dashboard from "@components/dashboard/Dashboard";
import SalasInfo from "@components/salas_info/SalasInfo";
import SalasInfoDetailAction from "@components/salas_info/salas_info_detal_action/SalasInfoDetailAction";
import Menu from "@components/menu/Menu";
import Wall from "@components/wall/Wall";
import Comments from "@components/wall/comments/Comments";

const Index = (
  <Router>
    <Modal>
      <Scene key="root" hideNavBar>
        <Scene key="drawer" drawer contentComponent={Menu}>
          <Scene key="main" hideNavBar>
            <Scene
              initial
              key="dashboard"
              title="Dashboard"
              component={Dashboard}
            />
            <Scene key="wall" title="Wall" component={Wall} />

            <Scene key="salasInfo" component={SalasInfo} title="SalasInfo" />
          </Scene>
        </Scene>
      </Scene>

      <Scene
        hideNavBar
        key="wallComments"
        component={Comments}
        title="WallComments"
      />
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
