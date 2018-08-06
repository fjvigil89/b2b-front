import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Title,
  Body,
  Right
} from "native-base";
import { FlatList, View, ActivityIndicator } from "react-native";
import { Actions } from "react-native-router-flux";

import {
  GetHashtags,
  GetMoreHashtags
} from "@components/wall/hashtags/HashtagsActions";
import Publication from "@components/wall/publication/Publication";
import LoginScreen from "@components/login/Login";

import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

class Hashtags extends Component {
  static propTypes = {
    GetHashtags: PropTypes.func.isRequired,
    GetMoreHashtags: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    data: PropTypes.oneOfType([PropTypes.any]),
    hash: PropTypes.string,
    lastId: PropTypes.number
  };

  static defaultProps = {
    isAuthenticated: false,
    data: [],
    lastId: 0,
    hash: ""
  };

  state = {
    isLoading: true
  };

  async componentWillMount() {
    const hashtag = this.props.hash.replace("#", "");

    await this.props.GetHashtags(hashtag);

    this.setState({
      isLoading: false
    });
  }

  async fetchMore(lastId) {
    const hashtag = this.props.hash.replace("#", "");

    await this.props.GetMoreHashtags(hashtag, lastId);
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
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <Icon name="arrow-back" style={{ color: "#FFFFFF" }} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.hash}</Title>
          </Body>
          <Right />
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
  data: state.hashtags.data,
  lastId: state.hashtags.lastId
});

const mapDispatchToProps = {
  GetHashtags,
  GetMoreHashtags
};

export default connect(mapStateToProps, mapDispatchToProps)(Hashtags);
