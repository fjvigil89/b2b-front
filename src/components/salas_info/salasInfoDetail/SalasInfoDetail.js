import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import { Text, Thumbnail } from 'native-base';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

class SalasInfoDetail extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number,
      bandera: PropTypes.string,
      date_b2b: PropTypes.string,
      mide: PropTypes.number,
      realizada: PropTypes.number,
      fecha_visita: PropTypes.string,
      direccion: PropTypes.string,
      cod_local: PropTypes.string,
      descripcion: PropTypes.string,
      folio: PropTypes.number,
      venta_valor: PropTypes.number,
    }),
    report: PropTypes.shape({
      cademsmartPorcentaje: PropTypes.string,
      ventaPerdida: PropTypes.number,
      gestionado: PropTypes.number,
    }),
  };

  static defaultProps = {
    data: {
      id: 0,
      bandera: '',
      date_b2b: '',
      mide: 0,
      realizada: 0,
      fecha_visita: '',
      direccion: '',
      cod_local: '',
      descripcion: '',
      folio: 0,
      venta_valor: 0,
    },
    report: {
      cademsmartPorcentaje: '',
      ventaPerdida: 0,
      gestionado: 0,
    },
  };

  constructor(props) {
    super(props);
    const { reload } = this.state;
    const {
      data: { folio },
      report: { gestionado },
    } = this.props;

    DeviceEventEmitter.addListener(`SalaDetalle-${folio}`, (e) => {
      this.props.report.gestionado = parseInt(gestionado, 10) + e.gestionado;

      this.setState({
        reload: !reload,
      });
    });
  }

  state = {
    reload: false,
  };

  formatter = (value) => {
    const formatterNumber = (x) => {
      const parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join('.');
    };

    if (value >= 1000 && value < 1000000) {
      const format = formatterNumber(value).split('.');
      return {
        number: `${format[0]}.${format[1].slice(0, 1)} k`,
        size: 29,
      };
    } else if (value >= 1000000 && value < 10000000) {
      const format = formatterNumber(value).split('.');
      return {
        number: `${format[0]}.${format[1].slice(0, 2)} m`,
        size: 25,
      };
    } else if (value >= 10000000 && value < 100000000) {
      const format = formatterNumber(value).split('.');
      return {
        number: `${format[0]}.${format[1].slice(0, 1)} m`,
        size: 25,
      };
    } else if (value >= 100000000 && value < 1000000000) {
      const format = formatterNumber(value).split('.');
      return {
        number: `${format[0]}.${format[1].slice(0, 1)} m`,
        size: 25,
      };
    } else if (value >= 1000000000) {
      const format = formatterNumber(value).split('.');
      return {
        number: `${format[0]}.${format[1].slice(0, 2)} mm`,
        size: 22,
      };
    }
    return {
      number: value,
      size: 35,
    };
  };

  render() {
    const { data, report } = this.props;

    let porcentajeProgreso = (report.gestionado * 100) / report.ventaPerdida;
    porcentajeProgreso = `${porcentajeProgreso}%`;

    const backgroundImage = require('@assets/images/background-detalle-salas.png');

    let logo = '';
    if (data.bandera === 'JUMBO') {
      logo = require('@assets/images/jumbo.png');
    } else if (data.bandera === 'LIDER') {
      logo = require('@assets/images/lider.png');
    } else if (data.bandera === 'HIPER LIDER') {
      logo = require('@assets/images/lider.png');
    } else if (data.bandera === 'LIDER EXPRESS') {
      logo = require('@assets/images/lider_express.png');
    } else if (data.bandera === 'CENTRAL MAYORISTA') {
      logo = require('@assets/images/central-mayorista.png');
    } else if (data.bandera === 'TOTTUS') {
      logo = require('@assets/images/tottus.png');
    } else if (data.bandera === 'EKONO') {
      logo = require('@assets/images/ekono.png');
    } else if (data.bandera === 'ACUENTA') {
      logo = require('@assets/images/acuenta.png');
    } else if (data.bandera === 'SANTA ISABEL') {
      logo = require('@assets/images/santaisabel.png');
    } else if (data.bandera === 'UNIMARC') {
      logo = require('@assets/images/unimarc.png');
    } else if (data.bandera === 'MAYORISTA 10') {
      logo = require('@assets/images/mayorista10.png');
    } else if (data.bandera === 'ALVI') {
      logo = require('@assets/images/alvi.png');
    } else if (data.bandera === 'OK MARKET') {
      logo = require('@assets/images/okmarket.png');
    } else {
      logo = require('@assets/images/logo-cadem-icono.png');
    }

    const deviceFullWidth = Dimensions.get('window').width;
    const deviceWidth = deviceFullWidth - 30;
    const formatter = this.formatter(report.ventaPerdida);

    const ventaValorF = this.formatter(data.venta_valor);

    let fechaVisita = '';

    if (data.fecha_visita === 'Pendiente' || data.id_visita === null) {
      fechaVisita = '-';
    } else {
      fechaVisita =
        data.fecha_visita || data.id_visita
          ? moment(data.fecha_visita).format('YYYY-MM-DD')
          : '-';
    }

    const sizeTittle = Platform.OS === 'ios' ? 20 : 18;

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 220,
        }}
      >
        <Image
          style={{
            position: 'absolute',
            top: 0,
            width: deviceFullWidth,
          }}
          source={backgroundImage}
        />

        <View
          style={{
            flex: 1,
            marginTop: 5,
            width: deviceWidth,
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              fontSize: sizeTittle,
              fontFamily: 'Bree',
              fontWeight: 'bold',
              color: '#FFF',
              paddingRight: 70,
            }}
          >
            {data.descripcion}
          </Text>
        </View>

        <Thumbnail
          style={{ position: 'absolute', top: 0, right: 15, zIndex: 1000 }}
          large
          source={logo}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: deviceWidth,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#FFF',
              fontFamily: 'Questrial',
              marginBottom: 5,
            }}
          >
            {data.direccion}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#FFF',
              fontWeight: 'bold',
              fontFamily: 'Questrial',
            }}
          >
            Fecha información B2B : {moment(data.date_b2b).format('YYYY-MM-DD')}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#FFF',
              fontWeight: 'bold',
              fontFamily: 'Questrial',
            }}
          >
            Fecha medición CademSmart : {fechaVisita}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.33,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              marginLeft: 20,
              marginRight: 5,
              borderRadius: 5,
              borderBottomColor: '#DEDEDE',
              borderBottomWidth: 1,
              borderLeftColor: '#DEDEDE',
              borderLeftWidth: 1,
              height: 70,
            }}
            onPress={() => {
              Actions.medicionCadem({
                folio: data.folio,
                porcentaje: report.cademsmartPorcentaje,
                visita: data.id_visita,
                nombreSala: data.descripcion,
                direccion: data.direccion,
                ultimaMedicion: fechaVisita,
              });
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: formatter.size,
                  fontWeight: 'bold',
                  fontFamily: 'Questrial',
                }}
              >
                {report.cademsmartPorcentaje}
              </Text>
              <Text style={{ fontFamily: 'Questrial', fontSize: 12 }}>
                CademSmart
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 0.33,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              marginLeft: 5,
              marginRight: 5,
              borderRadius: 5,
              borderBottomColor: '#DEDEDE',
              borderBottomWidth: 1,
              borderLeftColor: '#DEDEDE',
              borderLeftWidth: 1,
              height: 70,
            }}
            onPress={() => {
              Actions.ventaValor({
                cod_local: data.cod_local,
                cadena: data.cadena,
                nombreSala: data.descripcion,
                direccion: data.direccion,
              });
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: ventaValorF.size,
                  fontWeight: 'bold',
                  fontFamily: 'Questrial',
                }}
              >
                {ventaValorF.number}
              </Text>
              <Text style={{ fontFamily: 'Questrial', fontSize: 12 }}>
                Venta valor
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flex: 0.33,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              marginLeft: 5,
              marginRight: 20,
              borderRadius: 5,
              borderBottomColor: '#DEDEDE',
              borderBottomWidth: 1,
              borderRightColor: '#DEDEDE',
              borderRightWidth: 1,
              height: 70,
            }}
          >
            <View
              style={{
                backgroundColor: '#3cb3d0',
                width: porcentajeProgreso,
                height: '100%',
                left: 0,
                position: 'absolute',
                opacity: 0.2,
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                fontSize: formatter.size,
                fontWeight: 'bold',
                fontFamily: 'Questrial',
              }}
            >
              {formatter.number}
            </Text>
            <Text style={{ fontFamily: 'Questrial', fontSize: 12 }}>
              Venta Perdida
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 0.55,
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderBottomColor: '#DEDEDE',
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Bree',
                fontWeight: 'bold',
                marginBottom: 0,
              }}
            >
              Categoria
            </Text>
          </View>
          <View
            style={{
              flex: 0.21,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              borderBottomColor: '#DEDEDE',
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingRight: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Bree',
                fontWeight: 'bold',
              }}
            >
              Gest. / Casos
            </Text>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              borderBottomColor: '#DEDEDE',
              borderBottomWidth: 1,
              paddingBottom: 5,
              paddingRight: 5,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Bree',
                fontWeight: 'bold',
              }}
            >
              Venta Perdida
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SalasInfoDetail;
