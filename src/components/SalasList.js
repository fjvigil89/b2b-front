import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content, Text, Button } from 'native-base';
import { RefreshControl } from 'react-native';
import _ from 'lodash';

import LoginScreen from './containers/login/LoginApp';

import SalaDetail from './components/SalaDetail';
import SalasHeader from './components/SalasHeader';
import NoSalas from './components/NoSalas';
import Loading from './components/Loading';

import ListadoSalas from './actions/salas';
import { Logout } from './actions/user';

import CONSTANTES from './constants/constants';

class SalasList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    salas: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      imagen: PropTypes.string,
      sala: PropTypes.string,
      date: PropTypes.string,
      estado: PropTypes.number,
      cadena: PropTypes.string,
    })),
    getListadoSalas: PropTypes.func.isRequired,
  };

  static defaultProps = {
    salas: null,
    isLoading: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      salas: this.props.salas,
      refreshing: false,
    };

    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount = () => {
    this.props.getListadoSalas();
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });

    this.props.getListadoSalas()
      .then(() => {
        this.setState({
          refreshing: false,
        });
      });
  }

  render = () => {
    const { isLoading } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    const delay = 200;
    const salasOrdenadas = _.orderBy(this.state.salas, obj => obj.mide && obj.realizada, 'desc');

    const listadoSalas = salasOrdenadas.map((sala, i) => (
      <SalaDetail data={sala} key={sala.cod_local} delay={delay * i} />
    ));

    return (
      <Container>
        <SalasHeader
          salasFilter={this.salasFilter}
          clearSearch={this.clearSearch}
          filterSection={this.filterSection}
        />
        {this.state.salas.length !== 0 ?
          <Content
            style={{ backgroundColor: '#F4F4F4' }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                title="Recargar Salas..."
              />
            }
          >
            { listadoSalas }

            <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.handleLogout}>
              <Text>Salir</Text>
            </Button>
          </Content>
          :
          <Content
            style={{ backgroundColor: '#F4F4F4' }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                title="Recargar Salas..."
              />
            }
          >
            <NoSalas />
          </Content>
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.status.loading || false,
  salas: state.salas.listSalas,
});

const mapDispatchToProps = {
  getListadoSalas: ListadoSalas,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasList);
