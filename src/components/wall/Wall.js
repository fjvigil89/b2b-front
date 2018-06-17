import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Body
} from "native-base";
import {
  RefreshControl,
  ListView,
  View,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";

import { GetListPost, GetMorePosts } from "@components/wall/WallActions";
import Publication from "@components/wall/publication/Publication";
import LoginScreen from "@components/login/Login";

import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

class Wall extends Component {
  static propTypes = {
    GetListPost: PropTypes.func.isRequired,
    GetMorePosts: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    lastId: PropTypes.number,
    data: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    isAuthenticated: false,
    lastId: 0,
    data: []
  };

  state = {
    refreshing: false,
    isLoadingMore: false,
    isLoading: true
  };

  async componentWillMount() {
    await this.props.GetListPost();

    this.setState({
      isLoading: false
    });
  }

  async refreshWall() {
    this.setState({
      isLoading: true
    });

    await this.props.GetListPost();

    this.setState({
      isLoading: false
    });
  }

  async fetchMore(lastId) {
    await this.props.GetMorePosts(lastId);

    this.setState({
      isLoadingMore: false
    });
  }

  render = () => {
    const { isAuthenticated, data, lastId } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    if (this.state.isLoading) {
      return <LoadingOverlay />;
    }

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const dsList = ds.cloneWithRows(data);

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
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refreshWall()}
              title="Recargar..."
            />
          }
          dataSource={dsList}
          renderRow={detail => (
            <Publication
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
          )}
          onEndReached={() =>
            this.setState({ isLoadingMore: true }, () => this.fetchMore(lastId))
          }
          renderFooter={() =>
            this.state.isLoadingMore && (
              <View style={{ flex: 1, padding: 10 }}>
                <ActivityIndicator size="small" />
              </View>
            )
          }
        />
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  data: state.wall.data,
  lastId: state.wall.lastId
});

const mapDispatchToProps = {
  GetListPost,
  GetMorePosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wall);
