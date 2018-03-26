import React from "react";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";
import SalasInfoListDetail from "@components/salas_info/salas_info_list/salas_info_list_detail/SalasInfoListDetail";

class SalasInfoList extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    data: {}
  };

  render() {
    const categoryDetailSala = this.props.data.detail.map(detail => (
      <SalasInfoListDetail key={detail.categoria} data={detail} />
    ));

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
