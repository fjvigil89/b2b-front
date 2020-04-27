import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Button,
  Title,
  Body,
  Text,
  View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Publication from '@components/wall/publication/Publication';
import Comment from '@components/wall/comments/comment/Comment';
import { FullCommentPage } from '@components/wall/comments/CommentsActions';
import LoadingOverlay from '@common/loading_overlay/LoadingOverlay';
import LoginScreen from '@components/login/Login';

class Comments extends Component {
  static propTypes = {
    FullCommentPage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    listComments: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any])),
    detailPublication: PropTypes.oneOfType([PropTypes.any]),
    idPost: PropTypes.number,
    endpoint: PropTypes.string,
  };

  static defaultProps = {
    isAuthenticated: false,
    listComments: [],
    detailPublication: [],
    idPost: 0,
    endpoint: '',
  };

  state = {
    loading: false,
    refreshing: false,
  };

  componentWillMount = () => {
    this.setState({
      loading: true,
    });

    this.props
      .FullCommentPage(this.props.endpoint, this.props.idPost)
      .then(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render = () => {
    const { isAuthenticated, listComments, detailPublication } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    const delay = 200;

    const listComment = listComments.map((detail, i) => {
      const listReplies = detail.replies.map((reply) => (
        <Comment
          key={reply.id * 1000}
          idPost={this.props.idPost}
          id={reply.id}
          userName={reply.userName}
          date={reply.date}
          content={reply.content}
          enableLike={reply.enableLike}
          likes={reply.totalLikes}
          delay={delay * i}
          subcomment
          image={reply.image}
        />
      ));

      return (
        <View key={detail.id}>
          <Comment
            idPost={this.props.idPost}
            id={detail.id}
            userName={detail.userName}
            date={detail.date}
            content={detail.content}
            enableLike={detail.enableLike}
            likes={detail.totalLikes}
            delay={delay * i}
            image={detail.image}
          />
          {listReplies}
        </View>
      );
    });

    return (
      <Container style={{ backgroundColor: '#F4F4F4' }}>
        <Header style={{ borderBottomWidth: 0 }}>
          <Left>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <Ionicons
                name="md-arrow-back"
                style={{ fontSize: 24, color: '#FFFFFF' }}
              />
            </Button>
          </Left>
          <Body>
            <Title>Comentarios</Title>
          </Body>
          <Right />
        </Header>

        {!this.state.loading && (
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.componentWillMount}
                title="Recargar..."
              />
            }
          >
            <Publication
              key={detailPublication.id}
              id={detailPublication.id}
              userName={detailPublication.userName}
              date={detailPublication.date}
              content={detailPublication.content}
              enableLike={detailPublication.enableLike}
              likes={detailPublication.totalLikes}
              comments={detailPublication.totalComments}
              images={detailPublication.images}
              flagComments
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  borderTopColor: '#F4F4F4',
                  borderTopWidth: 5,
                  borderBottomColor: '#F4F4F4',
                  borderBottomWidth: 5,
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor: '#FFF',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Bree',
                    fontWeight: 'bold',
                    marginBottom: 0,
                  }}
                >
                  Comentarios
                </Text>
              </View>
            </View>
            {listComment}
          </Content>
        )}

        {this.state.loading && <LoadingOverlay />}
      </Container>
    );
  };
}

// <Comment subcomment /> Para agregar un sub comentario

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  listComments: state.comments.listComments,
  detailPublication: state.publications.detailPublication,
  endpoint: state.user.endpoint,
});

const mapDispatchToProps = {
  FullCommentPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
