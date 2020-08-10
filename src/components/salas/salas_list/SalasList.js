import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Content } from 'native-base';
import { RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LoadingOverlay from '@common/loading_overlay/LoadingOverlay';
import SalasDetail from '@components/salas/salas_detail/SalasDetail';
import NoSalas from '@components/salas/salas_empty/SalasEmpty';

import useAppState, {
  usePrevAppState,
  removeListener,
} from '@hooks/app-state-hook';

import {
  ListadoSalas,
  ListadoSalasWithRefresh,
  GetLocationAsync,
} from '@components/salas/salas_list/SalasListActions';

const SalasList = ({
  activeCheckin,
  GetLocationAsync,
  ListadoSalas,
  endpoint,
  lostSaleON,
  salas,
  refreshing,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentScene } = Actions;
  const appState = useAppState();
  const prevAppState = usePrevAppState(appState);
  const delay = 200;

  useEffect(() => {
    const refreshData = async () => {
      setIsLoading(true);
      await GetLocationAsync();
      await ListadoSalas(endpoint, lostSaleON);
      setIsLoading(false);
    };
    if (
      prevAppState !== appState &&
      currentScene === 'dashboard'
    ) {
      refreshData();
    }
  }, [appState, currentScene]);

  useEffect(() => {
    const getData = async () => {
      await GetLocationAsync();
      await ListadoSalas(endpoint, lostSaleON);
      setIsLoading(false);
    };
    getData();
  }, []);

  const RefreshListadoSalas = async () => {
    setIsLoading(true);

    await GetLocationAsync();

    ListadoSalasWithRefresh(endpoint, lostSaleON);

    setIsLoading(false);
  };

  const detailListadoSalas = salas.map((sala, i) => (
    <SalasDetail
      data={sala}
      key={sala.folio}
      delay={delay * i}
      lostSaleON={lostSaleON}
      activeCheckin={activeCheckin}
    />
  ));

  return (
    <Content
      style={{ backgroundColor: '#F4F4F4' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={RefreshListadoSalas}
          title="Recargar Salas..."
        />
      }
    >
      {salas.length !== 0 ? detailListadoSalas : <NoSalas />}
      {isLoading && <LoadingOverlay />}
    </Content>
  );
};

SalasList.propTypes = {
  GetLocationAsync: PropTypes.func.isRequired,
  ListadoSalas: PropTypes.func.isRequired,
  ListadoSalasWithRefresh: PropTypes.func.isRequired,
  salas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      bandera: PropTypes.string,
      date_b2b: PropTypes.string,
      mide: PropTypes.number,
      realizada: PropTypes.number,
      fecha_visita: PropTypes.string,
      direccion: PropTypes.string,
    })
  ),
  refreshing: PropTypes.bool,
  lostSaleON: PropTypes.bool,
  endpoint: PropTypes.string,
  activeCheckin: PropTypes.bool,
};

SalasList.defaultProps = {
  salas: [],
  refreshing: false,
  lostSaleON: true,
  endpoint: '',
  activeCheckin: false,
};

const mapStateToProps = (state) => ({
  salas: state.salas.salas,
  refreshing: state.salas.refreshing,
  lostSaleON: state.salasHeader.lostSaleON,
  endpoint: state.user.endpoint,
  activeCheckin: state.salas.activeCheckIn,
});

const mapDispatchToProps = {
  ListadoSalas,
  ListadoSalasWithRefresh,
  GetLocationAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasList);
