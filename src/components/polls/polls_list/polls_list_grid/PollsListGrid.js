import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { Text, Body, ListItem } from "native-base";
import PollsListAditional from "@components/polls/polls_list/polls_list_aditional/PollsListAditional";

class PollsListGrid extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.any]),
    paramsPoll: PropTypes.string
  };

  static defaultProps = {
    data: [],
    paramsPoll: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      aditionalPanel: false
    };
  }

  render() {
    const { data, paramsPoll } = this.props;
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
              <Text>{data.description}</Text>
              <Text
                style={{ fontWeight: "bold", marginTop: 20, fontSize: 12 }}
                note
              >
                {data.available} Encuentas disponibles
              </Text>
            </Body>
          </TouchableOpacity>
        </ListItem>
        <View>
          {this.state.aditionalPanel && (
            <PollsListAditional data={data} paramsPoll={paramsPoll} />
          )}
        </View>
      </View>
    );
  }
}

export default PollsListGrid;
