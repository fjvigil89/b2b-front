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
import { FlatList } from "react-native";
import { Actions } from "react-native-router-flux";

import GetHashtags from "@components/wall/hashtags/HashtagsActions";
import Publication from "@components/wall/publication/Publication";
import LoginScreen from "@components/login/Login";

import LoadingOverlay from "@common/loading_overlay/LoadingOverlay";

class Hashtags extends Component {
  static propTypes = {
    GetHashtags: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    data: PropTypes.oneOfType([PropTypes.any]),
    hash: PropTypes.string
  };

  static defaultProps = {
    isAuthenticated: false,
    data: [],
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

  render = () => {
    const { isAuthenticated, data } = this.props;

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
        />
      </Container>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  data: state.hashtags.data
});

const mapDispatchToProps = {
  GetHashtags
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hashtags);
