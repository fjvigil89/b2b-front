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
  Icon,
  Body,
  Title,
  Right,
  List
} from "native-base";
import PollsListGrid from "@components/polls/polls_list/polls_list_grid/PollsListGrid";

import GetListPoll from "@components/polls/polls_list/PollsListActios";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

class PollsList extends Component {
  static propTypes = {
    GetListPoll: PropTypes.func.isRequired,
    listPolls: PropTypes.oneOfType([() => null, PropTypes.any]),
    isLoading: PropTypes.bool,
    cod_local: PropTypes.string
  };

  static defaultProps = {
    listPolls: [],
    isLoading: true,
    cod_local: ""
  };

  componentWillMount = () => {
    const params = this.props.cod_local ? `/store/${this.props.cod_local}` : "";
    this.props.GetListPoll(params);
  };

  showBackMenu = show => {
    if (show) {
      return (
        <Button transparent onPress={Actions.pop}>
          <Icon name="arrow-back" style={{ color: "#FFFFFF" }} />
        </Button>
      );
    }

    return (
      <Button transparent onPress={Actions.drawerOpen}>
        <Icon name="menu" />
      </Button>
    );
  };

  render = () => {
    console.log("hay que refrescar render");
    const { isLoading, listPolls } = this.props;
    if (isLoading) {
      return <LoadingOverlay />;
    }
    let list;
    let showBack = false;
    if (listPolls instanceof Array) {
      list = listPolls.map((data, index) => (
        <PollsListGrid key={index} data={data} />
      ));
    } else {
      showBack = true;
      list = <PollsListGrid data={listPolls} />;
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
  listPolls: state.pollsList.listPolls,
  isLoading: state.pollsList.isLoading
});

const mapDispatchToProps = {
  GetListPoll
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollsList);
