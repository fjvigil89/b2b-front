import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { RefreshControl } from 'react-native';

import LoginScreen from './containers/login/LoginApp';

import SalaDetail from './components/SalaDetail';
import SalasHeader from './components/SalasHeader';
import NoSalas from './components/NoSalas';

import ListadoSalas from './actions/salas';
import { Logout } from './actions/user';

import CONSTANTES from './constants/constants';

class Root extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    salas: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      imagen: PropTypes.string,
      sala: PropTypes.string,
      date: PropTypes.string,
      estado: PropTypes.number,
      cadena: PropTypes.string,
    })),
    // onLogout: PropTypes.func.isRequired,
    getListadoSalas: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false,
    salas: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      salas: this.props.salas,
      refreshing: false,
    };

    // this.handleLogout = this.handleLogout.bind(this);
    this.salasFilter = this.salasFilter.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.filterSection = this.filterSection.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount = () => {
    this.props.getListadoSalas()
      .then(() => {
        this.setState({
          salas: this.props.salas,
        });
      });
  };

  /*
    handleLogout = () => {
      this.props.onLogout()
        .then(() => {
        })
        .catch(e => console.log(`Error: ${e}`));
    };
  */

  onRefresh = () => {
    this.setState({
      refreshing: true,
    });

    this.props.getListadoSalas()
      .then(() => {
        this.setState({
          salas: this.props.salas,
          refreshing: false,
        });
      });
  }

  filterSection(i = CONSTANTES.CANCEL_INDEX) {
    if (i === CONSTANTES.CANCEL_INDEX) {
      return;
    } else if (i === CONSTANTES.DESTRUCTIVE_INDEX) {
      this.setState({
        ...this.state,
        salas: this.props.salas,
      });

      return;
    }

    const salasFiltradas = this.props.salas.filter((item) => {
      const itemData = item.cadena.toUpperCase();
      const textData = CONSTANTES.OPTIONS_FILTERS_SALAS[i].toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      salas: salasFiltradas,
    });
  }

  clearSearch() {
    this.setState({
      salas: this.props.salas,
    });
  }

  salasFilter = (val) => {
    let salasFiltradas;

    if (val) {
      salasFiltradas = this.props.salas.filter((item) => {
        const itemData = item.sala.toUpperCase();
        const textData = val.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
    } else {
      salasFiltradas = this.props.salas;
    }

    this.setState({
      ...this.state,
      salas: salasFiltradas,
    });
  }

  render = () => {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <LoginScreen />;
    }

    const delay = 200;
    const listadoSalas = this.state.salas.map((sala, i) => (
      <SalaDetail data={sala} key={sala.id} delay={delay * i} />
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

            {/*
              <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.handleLogout}>
                <Text>Salir</Text>
              </Button>
            */}
          </Content>
          :
          <NoSalas />
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  salas: state.salas.listSalas,
});

const mapDispatchToProps = {
  onLogout: Logout,
  getListadoSalas: ListadoSalas,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
