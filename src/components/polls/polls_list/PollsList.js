import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Content,
  Container,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
  List
} from "native-base";
import PollsListGrid from "@components/polls/polls_list/polls_list_grid/PollsListGrid";

import GetListPoll from "@components/polls/polls_list/PollsListActios";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";
import LoginScreen from "@components/login/Login";
import {MaterialIcons} from "@expo/vector-icons";

let params = "";

class PollsList extends Component {
  static propTypes = {
    GetListPoll: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    listPolls: PropTypes.oneOfType([() => null, PropTypes.any]),
    isLoading: PropTypes.bool,
    folio: PropTypes.number,
    endpoint: PropTypes.string
  };

  static defaultProps = {
    isAuthenticated: false,
    listPolls: [],
    isLoading: true,
    folio: 0,
    endpoint: ""
  };

  componentWillMount = () => {
    params = this.props.folio
      ? `${this.props.endpoint}/encuesta/store/${this.props.folio}`
      : `${this.props.endpoint}/encuesta`;

    this.props.GetListPoll(params);
  };

  showBackMenu = show => {
    if (show) {
      return (
        <Button transparent onPress={Actions.pop}>
          <MaterialIcons
            name="arrow-back"
            style={{ color: "#FFFFFF" }}
          />
        </Button>
      );
    }

    return (
      <Button transparent onPress={Actions.drawerOpen}>
        <MaterialIcons
          name="menu"
          style={{
            color: 'white',
            fontSize: 25
          }}
        />
      </Button>
    );
  };

  render = () => {
    const { isAuthenticated, isLoading, listPolls } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    if (isLoading) {
      return <LoadingOverlay />;
    }

    let list;

    let showBack = false;
    if (listPolls instanceof Array) {
      let counter = 0;
      list = listPolls.map(data => {
        counter += 1;

        return <PollsListGrid key={counter} data={data} paramsPoll={params} />;
      });
    } else {
      showBack = true;

      list = <PollsListGrid data={listPolls} paramsPoll={params} />;
    }

    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>{this.showBackMenu(showBack)}</Left>
          <Body>
            <Title>Encuestas</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>{list}</List>
        </Content>
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  listPolls: state.pollsList.listPolls,
  isLoading: state.pollsList.isLoading,
  endpoint: state.user.endpoint
});

const mapDispatchToProps = {
  GetListPoll
};

export default connect(mapStateToProps, mapDispatchToProps)(PollsList);
