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
import Publication from "@components/wall/publication/Publication";
import { Actions } from "react-native-router-flux";
import { last, get } from "lodash";

import { GetListPost, GetMorePosts } from "@components/wall/WallActions";
import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

class Wall extends Component {
  static propTypes = {
    GetListPost: PropTypes.func.isRequired,
    GetMorePosts: PropTypes.func.isRequired
  };

  state = {
    refreshing: false,
    isLoadingMore: false,
    data: null,
    dataSource: null,
    isLoading: true,
    lastId: 0
  };

  async componentWillMount() {
    const listadoPosts = await this.props.GetListPost();

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const lastId = get(last(listadoPosts.data.posts), "id");

    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(listadoPosts.data.posts),
      data: listadoPosts.data.posts,
      lastId
    });
  }

  async refreshWall() {
    this.setState({
      isLoading: true
    });

    const listadoPosts = await this.props.GetListPost();

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const lastId = get(last(listadoPosts.data.posts), "id");

    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(listadoPosts.data.posts),
      data: listadoPosts.data.posts,
      lastId
    });
  }

  async fetchMore() {
    const morePosts = await this.props.GetMorePosts(this.state.lastId);

    const fullPostsList = this.state.data.concat(morePosts.data.posts);

    const lastId = get(last(morePosts.data.posts), "id");

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(fullPostsList),
      isLoadingMore: false,
      data: fullPostsList,
      lastId
    });
  }

  render = () => {
    if (this.state.isLoading) {
      return <LoadingOverlay />;
    }

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
          dataSource={this.state.dataSource}
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
            this.setState({ isLoadingMore: true }, () => this.fetchMore())
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
  listPost: state.wall.listPost,
  refresh: state.wall.refresh
});

const mapDispatchToProps = {
  GetListPost,
  GetMorePosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
