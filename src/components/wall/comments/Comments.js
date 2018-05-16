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
  Body,
  Text,
  View
} from "native-base";
import { Actions } from "react-native-router-flux";

import Publication from "@components/wall/publication/Publication";
import Comment from "@components/wall/comments/comment/Comment";
import { FullCommentPage } from "@components/wall/comments/CommentsActions";

class Comments extends Component {
  static propTypes = {
    FullCommentPage: PropTypes.func.isRequired,
    listComments: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any])),
    detailPublication: PropTypes.oneOfType([PropTypes.any]),
    idPost: PropTypes.number
  };

  static defaultProps = {
    listComments: [],
    detailPublication: [],
    idPost: 0
  };

  componentWillMount = () => {
    this.props.FullCommentPage(this.props.idPost);
  };

  render = () => {
    const { listComments, detailPublication } = this.props;

    const delay = 200;
    const listComment = listComments.map((detail, i) => {
      const listReplies = detail.replies.map(reply => (
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
          />
          {listReplies}
        </View>
      );
    });

    return (
      <Container style={{ backgroundColor: "#F4F4F4" }}>
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
            <Title>Comentarios</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Publication
            key={detailPublication.id}
            id={detailPublication.id}
            userName={detailPublication.userName}
            date={detailPublication.date}
            content={detailPublication.content}
            enableLike={detailPublication.enableLike}
            likes={detailPublication.totalLikes}
            comments={detailPublication.totalComments}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                borderTopColor: "#F4F4F4",
                borderTopWidth: 5,
                borderBottomColor: "#F4F4F4",
                borderBottomWidth: 5,
                paddingTop: 5,
                paddingBottom: 5,
                backgroundColor: "#FFF"
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Bree",
                  fontWeight: "bold",
                  marginBottom: 0
                }}
              >
                Comentarios
              </Text>
            </View>
          </View>
          {listComment}
        </Content>
      </Container>
    );
  };
}

// <Comment subcomment /> Para agregar un sub comentario

const mapStateToProps = state => ({
  listComments: state.comments.listComments,
  detailPublication: state.publications.detailPublication
});

const mapDispatchToProps = {
  FullCommentPage
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
