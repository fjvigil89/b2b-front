import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { Text, Body, ListItem } from "native-base";
import PollsListAditional from "@components/polls/polls_list/polls_list_aditional/PollsListAditional";

class PollsListGrid extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
    this.state = {
      aditionalPanel: false
    };
  }

  render() {
    const { data } = this.props;
    return (
      <View>
        <ListItem avatar>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row"
            }}
            onPress={() => {
              this.setState({ aditionalPanel: !this.state.aditionalPanel });
            }}
          >
            <Body>
              <Text>{data.name}</Text>
              <Text note>{data.description}</Text>
            </Body>
          </TouchableOpacity>
        </ListItem>
        <View>
          {this.state.aditionalPanel && <PollsListAditional data={data} />}
        </View>
      </View>
    );
  }
}

export default PollsListGrid;

/*
<Left>
              <Icon
                style={{
                  backgroundColor: data.state === "available" ? "green" : "red"
                }}
              />
            </Left>
*/
