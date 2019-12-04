import React from "react";
import { View, ScrollView, Text } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";

import SalasInfoListDetail from "@components/salas_info/salasInfoList/salas_info_list_detail/SalasInfoListDetail";

class SalasInfoList extends React.Component {
  static propTypes = {
    data: PropTypes.oneOfType([() => null, PropTypes.any]).isRequired,
    sala: PropTypes.number,
    nombreSala: PropTypes.string,
    dateb2b: PropTypes.string,
    visitaEnProgreso: PropTypes.number
  };

  static defaultProps = {
    sala: "",
    nombreSala: "",
    dateb2b: "",
    visitaEnProgreso: 0
  };

  render() {
    const {
      data,
      data: {
        detail,
      },
      sala,
      nombreSala,
      dateb2b,
      visitaEnProgreso
    } = this.props;
    let categoryDetailSala;

    if (data && detail.length > 0) {
      categoryDetailSala = detail.map(det => (
        <SalasInfoListDetail
          key={det.categoria}
          data={det}
          sala={sala}
          nombreSala={nombreSala}
          categoria={det.categoria}
          dateb2b={dateb2b}
          visitaEnProgreso={visitaEnProgreso}
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
        {(!data || detail.length) === 0 &&
          <View style={{
            justifyContent: 'center',
            flex: 1,
            margin: 10,
          }}>
            <Text style={{ textAlign: 'center' }}>No hay casos disponibles</Text>
          </View>}
        <ScrollView>{categoryDetailSala}</ScrollView>
      </View>
    );
  }
}

export default SalasInfoList;
