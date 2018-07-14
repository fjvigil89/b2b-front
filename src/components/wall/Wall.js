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
  View,
  ActivityIndicator,
  DeviceEventEmitter,
  FlatList
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

  constructor(props) {
    super(props);

    DeviceEventEmitter.addListener(`wallEvent`, () => {
      this.listview.scrollToOffset({ x: 0, y: 0, animated: true });
    });
  }

  state = {
    refreshing: false,
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
  }

  render = () => {
    const { isAuthenticated, data, lastId } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

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

        <FlatList
          ref={ref => {
            this.listview = ref;
          }}
          data={data}
          renderItem={({ item }) => (
            <Publication
              id={item.id}
              userName={item.userName}
              date={item.date}
              content={item.content}
              enableLike={item.enableLike}
              likes={item.totalLikes}
              comments={item.totalComments}
              images={item.images}
              newPost={item.new}
              margin
            />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={() => (
            <View style={{ flex: 1, padding: 10 }}>
              <ActivityIndicator size="small" />
            </View>
          )}
          onRefresh={() => this.refreshWall()}
          refreshing={this.state.refreshing}
          onEndReached={() => {
            this.fetchMore(lastId);
          }}
          onEndReachedThreshold={0}
        />
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  data: state.wall.data,
  lastId: state.wall.lastId,
  refresh: state.wall.refresh
});

const mapDispatchToProps = {
  GetListPost,
  GetMorePosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wall);
