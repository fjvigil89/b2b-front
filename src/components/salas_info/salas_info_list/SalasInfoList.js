import React from "react";
import { View, ScrollView, Dimensions } from "react-native";

import SalasInfoListDetail from "@components/salas_info/salas_info_list/salas_info_list_detail/SalasInfoListDetail";

class SalasInfoList extends React.Component {
  render() {
    const detailSalaHeader = 180;
    const detailSalaScroll =
      Dimensions.get("window").height - detailSalaHeader - 80;

    const categoryDetails = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const categoryDetailSala = categoryDetails.map(detail => (
      <SalasInfoListDetail key={detail} />
    ));

    return (
      <View style={{ backgroundColor: "#FFFFFF", height: detailSalaScroll }}>
        <ScrollView>{categoryDetailSala}</ScrollView>
      </View>
    );
  }
}

export default SalasInfoList;
