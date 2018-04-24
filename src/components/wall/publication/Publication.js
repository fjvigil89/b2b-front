import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Actions } from "react-native-router-flux";

import moment from "moment";
import "moment/locale/es";

moment.locale("es");

class Publication extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    data: {}
  };

  render = () => {
    const { data } = this.props;
    const profile = require("@assets/images/profile.png");

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={profile} />
            <Body>
              <Text>{data.userName}</Text>
              <Text note>{moment(data.date).fromNow()}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{data.content}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>{data.totalLikes} Me gustas</Text>
            </Button>
          </Left>
          <Right>
            <Button
              transparent
              onPress={() => {
                if (data.totalComments > 0) {
                  Actions.wallComments({ idComment: data.id, data });
                }
              }}
            >
              <Icon active name="chatbubbles" />
              <Text>{data.totalComments} Comentarios</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Publication);
