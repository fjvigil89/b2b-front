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
    isLoading: PropTypes.bool
  };

  static defaultProps = {
    listPolls: [],
    isLoading: true
  };

  componentWillMount = () => {
    this.props.GetListPoll();
  };

  render = () => {
    const { isLoading, listPolls } = this.props;
    if (isLoading) {
      return <LoadingOverlay />;
    }

    const list = listPolls.map(data => (
      <PollsListGrid key={data.id} data={data} />
    ));

    return (
      <Container>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
            </Button>
          </Left>
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
