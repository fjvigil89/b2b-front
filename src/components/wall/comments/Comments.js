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
import { GetListComments } from "@components/wall/comments/CommentsActions";

class Comments extends Component {
  static propTypes = {
    GetListComments: PropTypes.func.isRequired,
    idComment: PropTypes.number,
    data: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    listComments: {},
    data: {}
  };

  componentWillMount = () => {
    this.props.GetListComments(this.props.idComment);
  };

  render = () => {
    const { listComments, data } = this.props;

    const listComment = listComments.comments.map((detail, i) => (
      <Comment data={detail} key={detail.id} />
    ));

    return (
      <Container>
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
          <Publication data={data} />
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
                borderBottomColor: "#DEDEDE",
                borderBottomWidth: 1,
                paddingBottom: 5
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
  listComments: state.comments.listComments
});

const mapDispatchToProps = {
  GetListComments
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
