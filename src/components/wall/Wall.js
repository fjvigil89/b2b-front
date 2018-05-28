import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Body
} from "native-base";
import { RefreshControl } from "react-native";
import Publication from "@components/wall/publication/Publication";
import { Actions } from "react-native-router-flux";

import GetListPost from "@components/wall/WallActions";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

class Wall extends Component {
  static propTypes = {
    GetListPost: PropTypes.func.isRequired,
    listPost: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any]))
  };

  static defaultProps = {
    listPost: []
  };

  state = {
    loading: false,
    refreshing: false
  };

  componentWillMount = () => {
    this.setState({
      loading: true
    });

    this.props.GetListPost().then(() => {
      this.setState({
        loading: false
      });
    });
  };

  render = () => {
    const { listPost } = this.props;

    const listWall = listPost.map(detail => (
      <Publication
        key={detail.id}
        id={detail.id}
        userName={detail.userName}
        date={detail.date}
        content={detail.content}
        enableLike={detail.enableLike}
        likes={detail.totalLikes}
        comments={detail.totalComments}
        images={detail.images}
        margin
      />
    ));

    return (
      <Container style={{ backgroundColor: "#F0F0F0" }}>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button transparent onPress={Actions.drawerOpen}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Muro</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                Actions.createPublication();
              }}
            >
              <Icon name="ios-create-outline" />
            </Button>
          </Right>
        </Header>

        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.componentWillMount}
              title="Recargar..."
            />
          }
        >
          {listWall}
        </Content>

        {this.state.loading && <LoadingOverlay />}
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  listPost: state.wall.listPost,
  refresh: state.wall.refresh
});

const mapDispatchToProps = {
  GetListPost
};

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
