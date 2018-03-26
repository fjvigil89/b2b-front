import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
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
    const detailSalaHeader = 220;
    const detailSalaScroll =
      Dimensions.get("window").height - detailSalaHeader - 80;

    const categoryDetailSala = this.props.data.detail.map(detail => (
      <SalasInfoListDetail key={detail.categoria} data={detail} />
    ));

    return (
      <View style={{ backgroundColor: "#FFFFFF", height: detailSalaScroll }}>
        <ScrollView>{categoryDetailSala}</ScrollView>
      </View>
    );
  }
}

export default SalasInfoList;
