import React from "react";
import { Modal, Router, Scene } from "react-native-router-flux";

import Check from "@components/check/Check";
import Dashboard from "@components/dashboard/Dashboard";
import SalasInfo from "@components/salas_info/SalasInfo";
import SalasInfoDetailAction from "@components/salas_info/salas_info_detal_action/SalasInfoDetailAction";
import ProductosCademsmart from "@components/salas_info/productos_cademsmart/ProductosCademsmart";
import Menu from "@components/menu/Menu";
import Wall from "@components/wall/Wall";
import Comments from "@components/wall/comments/Comments";
import Maps from "@components/maps/Maps";
import CreatePublication from "@components/wall/create_publication/CreatePublication";
import CommentPublication from "@components/wall/comment_publication/CommentPublication";
import RespondComment from "@components/wall/respond_comment/RespondComment";
import Polls from "@components/polls/Polls";
import PollsList from "@components/polls/polls_list/PollsList";
import Hashtags from "@components/wall/hashtags/Hashtags";
import Report from "@components/report/Report";
import Help from "@components/report/help/Help";

const Index = (
  <Router>
    <Modal hideNavBar>
      <Scene key="root" hideNavBar>
        <Scene key="drawer" drawer contentComponent={Menu}>
          <Scene key="main" hideNavBar>
            <Scene key="check" title="check" component={Check}  />
            <Scene key="wall" title="Wall" component={Wall} />
            <Scene
              key="wallHashtags"
              title="wallHashtags"
              component={Hashtags}
            />
            <Scene
              hideNavBar
              key="wallComments"
              component={Comments}
              title="WallComments"
            />
            <Scene key="dashboard" title="Dashboard" component={Dashboard} initial />
            <Scene key="pollsList" title="PollsList" component={PollsList} />
            <Scene key="salasInfo" component={SalasInfo} title="SalasInfo" />
            <Scene key="maps" title="Maps" component={Maps} />
            <Scene key="report" title="Report" component={Report} />
          </Scene>
        </Scene>
      </Scene>
      <Scene hideNavBar key="polls" title="Polls" component={Polls} />
      <Scene
        hideNavBar
        key="salasInfoDetailAction"
        component={SalasInfoDetailAction}
        title="SalasInfoDetailAction"
      />

      <Scene
        hideNavBar
        key="productosCademsmart"
        component={ProductosCademsmart}
        title="ProductosCademsmart"
      />

      <Scene
        hideNavBar
        key="createPublication"
        component={CreatePublication}
        title="CreatePublicationAction"
      />

      <Scene
        hideNavBar
        key="commentPublication"
        component={CommentPublication}
        title="CommentPublicationAction"
      />

      <Scene
        hideNavBar
        key="respondComment"
        component={RespondComment}
        title="RespondCommentAction"
      />

      <Scene
        hideNavBar
        key="HelpReport"
        component={Help}
        title="HelpReportAction"
      />
    </Modal>
  </Router>
);

export default Index;
