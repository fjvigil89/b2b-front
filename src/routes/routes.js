import React from "react";
import { Modal, Router, Scene } from "react-native-router-flux";

import Dashboard from "@components/dashboard/Dashboard";
import SalasInfo from "@components/salas_info/SalasInfo";
import SalasInfoDetailAction from "@components/salas_info/salas_info_detal_action/SalasInfoDetailAction";
import Menu from "@components/menu/Menu";
import Wall from "@components/wall/Wall";
import Comments from "@components/wall/comments/Comments";
import Maps from "@components/maps/Maps";
import CreatePublication from "@components/wall/create_publication/CreatePublication";

const Index = (
  <Router>
    <Modal>
      <Scene key="root" hideNavBar>
        <Scene key="drawer" drawer contentComponent={Menu}>
          <Scene key="main" hideNavBar>
            <Scene key="wall" title="Wall" component={Wall} initial />
            <Scene
              hideNavBar
              key="wallComments"
              component={Comments}
              title="WallComments"
            />
            <Scene key="dashboard" title="Dashboard" component={Dashboard} />
            <Scene key="salasInfo" component={SalasInfo} title="SalasInfo" />
            <Scene key="maps" title="Maps" component={Maps} />
          </Scene>
        </Scene>
      </Scene>
      <Scene
        hideNavBar
        key="salasInfoDetailAction"
        component={SalasInfoDetailAction}
        title="SalasInfoDetailAction"
      />
      <Scene
        hideNavBar
        key="createPublication"
        component={CreatePublication}
        title="CreatePublicationAction"
      />
    </Modal>
  </Router>
);

export default Index;
