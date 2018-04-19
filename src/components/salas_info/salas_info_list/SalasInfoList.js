import React from "react";
import { View, ScrollView, Text } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";

import SalasInfoListDetail from "@components/salas_info/salas_info_list/salas_info_list_detail/SalasInfoListDetail";

class SalasInfoList extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([() => null, PropTypes.any]).isRequired,
    sala: PropTypes.string,
    nombreSala: PropTypes.string
  };

  static defaultProps = {
    sala: "",
    nombreSala: ""
  };

  render() {
    let categoryDetailSala = <Text />;

    if (!_.isEmpty(this.props.data)) {
      categoryDetailSala = this.props.data.detail.map(detail => (
        <SalasInfoListDetail
          key={detail.categoria}
          data={detail}
          sala={this.props.sala}
          nombreSala={this.props.nombreSala}
          categoria={detail.categoria}
        />
      ));
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF"
        }}
      >
        <ScrollView>{categoryDetailSala}</ScrollView>
      </View>
    );
  }
}

export default SalasInfoList;